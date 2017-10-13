import {Notifiable,Target,TargetCore} from './_export'
export interface Targeter extends Notifiable{
  title():string
  target():Target
  setNotifiable(n:Notifiable)
  retarget(t:Target)
  elements():Targeter[]
}
export class TargeterCore implements Targeter{
  private elements_: Targeter[]
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
    const targets:Target[]=target.elements()
    if(!this.elements_)this.elements_=targets.map<Targeter>(target=>{
        let element=(<TargetCore>target).newTargeter()
        element.setNotifiable(this)
        return element
      })
    if(targets.length===this.elements_.length)
      this.elements_.forEach((e,at) =>e.retarget(targets[at]))
    if((<TargetCore>target).notifiesTargeter())target.setNotifiable(this)
  }
  title=()=>this.target?this.target_.title:this.title_ 
  target=():Target=>{
    if(!this.target)throw new Error(this.title_)
    else return this.target_
  }
  elements=():Targeter[]=>{
    return this.elements_
  }
}