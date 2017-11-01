import * as fs from 'fs-extra';
import { traceThing } from './export';

function main() {
  let src = 'index.d.ts',dest=true?'index_.d.ts':src, facets='Facets.d.txt';
  let content = fs.readFileSync(src, 'utf8').replace(/\r\n/, '\n'),
    mods=fs.readFileSync(facets, 'utf8').replace('Facets.','');
  // console.log(content.substr(0,200)+'\n-------------');
  function handleChunk(chunk:string, at) {
    chunk=chunk.replace(/\/\*\*[^/]+\/\s*/,'');
    if(false)console.log(chunk + '\n---------');
    if(mods.includes(chunk)){
      console.log('Found match='+chunk.substr(0,50));
      return;
    }
    content=content.replace(chunk,chunk+'\n');
  }
  content.match(/\/\*\*[^/]+\/\s*\w[^\n]+/g).forEach(handleChunk);
  fs.writeFileSync(dest,content);
}
main();