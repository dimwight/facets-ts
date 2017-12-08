import {Notifying} from './local';
import { SimpleState } from '../../../index';
export interface Target extends Notifying{
  title():string;
  elements():Target[];
  updateState(update:SimpleState);
}
