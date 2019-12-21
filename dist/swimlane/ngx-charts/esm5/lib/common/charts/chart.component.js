import { __decorate } from "tslib";
import { Component, Input, OnChanges, ViewContainerRef, ChangeDetectionStrategy, EventEmitter, Output, SimpleChanges } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { TooltipService } from '../tooltip';
var ChartComponent = /** @class */ (function () {
    function ChartComponent(vcr, tooltipService) {
        this.vcr = vcr;
        this.tooltipService = tooltipService;
        this.showLegend = false;
        this.animations = true;
        this.legendLabelClick = new EventEmitter();
        this.legendLabelActivate = new EventEmitter();
        this.legendLabelDeactivate = new EventEmitter();
        // this.tooltipService.injectionService.setRootViewContainer(this.vcr);
    }
    ChartComponent.prototype.ngOnChanges = function (changes) {
        this.update();
    };
    ChartComponent.prototype.update = function () {
        var legendColumns = 0;
        if (this.showLegend) {
            this.legendType = this.getLegendType();
            if (!this.legendOptions || this.legendOptions.position === 'right') {
                if (this.legendType === 'scaleLegend') {
                    legendColumns = 1;
                }
                else {
                    legendColumns = 2;
                }
            }
        }
        var chartColumns = 12 - legendColumns;
        this.chartWidth = Math.floor((this.view[0] * chartColumns) / 12.0);
        this.legendWidth =
            !this.legendOptions || this.legendOptions.position === 'right'
                ? Math.floor((this.view[0] * legendColumns) / 12.0)
                : this.chartWidth;
    };
    ChartComponent.prototype.getLegendType = function () {
        if (this.legendOptions.scaleType === 'linear') {
            return 'scaleLegend';
        }
        else {
            return 'legend';
        }
    };
    ChartComponent.ctorParameters = function () { return [
        { type: ViewContainerRef },
        { type: TooltipService }
    ]; };
    __decorate([
        Input()
    ], ChartComponent.prototype, "view", void 0);
    __decorate([
        Input()
    ], ChartComponent.prototype, "showLegend", void 0);
    __decorate([
        Input()
    ], ChartComponent.prototype, "legendOptions", void 0);
    __decorate([
        Input()
    ], ChartComponent.prototype, "data", void 0);
    __decorate([
        Input()
    ], ChartComponent.prototype, "legendData", void 0);
    __decorate([
        Input()
    ], ChartComponent.prototype, "legendType", void 0);
    __decorate([
        Input()
    ], ChartComponent.prototype, "colors", void 0);
    __decorate([
        Input()
    ], ChartComponent.prototype, "activeEntries", void 0);
    __decorate([
        Input()
    ], ChartComponent.prototype, "animations", void 0);
    __decorate([
        Output()
    ], ChartComponent.prototype, "legendLabelClick", void 0);
    __decorate([
        Output()
    ], ChartComponent.prototype, "legendLabelActivate", void 0);
    __decorate([
        Output()
    ], ChartComponent.prototype, "legendLabelDeactivate", void 0);
    ChartComponent = __decorate([
        Component({
            providers: [TooltipService],
            selector: 'ngx-charts-chart',
            template: "\n    <div class=\"ngx-charts-outer\" [style.width.px]=\"view[0]\" [@animationState]=\"'active'\" [@.disabled]=\"!animations\">\n      <svg class=\"ngx-charts\" [attr.width]=\"chartWidth\" [attr.height]=\"view[1]\">\n        <ng-content></ng-content>\n      </svg>\n      <ngx-charts-scale-legend\n        *ngIf=\"showLegend && legendType === 'scaleLegend'\"\n        class=\"chart-legend\"\n        [horizontal]=\"legendOptions && legendOptions.position === 'below'\"\n        [valueRange]=\"legendOptions.domain\"\n        [colors]=\"legendOptions.colors\"\n        [height]=\"view[1]\"\n        [width]=\"legendWidth\"\n      >\n      </ngx-charts-scale-legend>\n      <ngx-charts-legend\n        *ngIf=\"showLegend && legendType === 'legend'\"\n        class=\"chart-legend\"\n        [horizontal]=\"legendOptions && legendOptions.position === 'below'\"\n        [data]=\"legendOptions.domain\"\n        [title]=\"legendOptions.title\"\n        [colors]=\"legendOptions.colors\"\n        [averages]=\"legendOptions.averages\"\n        [height]=\"view[1]\"\n        [width]=\"legendWidth\"\n        [activeEntries]=\"activeEntries\"\n        (labelClick)=\"legendLabelClick.emit($event)\"\n        (labelActivate)=\"legendLabelActivate.emit($event)\"\n        (labelDeactivate)=\"legendLabelDeactivate.emit($event)\"\n      >\n      </ngx-charts-legend>\n    </div>\n  ",
            changeDetection: ChangeDetectionStrategy.OnPush,
            animations: [
                trigger('animationState', [
                    transition(':enter', [style({ opacity: 0 }), animate('500ms 100ms', style({ opacity: 1 }))])
                ])
            ]
        })
    ], ChartComponent);
    return ChartComponent;
}());
export { ChartComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhcnQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHN3aW1sYW5lL25neC1jaGFydHMvIiwic291cmNlcyI6WyJsaWIvY29tbW9uL2NoYXJ0cy9jaGFydC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsS0FBSyxFQUNMLFNBQVMsRUFDVCxnQkFBZ0IsRUFDaEIsdUJBQXVCLEVBQ3ZCLFlBQVksRUFDWixNQUFNLEVBQ04sYUFBYSxFQUNkLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUMxRSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sWUFBWSxDQUFDO0FBNkM1QztJQXFCRSx3QkFBb0IsR0FBcUIsRUFBVSxjQUE4QjtRQUE3RCxRQUFHLEdBQUgsR0FBRyxDQUFrQjtRQUFVLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQW5CeEUsZUFBVSxHQUFHLEtBQUssQ0FBQztRQVNuQixlQUFVLEdBQVksSUFBSSxDQUFDO1FBRTFCLHFCQUFnQixHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ3pELHdCQUFtQixHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBQzVELDBCQUFxQixHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBT3RFLHVFQUF1RTtJQUN6RSxDQUFDO0lBRUQsb0NBQVcsR0FBWCxVQUFZLE9BQXNCO1FBQ2hDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUNoQixDQUFDO0lBRUQsK0JBQU0sR0FBTjtRQUNFLElBQUksYUFBYSxHQUFHLENBQUMsQ0FBQztRQUN0QixJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDbkIsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7WUFFdkMsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLEtBQUssT0FBTyxFQUFFO2dCQUNsRSxJQUFJLElBQUksQ0FBQyxVQUFVLEtBQUssYUFBYSxFQUFFO29CQUNyQyxhQUFhLEdBQUcsQ0FBQyxDQUFDO2lCQUNuQjtxQkFBTTtvQkFDTCxhQUFhLEdBQUcsQ0FBQyxDQUFDO2lCQUNuQjthQUNGO1NBQ0Y7UUFFRCxJQUFNLFlBQVksR0FBRyxFQUFFLEdBQUcsYUFBYSxDQUFDO1FBRXhDLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsWUFBWSxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUM7UUFDbkUsSUFBSSxDQUFDLFdBQVc7WUFDZCxDQUFDLElBQUksQ0FBQyxhQUFhLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLEtBQUssT0FBTztnQkFDNUQsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLGFBQWEsQ0FBQyxHQUFHLElBQUksQ0FBQztnQkFDbkQsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7SUFDeEIsQ0FBQztJQUVELHNDQUFhLEdBQWI7UUFDRSxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxLQUFLLFFBQVEsRUFBRTtZQUM3QyxPQUFPLGFBQWEsQ0FBQztTQUN0QjthQUFNO1lBQ0wsT0FBTyxRQUFRLENBQUM7U0FDakI7SUFDSCxDQUFDOztnQkFyQ3dCLGdCQUFnQjtnQkFBMEIsY0FBYzs7SUFwQnhFO1FBQVIsS0FBSyxFQUFFO2dEQUFNO0lBQ0w7UUFBUixLQUFLLEVBQUU7c0RBQW9CO0lBQ25CO1FBQVIsS0FBSyxFQUFFO3lEQUFvQjtJQUduQjtRQUFSLEtBQUssRUFBRTtnREFBTTtJQUNMO1FBQVIsS0FBSyxFQUFFO3NEQUFZO0lBQ1g7UUFBUixLQUFLLEVBQUU7c0RBQWlCO0lBQ2hCO1FBQVIsS0FBSyxFQUFFO2tEQUFhO0lBQ1o7UUFBUixLQUFLLEVBQUU7eURBQXNCO0lBQ3JCO1FBQVIsS0FBSyxFQUFFO3NEQUE0QjtJQUUxQjtRQUFULE1BQU0sRUFBRTs0REFBMEQ7SUFDekQ7UUFBVCxNQUFNLEVBQUU7K0RBQTZEO0lBQzVEO1FBQVQsTUFBTSxFQUFFO2lFQUErRDtJQWY3RCxjQUFjO1FBM0MxQixTQUFTLENBQUM7WUFDVCxTQUFTLEVBQUUsQ0FBQyxjQUFjLENBQUM7WUFDM0IsUUFBUSxFQUFFLGtCQUFrQjtZQUM1QixRQUFRLEVBQUUsODFDQWdDVDtZQUNELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO1lBQy9DLFVBQVUsRUFBRTtnQkFDVixPQUFPLENBQUMsZ0JBQWdCLEVBQUU7b0JBQ3hCLFVBQVUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxLQUFLLENBQUMsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxPQUFPLENBQUMsYUFBYSxFQUFFLEtBQUssQ0FBQyxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDN0YsQ0FBQzthQUNIO1NBQ0YsQ0FBQztPQUNXLGNBQWMsQ0EyRDFCO0lBQUQscUJBQUM7Q0FBQSxBQTNERCxJQTJEQztTQTNEWSxjQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBJbnB1dCxcbiAgT25DaGFuZ2VzLFxuICBWaWV3Q29udGFpbmVyUmVmLFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgRXZlbnRFbWl0dGVyLFxuICBPdXRwdXQsXG4gIFNpbXBsZUNoYW5nZXNcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyB0cmlnZ2VyLCBzdHlsZSwgYW5pbWF0ZSwgdHJhbnNpdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xuaW1wb3J0IHsgVG9vbHRpcFNlcnZpY2UgfSBmcm9tICcuLi90b29sdGlwJztcblxuQENvbXBvbmVudCh7XG4gIHByb3ZpZGVyczogW1Rvb2x0aXBTZXJ2aWNlXSxcbiAgc2VsZWN0b3I6ICduZ3gtY2hhcnRzLWNoYXJ0JyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2IGNsYXNzPVwibmd4LWNoYXJ0cy1vdXRlclwiIFtzdHlsZS53aWR0aC5weF09XCJ2aWV3WzBdXCIgW0BhbmltYXRpb25TdGF0ZV09XCInYWN0aXZlJ1wiIFtALmRpc2FibGVkXT1cIiFhbmltYXRpb25zXCI+XG4gICAgICA8c3ZnIGNsYXNzPVwibmd4LWNoYXJ0c1wiIFthdHRyLndpZHRoXT1cImNoYXJ0V2lkdGhcIiBbYXR0ci5oZWlnaHRdPVwidmlld1sxXVwiPlxuICAgICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgICA8L3N2Zz5cbiAgICAgIDxuZ3gtY2hhcnRzLXNjYWxlLWxlZ2VuZFxuICAgICAgICAqbmdJZj1cInNob3dMZWdlbmQgJiYgbGVnZW5kVHlwZSA9PT0gJ3NjYWxlTGVnZW5kJ1wiXG4gICAgICAgIGNsYXNzPVwiY2hhcnQtbGVnZW5kXCJcbiAgICAgICAgW2hvcml6b250YWxdPVwibGVnZW5kT3B0aW9ucyAmJiBsZWdlbmRPcHRpb25zLnBvc2l0aW9uID09PSAnYmVsb3cnXCJcbiAgICAgICAgW3ZhbHVlUmFuZ2VdPVwibGVnZW5kT3B0aW9ucy5kb21haW5cIlxuICAgICAgICBbY29sb3JzXT1cImxlZ2VuZE9wdGlvbnMuY29sb3JzXCJcbiAgICAgICAgW2hlaWdodF09XCJ2aWV3WzFdXCJcbiAgICAgICAgW3dpZHRoXT1cImxlZ2VuZFdpZHRoXCJcbiAgICAgID5cbiAgICAgIDwvbmd4LWNoYXJ0cy1zY2FsZS1sZWdlbmQ+XG4gICAgICA8bmd4LWNoYXJ0cy1sZWdlbmRcbiAgICAgICAgKm5nSWY9XCJzaG93TGVnZW5kICYmIGxlZ2VuZFR5cGUgPT09ICdsZWdlbmQnXCJcbiAgICAgICAgY2xhc3M9XCJjaGFydC1sZWdlbmRcIlxuICAgICAgICBbaG9yaXpvbnRhbF09XCJsZWdlbmRPcHRpb25zICYmIGxlZ2VuZE9wdGlvbnMucG9zaXRpb24gPT09ICdiZWxvdydcIlxuICAgICAgICBbZGF0YV09XCJsZWdlbmRPcHRpb25zLmRvbWFpblwiXG4gICAgICAgIFt0aXRsZV09XCJsZWdlbmRPcHRpb25zLnRpdGxlXCJcbiAgICAgICAgW2NvbG9yc109XCJsZWdlbmRPcHRpb25zLmNvbG9yc1wiXG4gICAgICAgIFthdmVyYWdlc109XCJsZWdlbmRPcHRpb25zLmF2ZXJhZ2VzXCJcbiAgICAgICAgW2hlaWdodF09XCJ2aWV3WzFdXCJcbiAgICAgICAgW3dpZHRoXT1cImxlZ2VuZFdpZHRoXCJcbiAgICAgICAgW2FjdGl2ZUVudHJpZXNdPVwiYWN0aXZlRW50cmllc1wiXG4gICAgICAgIChsYWJlbENsaWNrKT1cImxlZ2VuZExhYmVsQ2xpY2suZW1pdCgkZXZlbnQpXCJcbiAgICAgICAgKGxhYmVsQWN0aXZhdGUpPVwibGVnZW5kTGFiZWxBY3RpdmF0ZS5lbWl0KCRldmVudClcIlxuICAgICAgICAobGFiZWxEZWFjdGl2YXRlKT1cImxlZ2VuZExhYmVsRGVhY3RpdmF0ZS5lbWl0KCRldmVudClcIlxuICAgICAgPlxuICAgICAgPC9uZ3gtY2hhcnRzLWxlZ2VuZD5cbiAgICA8L2Rpdj5cbiAgYCxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGFuaW1hdGlvbnM6IFtcbiAgICB0cmlnZ2VyKCdhbmltYXRpb25TdGF0ZScsIFtcbiAgICAgIHRyYW5zaXRpb24oJzplbnRlcicsIFtzdHlsZSh7IG9wYWNpdHk6IDAgfSksIGFuaW1hdGUoJzUwMG1zIDEwMG1zJywgc3R5bGUoeyBvcGFjaXR5OiAxIH0pKV0pXG4gICAgXSlcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBDaGFydENvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XG4gIEBJbnB1dCgpIHZpZXc7XG4gIEBJbnB1dCgpIHNob3dMZWdlbmQgPSBmYWxzZTtcbiAgQElucHV0KCkgbGVnZW5kT3B0aW9uczogYW55O1xuXG4gIC8vIHJlbW92ZVxuICBASW5wdXQoKSBkYXRhO1xuICBASW5wdXQoKSBsZWdlbmREYXRhO1xuICBASW5wdXQoKSBsZWdlbmRUeXBlOiBhbnk7XG4gIEBJbnB1dCgpIGNvbG9yczogYW55O1xuICBASW5wdXQoKSBhY3RpdmVFbnRyaWVzOiBhbnlbXTtcbiAgQElucHV0KCkgYW5pbWF0aW9uczogYm9vbGVhbiA9IHRydWU7XG5cbiAgQE91dHB1dCgpIGxlZ2VuZExhYmVsQ2xpY2s6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgbGVnZW5kTGFiZWxBY3RpdmF0ZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBsZWdlbmRMYWJlbERlYWN0aXZhdGU6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIGNoYXJ0V2lkdGg6IGFueTtcbiAgdGl0bGU6IGFueTtcbiAgbGVnZW5kV2lkdGg6IGFueTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHZjcjogVmlld0NvbnRhaW5lclJlZiwgcHJpdmF0ZSB0b29sdGlwU2VydmljZTogVG9vbHRpcFNlcnZpY2UpIHtcbiAgICAvLyB0aGlzLnRvb2x0aXBTZXJ2aWNlLmluamVjdGlvblNlcnZpY2Uuc2V0Um9vdFZpZXdDb250YWluZXIodGhpcy52Y3IpO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuICAgIHRoaXMudXBkYXRlKCk7XG4gIH1cblxuICB1cGRhdGUoKTogdm9pZCB7XG4gICAgbGV0IGxlZ2VuZENvbHVtbnMgPSAwO1xuICAgIGlmICh0aGlzLnNob3dMZWdlbmQpIHtcbiAgICAgIHRoaXMubGVnZW5kVHlwZSA9IHRoaXMuZ2V0TGVnZW5kVHlwZSgpO1xuXG4gICAgICBpZiAoIXRoaXMubGVnZW5kT3B0aW9ucyB8fCB0aGlzLmxlZ2VuZE9wdGlvbnMucG9zaXRpb24gPT09ICdyaWdodCcpIHtcbiAgICAgICAgaWYgKHRoaXMubGVnZW5kVHlwZSA9PT0gJ3NjYWxlTGVnZW5kJykge1xuICAgICAgICAgIGxlZ2VuZENvbHVtbnMgPSAxO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGxlZ2VuZENvbHVtbnMgPSAyO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgY2hhcnRDb2x1bW5zID0gMTIgLSBsZWdlbmRDb2x1bW5zO1xuXG4gICAgdGhpcy5jaGFydFdpZHRoID0gTWF0aC5mbG9vcigodGhpcy52aWV3WzBdICogY2hhcnRDb2x1bW5zKSAvIDEyLjApO1xuICAgIHRoaXMubGVnZW5kV2lkdGggPVxuICAgICAgIXRoaXMubGVnZW5kT3B0aW9ucyB8fCB0aGlzLmxlZ2VuZE9wdGlvbnMucG9zaXRpb24gPT09ICdyaWdodCdcbiAgICAgICAgPyBNYXRoLmZsb29yKCh0aGlzLnZpZXdbMF0gKiBsZWdlbmRDb2x1bW5zKSAvIDEyLjApXG4gICAgICAgIDogdGhpcy5jaGFydFdpZHRoO1xuICB9XG5cbiAgZ2V0TGVnZW5kVHlwZSgpOiBzdHJpbmcge1xuICAgIGlmICh0aGlzLmxlZ2VuZE9wdGlvbnMuc2NhbGVUeXBlID09PSAnbGluZWFyJykge1xuICAgICAgcmV0dXJuICdzY2FsZUxlZ2VuZCc7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiAnbGVnZW5kJztcbiAgICB9XG4gIH1cbn1cbiJdfQ==