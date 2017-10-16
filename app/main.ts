import {
  Facets,
  TextualCoupler,
} from '../facets/_export'
import {
  Target
} from '../facets/core/_export'
import {traceThing,swapArrayElement} from '../facets/bits/_export';
function trace(text){
  if(false)console.info('App > ' +text);
}
const TITLE_FIRST = 'First', TITLE_SECOND = 'Second';
const core : Facets = Facets.newInstance(true);

function newTargetTree():Target{
  const text='Some text';
  trace('.newTargetTree: text='+text);
  const coupler:TextualCoupler={
    passText:text,
    targetStateUpdated : (title) => trace("coupler.stateUpdated: title=" + title),
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
  swapArrayElement([0,1],1,false);
  if(true)return;
  trace('Building surface');
  core.buildTargeterTree(newTargetTree());
  trace('Built targets, created targeters');
  buildLayout();
  trace('Attached and laid out facets');
  trace('Surface built');
  core.updateTargetState(TITLE_FIRST,'Some updated text');  
}
main()


