import {
  Facets,
  Target,
  TextualCoupler,
  newInstance,
} from '../facets/Facets';
import {traceThing,swapArrayElement} from '../facets/util/export';
import { SurfaceApp } from '../facets/SurfaceApp';
function trace(text){
  if(true)console.log('App > ' +text);
}
const Titles = {First:'First', Second: 'Second'};
class App extends SurfaceApp{
  constructor(){
    super(newInstance(true));
  }
  getContentTrees(): Target{
    const coupler:TextualCoupler={
      passText:'Some text for '+Titles.First,
      getText:(title)=>'Got text for '+title,
      targetStateUpdated : (title,update) =>
       trace(title+' updated with update='+update),
    };
    let first:Target=this.facets.newTextualTarget(Titles.First,coupler);
    if(true)coupler.passText=null;
    if(false)coupler.getText=null;
    let second:Target=this.facets.newTextualTarget(Titles.Second,coupler);
    return this.facets.newTargetGroup('Textuals',[first,second]);
  }
  buildLayout(): void {
    let updater=(update)=>trace('Facet updated with '+update);
    trace('Building layout...');
    this.facets.attachFacet(Titles.First,updater);
    this.facets.attachFacet(Titles.Second,updater);
    this.facets.updateTargetState(Titles.First,'Some updated text');
  }
  onRetargeted(){

  }
}
function main(){
  if(false)
    swapArrayElement([0,1,2],'1',false);
  else new App().buildSurface();
}
main();


