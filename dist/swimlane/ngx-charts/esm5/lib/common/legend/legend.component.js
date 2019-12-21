import { __decorate, __values } from "tslib";
import { Component, Input, ChangeDetectionStrategy, Output, EventEmitter, SimpleChanges, OnChanges, ChangeDetectorRef, ViewEncapsulation } from '@angular/core';
import { formatLabel } from '../label.helper';
var LegendComponent = /** @class */ (function () {
    function LegendComponent(cd) {
        this.cd = cd;
        this.horizontal = false;
        this.labelClick = new EventEmitter();
        this.labelActivate = new EventEmitter();
        this.labelDeactivate = new EventEmitter();
        this.legendEntries = [];
    }
    LegendComponent.prototype.ngOnChanges = function (changes) {
        this.update();
    };
    LegendComponent.prototype.update = function () {
        this.cd.markForCheck();
        this.legendEntries = this.getLegendEntries();
    };
    LegendComponent.prototype.getLegendEntries = function () {
        var e_1, _a;
        var items = [];
        var _loop_1 = function (label) {
            var formattedLabel = formatLabel(label);
            var idx = items.findIndex(function (i) {
                return i.label === formattedLabel;
            });
            if (idx === -1) {
                items.push({
                    label: label,
                    formattedLabel: formattedLabel,
                    color: this_1.colors.getColor(label)
                });
            }
        };
        var this_1 = this;
        try {
            for (var _b = __values(this.data), _c = _b.next(); !_c.done; _c = _b.next()) {
                var label = _c.value;
                _loop_1(label);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return items;
    };
    LegendComponent.prototype.isActive = function (entry) {
        if (!this.activeEntries)
            return false;
        var item = this.activeEntries.find(function (d) {
            return entry.label === d.name;
        });
        return item !== undefined;
    };
    LegendComponent.prototype.activate = function (item) {
        this.labelActivate.emit(item);
    };
    LegendComponent.prototype.deactivate = function (item) {
        this.labelDeactivate.emit(item);
    };
    LegendComponent.prototype.trackBy = function (index, item) {
        return item.label;
    };
    LegendComponent.ctorParameters = function () { return [
        { type: ChangeDetectorRef }
    ]; };
    __decorate([
        Input()
    ], LegendComponent.prototype, "data", void 0);
    __decorate([
        Input()
    ], LegendComponent.prototype, "title", void 0);
    __decorate([
        Input()
    ], LegendComponent.prototype, "colors", void 0);
    __decorate([
        Input()
    ], LegendComponent.prototype, "height", void 0);
    __decorate([
        Input()
    ], LegendComponent.prototype, "width", void 0);
    __decorate([
        Input()
    ], LegendComponent.prototype, "activeEntries", void 0);
    __decorate([
        Input()
    ], LegendComponent.prototype, "horizontal", void 0);
    __decorate([
        Input()
    ], LegendComponent.prototype, "averages", void 0);
    __decorate([
        Output()
    ], LegendComponent.prototype, "labelClick", void 0);
    __decorate([
        Output()
    ], LegendComponent.prototype, "labelActivate", void 0);
    __decorate([
        Output()
    ], LegendComponent.prototype, "labelDeactivate", void 0);
    LegendComponent = __decorate([
        Component({
            selector: 'ngx-charts-legend',
            template: "\n    <div [style.width.px]=\"width\">\n      <header class=\"legend-title\" *ngIf=\"title?.length > 0\">\n        <span class=\"legend-title-text\">{{ title }}</span>\n        <span class=\"legend-title-text avg\">Avg</span>\n      </header>\n      <div class=\"legend-wrap\">\n        <ul class=\"legend-labels\" [class.horizontal-legend]=\"horizontal\" [style.max-height.px]=\"height - 45\">\n          <li *ngFor=\"let entry of legendEntries; let i = index; trackBy: trackBy\" class=\"legend-label\">\n            <ngx-charts-legend-entry\n              [label]=\"entry.label\"\n              [formattedLabel]=\"entry.formattedLabel\"\n              [color]=\"entry.color\"\n              [average]=\"averages[i]\"\n              [isActive]=\"isActive(entry)\"\n              (select)=\"labelClick.emit($event)\"\n              (activate)=\"activate($event)\"\n              (deactivate)=\"deactivate($event)\"\n            >\n            </ngx-charts-legend-entry>\n          </li>\n        </ul>\n      </div>\n    </div>\n  ",
            encapsulation: ViewEncapsulation.None,
            changeDetection: ChangeDetectionStrategy.OnPush,
            styles: [".chart-legend{display:inline-block;padding:0;width:auto!important}.chart-legend .legend-title{white-space:nowrap;overflow:hidden;margin-left:10px;margin-bottom:5px;font-size:14px;font-weight:700}.chart-legend .legend-title .legend-title-text{padding-right:5px}.chart-legend .legend-title .legend-title-text.stat{width:65%}.chart-legend .legend-title .legend-title-text.avg{width:15%}.chart-legend li,.chart-legend ul{padding:0;margin:0;list-style:none}.chart-legend .horizontal-legend li{display:inline-block}.chart-legend .legend-wrap{width:calc(100% - 10px)}.chart-legend .legend-labels{line-height:85%;list-style:none;text-align:left;float:left;width:100%;border-radius:3px;overflow-y:auto;overflow-x:hidden;white-space:nowrap;background:rgba(0,0,0,.05)}.chart-legend .legend-label{cursor:pointer;font-size:90%;margin:8px;color:#afb7c8}.chart-legend .legend-label:hover{color:#000;-webkit-transition:.2s;transition:.2s}.chart-legend .legend-label .active .legend-label-text{color:#000}.chart-legend .legend-label-color{display:inline-block;height:15px;width:15px;margin-right:5px;color:#5b646b;border-radius:3px}.chart-legend .legend-label-text{display:inline-block;vertical-align:top;line-height:15px;font-size:12px;width:calc(100% - 20px);text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.chart-legend .legend-title-text{vertical-align:bottom;display:inline-block;line-height:16px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}"]
        })
    ], LegendComponent);
    return LegendComponent;
}());
export { LegendComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGVnZW5kLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bzd2ltbGFuZS9uZ3gtY2hhcnRzLyIsInNvdXJjZXMiOlsibGliL2NvbW1vbi9sZWdlbmQvbGVnZW5kLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBQ0wsdUJBQXVCLEVBQ3ZCLE1BQU0sRUFDTixZQUFZLEVBQ1osYUFBYSxFQUNiLFNBQVMsRUFDVCxpQkFBaUIsRUFDakIsaUJBQWlCLEVBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQWlDOUM7SUFnQkUseUJBQW9CLEVBQXFCO1FBQXJCLE9BQUUsR0FBRixFQUFFLENBQW1CO1FBVGhDLGVBQVUsR0FBRyxLQUFLLENBQUM7UUFHbEIsZUFBVSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ25ELGtCQUFhLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFDdEQsb0JBQWUsR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUVsRSxrQkFBYSxHQUFVLEVBQUUsQ0FBQztJQUVrQixDQUFDO0lBRTdDLHFDQUFXLEdBQVgsVUFBWSxPQUFzQjtRQUNoQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDaEIsQ0FBQztJQUVELGdDQUFNLEdBQU47UUFDRSxJQUFJLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7SUFDL0MsQ0FBQztJQUVELDBDQUFnQixHQUFoQjs7UUFDRSxJQUFNLEtBQUssR0FBRyxFQUFFLENBQUM7Z0NBRU4sS0FBSztZQUNkLElBQU0sY0FBYyxHQUFHLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUUxQyxJQUFNLEdBQUcsR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDLFVBQUEsQ0FBQztnQkFDM0IsT0FBTyxDQUFDLENBQUMsS0FBSyxLQUFLLGNBQWMsQ0FBQztZQUNwQyxDQUFDLENBQUMsQ0FBQztZQUVILElBQUksR0FBRyxLQUFLLENBQUMsQ0FBQyxFQUFFO2dCQUNkLEtBQUssQ0FBQyxJQUFJLENBQUM7b0JBQ1QsS0FBSyxPQUFBO29CQUNMLGNBQWMsZ0JBQUE7b0JBQ2QsS0FBSyxFQUFFLE9BQUssTUFBTSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUM7aUJBQ25DLENBQUMsQ0FBQzthQUNKOzs7O1lBYkgsS0FBb0IsSUFBQSxLQUFBLFNBQUEsSUFBSSxDQUFDLElBQUksQ0FBQSxnQkFBQTtnQkFBeEIsSUFBTSxLQUFLLFdBQUE7d0JBQUwsS0FBSzthQWNmOzs7Ozs7Ozs7UUFFRCxPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7SUFFRCxrQ0FBUSxHQUFSLFVBQVMsS0FBSztRQUNaLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYTtZQUFFLE9BQU8sS0FBSyxDQUFDO1FBQ3RDLElBQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFVBQUEsQ0FBQztZQUNwQyxPQUFPLEtBQUssQ0FBQyxLQUFLLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQztRQUNoQyxDQUFDLENBQUMsQ0FBQztRQUNILE9BQU8sSUFBSSxLQUFLLFNBQVMsQ0FBQztJQUM1QixDQUFDO0lBRUQsa0NBQVEsR0FBUixVQUFTLElBQUk7UUFDWCxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNoQyxDQUFDO0lBRUQsb0NBQVUsR0FBVixVQUFXLElBQUk7UUFDYixJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNsQyxDQUFDO0lBRUQsaUNBQU8sR0FBUCxVQUFRLEtBQUssRUFBRSxJQUFJO1FBQ2pCLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQztJQUNwQixDQUFDOztnQkFuRHVCLGlCQUFpQjs7SUFmaEM7UUFBUixLQUFLLEVBQUU7aURBQU07SUFDTDtRQUFSLEtBQUssRUFBRTtrREFBTztJQUNOO1FBQVIsS0FBSyxFQUFFO21EQUFRO0lBQ1A7UUFBUixLQUFLLEVBQUU7bURBQVE7SUFDUDtRQUFSLEtBQUssRUFBRTtrREFBTztJQUNOO1FBQVIsS0FBSyxFQUFFOzBEQUFlO0lBQ2Q7UUFBUixLQUFLLEVBQUU7dURBQW9CO0lBQ25CO1FBQVIsS0FBSyxFQUFFO3FEQUFpQjtJQUVmO1FBQVQsTUFBTSxFQUFFO3VEQUFvRDtJQUNuRDtRQUFULE1BQU0sRUFBRTswREFBdUQ7SUFDdEQ7UUFBVCxNQUFNLEVBQUU7NERBQXlEO0lBWnZELGVBQWU7UUEvQjNCLFNBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxtQkFBbUI7WUFDN0IsUUFBUSxFQUFFLHlnQ0F3QlQ7WUFFRCxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtZQUNyQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7U0FDaEQsQ0FBQztPQUNXLGVBQWUsQ0FvRTNCO0lBQUQsc0JBQUM7Q0FBQSxBQXBFRCxJQW9FQztTQXBFWSxlQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBJbnB1dCxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIE91dHB1dCxcbiAgRXZlbnRFbWl0dGVyLFxuICBTaW1wbGVDaGFuZ2VzLFxuICBPbkNoYW5nZXMsXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGZvcm1hdExhYmVsIH0gZnJvbSAnLi4vbGFiZWwuaGVscGVyJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbmd4LWNoYXJ0cy1sZWdlbmQnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgW3N0eWxlLndpZHRoLnB4XT1cIndpZHRoXCI+XG4gICAgICA8aGVhZGVyIGNsYXNzPVwibGVnZW5kLXRpdGxlXCIgKm5nSWY9XCJ0aXRsZT8ubGVuZ3RoID4gMFwiPlxuICAgICAgICA8c3BhbiBjbGFzcz1cImxlZ2VuZC10aXRsZS10ZXh0XCI+e3sgdGl0bGUgfX08L3NwYW4+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwibGVnZW5kLXRpdGxlLXRleHQgYXZnXCI+QXZnPC9zcGFuPlxuICAgICAgPC9oZWFkZXI+XG4gICAgICA8ZGl2IGNsYXNzPVwibGVnZW5kLXdyYXBcIj5cbiAgICAgICAgPHVsIGNsYXNzPVwibGVnZW5kLWxhYmVsc1wiIFtjbGFzcy5ob3Jpem9udGFsLWxlZ2VuZF09XCJob3Jpem9udGFsXCIgW3N0eWxlLm1heC1oZWlnaHQucHhdPVwiaGVpZ2h0IC0gNDVcIj5cbiAgICAgICAgICA8bGkgKm5nRm9yPVwibGV0IGVudHJ5IG9mIGxlZ2VuZEVudHJpZXM7IGxldCBpID0gaW5kZXg7IHRyYWNrQnk6IHRyYWNrQnlcIiBjbGFzcz1cImxlZ2VuZC1sYWJlbFwiPlxuICAgICAgICAgICAgPG5neC1jaGFydHMtbGVnZW5kLWVudHJ5XG4gICAgICAgICAgICAgIFtsYWJlbF09XCJlbnRyeS5sYWJlbFwiXG4gICAgICAgICAgICAgIFtmb3JtYXR0ZWRMYWJlbF09XCJlbnRyeS5mb3JtYXR0ZWRMYWJlbFwiXG4gICAgICAgICAgICAgIFtjb2xvcl09XCJlbnRyeS5jb2xvclwiXG4gICAgICAgICAgICAgIFthdmVyYWdlXT1cImF2ZXJhZ2VzW2ldXCJcbiAgICAgICAgICAgICAgW2lzQWN0aXZlXT1cImlzQWN0aXZlKGVudHJ5KVwiXG4gICAgICAgICAgICAgIChzZWxlY3QpPVwibGFiZWxDbGljay5lbWl0KCRldmVudClcIlxuICAgICAgICAgICAgICAoYWN0aXZhdGUpPVwiYWN0aXZhdGUoJGV2ZW50KVwiXG4gICAgICAgICAgICAgIChkZWFjdGl2YXRlKT1cImRlYWN0aXZhdGUoJGV2ZW50KVwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICA8L25neC1jaGFydHMtbGVnZW5kLWVudHJ5PlxuICAgICAgICAgIDwvbGk+XG4gICAgICAgIDwvdWw+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgYCxcbiAgc3R5bGVVcmxzOiBbJy4vbGVnZW5kLmNvbXBvbmVudC5zY3NzJ10sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIExlZ2VuZENvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XG4gIEBJbnB1dCgpIGRhdGE7XG4gIEBJbnB1dCgpIHRpdGxlO1xuICBASW5wdXQoKSBjb2xvcnM7XG4gIEBJbnB1dCgpIGhlaWdodDtcbiAgQElucHV0KCkgd2lkdGg7XG4gIEBJbnB1dCgpIGFjdGl2ZUVudHJpZXM7XG4gIEBJbnB1dCgpIGhvcml6b250YWwgPSBmYWxzZTtcbiAgQElucHV0KCkgYXZlcmFnZXM6IGFueVtdO1xuXG4gIEBPdXRwdXQoKSBsYWJlbENsaWNrOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIGxhYmVsQWN0aXZhdGU6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgbGFiZWxEZWFjdGl2YXRlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBsZWdlbmRFbnRyaWVzOiBhbnlbXSA9IFtdO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY2Q6IENoYW5nZURldGVjdG9yUmVmKSB7fVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICB0aGlzLnVwZGF0ZSgpO1xuICB9XG5cbiAgdXBkYXRlKCk6IHZvaWQge1xuICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XG4gICAgdGhpcy5sZWdlbmRFbnRyaWVzID0gdGhpcy5nZXRMZWdlbmRFbnRyaWVzKCk7XG4gIH1cblxuICBnZXRMZWdlbmRFbnRyaWVzKCk6IGFueVtdIHtcbiAgICBjb25zdCBpdGVtcyA9IFtdO1xuXG4gICAgZm9yIChjb25zdCBsYWJlbCBvZiB0aGlzLmRhdGEpIHtcbiAgICAgIGNvbnN0IGZvcm1hdHRlZExhYmVsID0gZm9ybWF0TGFiZWwobGFiZWwpO1xuXG4gICAgICBjb25zdCBpZHggPSBpdGVtcy5maW5kSW5kZXgoaSA9PiB7XG4gICAgICAgIHJldHVybiBpLmxhYmVsID09PSBmb3JtYXR0ZWRMYWJlbDtcbiAgICAgIH0pO1xuXG4gICAgICBpZiAoaWR4ID09PSAtMSkge1xuICAgICAgICBpdGVtcy5wdXNoKHtcbiAgICAgICAgICBsYWJlbCxcbiAgICAgICAgICBmb3JtYXR0ZWRMYWJlbCxcbiAgICAgICAgICBjb2xvcjogdGhpcy5jb2xvcnMuZ2V0Q29sb3IobGFiZWwpXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBpdGVtcztcbiAgfVxuXG4gIGlzQWN0aXZlKGVudHJ5KTogYm9vbGVhbiB7XG4gICAgaWYgKCF0aGlzLmFjdGl2ZUVudHJpZXMpIHJldHVybiBmYWxzZTtcbiAgICBjb25zdCBpdGVtID0gdGhpcy5hY3RpdmVFbnRyaWVzLmZpbmQoZCA9PiB7XG4gICAgICByZXR1cm4gZW50cnkubGFiZWwgPT09IGQubmFtZTtcbiAgICB9KTtcbiAgICByZXR1cm4gaXRlbSAhPT0gdW5kZWZpbmVkO1xuICB9XG5cbiAgYWN0aXZhdGUoaXRlbSkge1xuICAgIHRoaXMubGFiZWxBY3RpdmF0ZS5lbWl0KGl0ZW0pO1xuICB9XG5cbiAgZGVhY3RpdmF0ZShpdGVtKSB7XG4gICAgdGhpcy5sYWJlbERlYWN0aXZhdGUuZW1pdChpdGVtKTtcbiAgfVxuXG4gIHRyYWNrQnkoaW5kZXgsIGl0ZW0pOiBzdHJpbmcge1xuICAgIHJldHVybiBpdGVtLmxhYmVsO1xuICB9XG59XG4iXX0=