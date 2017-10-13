"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
        this.elements = function () {
            return _this.elements_;
        };
    }
    TargeterCore.prototype.notify = function (notice) {
        throw new Error('Not implemented in TargeterCore');
    };
    TargeterCore.prototype.setNotifiable = function (Notifiable) {
    };
    TargeterCore.prototype.retarget = function (target) {
        var _this = this;
        if (!target)
            throw new Error('Missing target');
        this.target_ = target;
        var targets = target.elements();
        if (!this.elements_)
            this.elements_ = targets.map(function (target) {
                var element = target.newTargeter();
                element.setNotifiable(_this);
                return element;
            });
        if (targets.length === this.elements_.length)
            this.elements_.forEach(function (e, at) { return e.retarget(targets[at]); });
        if (target.notifiesTargeter())
            target.setNotifiable(this);
    };
    return TargeterCore;
}());
exports.TargeterCore = TargeterCore;
//# sourceMappingURL=Targeter.js.map