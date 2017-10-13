"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Targeter_1 = require("./Targeter");
function trace(msg, thing) {
    console.info('Facets' + msg, JSON.stringify(thing, null, 1));
}
exports.trace = trace;
var TargetCore = /** @class */ (function () {
    function TargetCore(title, members) {
        this.title = title;
        this.members = members;
        this.elements = function () {
            return [];
        };
    }
    TargetCore.prototype.newTargeter = function () {
        return new Targeter_1.TargeterCore();
    };
    return TargetCore;
}());
exports.TargetCore = TargetCore;
//# sourceMappingURL=Core.js.map