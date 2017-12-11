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
interface IndexingFramePolicy {
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
  attachFacet(title:string,updater:FacetUpdater):void{
    let t:Targeter=this.titleTargeters.get(title);
    if(!t)throw new Error('Missing t for '+title);
    traceThing('> Attaching facet: title='+title);
    let facet={
      retarget(ta:Target){
        traceThing('> Facet retargeted title='+ta.title()+' state='+ta.state());
        updater(ta.state());
      }
    };
    t.attachFacet(facet);
  }
  static newInstance(trace:boolean):Facets{
    return new Facets();
  }
  private notifiable:Notifiable;
  titleTargeters=new Map<string,Targeter>();
  buildTargeterTree(targetTree:Target):void{
    traceThing('> Initial retargeting on '+targetTree.title());
    let targeterTree=(<TargetCore>targetTree).newTargeter();
    this.notifiable={
      notify(notice){
        traceThing('> Notified with '+targeterTree.title());
        targeterTree.retarget(targeterTree.target());
        targeterTree.retargetFacets();
      }
    };
    targeterTree.setNotifiable(this.notifiable);
    targeterTree.retarget(targetTree);
    this.addTitleTargeters(targeterTree);
  }
  addTitleTargeters(t:Targeter){
    let title=t.title();
    this.titleTargeters.set(title,t);
    const elements:Targeter[]=t.elements();
    traceThing('> Added targeter: title='+title+': elements='+elements.length);
    elements.forEach((e)=>this.addTitleTargeters(e));
  }
  newTextualTarget(title:string,coupler:TextualCoupler):Target{
    let textual=new TargetCore(title);
    textual.updateState(coupler.passText||
      (coupler.getText?coupler.getText(title):'No text supplied'));
    traceThing('> Created textual title='+title+' state='+textual.state());
    return textual;
  }
  newTargetGroup(title:string,...members:Target[]):Target{
    return new TargetCore(title,members);
  }
  updateTargetState(title:string,update:SimpleState):void{
    this.titleTarget(title).updateState(update);
    this.notifiable.notify(title);
  }
  getTargetState(title:string):SimpleState{
    throw new Error('Not implemented');
  }
  titleTarget(title:string):Target{
    return this.titleTargeters.get(title).target();
  }
 }
