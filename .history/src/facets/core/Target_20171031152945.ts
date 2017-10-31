import {Notifying} from './local';
export interface Target extends Notifying{
  title():string;
  elements():Target[];
}
