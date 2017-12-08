import {
  Target,
  TargetCore,
  Targeter,
  Notifiable,
  Facet
} from './core/export';
import{
  SimpleState,
  FacetUpdater
}from '../../index';
import {traceThing} from './util/export';
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
  attachFacet(title:string,facetUpdated:FacetUpdater):void{
    let t:Targeter=this.titleTargeters.get(title);
    if(!t)throw new Error('Missing t for '+title);
    traceThing('> Attaching facet: title='+title);
    let facet={
      retarget(ta:Target){
        traceThing('> Facet retargeted title='+ta.title()+' state='+ta.state());
      }
    };
    t.attachFacet(facet);
  }
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
    traceThing('> Initial retargeting on '+targetTree.title());
    let t=this.targeterTree=(<TargetCore>targetTree).newTargeter();
    t.setNotifiable(this.notifiable);
    t.retarget(targetTree);
    this.addTitleTargeters(t);
  }
  addTitleTargeters(t:Targeter){
    let title=t.title();
    this.titleTargeters.set(title,t);
    const elements:Targeter[]=t.elements();
    traceThing('> Added targeter: title='+title+': elements='+elements.length);
    elements.forEach((e)=>this.addTitleTargeters(e));
  }
  newTextualTarget(title:string,coupler:TextualCoupler):Target{
    return new TargetCore(title);
  }
  newTargetGroup(title:string,...members:Target[]):Target{
    return new TargetCore(title,members);
  }
  updateTargetState(title:string,update:SimpleState):void{
    this.titleTarget(title).updateState(update);
  }
  getTargetState(title:string):SimpleState{
    throw new Error('Not implemented');
  }
  titleTarget(title:string):Target{
    return this.titleTargeters.get(title).target();
  }
 }
