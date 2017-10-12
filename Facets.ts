import {trace,Target,TargetCore,Targeter,Notifiable} from './Core'
export {Facets,Target};
export type SimpleState=string|boolean|number
export interface TargetCoupler {
  targetStateUpdated?: (title: string, update: SimpleState) => void;
}
export interface TextualCoupler extends TargetCoupler{
  passText?:string;
  getText?:(title:string)=>string;
  isValidText?:(title:string,text:string)=>boolean;
}
interface TogglingCoupler extends TargetCoupler {
  passSet: boolean;
}
interface NumericCoupler extends TargetCoupler {
  passValue: number;
  min: number;
  max: number;
}
interface IndexingCoupler extends TargetCoupler{
  passIndex:number;
  getIndexables: (title: string) => any[];
  getUiSelectables: (title: string) => string[];
}
interface IndexingState {
  uiSelectables: string[];
  indexed: any;
}
interface SelectingFramePolicy {
  title: string;
  indexingTitle: string;
  content: any[];
  getUiSelectables: () => string[];
  newEditTargets: (indexed: any) => Target[];
  newFrameTargets?: () => Target[];
  frame?: Target;
  getIndexedContent?: any;
}
export function newInstance(trace:boolean):Facets{
  return new Facets();
}
class Facets{
  private readonly notifiable:Notifiable={
    notify(notice){
      throw new Error('Not implemented');      
    }
  }
  targeterTree:Targeter
  titleTargeters=new Map<string,Targeter>()
  buildTargeterTree(targetTree:Target):void{
		trace(" > Initial retargeting on",targetTree.title);
    this.targeterTree=(<TargetCore>targetTree).newTargeter();
    trace('.buildTargeterTree',this.targeterTree)
		this.targeterTree.setNotifiable(this.notifiable);
		this.targeterTree.retarget(targetTree);
		this.addTitleTargeters(this.targeterTree);
  }
  addTitleTargeters(t:Targeter){
		const title=t.title();
		this.titleTargeters.set(title,t);
		const elements:Targeter[]=t.elements();
		trace("> Added targeter: title="+title+": elements=",elements);
    elements.forEach((e)=>this.addTitleTargeters(e))
  }
  newTextualTarget(title:string,coupler:TextualCoupler):Target{
    return new TargetCore(title);
  }
  newTargetGroup(title:string,...members:Target[]):Target{
    return new TargetCore(title,members);
  }
  attachFacet(title:string,facetUpdated:(state:SimpleState)=>void):void{
    throw new Error('Not implemented');
  }
  updateTargetState(title:string,update:SimpleState):void{
    throw new Error('Not implemented');
  }
  getTargetState(title:string):SimpleState{
    throw new Error('Not implemented');
  }
 }
