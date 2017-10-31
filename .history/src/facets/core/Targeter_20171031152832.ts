import {Notifiable,Target} from './export';
export interface Targeter extends Notifiable{
  title():string;
  target():Target;
  setNotifiable(n:Notifiable);
  retarget(t:Target);
  elements():Targeter[];
}