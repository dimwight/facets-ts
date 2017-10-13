"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _export_1 = require("./_export");
var TargetCore = /** @class */ (function () {
    function TargetCore(title, members) {
        this.title = title;
        this.members = members;
        this.elements = function () {
            return [];
        };
    }
    TargetCore.prototype.newTargeter = function () {
        return new _export_1.TargeterCore();
    };
    return TargetCore;
}());
exports.TargetCore = TargetCore;
//# sourceMappingURL=Target.js.map