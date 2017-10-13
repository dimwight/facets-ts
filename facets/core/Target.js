"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var _export_1 = require("./_export");
var TargetCore = /** @class */ (function (_super) {
    __extends(TargetCore, _super);
    function TargetCore(title, members) {
        var _this = _super.call(this) || this;
        _this.title = title;
        _this.members = members;
        return _this;
    }
    TargetCore.prototype.notifiesTargeter = function () {
        return this.members !== null;
    };
    TargetCore.prototype.newTargeter = function () {
        return new _export_1.TargeterCore();
    };
    TargetCore.prototype.elements = function () {
        return [];
    };
    return TargetCore;
}(_export_1.NotifyingCore));
exports.TargetCore = TargetCore;
//# sourceMappingURL=Target.js.map