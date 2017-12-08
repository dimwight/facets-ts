import {
  Target,
  Targeter,
} from './export';
import {
  TargeterCore,
  NotifyingCore,
} from './local';
import { SimpleState } from '../../../index';
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
  updateState(update:SimpleState){
    console.log('> Updated '+this.title()+' with update='+update);
  }
}
