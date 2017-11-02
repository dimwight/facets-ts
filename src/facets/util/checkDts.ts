import * as fs from 'fs-extra';
import { traceThing } from './export';

const lineBreak = /\r\n/;
function main() {
  let src = 'index.d.ts', dest = true ? 'index.d.txt' : src, facets = 'Facets.d.txt';
  let content = fs.readFileSync(src, 'utf8').replace(lineBreak, '\n');
  let mods:string[] = fs.readFileSync(facets, 'utf8').split(lineBreak).map(line=>{
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
  let chunks:string[]=content.match(/\/\*\*[^/]+\/\s*\w[^\n]+/g);
  let unmatched = 0;
  function handleChunk(chunk: string, at) {
    let signature = chunk.replace(/\/\*\*[^/]+\/\s*/, '').trim(),insert='';
    signature = signature.replace(/export\s*(.*)/, '$1');
    if (mods.includes(signature)) insert='OK: '+signature;
    else{
      let head = signature.replace(/((\w+\s*)+).*/, '$1');
      mods.map(mod=>{
        if(mod.replace('interface','').startsWith(head))return mod;
      }).forEach(mod=>{
        if(mod)insert=insert+'+'+mod+'\n';
      });
      if(insert===''){
        insert='?'+head;
        console.log(insert);
        unmatched++;
      }
    }
    content = content.replace(signature, signature + '\n' + insert.trim());
  }
  chunks.forEach(handleChunk);
  fs.writeFileSync(dest, content);
  console.log('chunks=%s, unmatched=%s',chunks.length,unmatched);
}
main();