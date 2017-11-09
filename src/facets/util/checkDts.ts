import * as fs from 'fs-extra';
import { traceThing } from './export';

const _winBreak = /\r\n/, _params = /.*(\([^)]+\)).*/;
const unmatchables:string=JSON.parse(`[
"interface Target{}",
"type SimpleState=string|boolean|number",
"interface Times {",
"interface Facets {",
"identity(): any;",
"supplement: any;",
"function newInstance(trace: boolean): Facets;"
]`);
const src = 'index.d.ts', dest = 'index_.d.ts', facets = 'Facets.d.ts';
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
    return check.replace('Facets.', '').trim();
  });
  let unmatched = [];
  const signatures: string[] = content.match(/\/\*\*[^/]+\/\s*\w[^\n]+/g)
    .map(withComment => {
      let sig=withComment.replace(/\/\*\*[^/]+\/\s*/, '').trim();
      return sig;
    });
  signatures.forEach(checkSignature);
  fs.writeFileSync(dest, content);
  console.log('signatures=%s, unmatched=%s', signatures.length, 
    JSON.stringify(unmatched));
  function checkSignature(sig: string, at) {
    sig = sig.replace(/export\s*(.*)/, '$1');
    let insert = '';
    if (checks.includes(ts2java(sig))) insert = '=' + (true ? '' : sig);
    else {
      const head = sig.replace(/((\w+\s*)+).*/, '$1');
      checks.map(check => {
        if (check.replace(/(\w+).*/,'$1')===head) return check;
      }).forEach(check => {
        if (check && insert === '') insert = insert + '+' + check + '\n';
      });
      if (insert === '') {
        insert = '?' + (true ? '' : head);
        if (false) console.log(head);
        if(!unmatchables.includes(sig))unmatched.push(sig);
      }
    }
    if (!insert.startsWith('='))
      content = content.replace(sig, sig + '\n' + insert.trim());
  }
}
function ts2java(ts: string) {
  let java = ts.replace('coupler:', 'c:')
    .replace(/\bTarget\b/g, 'STarget')
    .replace(/\bpolicy\b/, 'p')
    .replace(': () => void', '(): void')
    .replace('(state: SimpleState) => void', 'any')
    .replace(': SimpleState', ': any');
  if (ts.match(_params)&&java.includes('=>')) java = javaParams(java);
  if (false && ts !== java) console.log('java=' + java);
  return java;
}
function javaParams(java: string) {
  const _param = /\b\w+:/g;
  let params = java.replace(_params, '$1'), params_ = params + '';
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