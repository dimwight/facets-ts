"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _export_1 = require("./core/_export");
var _export_2 = require("./bits/_export");
var Facets = /** @class */ (function () {
    function Facets() {
        this.notifiable = {
            notify: function (notice) {
                throw new Error('Not implemented');
            }
        };
        this.titleTargeters = new Map();
    }
    Facets.newInstance = function (trace) {
        return new Facets();
    };
    Facets.prototype.buildTargeterTree = function (targetTree) {
        _export_2.trace(" > Initial retargeting on", targetTree.title);
        this.targeterTree = targetTree.newTargeter();
        _export_2.trace('.buildTargeterTree', this.targeterTree);
        this.targeterTree.setNotifiable(this.notifiable);
        this.targeterTree.retarget(targetTree);
        this.addTitleTargeters(this.targeterTree);
    };
    Facets.prototype.addTitleTargeters = function (t) {
        var _this = this;
        var title = t.title();
        this.titleTargeters.set(title, t);
        var elements = t.elements();
        _export_2.trace("> Added targeter: title=" + title + ": elements=", elements);
        elements.forEach(function (e) { return _this.addTitleTargeters(e); });
    };
    Facets.prototype.newTextualTarget = function (title, coupler) {
        return new _export_1.TargetCore(title);
    };
    Facets.prototype.newTargetGroup = function (title) {
        var members = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            members[_i - 1] = arguments[_i];
        }
        return new _export_1.TargetCore(title, members);
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