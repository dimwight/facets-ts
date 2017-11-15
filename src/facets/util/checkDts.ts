import * as fs from 'fs-extra';
import { log } from 'util';

const _winBreak = /\r\n/, _params = /.*(\([^)]+\)).*/;
const unmatchables=[
'interface Target{}',
'interface Times {',
'interface Facets {',
'type SimpleState=string|boolean|number',
'type FacetUpdater=(state: SimpleState) => void',
'supplement: any;',
'function newInstance(trace: boolean): Facets;',
'buildLayout(): void;',
];
const src = 'index.d.ts', dest = 'index_.d.ts', facets = 'Facets.d.ts';
let unmatched = [];
function main() {
  let content = fs.readFileSync(src, 'utf8').replace(_winBreak, '\n');
  const checks: string[] = fs.readFileSync(facets, 'utf8').split(_winBreak)
    .map(check => {
    if (!check.match(/.*[:{].*/)
      || check.match(/.*\*|__|\$.*/)
      || check.includes('import')
      || check.includes('constructor')
      || check.includes('namespace')
    ) check = '';
    return check.trim()
      .replace(/:\s*\(/,' (')
      .replace(/=>/,':')
      .replace('Facets.', '');
  });
  const signatures = content.match(/\/\*\*[^/]+\/\s*\w[^\n]+/g)
    .map(withComment => {
      const sig=withComment.trim()
        .replace(/\/\*\*[^/]+\/\s*/, '')
        .replace(/export\s*(.*)/, '$1');
      return sig;
    });
  signatures.forEach(checkSignature);
  fs.writeFileSync(dest, content);
  console.log('signatures=%s, unmatched=', signatures.length, unmatched);
  function checkSignature(sig: string) {
    if(unmatchables.includes(sig))return;
    let marker = '';
    if (checks.includes(ts2java(sig))) marker = '=' + (true ? '' : sig);
    else {
      // console.log(sig);
      const head = sig.replace(/((\w+\s*)+).*/, '$1').trim();
      // console.log(head);
      checks.map(check => {
        if (check.replace(/(\w+).*/,'$1')===head) return check;
      }).forEach(headMatch => {      
        if (headMatch && (marker === ''||marker.startsWith('?'))){
          // console.log('?'+headMatch);
          const params = ts2java(sig,true);
          if(params===headMatch){
            if(unmatched.includes(sig)){
              if(unmatched.length===1)unmatched=[];
              else console.log(unmatched);
            }
            marker = '=' + (true ? '' : sig);
            const at=unmatched.indexOf(sig);
          }
          else if(!unmatchables.includes(sig)){
            marker ='?' + headMatch + '\n';
            if(!unmatched.includes(sig))unmatched.push(sig);
            // console.log(headMatch+'\n!'+params);
          }
        }
      });
      if (marker === '') {
        marker = '?' + (true ? '' : head);
        if(!unmatched.includes(sig))unmatched.push(sig);
        if (false) console.log(head);
      }
    }
    if (!marker.startsWith('='))
      content = content.replace(sig, sig + '\n' + marker.trim());
  }
}
function ts2java(ts: string,params?) {
  let ts_ = ts.replace('coupler:', 'c:')
    .replace(/\bTarget\b/g, 'STarget')
    .replace(/\bpolicy\b/, 'p')
    .replace(': () => void', '(): void')
    .replace('(state: SimpleState) => void', 'any')
    .replace('(state: SimpleState) => void', 'any')
    .replace(': STarget|STarget[]', ': any')
    .replace(': FacetUpdater', ': any')
    .replace(': SimpleState', ': any');
    if (ts.match(_params)&&params) ts_ = javaParams(ts_);
    if (false && ts !== ts_) console.log(ts_+'\n'+ts);
  return ts_;
}
function javaParams(java: string) {
  const _param = /\b\w+:/g, params = java.replace(_params, '$1');
  let params_ = params;
  let pAt = 1;
  params_.match(_param).forEach(match => {
    const match_ = match.replace(_param, 'p' + pAt++ + ':');
    params_=params_.replace(match, match_);
  });
  const java_=java.replace(params,params_);
  if(false)console.log(java+'\n',java_);
  return java_;
}
main();