import {Target,TargetCore,Targeter,Notifiable} from './core/_export';
import {traceThing} from './bits/_export';
export type SimpleState=string|boolean|number;
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
export class Facets{
  static newInstance(trace:boolean):Facets{
    return new Facets();
  }
  private readonly notifiable:Notifiable={
    notify(notice){
      throw new Error('Not implemented');      
    }
  };
  targeterTree:Targeter;
  titleTargeters=new Map<string,Targeter>();
  buildTargeterTree(targetTree:Target):void{
    traceThing(' > Initial retargeting on',targetTree.title);
    let t=this.targeterTree=(<TargetCore>targetTree).newTargeter();
    t.setNotifiable(this.notifiable);
    t.retarget(targetTree);
    traceThing('.buildTargeterTree',t.title());
    this.addTitleTargeters(t);
  }
  addTitleTargeters(t:Targeter){
    let title=t.title();
    this.titleTargeters.set(title,t);
    const elements:Targeter[]=t.elements();
    traceThing('> Added targeter: title='+title+': elements=',elements);
    elements.forEach((e)=>this.addTitleTargeters(e));
  }
  newTextualTarget(title:string,coupler:TextualCoupler):Target{
    return new TargetCore(title);
  }
  newTargetGroup(title:string,...members:Target[]):Target{
    return new TargetCore(title,members);
  }
  attachFacet(title:string,facetUpdated:(state:SimpleState)=>void):void{
    let t=this.titleTargeters.get(title);
    traceThing('.attachFacet title='+title,t);
    throw new Error('Not implemented');
  }
  updateTargetState(title:string,update:SimpleState):void{
    throw new Error('Not implemented');
  }
  getTargetState(title:string):SimpleState{
    throw new Error('Not implemented');
  }
 }
