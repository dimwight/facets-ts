import {Targeter,TargeterCore,Notifying,NotifyingCore} from './_export';
export interface Target extends Notifying{
  title:string;
  elements():Target[];
}
export class TargetCore extends NotifyingCore implements Target {
  constructor(readonly title:string,readonly members?:Target[]){
    super();
  }
  notifiesTargeter():boolean{
    return this.members!==null;
  }
  newTargeter():Targeter{
    return new TargeterCore();
  }
  elements():Target[]{
    return [];
  }
}
