import {
  Targety,
  TargetCore,
  Targeter,
  Notifiable,
  Facet
} from './core/export';
import{
  SimpleState,
  FacetUpdater,
  TextualCoupler
}from '../../index';
import {traceThing} from './util/export';
export class Facets{
  attachFacet(title:string,updater:FacetUpdater):void{
    let t:Targeter=this.titleTargeters.get(title);
    if(!t)throw new Error('Missing t for '+title);
    traceThing('> Attaching facet: title='+title);
    let facet={
      retarget(ta:Targety){
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
  buildTargeterTree(targetTree:Targety):void{
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
  newTextualTarget(title:string,coupler:TextualCoupler):Targety{
    let textual=new TargetCore(title);
    textual.updateState(coupler.passText||
      (coupler.getText?coupler.getText(title):'No text supplied'));
    traceThing('> Created textual title='+title+' state='+textual.state());
    return textual;
  }
  newTargetGroup(title:string,...members:Targety[]):Targety{
    return new TargetCore(title,members);
  }
  updateTargetState(title:string,update:SimpleState):void{
    this.titleTarget(title).updateState(update);
    this.notifiable.notify(title);
  }
  getTargetState(title:string):SimpleState{
    throw new Error('Not implemented');
  }
  titleTarget(title:string):Targety{
    return this.titleTargeters.get(title).target();
  }
 }
