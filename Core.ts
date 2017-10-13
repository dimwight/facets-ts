export function trace(msg, thing){
  console.info('Facets'+msg,JSON.stringify(thing,null,1))
}
export interface Target{
  title:string
  elements:()=>Target[]
  }
export interface Notifiable{
  notify(notice)
}
export interface Targeter extends Notifiable{
  title:()=>string
  target:()=>Target
  setNotifiable(n:Notifiable)
  retarget(t:Target)
  elements:()=>Targeter[]
}

export class TargetCore implements Target{
  constructor(readonly title:string,readonly members?:Target[]){}
  newTargeter():Targeter{
    return new TargeterCore()
  }
  elements=():Target[]=>{
    return []
  }
} 
export class TargeterCore implements Targeter{
  private elements_: Targeter[];
  private title_='Untargeted'
  private target_:Target
  notify(notice){
    throw new Error('Not implemented in TargeterCore')
  }
  setNotifiable(Notifiable){
    
  }
  retarget(target:Target){
    if(!target)throw new Error('Missing target')
    this.target_=target
    const targets:Target[]=target.elements();
    if(!this.elements_)this.elements_=targets.map<Targeter>((target)=>{
        let element=(<TargetCore>target).newTargeter();
        element.setNotifiable(this);
        return element;
      })
  }
  title=()=>this.target?this.target_.title:this.title_ 
  target=():Target=>{
    if(!this.target)throw new Error(this.title_);
    else return this.target_
  }
  elements=():Targeter[]=>{
    return this.elements_
  }
}
  