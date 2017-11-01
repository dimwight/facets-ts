import * as fs from 'fs-extra';
import {traceThing} from './export';

let content = fs.readFileSync('index.d.ts', 'utf8');
traceThing('checkDts',{file:content});