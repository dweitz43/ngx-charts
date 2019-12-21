import { __decorate } from "tslib";
import { Output, EventEmitter, NgZone, Directive } from '@angular/core';
/**
 * Visibility Observer
 */
var VisibilityObserver = /** @class */ (function () {
    function VisibilityObserver(element, zone) {
        this.element = element;
        this.zone = zone;
        this.visible = new EventEmitter();
        this.isVisible = false;
        this.runCheck();
    }
    VisibilityObserver.prototype.destroy = function () {
        clearTimeout(this.timeout);
    };
    VisibilityObserver.prototype.onVisibilityChange = function () {
        var _this = this;
        // trigger zone recalc for columns
        this.zone.run(function () {
            _this.isVisible = true;
            _this.visible.emit(true);
        });
    };
    VisibilityObserver.prototype.runCheck = function () {
        var _this = this;
        var check = function () {
            if (!_this.element) {
                return;
            }
            // https://davidwalsh.name/offsetheight-visibility
            var _a = _this.element.nativeElement, offsetHeight = _a.offsetHeight, offsetWidth = _a.offsetWidth;
            if (offsetHeight && offsetWidth) {
                clearTimeout(_this.timeout);
                _this.onVisibilityChange();
            }
            else {
                clearTimeout(_this.timeout);
                _this.zone.runOutsideAngular(function () {
                    _this.timeout = setTimeout(function () { return check(); }, 100);
                });
            }
        };
        this.zone.runOutsideAngular(function () {
            _this.timeout = setTimeout(function () { return check(); });
        });
    };
    VisibilityObserver.ctorParameters = function () { return [
        { type: undefined },
        { type: NgZone }
    ]; };
    __decorate([
        Output()
    ], VisibilityObserver.prototype, "visible", void 0);
    VisibilityObserver = __decorate([
        Directive()
    ], VisibilityObserver);
    return VisibilityObserver;
}());
export { VisibilityObserver };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlzaWJpbGl0eS1vYnNlcnZlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bzd2ltbGFuZS9uZ3gtY2hhcnRzLyIsInNvdXJjZXMiOlsibGliL3V0aWxzL3Zpc2liaWxpdHktb2JzZXJ2ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFeEU7O0dBRUc7QUFFSDtJQU1FLDRCQUFvQixPQUFZLEVBQVUsSUFBWTtRQUFsQyxZQUFPLEdBQVAsT0FBTyxDQUFLO1FBQVUsU0FBSSxHQUFKLElBQUksQ0FBUTtRQUw1QyxZQUFPLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFHMUQsY0FBUyxHQUFZLEtBQUssQ0FBQztRQUd6QixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDbEIsQ0FBQztJQUVELG9DQUFPLEdBQVA7UUFDRSxZQUFZLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzdCLENBQUM7SUFFRCwrQ0FBa0IsR0FBbEI7UUFBQSxpQkFNQztRQUxDLGtDQUFrQztRQUNsQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQztZQUNaLEtBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1lBQ3RCLEtBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzFCLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELHFDQUFRLEdBQVI7UUFBQSxpQkF1QkM7UUF0QkMsSUFBTSxLQUFLLEdBQUc7WUFDWixJQUFJLENBQUMsS0FBSSxDQUFDLE9BQU8sRUFBRTtnQkFDakIsT0FBTzthQUNSO1lBRUQsa0RBQWtEO1lBQzVDLElBQUEsZ0NBQTBELEVBQXhELDhCQUFZLEVBQUUsNEJBQTBDLENBQUM7WUFFakUsSUFBSSxZQUFZLElBQUksV0FBVyxFQUFFO2dCQUMvQixZQUFZLENBQUMsS0FBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUMzQixLQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQzthQUMzQjtpQkFBTTtnQkFDTCxZQUFZLENBQUMsS0FBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUMzQixLQUFJLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDO29CQUMxQixLQUFJLENBQUMsT0FBTyxHQUFHLFVBQVUsQ0FBQyxjQUFNLE9BQUEsS0FBSyxFQUFFLEVBQVAsQ0FBTyxFQUFFLEdBQUcsQ0FBQyxDQUFDO2dCQUNoRCxDQUFDLENBQUMsQ0FBQzthQUNKO1FBQ0gsQ0FBQyxDQUFDO1FBRUYsSUFBSSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztZQUMxQixLQUFJLENBQUMsT0FBTyxHQUFHLFVBQVUsQ0FBQyxjQUFNLE9BQUEsS0FBSyxFQUFFLEVBQVAsQ0FBTyxDQUFDLENBQUM7UUFDM0MsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDOzs7Z0JBdkMrQyxNQUFNOztJQUw1QztRQUFULE1BQU0sRUFBRTt1REFBaUQ7SUFEL0Msa0JBQWtCO1FBRDlCLFNBQVMsRUFBRTtPQUNDLGtCQUFrQixDQThDOUI7SUFBRCx5QkFBQztDQUFBLEFBOUNELElBOENDO1NBOUNZLGtCQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE91dHB1dCwgRXZlbnRFbWl0dGVyLCBOZ1pvbmUsIERpcmVjdGl2ZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG4vKipcbiAqIFZpc2liaWxpdHkgT2JzZXJ2ZXJcbiAqL1xuQERpcmVjdGl2ZSgpXG5leHBvcnQgY2xhc3MgVmlzaWJpbGl0eU9ic2VydmVyIHtcbiAgQE91dHB1dCgpIHZpc2libGU6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIHRpbWVvdXQ6IGFueTtcbiAgaXNWaXNpYmxlOiBib29sZWFuID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBlbGVtZW50OiBhbnksIHByaXZhdGUgem9uZTogTmdab25lKSB7XG4gICAgdGhpcy5ydW5DaGVjaygpO1xuICB9XG5cbiAgZGVzdHJveSgpOiB2b2lkIHtcbiAgICBjbGVhclRpbWVvdXQodGhpcy50aW1lb3V0KTtcbiAgfVxuXG4gIG9uVmlzaWJpbGl0eUNoYW5nZSgpOiB2b2lkIHtcbiAgICAvLyB0cmlnZ2VyIHpvbmUgcmVjYWxjIGZvciBjb2x1bW5zXG4gICAgdGhpcy56b25lLnJ1bigoKSA9PiB7XG4gICAgICB0aGlzLmlzVmlzaWJsZSA9IHRydWU7XG4gICAgICB0aGlzLnZpc2libGUuZW1pdCh0cnVlKTtcbiAgICB9KTtcbiAgfVxuXG4gIHJ1bkNoZWNrKCk6IHZvaWQge1xuICAgIGNvbnN0IGNoZWNrID0gKCkgPT4ge1xuICAgICAgaWYgKCF0aGlzLmVsZW1lbnQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBodHRwczovL2Rhdmlkd2Fsc2gubmFtZS9vZmZzZXRoZWlnaHQtdmlzaWJpbGl0eVxuICAgICAgY29uc3QgeyBvZmZzZXRIZWlnaHQsIG9mZnNldFdpZHRoIH0gPSB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudDtcblxuICAgICAgaWYgKG9mZnNldEhlaWdodCAmJiBvZmZzZXRXaWR0aCkge1xuICAgICAgICBjbGVhclRpbWVvdXQodGhpcy50aW1lb3V0KTtcbiAgICAgICAgdGhpcy5vblZpc2liaWxpdHlDaGFuZ2UoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aGlzLnRpbWVvdXQpO1xuICAgICAgICB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgICAgIHRoaXMudGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4gY2hlY2soKSwgMTAwKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICB0aGlzLnRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IGNoZWNrKCkpO1xuICAgIH0pO1xuICB9XG59XG4iXX0=