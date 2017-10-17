import {Targeter,TargeterCore,Notifying,NotifyingCore} from './_export';
export interface Target extends Notifying{
  title():string;
  elements():Target[];
}
export class TargetCore extends NotifyingCore implements Target {
  constructor(private readonly title_:string,private readonly elements_?:Target[]){
    super();
  }
  notifiesTargeter():boolean{
    return this.elements_!==null;
  }
  newTargeter():Targeter{
    return new TargeterCore();
  }
  elements():Target[]{
    return this.elements_?this.elements_:[];
  }
  title(){
    return this.title_;
  }
}
