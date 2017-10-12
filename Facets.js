"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Core_1 = require("./Core");
function newInstance(trace) {
    return new Facets();
}
exports.newInstance = newInstance;
function trace(msg, thing) {
    console.info(msg);
}
var Facets = /** @class */ (function () {
    function Facets() {
    }
    Facets.prototype.newTextualTarget = function (title, coupler) {
        return new Core_1.TargetCore(title);
    };
    Facets.prototype.newTargetGroup = function (title) {
        var members = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            members[_i - 1] = arguments[_i];
        }
        return new Core_1.TargetCore(title, members);
    };
    Facets.prototype.buildTargeterTree = function (targetTree) {
        trace(" > Initial retargeting on ", targetTree);
        this.targeterTree = targetTree.newTargeter();
        targeterTree.setNotifiable(notifiable);
        targeterTree.retarget(targetTree);
        addTitleTargeters(targeterTree);
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