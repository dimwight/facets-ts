import {Facets,TextualCoupler,newInstance} from '../Facets'
import {Target} from '../Core'
function trace(text){
  console.info('App > ' +text);
}
const TITLE_FIRST = 'First', TITLE_SECOND = 'Second';
const core : Facets = newInstance(true);

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
trace('Building surface');
core.buildTargeterTree(newTargetTree());
trace('Built targets, created targeters');
buildLayout();
trace('Attached and laid out facets');
trace('Surface built');
core.updateTargetState(TITLE_FIRST,'Some updated text');


