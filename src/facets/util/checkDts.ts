import * as fs from 'fs-extra';
import { traceThing } from './export';

const winBreak = /\r\n/;
const src = 'index.d.ts', dest = 'index_.d.ts', facets = 'Facets.d.ts';
const _params = /.*(\([^)]+\)).*/;
function main() {
  let content = fs.readFileSync(src, 'utf8').replace(winBreak, '\n');
  const signatures: string[] = content.match(/\/\*\*[^/]+\/\s*\w[^\n]+/g)
    .map(withComment => {
      return withComment.replace(/\/\*\*[^/]+\/\s*/, '').trim();
    });
  const checks: string[] = fs.readFileSync(facets, 'utf8').split(winBreak).map(line => {
    if (!line.match(/.*[:{].*/)
      || line.match(/.*\*|__|\$.*/)
      || line.includes('import')
      || line.includes('constructor')
      || line.includes('namespace')
    ) line = '';
    line = line.replace('Facets.', '').trim();
    if (false && line !== '') console.log(line);
    return line;
  });
  let unmatched = 0;
  signatures.forEach(checkSignature);
  fs.writeFileSync(dest, content);
  console.log('signatures=%s, unmatched=%s', signatures.length, unmatched);
  function checkSignature(sig: string, at) {
    sig = sig.replace(/export\s*(.*)/, '$1');
    let insert = '';
    if (checks.includes(ts2java(sig))) insert = '=' + (true ? '' : sig);
    else {
      const head = sig.replace(/((\w+\s*)+).*/, '$1');
      checks.map(check => {
        if (check.startsWith(head)) return check;
      }).forEach(check => {
        if (check && insert === '') insert = insert + '+' + check + '\n';
      });
      if (insert === '') {
        insert = '?' + (true ? '' : head);
        if (false) console.log(head);
        unmatched++;
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
  if (ts.match(_params)) java = javaParams(java);
  if (false && ts !== java) console.log('java=' + java);
  return java;
}
function javaParams(java: string) {
  let _param = /\b\w+:/g;
  let params = java.replace(_params, '$1'), params_ = params + '';
  let pAt = 1;
  params_.match(_param).forEach(match => {
    let match_ = match.replace(_param, 'p' + pAt++ + ':');
    // console.log(match,match_);
    params_=params_.replace(match, match_);
  });
  console.log(java=java.replace(params,params_));
  return java;
}
main();