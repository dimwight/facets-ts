export {Facets};
export type SimpleState=string|boolean|number
export interface Target{}
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
  newTextualTarget(title:string,coupler:TextualCoupler):Target{
    throw new Error('Not implemented for '+title);
  }
  newTargetGroup(title:string,...members:Target[]):Target{
    throw new Error('Not implemented for '+title);
  }
  buildTargeterTree(targetTree:Target):void{
    throw new Error('Not implemented');
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
