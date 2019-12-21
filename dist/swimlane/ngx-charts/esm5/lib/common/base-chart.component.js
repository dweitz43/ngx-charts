import { __decorate, __values } from "tslib";
import { ElementRef, NgZone, ChangeDetectorRef, Component, Input, Output, EventEmitter, AfterViewInit, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { fromEvent as observableFromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { VisibilityObserver } from '../utils';
var BaseChartComponent = /** @class */ (function () {
    function BaseChartComponent(chartElement, zone, cd) {
        this.chartElement = chartElement;
        this.zone = zone;
        this.cd = cd;
        this.scheme = 'cool';
        this.schemeType = 'ordinal';
        this.animations = true;
        this.select = new EventEmitter();
    }
    BaseChartComponent.prototype.ngAfterViewInit = function () {
        this.bindWindowResizeEvent();
        // listen for visibility of the element for hidden by default scenario
        this.visibilityObserver = new VisibilityObserver(this.chartElement, this.zone);
        this.visibilityObserver.visible.subscribe(this.update.bind(this));
    };
    BaseChartComponent.prototype.ngOnDestroy = function () {
        this.unbindEvents();
        if (this.visibilityObserver) {
            this.visibilityObserver.visible.unsubscribe();
            this.visibilityObserver.destroy();
        }
    };
    BaseChartComponent.prototype.ngOnChanges = function (changes) {
        this.update();
    };
    BaseChartComponent.prototype.update = function () {
        if (this.results) {
            this.results = this.cloneData(this.results);
        }
        else {
            this.results = [];
        }
        if (this.view) {
            this.width = this.view[0];
            this.height = this.view[1];
        }
        else {
            var dims = this.getContainerDims();
            if (dims) {
                this.width = dims.width;
                this.height = dims.height;
            }
        }
        // default values if width or height are 0 or undefined
        if (!this.width) {
            this.width = 600;
        }
        if (!this.height) {
            this.height = 400;
        }
        this.width = Math.floor(this.width);
        this.height = Math.floor(this.height);
        if (this.cd) {
            this.cd.markForCheck();
        }
    };
    BaseChartComponent.prototype.getContainerDims = function () {
        var width;
        var height;
        var hostElem = this.chartElement.nativeElement;
        if (hostElem.parentNode !== null) {
            // Get the container dimensions
            var dims = hostElem.parentNode.getBoundingClientRect();
            width = dims.width;
            height = dims.height;
        }
        if (width && height) {
            return { width: width, height: height };
        }
        return null;
    };
    /**
     * Converts all date objects that appear as name
     * into formatted date strings
     */
    BaseChartComponent.prototype.formatDates = function () {
        for (var i = 0; i < this.results.length; i++) {
            var g = this.results[i];
            g.label = g.name;
            if (g.label instanceof Date) {
                g.label = g.label.toLocaleDateString();
            }
            if (g.series) {
                for (var j = 0; j < g.series.length; j++) {
                    var d = g.series[j];
                    d.label = d.name;
                    if (d.label instanceof Date) {
                        d.label = d.label.toLocaleDateString();
                    }
                }
            }
        }
    };
    BaseChartComponent.prototype.unbindEvents = function () {
        if (this.resizeSubscription) {
            this.resizeSubscription.unsubscribe();
        }
    };
    BaseChartComponent.prototype.bindWindowResizeEvent = function () {
        var _this = this;
        var source = observableFromEvent(window, 'resize');
        var subscription = source.pipe(debounceTime(200)).subscribe(function (e) {
            _this.update();
            if (_this.cd) {
                _this.cd.markForCheck();
            }
        });
        this.resizeSubscription = subscription;
    };
    /**
     * Clones the data into a new object
     *
     * @memberOf BaseChart
     */
    BaseChartComponent.prototype.cloneData = function (data) {
        var e_1, _a, e_2, _b;
        var results = [];
        try {
            for (var data_1 = __values(data), data_1_1 = data_1.next(); !data_1_1.done; data_1_1 = data_1.next()) {
                var item = data_1_1.value;
                var copy = {
                    name: item['name']
                };
                if (item['value'] !== undefined) {
                    copy['value'] = item['value'];
                }
                if (item['series'] !== undefined) {
                    copy['series'] = [];
                    try {
                        for (var _c = (e_2 = void 0, __values(item['series'])), _d = _c.next(); !_d.done; _d = _c.next()) {
                            var seriesItem = _d.value;
                            var seriesItemCopy = Object.assign({}, seriesItem);
                            copy['series'].push(seriesItemCopy);
                        }
                    }
                    catch (e_2_1) { e_2 = { error: e_2_1 }; }
                    finally {
                        try {
                            if (_d && !_d.done && (_b = _c.return)) _b.call(_c);
                        }
                        finally { if (e_2) throw e_2.error; }
                    }
                }
                if (item['extra'] !== undefined) {
                    copy['extra'] = JSON.parse(JSON.stringify(item['extra']));
                }
                results.push(copy);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (data_1_1 && !data_1_1.done && (_a = data_1.return)) _a.call(data_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return results;
    };
    BaseChartComponent.ctorParameters = function () { return [
        { type: ElementRef },
        { type: NgZone },
        { type: ChangeDetectorRef }
    ]; };
    __decorate([
        Input()
    ], BaseChartComponent.prototype, "results", void 0);
    __decorate([
        Input()
    ], BaseChartComponent.prototype, "view", void 0);
    __decorate([
        Input()
    ], BaseChartComponent.prototype, "scheme", void 0);
    __decorate([
        Input()
    ], BaseChartComponent.prototype, "schemeType", void 0);
    __decorate([
        Input()
    ], BaseChartComponent.prototype, "customColors", void 0);
    __decorate([
        Input()
    ], BaseChartComponent.prototype, "animations", void 0);
    __decorate([
        Output()
    ], BaseChartComponent.prototype, "select", void 0);
    BaseChartComponent = __decorate([
        Component({
            selector: 'base-chart',
            template: "\n    <div></div>\n  "
        })
    ], BaseChartComponent);
    return BaseChartComponent;
}());
export { BaseChartComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS1jaGFydC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Ac3dpbWxhbmUvbmd4LWNoYXJ0cy8iLCJzb3VyY2VzIjpbImxpYi9jb21tb24vYmFzZS1jaGFydC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFDTCxVQUFVLEVBQ1YsTUFBTSxFQUNOLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsS0FBSyxFQUNMLE1BQU0sRUFDTixZQUFZLEVBQ1osYUFBYSxFQUNiLFNBQVMsRUFDVCxTQUFTLEVBQ1QsYUFBYSxFQUNkLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxTQUFTLElBQUksbUJBQW1CLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDeEQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRTlDLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLFVBQVUsQ0FBQztBQVE5QztJQWVFLDRCQUFzQixZQUF3QixFQUFZLElBQVksRUFBWSxFQUFxQjtRQUFqRixpQkFBWSxHQUFaLFlBQVksQ0FBWTtRQUFZLFNBQUksR0FBSixJQUFJLENBQVE7UUFBWSxPQUFFLEdBQUYsRUFBRSxDQUFtQjtRQVo5RixXQUFNLEdBQVEsTUFBTSxDQUFDO1FBQ3JCLGVBQVUsR0FBVyxTQUFTLENBQUM7UUFFL0IsZUFBVSxHQUFZLElBQUksQ0FBQztRQUUxQixXQUFNLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztJQU9vRSxDQUFDO0lBRTNHLDRDQUFlLEdBQWY7UUFDRSxJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQztRQUU3QixzRUFBc0U7UUFDdEUsSUFBSSxDQUFDLGtCQUFrQixHQUFHLElBQUksa0JBQWtCLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDL0UsSUFBSSxDQUFDLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFD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QU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDcEI7Ozs7Ozs7OztRQUVELE9BQU8sT0FBTyxDQUFDO0lBQ2pCLENBQUM7O2dCQXRKbUMsVUFBVTtnQkFBa0IsTUFBTTtnQkFBZ0IsaUJBQWlCOztJQWQ5RjtRQUFSLEtBQUssRUFBRTt1REFBYztJQUNiO1FBQVIsS0FBSyxFQUFFO29EQUF3QjtJQUN2QjtRQUFSLEtBQUssRUFBRTtzREFBc0I7SUFDckI7UUFBUixLQUFLLEVBQUU7MERBQWdDO0lBQy9CO1FBQVIsS0FBSyxFQUFFOzREQUFtQjtJQUNsQjtRQUFSLEtBQUssRUFBRTswREFBNEI7SUFFMUI7UUFBVCxNQUFNLEVBQUU7c0RBQTZCO0lBUjNCLGtCQUFrQjtRQU45QixTQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsWUFBWTtZQUN0QixRQUFRLEVBQUUsdUJBRVQ7U0FDRixDQUFDO09BQ1csa0JBQWtCLENBc0s5QjtJQUFELHlCQUFDO0NBQUEsQUF0S0QsSUFzS0M7U0F0S1ksa0JBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgRWxlbWVudFJlZixcbiAgTmdab25lLFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBJbnB1dCxcbiAgT3V0cHV0LFxuICBFdmVudEVtaXR0ZXIsXG4gIEFmdGVyVmlld0luaXQsXG4gIE9uRGVzdHJveSxcbiAgT25DaGFuZ2VzLFxuICBTaW1wbGVDaGFuZ2VzXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBmcm9tRXZlbnQgYXMgb2JzZXJ2YWJsZUZyb21FdmVudCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZGVib3VuY2VUaW1lIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBWaXNpYmlsaXR5T2JzZXJ2ZXIgfSBmcm9tICcuLi91dGlscyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2Jhc2UtY2hhcnQnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXY+PC9kaXY+XG4gIGBcbn0pXG5leHBvcnQgY2xhc3MgQmFzZUNoYXJ0Q29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzLCBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kge1xuICBASW5wdXQoKSByZXN1bHRzOiBhbnk7XG4gIEBJbnB1dCgpIHZpZXc6IFtudW1iZXIsIG51bWJlcl07XG4gIEBJbnB1dCgpIHNjaGVtZTogYW55ID0gJ2Nvb2wnO1xuICBASW5wdXQoKSBzY2hlbWVUeXBlOiBzdHJpbmcgPSAnb3JkaW5hbCc7XG4gIEBJbnB1dCgpIGN1c3RvbUNvbG9yczogYW55O1xuICBASW5wdXQoKSBhbmltYXRpb25zOiBib29sZWFuID0gdHJ1ZTtcblxuICBAT3V0cHV0KCkgc2VsZWN0ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIHdpZHRoOiBudW1iZXI7XG4gIGhlaWdodDogbnVtYmVyO1xuICByZXNpemVTdWJzY3JpcHRpb246IGFueTtcbiAgdmlzaWJpbGl0eU9ic2VydmVyOiBWaXNpYmlsaXR5T2JzZXJ2ZXI7XG5cbiAgY29uc3RydWN0b3IocHJvdGVjdGVkIGNoYXJ0RWxlbWVudDogRWxlbWVudFJlZiwgcHJvdGVjdGVkIHpvbmU6IE5nWm9uZSwgcHJvdGVjdGVkIGNkOiBDaGFuZ2VEZXRlY3RvclJlZikge31cblxuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgdGhpcy5iaW5kV2luZG93UmVzaXplRXZlbnQoKTtcblxuICAgIC8vIGxpc3RlbiBmb3IgdmlzaWJpbGl0eSBvZiB0aGUgZWxlbWVudCBmb3IgaGlkZGVuIGJ5IGRlZmF1bHQgc2NlbmFyaW9cbiAgICB0aGlzLnZpc2liaWxpdHlPYnNlcnZlciA9IG5ldyBWaXNpYmlsaXR5T2JzZXJ2ZXIodGhpcy5jaGFydEVsZW1lbnQsIHRoaXMuem9uZSk7XG4gICAgdGhpcy52aXNpYmlsaXR5T2JzZXJ2ZXIudmlzaWJsZS5zdWJzY3JpYmUodGhpcy51cGRhdGUuYmluZCh0aGlzKSk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLnVuYmluZEV2ZW50cygpO1xuICAgIGlmICh0aGlzLnZpc2liaWxpdHlPYnNlcnZlcikge1xuICAgICAgdGhpcy52aXNpYmlsaXR5T2JzZXJ2ZXIudmlzaWJsZS51bnN1YnNjcmliZSgpO1xuICAgICAgdGhpcy52aXNpYmlsaXR5T2JzZXJ2ZXIuZGVzdHJveSgpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICB0aGlzLnVwZGF0ZSgpO1xuICB9XG5cbiAgdXBkYXRlKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLnJlc3VsdHMpIHtcbiAgICAgIHRoaXMucmVzdWx0cyA9IHRoaXMuY2xvbmVEYXRhKHRoaXMucmVzdWx0cyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucmVzdWx0cyA9IFtdO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnZpZXcpIHtcbiAgICAgIHRoaXMud2lkdGggPSB0aGlzLnZpZXdbMF07XG4gICAgICB0aGlzLmhlaWdodCA9IHRoaXMudmlld1sxXTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgZGltcyA9IHRoaXMuZ2V0Q29udGFpbmVyRGltcygpO1xuICAgICAgaWYgKGRpbXMpIHtcbiAgICAgICAgdGhpcy53aWR0aCA9IGRpbXMud2lkdGg7XG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gZGltcy5oZWlnaHQ7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gZGVmYXVsdCB2YWx1ZXMgaWYgd2lkdGggb3IgaGVpZ2h0IGFyZSAwIG9yIHVuZGVmaW5lZFxuICAgIGlmICghdGhpcy53aWR0aCkge1xuICAgICAgdGhpcy53aWR0aCA9IDYwMDtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMuaGVpZ2h0KSB7XG4gICAgICB0aGlzLmhlaWdodCA9IDQwMDtcbiAgICB9XG5cbiAgICB0aGlzLndpZHRoID0gTWF0aC5mbG9vcih0aGlzLndpZHRoKTtcbiAgICB0aGlzLmhlaWdodCA9IE1hdGguZmxvb3IodGhpcy5oZWlnaHQpO1xuXG4gICAgaWYgKHRoaXMuY2QpIHtcbiAgICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuICB9XG5cbiAgZ2V0Q29udGFpbmVyRGltcygpOiBhbnkge1xuICAgIGxldCB3aWR0aDtcbiAgICBsZXQgaGVpZ2h0O1xuICAgIGNvbnN0IGhvc3RFbGVtID0gdGhpcy5jaGFydEVsZW1lbnQubmF0aXZlRWxlbWVudDtcblxuICAgIGlmIChob3N0RWxlbS5wYXJlbnROb2RlICE9PSBudWxsKSB7XG4gICAgICAvLyBHZXQgdGhlIGNvbnRhaW5lciBkaW1lbnNpb25zXG4gICAgICBjb25zdCBkaW1zID0gaG9zdEVsZW0ucGFyZW50Tm9kZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgIHdpZHRoID0gZGltcy53aWR0aDtcbiAgICAgIGhlaWdodCA9IGRpbXMuaGVpZ2h0O1xuICAgIH1cblxuICAgIGlmICh3aWR0aCAmJiBoZWlnaHQpIHtcbiAgICAgIHJldHVybiB7IHdpZHRoLCBoZWlnaHQgfTtcbiAgICB9XG5cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb252ZXJ0cyBhbGwgZGF0ZSBvYmplY3RzIHRoYXQgYXBwZWFyIGFzIG5hbWVcbiAgICogaW50byBmb3JtYXR0ZWQgZGF0ZSBzdHJpbmdzXG4gICAqL1xuICBmb3JtYXREYXRlcygpOiB2b2lkIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMucmVzdWx0cy5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgZyA9IHRoaXMucmVzdWx0c1tpXTtcbiAgICAgIGcubGFiZWwgPSBnLm5hbWU7XG4gICAgICBpZiAoZy5sYWJlbCBpbnN0YW5jZW9mIERhdGUpIHtcbiAgICAgICAgZy5sYWJlbCA9IGcubGFiZWwudG9Mb2NhbGVEYXRlU3RyaW5nKCk7XG4gICAgICB9XG5cbiAgICAgIGlmIChnLnNlcmllcykge1xuICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGcuc2VyaWVzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgY29uc3QgZCA9IGcuc2VyaWVzW2pdO1xuICAgICAgICAgIGQubGFiZWwgPSBkLm5hbWU7XG4gICAgICAgICAgaWYgKGQubGFiZWwgaW5zdGFuY2VvZiBEYXRlKSB7XG4gICAgICAgICAgICBkLmxhYmVsID0gZC5sYWJlbC50b0xvY2FsZURhdGVTdHJpbmcoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcm90ZWN0ZWQgdW5iaW5kRXZlbnRzKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLnJlc2l6ZVN1YnNjcmlwdGlvbikge1xuICAgICAgdGhpcy5yZXNpemVTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGJpbmRXaW5kb3dSZXNpemVFdmVudCgpOiB2b2lkIHtcbiAgICBjb25zdCBzb3VyY2UgPSBvYnNlcnZhYmxlRnJvbUV2ZW50KHdpbmRvdywgJ3Jlc2l6ZScpO1xuICAgIGNvbnN0IHN1YnNjcmlwdGlvbiA9IHNvdXJjZS5waXBlKGRlYm91bmNlVGltZSgyMDApKS5zdWJzY3JpYmUoZSA9PiB7XG4gICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgICAgaWYgKHRoaXMuY2QpIHtcbiAgICAgICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICB0aGlzLnJlc2l6ZVN1YnNjcmlwdGlvbiA9IHN1YnNjcmlwdGlvbjtcbiAgfVxuXG4gIC8qKlxuICAgKiBDbG9uZXMgdGhlIGRhdGEgaW50byBhIG5ldyBvYmplY3RcbiAgICpcbiAgICogQG1lbWJlck9mIEJhc2VDaGFydFxuICAgKi9cbiAgcHJpdmF0ZSBjbG9uZURhdGEoZGF0YSk6IGFueSB7XG4gICAgY29uc3QgcmVzdWx0cyA9IFtdO1xuXG4gICAgZm9yIChjb25zdCBpdGVtIG9mIGRhdGEpIHtcbiAgICAgIGNvbnN0IGNvcHkgPSB7XG4gICAgICAgIG5hbWU6IGl0ZW1bJ25hbWUnXVxuICAgICAgfTtcblxuICAgICAgaWYgKGl0ZW1bJ3ZhbHVlJ10gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBjb3B5Wyd2YWx1ZSddID0gaXRlbVsndmFsdWUnXTtcbiAgICAgIH1cblxuICAgICAgaWYgKGl0ZW1bJ3NlcmllcyddICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgY29weVsnc2VyaWVzJ10gPSBbXTtcbiAgICAgICAgZm9yIChjb25zdCBzZXJpZXNJdGVtIG9mIGl0ZW1bJ3NlcmllcyddKSB7XG4gICAgICAgICAgY29uc3Qgc2VyaWVzSXRlbUNvcHkgPSBPYmplY3QuYXNzaWduKHt9LCBzZXJpZXNJdGVtKTtcbiAgICAgICAgICBjb3B5WydzZXJpZXMnXS5wdXNoKHNlcmllc0l0ZW1Db3B5KTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoaXRlbVsnZXh0cmEnXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGNvcHlbJ2V4dHJhJ10gPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGl0ZW1bJ2V4dHJhJ10pKTtcbiAgICAgIH1cblxuICAgICAgcmVzdWx0cy5wdXNoKGNvcHkpO1xuICAgIH1cblxuICAgIHJldHVybiByZXN1bHRzO1xuICB9XG59XG4iXX0=