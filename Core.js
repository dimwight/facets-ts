"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TargetCore = /** @class */ (function () {
    function TargetCore(title, members) {
        this.title = title;
        this.members = members;
    }
    TargetCore.prototype.newTargeter = function () {
        return new TargeterCore();
    };
    return TargetCore;
}());
exports.TargetCore = TargetCore;
var TargeterCore = /** @class */ (function () {
    function TargeterCore() {
    }
    return TargeterCore;
}());
exports.TargeterCore = TargeterCore;
//# sourceMappingURL=Core.js.map