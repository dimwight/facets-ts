"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Facets_1 = require("../Facets");
function trace(text) {
    console.info('App > ' + text);
}
var TITLE_FIRST = 'First', TITLE_SECOND = 'Second';
var core = Facets_1.newInstance(true);
function newTargetTree() {
    var text = 'Some text';
    trace('.newTargetTree: text=' + text);
    var coupler = {
        passText: text,
        targetStateUpdated: function (title) { return trace("coupler.stateUpdated: title=" + title); },
    };
    var first = core.newTextualTarget(TITLE_FIRST, coupler), second = core.newTextualTarget(TITLE_SECOND, coupler);
    return core.newTargetGroup('Textuals', first, second);
}
function buildLayout() {
    trace('.buildLayout');
    core.attachFacet(TITLE_FIRST, function (update) { return trace('Facet updating with ' + update); });
}
trace('Building surface');
core.buildTargeterTree(newTargetTree());
trace('Built targets, created targeters');
buildLayout();
trace('Attached and laid out facets');
trace('Surface built');
core.updateTargetState(TITLE_FIRST, 'Some updated text');
//# sourceMappingURL=main.js.map