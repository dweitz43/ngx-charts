import { __decorate } from "tslib";
import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { formatLabel, escapeLabel } from '../common/label.helper';
import { id } from '../utils/id';
var CircleSeriesComponent = /** @class */ (function () {
    function CircleSeriesComponent() {
        this.type = 'standard';
        this.tooltipDisabled = false;
        this.select = new EventEmitter();
        this.activate = new EventEmitter();
        this.deactivate = new EventEmitter();
        this.barVisible = false;
    }
    CircleSeriesComponent.prototype.ngOnInit = function () {
        this.gradientId = 'grad' + id().toString();
        this.gradientFill = "url(#" + this.gradientId + ")";
    };
    CircleSeriesComponent.prototype.ngOnChanges = function (changes) {
        this.update();
    };
    CircleSeriesComponent.prototype.update = function () {
        this.circles = this.getCircles();
        this.circle = this.circles.find(function (c) {
            return c.opacity !== 0;
        });
        // this.circle = this.getActiveCircle();
    };
    CircleSeriesComponent.prototype.getActiveCircle = function () {
        var _this = this;
        var indexActiveDataPoint = this.data.series.findIndex(function (d) {
            var label = d.name;
            return label && _this.visibleValue && label.toString() === _this.visibleValue.toString() && d.value !== undefined;
        });
    };
    CircleSeriesComponent.prototype.getCircles = function () {
        var _this = this;
        var seriesName = this.data.name;
        return this.data.series.map(function (d, i) {
            var value = d.value;
            var label = d.name;
            var game = d.game;
            var tooltipLabel = formatLabel(label);
            var cx;
            if (_this.scaleType === 'time') {
                cx = _this.xScale(label);
            }
            else if (_this.scaleType === 'linear') {
                cx = _this.xScale(Number(label));
            }
            else {
                cx = _this.xScale(label);
            }
            var cy = _this.yScale(_this.type === 'standard' ? value : d.d1);
            var radius = 5;
            var height = _this.yScale.range()[0] - cy;
            var opacity = 0;
            if (label && _this.visibleValue && label.toString() === _this.visibleValue.toString()) {
                opacity = 1;
            }
            var color;
            if (_this.colors.scaleType === 'linear') {
                if (_this.type === 'standard') {
                    color = _this.colors.getColor(value);
                }
                else {
                    color = _this.colors.getColor(d.d1);
                }
            }
            else {
                color = _this.colors.getColor(seriesName);
            }
            var data = Object.assign({}, d, {
                series: seriesName,
                value: value,
                name: label,
                game: game
            });
            return {
                classNames: ["circle-data-" + i],
                value: value,
                label: label,
                data: data,
                cx: cx,
                cy: cy,
                radius: radius,
                height: height,
                tooltipLabel: tooltipLabel,
                color: color,
                opacity: opacity,
                seriesName: seriesName,
                gradientStops: _this.getGradientStops(color),
                min: d.min,
                max: d.max
            };
        }).filter(function (circle) { return circle !== undefined; });
    };
    CircleSeriesComponent.prototype.getTooltipText = function (_a) {
        var tooltipLabel = _a.tooltipLabel, value = _a.value, seriesName = _a.seriesName, min = _a.min, max = _a.max;
        return "\n      <span class=\"tooltip-label\">" + escapeLabel(seriesName) + " \u2022 " + escapeLabel(tooltipLabel) + "</span>\n      <span class=\"tooltip-val\">" + value.toLocaleString() + this.getTooltipMinMaxText(min, max) + "</span>\n    ";
    };
    CircleSeriesComponent.prototype.getTooltipMinMaxText = function (min, max) {
        if (min !== undefined || max !== undefined) {
            var result = ' (';
            if (min !== undefined) {
                if (max === undefined) {
                    result += '≥';
                }
                result += min.toLocaleString();
                if (max !== undefined) {
                    result += ' - ';
                }
            }
            else if (max !== undefined) {
                result += '≤';
            }
            if (max !== undefined) {
                result += max.toLocaleString();
            }
            result += ')';
            return result;
        }
        else {
            return '';
        }
    };
    CircleSeriesComponent.prototype.getGradientStops = function (color) {
        return [
            {
                offset: 0,
                color: color,
                opacity: 0.2
            },
            {
                offset: 100,
                color: color,
                opacity: 1
            }
        ];
    };
    CircleSeriesComponent.prototype.onClick = function (data) {
        this.select.emit(data);
    };
    CircleSeriesComponent.prototype.isActive = function (entry) {
        if (!this.activeEntries)
            return false;
        var item = this.activeEntries.find(function (d) {
            return entry.name === d.name;
        });
        return item !== undefined;
    };
    CircleSeriesComponent.prototype.activateCircle = function () {
        this.barVisible = true;
        this.activate.emit({ name: this.data.name });
    };
    CircleSeriesComponent.prototype.deactivateCircle = function () {
        this.barVisible = false;
        this.circle.opacity = 0;
        this.deactivate.emit({ name: this.data.name });
    };
    __decorate([
        Input()
    ], CircleSeriesComponent.prototype, "data", void 0);
    __decorate([
        Input()
    ], CircleSeriesComponent.prototype, "type", void 0);
    __decorate([
        Input()
    ], CircleSeriesComponent.prototype, "xScale", void 0);
    __decorate([
        Input()
    ], CircleSeriesComponent.prototype, "yScale", void 0);
    __decorate([
        Input()
    ], CircleSeriesComponent.prototype, "colors", void 0);
    __decorate([
        Input()
    ], CircleSeriesComponent.prototype, "scaleType", void 0);
    __decorate([
        Input()
    ], CircleSeriesComponent.prototype, "visibleValue", void 0);
    __decorate([
        Input()
    ], CircleSeriesComponent.prototype, "activeEntries", void 0);
    __decorate([
        Input()
    ], CircleSeriesComponent.prototype, "tooltipDisabled", void 0);
    __decorate([
        Input()
    ], CircleSeriesComponent.prototype, "tooltipTemplate", void 0);
    __decorate([
        Output()
    ], CircleSeriesComponent.prototype, "select", void 0);
    __decorate([
        Output()
    ], CircleSeriesComponent.prototype, "activate", void 0);
    __decorate([
        Output()
    ], CircleSeriesComponent.prototype, "deactivate", void 0);
    CircleSeriesComponent = __decorate([
        Component({
            selector: 'g[ngx-charts-circle-series]',
            template: "\n    <svg:g *ngIf=\"circle\">\n      <defs>\n        <svg:g\n          ngx-charts-svg-linear-gradient\n          orientation=\"vertical\"\n          [name]=\"gradientId\"\n          [stops]=\"circle.gradientStops\"\n        />\n      </defs>\n      <svg:rect\n        *ngIf=\"barVisible && type === 'standard'\"\n        [@animationState]=\"'active'\"\n        [attr.x]=\"circle.cx - circle.radius\"\n        [attr.y]=\"circle.cy\"\n        [attr.width]=\"circle.radius * 2\"\n        [attr.height]=\"circle.height\"\n        [attr.fill]=\"gradientFill\"\n        class=\"tooltip-bar\"\n      />\n      <svg:g\n        ngx-charts-circle\n        class=\"circle\"\n        [cx]=\"circle.cx\"\n        [cy]=\"circle.cy\"\n        [r]=\"circle.radius\"\n        [fill]=\"circle.color\"\n        [class.active]=\"isActive({ name: circle.seriesName })\"\n        [pointerEvents]=\"'all'\"\n        [data]=\"circle.value\"\n        [classNames]=\"circle.classNames\"\n        (select)=\"onClick(circle.data)\"\n        (activate)=\"activateCircle()\"\n        (deactivate)=\"deactivateCircle()\"\n        ngx-tooltip\n        [tooltipDisabled]=\"tooltipDisabled\"\n        [tooltipPlacement]=\"'top'\"\n        [tooltipType]=\"'tooltip'\"\n        [tooltipTitle]=\"tooltipTemplate ? undefined : getTooltipText(circle)\"\n        [tooltipTemplate]=\"tooltipTemplate\"\n        [tooltipContext]=\"circle.data\"\n      />\n    </svg:g>\n  ",
            changeDetection: ChangeDetectionStrategy.OnPush,
            animations: [
                trigger('animationState', [
                    transition(':enter', [
                        style({
                            opacity: 0
                        }),
                        animate(250, style({ opacity: 1 }))
                    ])
                ])
            ]
        })
    ], CircleSeriesComponent);
    return CircleSeriesComponent;
}());
export { CircleSeriesComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2lyY2xlLXNlcmllcy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Ac3dpbWxhbmUvbmd4LWNoYXJ0cy8iLCJzb3VyY2VzIjpbImxpYi9jb21tb24vY2lyY2xlLXNlcmllcy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsS0FBSyxFQUNMLE1BQU0sRUFFTixZQUFZLEVBR1osdUJBQXVCLEVBRXhCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUMxRSxPQUFPLEVBQUUsV0FBVyxFQUFFLFdBQVcsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxFQUFFLEVBQUUsTUFBTSxhQUFhLENBQUM7QUE2RGpDO0lBQUE7UUFFVyxTQUFJLEdBQUcsVUFBVSxDQUFDO1FBT2xCLG9CQUFlLEdBQVksS0FBSyxDQUFDO1FBR2hDLFdBQU0sR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQzVCLGFBQVEsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQzlCLGVBQVUsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBSzFDLGVBQVUsR0FBWSxLQUFLLENBQUM7SUFpSzlCLENBQUM7SUE3SkMsd0NBQVEsR0FBUjtRQUNFLElBQUksQ0FBQyxVQUFVLEdBQUcsTUFBTSxHQUFHLEVBQUUsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQzNDLElBQUksQ0FBQyxZQUFZLEdBQUcsVUFBUSxJQUFJLENBQUMsVUFBVSxNQUFHLENBQUM7SUFDakQsQ0FBQztJQUVELDJDQUFXLEdBQVgsVUFBWSxPQUFzQjtRQUNoQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDaEIsQ0FBQztJQUVELHNDQUFNLEdBQU47UUFDRSxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUNqQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFVBQUEsQ0FBQztZQUMvQixPQUFPLENBQUMsQ0FBQyxPQUFPLEtBQUssQ0FBQyxDQUFDO1FBQ3pCLENBQUMsQ0FBQyxDQUFDO1FBQ0gsd0NBQXdDO0lBQzFDLENBQUM7SUFFRCwrQ0FBZSxHQUFmO1FBQUEsaUJBS0M7UUFKQyxJQUFNLG9CQUFvQixHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxVQUFBLENBQUM7WUFDdkQsSUFBTSxLQUFLLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQztZQUNyQixPQUFPLEtBQUssSUFBSSxLQUFJLENBQUMsWUFBWSxJQUFJLEtBQUssQ0FBQyxRQUFRLEVBQUUsS0FBSyxLQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQyxLQUFLLEtBQUssU0FBUyxDQUFDO1FBQ2xILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELDBDQUFVLEdBQVY7UUFBQSxpQkErREM7UUE5REMsSUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7UUFFbEMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsVUFBQyxDQUFDLEVBQUUsQ0FBQztZQUMvQixJQUFNLEtBQUssR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDO1lBQ3RCLElBQU0sS0FBSyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUM7WUFDckIsSUFBTSxJQUFJLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQztZQUNwQixJQUFNLFlBQVksR0FBRyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7WUFFeEMsSUFBSSxFQUFFLENBQUM7WUFDUCxJQUFJLEtBQUksQ0FBQyxTQUFTLEtBQUssTUFBTSxFQUFFO2dCQUM3QixFQUFFLEdBQUcsS0FBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUN6QjtpQkFBTSxJQUFJLEtBQUksQ0FBQyxTQUFTLEtBQUssUUFBUSxFQUFFO2dCQUN0QyxFQUFFLEdBQUcsS0FBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQzthQUNqQztpQkFBTTtnQkFDTCxFQUFFLEdBQUcsS0FBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUN6QjtZQUVELElBQU0sRUFBRSxHQUFHLEtBQUksQ0FBQyxNQUFNLENBQUMsS0FBSSxDQUFDLElBQUksS0FBSyxVQUFVLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ2hFLElBQU0sTUFBTSxHQUFHLENBQUMsQ0FBQztZQUNqQixJQUFNLE1BQU0sR0FBRyxLQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztZQUUzQyxJQUFJLE9BQU8sR0FBRyxDQUFDLENBQUM7WUFDaEIsSUFBSSxLQUFLLElBQUksS0FBSSxDQUFDLFlBQVksSUFBSSxLQUFLLENBQUMsUUFBUSxFQUFFLEtBQUssS0FBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsRUFBRTtnQkFDbkYsT0FBTyxHQUFHLENBQUMsQ0FBQzthQUNiO1lBRUQsSUFBSSxLQUFLLENBQUM7WUFDVixJQUFJLEtBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxLQUFLLFFBQVEsRUFBRTtnQkFDdEMsSUFBSSxLQUFJLENBQUMsSUFBSSxLQUFLLFVBQVUsRUFBRTtvQkFDNUIsS0FBSyxHQUFHLEtBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO2lCQUNyQztxQkFBTTtvQkFDTCxLQUFLLEdBQUcsS0FBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO2lCQUNwQzthQUNGO2lCQUFNO2dCQUNMLEtBQUssR0FBRyxLQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQzthQUMxQztZQUVILElBQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRTtnQkFDaEMsTUFBTSxFQUFFLFVBQVU7Z0JBQ2xCLEtBQUssT0FBQTtnQkFDTCxJQUFJLEVBQUUsS0FBSztnQkFDWCxJQUFJLE1BQUE7YUFDTCxDQUFDLENBQUM7WUFFRCxPQUFPO2dCQUNMLFVBQVUsRUFBRSxDQUFDLGlCQUFlLENBQUcsQ0FBQztnQkFDaEMsS0FBSyxPQUFBO2dCQUNMLEtBQUssT0FBQTtnQkFDTCxJQUFJLE1BQUE7Z0JBQ0osRUFBRSxJQUFBO2dCQUNGLEVBQUUsSUFBQTtnQkFDRixNQUFNLFFBQUE7Z0JBQ04sTUFBTSxRQUFBO2dCQUNOLFlBQVksY0FBQTtnQkFDWixLQUFLLE9BQUE7Z0JBQ0wsT0FBTyxTQUFBO2dCQUNQLFVBQVUsWUFBQTtnQkFDVixhQUFhLEVBQUUsS0FBSSxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQztnQkFDM0MsR0FBRyxFQUFFLENBQUMsQ0FBQyxHQUFHO2dCQUNWLEdBQUcsRUFBRSxDQUFDLENBQUMsR0FBRzthQUNYLENBQUM7UUFDSixDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBQyxNQUFNLElBQUssT0FBQSxNQUFNLEtBQUssU0FBUyxFQUFwQixDQUFvQixDQUFDLENBQUM7SUFDOUMsQ0FBQztJQUVELDhDQUFjLEdBQWQsVUFBZSxFQUE2QztZQUEzQyw4QkFBWSxFQUFFLGdCQUFLLEVBQUUsMEJBQVUsRUFBRSxZQUFHLEVBQUUsWUFBRztRQUN4RCxPQUFPLDJDQUN5QixXQUFXLENBQUMsVUFBVSxDQUFDLGdCQUFNLFdBQVcsQ0FBQyxZQUFZLENBQUMsbURBQ3hELEtBQUssQ0FBQyxjQUFjLEVBQUUsR0FBRyxJQUFJLENBQUMsb0JBQW9CLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxrQkFDekYsQ0FBQztJQUNKLENBQUM7SUFFRCxvREFBb0IsR0FBcEIsVUFBcUIsR0FBUSxFQUFFLEdBQVE7UUFDckMsSUFBSSxHQUFHLEtBQUssU0FBUyxJQUFJLEdBQUcsS0FBSyxTQUFTLEVBQUU7WUFDMUMsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDO1lBQ2xCLElBQUksR0FBRyxLQUFLLFNBQVMsRUFBRTtnQkFDckIsSUFBSSxHQUFHLEtBQUssU0FBUyxFQUFFO29CQUNyQixNQUFNLElBQUksR0FBRyxDQUFDO2lCQUNmO2dCQUNELE1BQU0sSUFBSSxHQUFHLENBQUMsY0FBYyxFQUFFLENBQUM7Z0JBQy9CLElBQUksR0FBRyxLQUFLLFNBQVMsRUFBRTtvQkFDckIsTUFBTSxJQUFJLEtBQUssQ0FBQztpQkFDakI7YUFDRjtpQkFBTSxJQUFJLEdBQUcsS0FBSyxTQUFTLEVBQUU7Z0JBQzVCLE1BQU0sSUFBSSxHQUFHLENBQUM7YUFDZjtZQUNELElBQUksR0FBRyxLQUFLLFNBQVMsRUFBRTtnQkFDckIsTUFBTSxJQUFJLEdBQUcsQ0FBQyxjQUFjLEVBQUUsQ0FBQzthQUNoQztZQUNELE1BQU0sSUFBSSxHQUFHLENBQUM7WUFDZCxPQUFPLE1BQU0sQ0FBQztTQUNmO2FBQU07WUFDTCxPQUFPLEVBQUUsQ0FBQztTQUNYO0lBQ0gsQ0FBQztJQUVELGdEQUFnQixHQUFoQixVQUFpQixLQUFLO1FBQ3BCLE9BQU87WUFDTDtnQkFDRSxNQUFNLEVBQUUsQ0FBQztnQkFDVCxLQUFLLE9BQUE7Z0JBQ0wsT0FBTyxFQUFFLEdBQUc7YUFDYjtZQUNEO2dCQUNFLE1BQU0sRUFBRSxHQUFHO2dCQUNYLEtBQUssT0FBQTtnQkFDTCxPQUFPLEVBQUUsQ0FBQzthQUNYO1NBQ0YsQ0FBQztJQUNKLENBQUM7SUFFRCx1Q0FBTyxHQUFQLFVBQVEsSUFBSTtRQUNWLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3pCLENBQUM7SUFFRCx3Q0FBUSxHQUFSLFVBQVMsS0FBSztRQUNaLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYTtZQUFFLE9BQU8sS0FBSyxDQUFDO1FBQ3RDLElBQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFVBQUEsQ0FBQztZQUNwQyxPQUFPLEtBQUssQ0FBQyxJQUFJLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQztRQUMvQixDQUFDLENBQUMsQ0FBQztRQUNILE9BQU8sSUFBSSxLQUFLLFNBQVMsQ0FBQztJQUM1QixDQUFDO0lBRUQsOENBQWMsR0FBZDtRQUNFLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztJQUMvQyxDQUFDO0lBRUQsZ0RBQWdCLEdBQWhCO1FBQ0UsSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7UUFDeEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDO1FBQ3hCLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztJQUNqRCxDQUFDO0lBbExRO1FBQVIsS0FBSyxFQUFFO3VEQUFNO0lBQ0w7UUFBUixLQUFLLEVBQUU7dURBQW1CO0lBQ2xCO1FBQVIsS0FBSyxFQUFFO3lEQUFRO0lBQ1A7UUFBUixLQUFLLEVBQUU7eURBQVE7SUFDUDtRQUFSLEtBQUssRUFBRTt5REFBcUI7SUFDcEI7UUFBUixLQUFLLEVBQUU7NERBQVc7SUFDVjtRQUFSLEtBQUssRUFBRTsrREFBYztJQUNiO1FBQVIsS0FBSyxFQUFFO2dFQUFzQjtJQUNyQjtRQUFSLEtBQUssRUFBRTtrRUFBa0M7SUFDakM7UUFBUixLQUFLLEVBQUU7a0VBQW1DO0lBRWpDO1FBQVQsTUFBTSxFQUFFO3lEQUE2QjtJQUM1QjtRQUFULE1BQU0sRUFBRTsyREFBK0I7SUFDOUI7UUFBVCxNQUFNLEVBQUU7NkRBQWlDO0lBZC9CLHFCQUFxQjtRQTFEakMsU0FBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLDZCQUE2QjtZQUN2QyxRQUFRLEVBQUUseTVDQTJDVDtZQUNELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO1lBQy9DLFVBQVUsRUFBRTtnQkFDVixPQUFPLENBQUMsZ0JBQWdCLEVBQUU7b0JBQ3hCLFVBQVUsQ0FBQyxRQUFRLEVBQUU7d0JBQ25CLEtBQUssQ0FBQzs0QkFDSixPQUFPLEVBQUUsQ0FBQzt5QkFDWCxDQUFDO3dCQUNGLE9BQU8sQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7cUJBQ3BDLENBQUM7aUJBQ0gsQ0FBQzthQUNIO1NBQ0YsQ0FBQztPQUNXLHFCQUFxQixDQW9MakM7SUFBRCw0QkFBQztDQUFBLEFBcExELElBb0xDO1NBcExZLHFCQUFxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgSW5wdXQsXG4gIE91dHB1dCxcbiAgU2ltcGxlQ2hhbmdlcyxcbiAgRXZlbnRFbWl0dGVyLFxuICBPbkNoYW5nZXMsXG4gIE9uSW5pdCxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIFRlbXBsYXRlUmVmXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgdHJpZ2dlciwgc3R5bGUsIGFuaW1hdGUsIHRyYW5zaXRpb24gfSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcbmltcG9ydCB7IGZvcm1hdExhYmVsLCBlc2NhcGVMYWJlbCB9IGZyb20gJy4uL2NvbW1vbi9sYWJlbC5oZWxwZXInO1xuaW1wb3J0IHsgaWQgfSBmcm9tICcuLi91dGlscy9pZCc7XG5pbXBvcnQgeyBDb2xvckhlbHBlciB9IGZyb20gJy4uL2NvbW1vbi9jb2xvci5oZWxwZXInO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdnW25neC1jaGFydHMtY2lyY2xlLXNlcmllc10nLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxzdmc6ZyAqbmdJZj1cImNpcmNsZVwiPlxuICAgICAgPGRlZnM+XG4gICAgICAgIDxzdmc6Z1xuICAgICAgICAgIG5neC1jaGFydHMtc3ZnLWxpbmVhci1ncmFkaWVudFxuICAgICAgICAgIG9yaWVudGF0aW9uPVwidmVydGljYWxcIlxuICAgICAgICAgIFtuYW1lXT1cImdyYWRpZW50SWRcIlxuICAgICAgICAgIFtzdG9wc109XCJjaXJjbGUuZ3JhZGllbnRTdG9wc1wiXG4gICAgICAgIC8+XG4gICAgICA8L2RlZnM+XG4gICAgICA8c3ZnOnJlY3RcbiAgICAgICAgKm5nSWY9XCJiYXJWaXNpYmxlICYmIHR5cGUgPT09ICdzdGFuZGFyZCdcIlxuICAgICAgICBbQGFuaW1hdGlvblN0YXRlXT1cIidhY3RpdmUnXCJcbiAgICAgICAgW2F0dHIueF09XCJjaXJjbGUuY3ggLSBjaXJjbGUucmFkaXVzXCJcbiAgICAgICAgW2F0dHIueV09XCJjaXJjbGUuY3lcIlxuICAgICAgICBbYXR0ci53aWR0aF09XCJjaXJjbGUucmFkaXVzICogMlwiXG4gICAgICAgIFthdHRyLmhlaWdodF09XCJjaXJjbGUuaGVpZ2h0XCJcbiAgICAgICAgW2F0dHIuZmlsbF09XCJncmFkaWVudEZpbGxcIlxuICAgICAgICBjbGFzcz1cInRvb2x0aXAtYmFyXCJcbiAgICAgIC8+XG4gICAgICA8c3ZnOmdcbiAgICAgICAgbmd4LWNoYXJ0cy1jaXJjbGVcbiAgICAgICAgY2xhc3M9XCJjaXJjbGVcIlxuICAgICAgICBbY3hdPVwiY2lyY2xlLmN4XCJcbiAgICAgICAgW2N5XT1cImNpcmNsZS5jeVwiXG4gICAgICAgIFtyXT1cImNpcmNsZS5yYWRpdXNcIlxuICAgICAgICBbZmlsbF09XCJjaXJjbGUuY29sb3JcIlxuICAgICAgICBbY2xhc3MuYWN0aXZlXT1cImlzQWN0aXZlKHsgbmFtZTogY2lyY2xlLnNlcmllc05hbWUgfSlcIlxuICAgICAgICBbcG9pbnRlckV2ZW50c109XCInYWxsJ1wiXG4gICAgICAgIFtkYXRhXT1cImNpcmNsZS52YWx1ZVwiXG4gICAgICAgIFtjbGFzc05hbWVzXT1cImNpcmNsZS5jbGFzc05hbWVzXCJcbiAgICAgICAgKHNlbGVjdCk9XCJvbkNsaWNrKGNpcmNsZS5kYXRhKVwiXG4gICAgICAgIChhY3RpdmF0ZSk9XCJhY3RpdmF0ZUNpcmNsZSgpXCJcbiAgICAgICAgKGRlYWN0aXZhdGUpPVwiZGVhY3RpdmF0ZUNpcmNsZSgpXCJcbiAgICAgICAgbmd4LXRvb2x0aXBcbiAgICAgICAgW3Rvb2x0aXBEaXNhYmxlZF09XCJ0b29sdGlwRGlzYWJsZWRcIlxuICAgICAgICBbdG9vbHRpcFBsYWNlbWVudF09XCIndG9wJ1wiXG4gICAgICAgIFt0b29sdGlwVHlwZV09XCIndG9vbHRpcCdcIlxuICAgICAgICBbdG9vbHRpcFRpdGxlXT1cInRvb2x0aXBUZW1wbGF0ZSA/IHVuZGVmaW5lZCA6IGdldFRvb2x0aXBUZXh0KGNpcmNsZSlcIlxuICAgICAgICBbdG9vbHRpcFRlbXBsYXRlXT1cInRvb2x0aXBUZW1wbGF0ZVwiXG4gICAgICAgIFt0b29sdGlwQ29udGV4dF09XCJjaXJjbGUuZGF0YVwiXG4gICAgICAvPlxuICAgIDwvc3ZnOmc+XG4gIGAsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBhbmltYXRpb25zOiBbXG4gICAgdHJpZ2dlcignYW5pbWF0aW9uU3RhdGUnLCBbXG4gICAgICB0cmFuc2l0aW9uKCc6ZW50ZXInLCBbXG4gICAgICAgIHN0eWxlKHtcbiAgICAgICAgICBvcGFjaXR5OiAwXG4gICAgICAgIH0pLFxuICAgICAgICBhbmltYXRlKDI1MCwgc3R5bGUoeyBvcGFjaXR5OiAxIH0pKVxuICAgICAgXSlcbiAgICBdKVxuICBdXG59KVxuZXhwb3J0IGNsYXNzIENpcmNsZVNlcmllc0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcywgT25Jbml0IHtcbiAgQElucHV0KCkgZGF0YTtcbiAgQElucHV0KCkgdHlwZSA9ICdzdGFuZGFyZCc7XG4gIEBJbnB1dCgpIHhTY2FsZTtcbiAgQElucHV0KCkgeVNjYWxlO1xuICBASW5wdXQoKSBjb2xvcnM6IENvbG9ySGVscGVyO1xuICBASW5wdXQoKSBzY2FsZVR5cGU7XG4gIEBJbnB1dCgpIHZpc2libGVWYWx1ZTtcbiAgQElucHV0KCkgYWN0aXZlRW50cmllczogYW55W107XG4gIEBJbnB1dCgpIHRvb2x0aXBEaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xuICBASW5wdXQoKSB0b29sdGlwVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgQE91dHB1dCgpIHNlbGVjdCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIGFjdGl2YXRlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgZGVhY3RpdmF0ZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBhcmVhUGF0aDogYW55O1xuICBjaXJjbGVzOiBhbnlbXTtcbiAgY2lyY2xlOiBhbnk7IC8vIGFjdGl2ZSBjaXJjbGVcbiAgYmFyVmlzaWJsZTogYm9vbGVhbiA9IGZhbHNlO1xuICBncmFkaWVudElkOiBzdHJpbmc7XG4gIGdyYWRpZW50RmlsbDogc3RyaW5nO1xuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuZ3JhZGllbnRJZCA9ICdncmFkJyArIGlkKCkudG9TdHJpbmcoKTtcbiAgICB0aGlzLmdyYWRpZW50RmlsbCA9IGB1cmwoIyR7dGhpcy5ncmFkaWVudElkfSlgO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuICAgIHRoaXMudXBkYXRlKCk7XG4gIH1cblxuICB1cGRhdGUoKTogdm9pZCB7XG4gICAgdGhpcy5jaXJjbGVzID0gdGhpcy5nZXRDaXJjbGVzKCk7XG4gICAgdGhpcy5jaXJjbGUgPSB0aGlzLmNpcmNsZXMuZmluZChjID0+IHtcbiAgICAgIHJldHVybiBjLm9wYWNpdHkgIT09IDA7XG4gICAgfSk7XG4gICAgLy8gdGhpcy5jaXJjbGUgPSB0aGlzLmdldEFjdGl2ZUNpcmNsZSgpO1xuICB9XG5cbiAgZ2V0QWN0aXZlQ2lyY2xlKCkge1xuICAgIGNvbnN0IGluZGV4QWN0aXZlRGF0YVBvaW50ID0gdGhpcy5kYXRhLnNlcmllcy5maW5kSW5kZXgoZCA9PiB7XG4gICAgICBjb25zdCBsYWJlbCA9IGQubmFtZTtcbiAgICAgIHJldHVybiBsYWJlbCAmJiB0aGlzLnZpc2libGVWYWx1ZSAmJiBsYWJlbC50b1N0cmluZygpID09PSB0aGlzLnZpc2libGVWYWx1ZS50b1N0cmluZygpICYmIGQudmFsdWUgIT09IHVuZGVmaW5lZDtcbiAgICB9KTtcbiAgfVxuXG4gIGdldENpcmNsZXMoKTogYW55W10ge1xuICAgIGNvbnN0IHNlcmllc05hbWUgPSB0aGlzLmRhdGEubmFtZTtcblxuICAgIHJldHVybiB0aGlzLmRhdGEuc2VyaWVzLm1hcCgoZCwgaSkgPT4ge1xuICAgICAgY29uc3QgdmFsdWUgPSBkLnZhbHVlO1xuICAgICAgY29uc3QgbGFiZWwgPSBkLm5hbWU7XG4gICAgICBjb25zdCBnYW1lID0gZC5nYW1lO1xuICAgICAgY29uc3QgdG9vbHRpcExhYmVsID0gZm9ybWF0TGFiZWwobGFiZWwpO1xuXG4gICAgICBsZXQgY3g7XG4gICAgICBpZiAodGhpcy5zY2FsZVR5cGUgPT09ICd0aW1lJykge1xuICAgICAgICBjeCA9IHRoaXMueFNjYWxlKGxhYmVsKTtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5zY2FsZVR5cGUgPT09ICdsaW5lYXInKSB7XG4gICAgICAgIGN4ID0gdGhpcy54U2NhbGUoTnVtYmVyKGxhYmVsKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjeCA9IHRoaXMueFNjYWxlKGxhYmVsKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgY3kgPSB0aGlzLnlTY2FsZSh0aGlzLnR5cGUgPT09ICdzdGFuZGFyZCcgPyB2YWx1ZSA6IGQuZDEpO1xuICAgICAgY29uc3QgcmFkaXVzID0gNTtcbiAgICAgIGNvbnN0IGhlaWdodCA9IHRoaXMueVNjYWxlLnJhbmdlKClbMF0gLSBjeTtcblxuICAgICAgbGV0IG9wYWNpdHkgPSAwO1xuICAgICAgaWYgKGxhYmVsICYmIHRoaXMudmlzaWJsZVZhbHVlICYmIGxhYmVsLnRvU3RyaW5nKCkgPT09IHRoaXMudmlzaWJsZVZhbHVlLnRvU3RyaW5nKCkpIHtcbiAgICAgICAgb3BhY2l0eSA9IDE7XG4gICAgICB9XG5cbiAgICAgIGxldCBjb2xvcjtcbiAgICAgIGlmICh0aGlzLmNvbG9ycy5zY2FsZVR5cGUgPT09ICdsaW5lYXInKSB7XG4gICAgICAgIGlmICh0aGlzLnR5cGUgPT09ICdzdGFuZGFyZCcpIHtcbiAgICAgICAgICBjb2xvciA9IHRoaXMuY29sb3JzLmdldENvbG9yKHZhbHVlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb2xvciA9IHRoaXMuY29sb3JzLmdldENvbG9yKGQuZDEpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb2xvciA9IHRoaXMuY29sb3JzLmdldENvbG9yKHNlcmllc05hbWUpO1xuICAgICAgfVxuXG4gICAgY29uc3QgZGF0YSA9IE9iamVjdC5hc3NpZ24oe30sIGQsIHtcbiAgICAgIHNlcmllczogc2VyaWVzTmFtZSxcbiAgICAgIHZhbHVlLFxuICAgICAgbmFtZTogbGFiZWwsXG4gICAgICBnYW1lXG4gICAgfSk7XG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIGNsYXNzTmFtZXM6IFtgY2lyY2xlLWRhdGEtJHtpfWBdLFxuICAgICAgICB2YWx1ZSxcbiAgICAgICAgbGFiZWwsXG4gICAgICAgIGRhdGEsXG4gICAgICAgIGN4LFxuICAgICAgICBjeSxcbiAgICAgICAgcmFkaXVzLFxuICAgICAgICBoZWlnaHQsXG4gICAgICAgIHRvb2x0aXBMYWJlbCxcbiAgICAgICAgY29sb3IsXG4gICAgICAgIG9wYWNpdHksXG4gICAgICAgIHNlcmllc05hbWUsXG4gICAgICAgIGdyYWRpZW50U3RvcHM6IHRoaXMuZ2V0R3JhZGllbnRTdG9wcyhjb2xvciksXG4gICAgICAgIG1pbjogZC5taW4sXG4gICAgICAgIG1heDogZC5tYXhcbiAgICAgIH07XG4gICAgfSkuZmlsdGVyKChjaXJjbGUpID0+IGNpcmNsZSAhPT0gdW5kZWZpbmVkKTtcbiAgfVxuXG4gIGdldFRvb2x0aXBUZXh0KHsgdG9vbHRpcExhYmVsLCB2YWx1ZSwgc2VyaWVzTmFtZSwgbWluLCBtYXggfSk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGBcbiAgICAgIDxzcGFuIGNsYXNzPVwidG9vbHRpcC1sYWJlbFwiPiR7ZXNjYXBlTGFiZWwoc2VyaWVzTmFtZSl9IOKAoiAke2VzY2FwZUxhYmVsKHRvb2x0aXBMYWJlbCl9PC9zcGFuPlxuICAgICAgPHNwYW4gY2xhc3M9XCJ0b29sdGlwLXZhbFwiPiR7dmFsdWUudG9Mb2NhbGVTdHJpbmcoKX0ke3RoaXMuZ2V0VG9vbHRpcE1pbk1heFRleHQobWluLCBtYXgpfTwvc3Bhbj5cbiAgICBgO1xuICB9XG5cbiAgZ2V0VG9vbHRpcE1pbk1heFRleHQobWluOiBhbnksIG1heDogYW55KSB7XG4gICAgaWYgKG1pbiAhPT0gdW5kZWZpbmVkIHx8IG1heCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBsZXQgcmVzdWx0ID0gJyAoJztcbiAgICAgIGlmIChtaW4gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBpZiAobWF4ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICByZXN1bHQgKz0gJ+KJpSc7XG4gICAgICAgIH1cbiAgICAgICAgcmVzdWx0ICs9IG1pbi50b0xvY2FsZVN0cmluZygpO1xuICAgICAgICBpZiAobWF4ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICByZXN1bHQgKz0gJyAtICc7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAobWF4ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmVzdWx0ICs9ICfiiaQnO1xuICAgICAgfVxuICAgICAgaWYgKG1heCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJlc3VsdCArPSBtYXgudG9Mb2NhbGVTdHJpbmcoKTtcbiAgICAgIH1cbiAgICAgIHJlc3VsdCArPSAnKSc7XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gJyc7XG4gICAgfVxuICB9XG5cbiAgZ2V0R3JhZGllbnRTdG9wcyhjb2xvcikge1xuICAgIHJldHVybiBbXG4gICAgICB7XG4gICAgICAgIG9mZnNldDogMCxcbiAgICAgICAgY29sb3IsXG4gICAgICAgIG9wYWNpdHk6IDAuMlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgb2Zmc2V0OiAxMDAsXG4gICAgICAgIGNvbG9yLFxuICAgICAgICBvcGFjaXR5OiAxXG4gICAgICB9XG4gICAgXTtcbiAgfVxuXG4gIG9uQ2xpY2soZGF0YSk6IHZvaWQge1xuICAgIHRoaXMuc2VsZWN0LmVtaXQoZGF0YSk7XG4gIH1cblxuICBpc0FjdGl2ZShlbnRyeSk6IGJvb2xlYW4ge1xuICAgIGlmICghdGhpcy5hY3RpdmVFbnRyaWVzKSByZXR1cm4gZmFsc2U7XG4gICAgY29uc3QgaXRlbSA9IHRoaXMuYWN0aXZlRW50cmllcy5maW5kKGQgPT4ge1xuICAgICAgcmV0dXJuIGVudHJ5Lm5hbWUgPT09IGQubmFtZTtcbiAgICB9KTtcbiAgICByZXR1cm4gaXRlbSAhPT0gdW5kZWZpbmVkO1xuICB9XG5cbiAgYWN0aXZhdGVDaXJjbGUoKTogdm9pZCB7XG4gICAgdGhpcy5iYXJWaXNpYmxlID0gdHJ1ZTtcbiAgICB0aGlzLmFjdGl2YXRlLmVtaXQoeyBuYW1lOiB0aGlzLmRhdGEubmFtZSB9KTtcbiAgfVxuXG4gIGRlYWN0aXZhdGVDaXJjbGUoKTogdm9pZCB7XG4gICAgdGhpcy5iYXJWaXNpYmxlID0gZmFsc2U7XG4gICAgdGhpcy5jaXJjbGUub3BhY2l0eSA9IDA7XG4gICAgdGhpcy5kZWFjdGl2YXRlLmVtaXQoeyBuYW1lOiB0aGlzLmRhdGEubmFtZSB9KTtcbiAgfVxufVxuIl19