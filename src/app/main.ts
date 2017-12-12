import {
  Facets,
  Target,
  TextualCoupler,
  newInstance,
} from '../../index';
import {traceThing,swapArrayElement} from '../facets/util/export';
function trace(text){
  if(true)console.log('App > ' +text);
}
const Titles = {First:'First', Second: 'Second'};
const core = newInstance(true);
function newTargetTree():Target{
  const coupler:TextualCoupler={
    passText:'Some text for '+Titles.First,
    getText:(title)=>'Got text for '+title,
    targetStateUpdated : (title,update) =>
     trace(title+' updated with update='+update),
  };
  let first:Target=core.newTextualTarget(Titles.First,coupler);
  if(true)coupler.passText=null;
  if(false)coupler.getText=null;
  let second:Target=core.newTextualTarget(Titles.Second,coupler);
  return core.newTargetGroup('Textuals',[first,second]);
}
function buildLayout() {
  let updater=(update)=>trace('Facet updated with '+update);
  trace('Building layout...');
  core.attachFacet(Titles.First,updater);
  core.attachFacet(Titles.Second,updater);
}
function main(){
  if(false){
    swapArrayElement([0,1,2],'1',false);
    return;
  }
  core.buildTargeterTree(newTargetTree());
  trace('Built targets, created targeters');
  buildLayout();
  trace('Attached and laid out facets');
  trace('Surface built');
  core.updateTargetState(Titles.First,'Some updated text');
}
main();


