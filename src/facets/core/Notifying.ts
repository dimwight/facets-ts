import {Notifiable} from './local';
export interface Notifying extends Notifiable{
  setNotifiable(n:Notifiable);
  notifiable():Notifiable;
  elements():Notifying[];
  notifyParent();
}
