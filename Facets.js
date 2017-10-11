"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function newInstance(trace) {
    return new Facets();
}
exports.newInstance = newInstance;
var Facets = /** @class */ (function () {
    function Facets() {
    }
    Facets.prototype.newTextualTarget = function (title, coupler) {
        throw new Error('Not implemented for ' + title);
    };
    Facets.prototype.newTargetGroup = function (title) {
        var members = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            members[_i - 1] = arguments[_i];
        }
        throw new Error('Not implemented for ' + title);
    };
    Facets.prototype.buildTargeterTree = function (targetTree) {
        throw new Error('Not implemented');
    };
    Facets.prototype.attachFacet = function (title, facetUpdated) {
        throw new Error('Not implemented');
    };
    Facets.prototype.updateTargetState = function (title, update) {
        throw new Error('Not implemented');
    };
    Facets.prototype.getTargetState = function (title) {
        throw new Error('Not implemented');
    };
    return Facets;
}());
exports.Facets = Facets;
//# sourceMappingURL=Facets.js.map