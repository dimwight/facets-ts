import {Targeter,TargeterCore} from './_export'
export interface Target{
  title:string
  elements():Target[]
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