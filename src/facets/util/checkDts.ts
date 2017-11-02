import * as fs from 'fs-extra';
import { traceThing } from './export';

const winBreak = /\r\n/;
const src = 'index.d.ts', dest = 'index_.d.ts', facets = 'Facets.d.ts';
function main() {
  let content = fs.readFileSync(src, 'utf8').replace(winBreak, '\n');
  const signatures:string[]=content.match(/\/\*\*[^/]+\/\s*\w[^\n]+/g).map(withComment=>{
    return withComment.replace(/\/\*\*[^/]+\/\s*/, '').trim();
  });
  const checks:string[] = fs.readFileSync(facets, 'utf8').split(winBreak).map(line=>{
    if(!line.match(/.*[:{].*/)
      ||line.match(/.*\*|__|\$.*/)
      ||line.includes('import')
      ||line.includes('constructor')
      ||line.includes('namespace')
    )line='';
    line=line.replace('Facets.', '').trim();
    if(false&&line!=='')console.log(line);
    return line;
  });
  let unmatched = 0;
  signatures.forEach(checkSignatures);
  fs.writeFileSync(dest, content);
  console.log('signatures=%s, unmatched=%s',signatures.length,unmatched);
  function checkSignatures(signature: string, at) {
    signature = signature.replace(/export\s*(.*)/, '$1');
    let insert='';
    if (checks.includes(signature)) insert='='+(true?'':signature);
    else {
      const head = signature.replace(/((\w+\s*)+).*/, '$1');
      checks.map(check=>{
        if(check.startsWith(head))return check;
      }).forEach(check=>{
        if(check)insert=insert+'+'+check+'\n';
      });
      if(insert===''){
        insert='?'+(true?'':head);
        console.log(head);
        unmatched++;
      }
    }
    content = content.replace(signature, signature + '\n' + insert.trim());
  }
}
main();