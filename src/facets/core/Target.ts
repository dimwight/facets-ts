import {Notifying} from './_local';
export interface Target extends Notifying{
  title():string;
  elements():Target[];
}
