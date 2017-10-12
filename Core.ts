export function trace(msg, thing){
  console.info('Facets'+msg,JSON.stringify(thing,null,1))
}
export interface Target{
  title:string
}
export interface Targeter{
  title:()=>string
  target:()=>Target
  setNotifiable(n:Notifiable)
  retarget(t:Target)
  elements:()=>Targeter[]
}
export interface Notifiable{
  notify(notice)
}
export class TargetCore implements Target{
  constructor(readonly title:string,readonly members?:Target[]){}
  newTargeter():Targeter{
    return new TargeterCore()
  }
} 
export class TargeterCore implements Targeter{
  private elements_: Targeter[];
  private title_='Untargeted'
  private target_:Target
  setNotifiable(Notifiable){
    
  }
  retarget(target:Target){
    this.target_=target
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
  