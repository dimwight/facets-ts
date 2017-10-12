"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function trace(msg, thing) {
    console.info('Facets' + msg, JSON.stringify(thing, null, 1));
}
exports.trace = trace;
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
        var _this = this;
        this.title_ = 'Untargeted';
        this.title = function () { return _this.target ? _this.target_.title : _this.title_; };
        this.target = function () {
            if (!_this.target)
                throw new Error(_this.title_);
            else
                return _this.target_;
        };
    }
    TargeterCore.prototype.setNotifiable = function (Notifiable) {
    };
    TargeterCore.prototype.retarget = function (target) {
        this.target_ = target;
    };
    return TargeterCore;
}());
exports.TargeterCore = TargeterCore;
//# sourceMappingURL=Core.js.map