import * as fs from 'fs-extra';
import {traceThing} from './export';

let content:string = fs.readFileSync('index.d.ts', 'utf8').replace(/\r\n/,'\n');
// console.log(content.substr(0,200)+'\n-------------');
content.match(/(\/\*\*[^/]+\/\s*)?\w[^;}]+[;}]/g).forEach((match,at)=>{
  if(at<200)console.log(match+'\n---------');
});