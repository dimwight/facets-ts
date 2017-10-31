import {Target,Targeter,TargetCore} from './_export';
export class TargeterCore implements Targeter{
  private notifiable: any;
  private elements_: Targeter[];
  private title_='Untargeted';
  private target_:Target;
  notify(notice){
    throw new Error('Not implemented in TargeterCore');
  }
  setNotifiable(notifiable){
    this.notifiable=notifiable;
  }
  retarget(target:Target){
    if(!target)throw new Error('Missing target');
    this.target_=target;
    const targets:Target[]=target.elements();
    if(!this.elements_)this.elements_=targets.map<Targeter>(targety=>{
        let element=(<TargetCore>targety).newTargeter();
        element.setNotifiable(this);
        return element;
      });
    if(targets.length===this.elements_.length)
      this.elements_.forEach((e,at) =>e.retarget(targets[at]));
    if((<TargetCore>target).notifiesTargeter())target.setNotifiable(this);
  }
  title(){
    return this.target_?this.target_.title():this.title_;
  }
  target():Target{ 
    if(!this.target_)throw new Error(this.title_);
    else return this.target_;
  }
  elements():Targeter[]{
    return this.elements_;
  }
}