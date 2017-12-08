import {
  Facets,
  TextualCoupler,
} from '../facets/export';
import {
  Target,
} from '../facets/core/export';
import {traceThing,swapArrayElement} from '../facets/util/export';
function trace(text){
  if(true)console.log('App > ' +text);
}
const TITLE_FIRST = 'First', TITLE_SECOND = 'Second';
const core: Facets = Facets.newInstance(true);

function newTargetTree():Target{
  const text='Some text';
  trace('.newTargetTree: text='+text);
  const coupler:TextualCoupler={
    passText:text,
    targetStateUpdated : (title) => trace('coupler.stateUpdated: title=' + title),
  };
  const first:Target=core.newTextualTarget(TITLE_FIRST,coupler),
    second:Target=core.newTextualTarget(TITLE_SECOND,coupler);
  return core.newTargetGroup('Textuals',first,second);
}
function buildLayout(){
  trace('.buildLayout');
  core.attachFacet(TITLE_FIRST,update=>trace('Facet updating with '+update));
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
  core.updateTargetState(TITLE_FIRST,'Some updated text');
}
main();


