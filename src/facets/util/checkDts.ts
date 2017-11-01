import * as fs from 'fs-extra';
import { traceThing } from './export';

function main() {
  let src = 'index.d.ts',dest=true?'index_.d.ts':src, facets='Facets.d.txt';
  let content = fs.readFileSync(src, 'utf8').replace(/\r\n/, '\n'),
    mods=fs.readFileSync(facets, 'utf8').replace('Facets.','');
  let leftOver=0;
  // console.log(content.substr(0,200)+'\n-------------');
  function handleChunk(chunk:string, at) {
    let signature=chunk.replace(/\/\*\*[^/]+\/\s*/,'').trim();
    if(true)signature=signature.replace(/export\s*(.*)/,'$1');
    if(false)console.log(signature + '\n---------');
    if(mods.includes(signature))return;
    let head=signature.replace(/((\w+\s*)+).*/,'$1');
    console.log(`${leftOver++} signature: ${signature}\nhead: ${head}`);
    content=content.replace(signature,signature+'\n'+head);
  }
  content.match(/\/\*\*[^/]+\/\s*\w[^\n]+/g).forEach(handleChunk);
  fs.writeFileSync(dest,content);
}
main();