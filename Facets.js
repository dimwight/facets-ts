"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Core_1 = require("./Core");
function newInstance(trace) {
    return new Facets();
}
exports.newInstance = newInstance;
var Facets = /** @class */ (function () {
    function Facets() {
        this.notifiable = {
            notify: function (notice) {
                throw new Error('Not implemented');
            }
        };
        this.titleTargeters = new Map();
    }
    Facets.prototype.buildTargeterTree = function (targetTree) {
        Core_1.trace(" > Initial retargeting on", targetTree.title);
        this.targeterTree = targetTree.newTargeter();
        Core_1.trace('.buildTargeterTree', this.targeterTree);
        this.targeterTree.setNotifiable(this.notifiable);
        this.targeterTree.retarget(targetTree);
        this.addTitleTargeters(this.targeterTree);
    };
    Facets.prototype.addTitleTargeters = function (t) {
        var _this = this;
        var title = t.title();
        this.titleTargeters.set(title, t);
        var elements = t.elements();
        Core_1.trace("> Added targeter: title=" + title + ": elements=", elements);
        elements.forEach(function (e) { return _this.addTitleTargeters(e); });
    };
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