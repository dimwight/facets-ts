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
  TextualCoupler,
  FacetsApp,
  Target
}from './index';
export{
  SimpleState,
  FacetUpdater,
  TextualCoupler,
  FacetsApp,
  Target
};
import {traceThing} from './util/export';
export function newInstance(trace:boolean):Facets{
  return new Facets();
}
export class Facets{
  attachFacet(title:string,updater:FacetUpdater):void{
    let t:Targeter=this.titleTargeters.get(title);
    if(!t)throw new Error('Missing targeter for '+title);
    traceThing('> Attaching facet: title='+title);
    let facet={
      retarget(ta:Targety){
        traceThing('> Facet retargeted title='+ta.title()+' state='+ta.state());
        updater(ta.state());
      }
    };
    t.attachFacet(facet);
  }
  private readonly notifiable:Notifiable={
    notify:notice=>{
      traceThing('> Notified with '+this.rootTargeter.title());
      this.rootTargeter.retarget(this.rootTargeter.target());
      this.rootTargeter.retargetFacets();
    }
  };
  titleTargeters=new Map<string,Targeter>();
  root:Targety;
  rootTargeter:Targeter;
  addContentTree(tree:Targety){
    this.root=tree;
  }
  buildApp(app: FacetsApp){
    let trees=app.getContentTrees();
    if(trees instanceof Array)
      throw new Error('Not implemented for '+(trees as Array<Targety>).length);
    else this.addContentTree((trees as Targety));
    if(!this.rootTargeter)this.rootTargeter=(this.root as TargetCore).newTargeter();
    this.rootTargeter.setNotifiable(this.notifiable);
    this.rootTargeter.retarget(this.root);
    this.addTitleTargeters(this.rootTargeter);
    app.buildLayout();
  }
  buildTargeterTree(targetTree:Targety):void{
    traceThing('> Initial retargeting on '+targetTree.title());
    this.rootTargeter=(targetTree as TargetCore).newTargeter();
    this.rootTargeter.setNotifiable(this.notifiable);
    this.rootTargeter.retarget(targetTree);
    this.addTitleTargeters(this.rootTargeter);
  }
  addTitleTargeters(t:Targeter){
    let title=t.title();
    const elements:Targeter[]=t.elements();
    this.titleTargeters.set(title,t);
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
  newTargetGroup(title:string,members:Target[]):Targety{
    return new TargetCore(title,members as Targety[]);
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
