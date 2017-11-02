import * as fs from 'fs-extra';
import { traceThing } from './export';

const winBreak = /\r\n/;
const src = 'index.d.ts', dest = 'index_.d.ts', facets = 'Facets.d.ts';
function main() {
  let content = fs.readFileSync(src, 'utf8').replace(winBreak, '\n');
  const signatures: string[] = content.match(/\/\*\*[^/]+\/\s*\w[^\n]+/g).map(withComment => {
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
        if (check&&insert==='') insert = insert + '+' + check + '\n';
      });
      if (insert === '') {
        insert = '?' + (true ? '' : head);
        console.log(head);
        unmatched++;
      }
    }
    content = content.replace(sig, sig + '\n' + insert.trim());
  }
}
function ts2java(ts: string) {
  let java = ts.replace('coupler:', 'c:')
    .replace(/\bTarget\b/g, 'STarget')
    .replace(/\bpolicy\b/,'p')
    .replace(': () => void','(): void')
    .replace('(state: SimpleState) => void','any')
    .replace(': SimpleState',': any');
  if(false&&ts!==java)console.log('java='+java);
  return java;
}
main();