export function trace(msg, thing){
  console.info(msg,JSON.stringify(thing))
}
export interface Target{}
export interface Targeter{
  setNotifiable(n:Notifiable)
  retarget(t:Target)
}
export interface Notifiable{
  notify(notice)
}
export class TargetCore implements Target{
  constructor(readonly title:String,readonly members?:Target[]){}
  newTargeter():Targeter{
    return new TargeterCore()
  }
} 
export class TargeterCore implements Targeter{
  private target:Target
  setNotifiable(Notifiable){
    
  }
  retarget(target:Target){
    this.target=target
  }
}
  