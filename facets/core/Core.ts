import {Targeter,TargeterCore} from './Targeter'
export function trace(msg, thing){
  console.info('Facets'+msg,JSON.stringify(thing,null,1))
}
export interface Target{
  title:string
  elements():Target[]
}
export interface Notifiable{
  notify(notice)
}
interface Notifying extends Notifiable{
  setNotifiable(n:Notifiable)
  notifiable():Notifiable
  elements():Notifying[]
  notifyParent()
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
  