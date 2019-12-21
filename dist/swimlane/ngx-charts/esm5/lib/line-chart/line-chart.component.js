import { __decorate, __extends, __read, __spread, __values } from "tslib";
import { Component, Input, Output, EventEmitter, ViewEncapsulation, HostListener, ChangeDetectionStrategy, ContentChild } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { scaleLinear, scaleTime, scalePoint } from 'd3-scale';
import { curveLinear } from 'd3-shape';
import { calculateViewDimensions } from '../common/view-dimensions.helper';
import { ColorHelper } from '../common/color.helper';
import { BaseChartComponent } from '../common/base-chart.component';
import { id } from '../utils/id';
import { getUniqueXDomainValues, getScaleType } from '../common/domain.helper';
var LineChartComponent = /** @class */ (function (_super) {
    __extends(LineChartComponent, _super);
    function LineChartComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.legendTitle = 'Legend';
        _this.legendPosition = 'right';
        _this.legendAverages = [];
        _this.showGridLines = true;
        _this.curve = curveLinear;
        _this.activeEntries = [];
        _this.trimXAxisTicks = true;
        _this.trimYAxisTicks = true;
        _this.rotateXAxisTicks = true;
        _this.maxXAxisTickLength = 16;
        _this.maxYAxisTickLength = 16;
        _this.roundDomains = false;
        _this.tooltipDisabled = false;
        _this.showRefLines = false;
        _this.showRefLabels = true;
        _this.activate = new EventEmitter();
        _this.deactivate = new EventEmitter();
        _this.margin = [10, 20, 10, 20];
        _this.xAxisHeight = 0;
        _this.yAxisWidth = 0;
        _this.timelineHeight = 50;
        _this.timelinePadding = 10;
        return _this;
    }
    LineChartComponent.prototype.update = function () {
        _super.prototype.update.call(this);
        this.dims = calculateViewDimensions({
            width: this.width,
            height: this.height,
            margins: this.margin,
            showXAxis: this.xAxis,
            showYAxis: this.yAxis,
            xAxisHeight: this.xAxisHeight,
            yAxisWidth: this.yAxisWidth,
            showXLabel: this.showXAxisLabel,
            showYLabel: this.showYAxisLabel,
            showLegend: this.legend,
            legendType: this.schemeType,
            legendPosition: this.legendPosition
        });
        if (this.timeline) {
            this.dims.height -= this.timelineHeight + this.margin[2] + this.timelinePadding;
        }
        this.xDomain = this.getXDomain();
        if (this.filteredDomain) {
            this.xDomain = this.filteredDomain;
        }
        this.yDomain = this.getYDomain();
        this.seriesDomain = this.getSeriesDomain();
        this.xScale = this.getXScale(this.xDomain, this.dims.width);
        this.yScale = this.getYScale(this.yDomain, this.dims.height);
        this.updateTimeline();
        this.setColors();
        this.legendOptions = this.getLegendOptions();
        this.transform = "translate(" + this.dims.xOffset + " , " + this.margin[0] + ")";
        this.clipPathId = 'clip' + id().toString();
        this.clipPath = "url(#" + this.clipPathId + ")";
    };
    LineChartComponent.prototype.updateTimeline = function () {
        if (this.timeline) {
            this.timelineWidth = this.dims.width;
            this.timelineXDomain = this.getXDomain();
            this.timelineXScale = this.getXScale(this.timelineXDomain, this.timelineWidth);
            this.timelineYScale = this.getYScale(this.yDomain, this.timelineHeight);
            this.timelineTransform = "translate(" + this.dims.xOffset + ", " + -this.margin[2] + ")";
        }
    };
    LineChartComponent.prototype.getXDomain = function () {
        var values = getUniqueXDomainValues(this.results);
        this.scaleType = getScaleType(values);
        var domain = [];
        if (this.scaleType === 'linear') {
            values = values.map(function (v) { return Number(v); });
        }
        var min;
        var max;
        if (this.scaleType === 'time' || this.scaleType === 'linear') {
            min = this.xScaleMin ? this.xScaleMin : Math.min.apply(Math, __spread(values));
            max = this.xScaleMax ? this.xScaleMax : Math.max.apply(Math, __spread(values));
        }
        if (this.scaleType === 'time') {
            domain = [new Date(min), new Date(max)];
            this.xSet = __spread(values).sort(function (a, b) {
                var aDate = a.getTime();
                var bDate = b.getTime();
                if (aDate > bDate)
                    return 1;
                if (bDate > aDate)
                    return -1;
                return 0;
            });
        }
        else if (this.scaleType === 'linear') {
            domain = [min, max];
            // Use compare function to sort numbers numerically
            this.xSet = __spread(values).sort(function (a, b) { return a - b; });
        }
        else {
            domain = values;
            this.xSet = values;
        }
        return domain;
    };
    LineChartComponent.prototype.getYDomain = function () {
        var e_1, _a, e_2, _b;
        var domain = [];
        try {
            for (var _c = __values(this.results), _d = _c.next(); !_d.done; _d = _c.next()) {
                var results = _d.value;
                try {
                    for (var _e = (e_2 = void 0, __values(results.series)), _f = _e.next(); !_f.done; _f = _e.next()) {
                        var d = _f.value;
                        if (domain.indexOf(d.value) < 0) {
                            domain.push(d.value);
                        }
                        if (d.min !== undefined) {
                            this.hasRange = true;
                            if (domain.indexOf(d.min) < 0) {
                                domain.push(d.min);
                            }
                        }
                        if (d.max !== undefined) {
                            this.hasRange = true;
                            if (domain.indexOf(d.max) < 0) {
                                domain.push(d.max);
                            }
                        }
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
            }
            finally { if (e_1) throw e_1.error; }
        }
        var values = __spread(domain);
        if (!this.autoScale) {
            values.push(0);
        }
        var min = this.yScaleMin ? this.yScaleMin : Math.min.apply(Math, __spread(values));
        var max = this.yScaleMax ? this.yScaleMax : Math.max.apply(Math, __spread(values));
        return [min, max];
    };
    LineChartComponent.prototype.getSeriesDomain = function () {
        return this.results.map(function (d) { return d.name; });
    };
    LineChartComponent.prototype.getXScale = function (domain, width) {
        var scale;
        if (this.scaleType === 'time') {
            scale = scaleTime()
                .range([0, width])
                .domain(domain);
        }
        else if (this.scaleType === 'linear') {
            scale = scaleLinear()
                .range([0, width])
                .domain(domain);
            if (this.roundDomains) {
                scale = scale.nice();
            }
        }
        else if (this.scaleType === 'ordinal') {
            scale = scalePoint()
                .range([0, width])
                .padding(0.1)
                .domain(domain);
        }
        return scale;
    };
    LineChartComponent.prototype.getYScale = function (domain, height) {
        var scale = scaleLinear()
            .range([height, 0])
            .domain(domain);
        return this.roundDomains ? scale.nice() : scale;
    };
    LineChartComponent.prototype.updateDomain = function (domain) {
        this.filteredDomain = domain;
        this.xDomain = this.filteredDomain;
        this.xScale = this.getXScale(this.xDomain, this.dims.width);
    };
    LineChartComponent.prototype.updateHoveredVertical = function (item) {
        this.hoveredVertical = item.value;
        this.deactivateAll();
    };
    LineChartComponent.prototype.hideCircles = function () {
        this.hoveredVertical = null;
        this.deactivateAll();
    };
    LineChartComponent.prototype.onClick = function (data) {
        this.select.emit(data);
    };
    LineChartComponent.prototype.trackBy = function (index, item) {
        return item.name;
    };
    LineChartComponent.prototype.setColors = function () {
        var domain;
        if (this.schemeType === 'ordinal') {
            domain = this.seriesDomain;
        }
        else {
            domain = this.yDomain;
        }
        this.colors = new ColorHelper(this.scheme, this.schemeType, domain, this.customColors);
    };
    LineChartComponent.prototype.getLegendOptions = function () {
        var opts = {
            scaleType: this.schemeType,
            colors: undefined,
            domain: [],
            title: undefined,
            position: this.legendPosition,
            averages: this.legendAverages
        };
        if (opts.scaleType === 'ordinal') {
            opts.domain = this.seriesDomain;
            opts.colors = this.colors;
            opts.title = this.legendTitle;
        }
        else {
            opts.domain = this.yDomain;
            opts.colors = this.colors.scale;
        }
        return opts;
    };
    LineChartComponent.prototype.updateYAxisWidth = function (_a) {
        var width = _a.width;
        this.yAxisWidth = width;
        this.update();
    };
    LineChartComponent.prototype.updateXAxisHeight = function (_a) {
        var height = _a.height;
        this.xAxisHeight = height;
        this.update();
    };
    LineChartComponent.prototype.onActivate = function (item) {
        this.deactivateAll();
        var idx = this.activeEntries.findIndex(function (d) {
            return d.name === item.name && d.value === item.value;
        });
        if (idx > -1) {
            return;
        }
        this.activeEntries = [item];
        this.activate.emit({ value: item, entries: this.activeEntries });
    };
    LineChartComponent.prototype.onDeactivate = function (item) {
        var idx = this.activeEntries.findIndex(function (d) {
            return d.name === item.name && d.value === item.value;
        });
        this.activeEntries.splice(idx, 1);
        this.activeEntries = __spread(this.activeEntries);
        this.deactivate.emit({ value: item, entries: this.activeEntries });
    };
    LineChartComponent.prototype.deactivateAll = function () {
        var e_3, _a;
        this.activeEntries = __spread(this.activeEntries);
        try {
            for (var _b = __values(this.activeEntries), _c = _b.next(); !_c.done; _c = _b.next()) {
                var entry = _c.value;
                this.deactivate.emit({ value: entry, entries: [] });
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_3) throw e_3.error; }
        }
        this.activeEntries = [];
    };
    __decorate([
        Input()
    ], LineChartComponent.prototype, "legend", void 0);
    __decorate([
        Input()
    ], LineChartComponent.prototype, "legendTitle", void 0);
    __decorate([
        Input()
    ], LineChartComponent.prototype, "legendPosition", void 0);
    __decorate([
        Input()
    ], LineChartComponent.prototype, "legendAverages", void 0);
    __decorate([
        Input()
    ], LineChartComponent.prototype, "xAxis", void 0);
    __decorate([
        Input()
    ], LineChartComponent.prototype, "yAxis", void 0);
    __decorate([
        Input()
    ], LineChartComponent.prototype, "showXAxisLabel", void 0);
    __decorate([
        Input()
    ], LineChartComponent.prototype, "showYAxisLabel", void 0);
    __decorate([
        Input()
    ], LineChartComponent.prototype, "xAxisLabel", void 0);
    __decorate([
        Input()
    ], LineChartComponent.prototype, "yAxisLabel", void 0);
    __decorate([
        Input()
    ], LineChartComponent.prototype, "autoScale", void 0);
    __decorate([
        Input()
    ], LineChartComponent.prototype, "timeline", void 0);
    __decorate([
        Input()
    ], LineChartComponent.prototype, "gradient", void 0);
    __decorate([
        Input()
    ], LineChartComponent.prototype, "showGridLines", void 0);
    __decorate([
        Input()
    ], LineChartComponent.prototype, "curve", void 0);
    __decorate([
        Input()
    ], LineChartComponent.prototype, "activeEntries", void 0);
    __decorate([
        Input()
    ], LineChartComponent.prototype, "schemeType", void 0);
    __decorate([
        Input()
    ], LineChartComponent.prototype, "rangeFillOpacity", void 0);
    __decorate([
        Input()
    ], LineChartComponent.prototype, "trimXAxisTicks", void 0);
    __decorate([
        Input()
    ], LineChartComponent.prototype, "trimYAxisTicks", void 0);
    __decorate([
        Input()
    ], LineChartComponent.prototype, "rotateXAxisTicks", void 0);
    __decorate([
        Input()
    ], LineChartComponent.prototype, "maxXAxisTickLength", void 0);
    __decorate([
        Input()
    ], LineChartComponent.prototype, "maxYAxisTickLength", void 0);
    __decorate([
        Input()
    ], LineChartComponent.prototype, "xAxisTickFormatting", void 0);
    __decorate([
        Input()
    ], LineChartComponent.prototype, "yAxisTickFormatting", void 0);
    __decorate([
        Input()
    ], LineChartComponent.prototype, "xAxisTicks", void 0);
    __decorate([
        Input()
    ], LineChartComponent.prototype, "yAxisTicks", void 0);
    __decorate([
        Input()
    ], LineChartComponent.prototype, "roundDomains", void 0);
    __decorate([
        Input()
    ], LineChartComponent.prototype, "tooltipDisabled", void 0);
    __decorate([
        Input()
    ], LineChartComponent.prototype, "showRefLines", void 0);
    __decorate([
        Input()
    ], LineChartComponent.prototype, "referenceLines", void 0);
    __decorate([
        Input()
    ], LineChartComponent.prototype, "showRefLabels", void 0);
    __decorate([
        Input()
    ], LineChartComponent.prototype, "xScaleMin", void 0);
    __decorate([
        Input()
    ], LineChartComponent.prototype, "xScaleMax", void 0);
    __decorate([
        Input()
    ], LineChartComponent.prototype, "yScaleMin", void 0);
    __decorate([
        Input()
    ], LineChartComponent.prototype, "yScaleMax", void 0);
    __decorate([
        Output()
    ], LineChartComponent.prototype, "activate", void 0);
    __decorate([
        Output()
    ], LineChartComponent.prototype, "deactivate", void 0);
    __decorate([
        ContentChild('tooltipTemplate')
    ], LineChartComponent.prototype, "tooltipTemplate", void 0);
    __decorate([
        ContentChild('seriesTooltipTemplate')
    ], LineChartComponent.prototype, "seriesTooltipTemplate", void 0);
    __decorate([
        HostListener('mouseleave')
    ], LineChartComponent.prototype, "hideCircles", null);
    LineChartComponent = __decorate([
        Component({
            selector: 'ngx-charts-line-chart',
            template: "\n    <ngx-charts-chart\n      [view]=\"[width, height]\"\n      [showLegend]=\"legend\"\n      [legendOptions]=\"legendOptions\"\n      [activeEntries]=\"activeEntries\"\n      [animations]=\"animations\"\n      (legendLabelClick)=\"onClick($event)\"\n      (legendLabelActivate)=\"onActivate($event)\"\n      (legendLabelDeactivate)=\"onDeactivate($event)\"\n    >\n      <svg:defs>\n        <svg:clipPath [attr.id]=\"clipPathId\">\n          <svg:rect\n            [attr.width]=\"dims.width + 10\"\n            [attr.height]=\"dims.height + 10\"\n            [attr.transform]=\"'translate(-5, -5)'\"\n          />\n        </svg:clipPath>\n      </svg:defs>\n      <svg:g [attr.transform]=\"transform\" class=\"line-chart chart\">\n        <svg:g\n          ngx-charts-x-axis\n          *ngIf=\"xAxis\"\n          [xScale]=\"xScale\"\n          [dims]=\"dims\"\n          [showGridLines]=\"showGridLines\"\n          [showLabel]=\"showXAxisLabel\"\n          [labelText]=\"xAxisLabel\"\n          [trimTicks]=\"trimXAxisTicks\"\n          [rotateTicks]=\"rotateXAxisTicks\"\n          [maxTickLength]=\"maxXAxisTickLength\"\n          [tickFormatting]=\"xAxisTickFormatting\"\n          [ticks]=\"xAxisTicks\"\n          (dimensionsChanged)=\"updateXAxisHeight($event)\"\n        ></svg:g>\n        <svg:g\n          ngx-charts-y-axis\n          *ngIf=\"yAxis\"\n          [yScale]=\"yScale\"\n          [dims]=\"dims\"\n          [showGridLines]=\"showGridLines\"\n          [showLabel]=\"showYAxisLabel\"\n          [labelText]=\"yAxisLabel\"\n          [trimTicks]=\"trimYAxisTicks\"\n          [maxTickLength]=\"maxYAxisTickLength\"\n          [tickFormatting]=\"yAxisTickFormatting\"\n          [ticks]=\"yAxisTicks\"\n          [referenceLines]=\"referenceLines\"\n          [showRefLines]=\"showRefLines\"\n          [showRefLabels]=\"showRefLabels\"\n          (dimensionsChanged)=\"updateYAxisWidth($event)\"\n        ></svg:g>\n        <svg:g [attr.clip-path]=\"clipPath\">\n          <svg:g *ngFor=\"let series of results; trackBy: trackBy\" [@animationState]=\"'active'\">\n            <svg:g\n              ngx-charts-line-series\n              [xScale]=\"xScale\"\n              [yScale]=\"yScale\"\n              [colors]=\"colors\"\n              [data]=\"series\"\n              [activeEntries]=\"activeEntries\"\n              [scaleType]=\"scaleType\"\n              [curve]=\"curve\"\n              [rangeFillOpacity]=\"rangeFillOpacity\"\n              [hasRange]=\"hasRange\"\n              [animations]=\"animations\"\n            />\n          </svg:g>\n\n          <svg:g *ngIf=\"!tooltipDisabled\" (mouseleave)=\"hideCircles()\">\n            <svg:g\n              ngx-charts-tooltip-area\n              [dims]=\"dims\"\n              [xSet]=\"xSet\"\n              [xScale]=\"xScale\"\n              [yScale]=\"yScale\"\n              [results]=\"results\"\n              [colors]=\"colors\"\n              [tooltipDisabled]=\"tooltipDisabled\"\n              [tooltipTemplate]=\"seriesTooltipTemplate\"\n              (hover)=\"updateHoveredVertical($event)\"\n            />\n\n            <svg:g *ngFor=\"let series of results\">\n              <svg:g\n                ngx-charts-circle-series\n                [xScale]=\"xScale\"\n                [yScale]=\"yScale\"\n                [colors]=\"colors\"\n                [data]=\"series\"\n                [scaleType]=\"scaleType\"\n                [visibleValue]=\"hoveredVertical\"\n                [activeEntries]=\"activeEntries\"\n                [tooltipDisabled]=\"tooltipDisabled\"\n                [tooltipTemplate]=\"tooltipTemplate\"\n                (select)=\"onClick($event)\"\n                (activate)=\"onActivate($event)\"\n                (deactivate)=\"onDeactivate($event)\"\n              />\n            </svg:g>\n          </svg:g>\n        </svg:g>\n      </svg:g>\n      <svg:g\n        ngx-charts-timeline\n        *ngIf=\"timeline && scaleType != 'ordinal'\"\n        [attr.transform]=\"timelineTransform\"\n        [results]=\"results\"\n        [view]=\"[timelineWidth, height]\"\n        [height]=\"timelineHeight\"\n        [scheme]=\"scheme\"\n        [customColors]=\"customColors\"\n        [scaleType]=\"scaleType\"\n        [legend]=\"legend\"\n        (onDomainChange)=\"updateDomain($event)\"\n      >\n        <svg:g *ngFor=\"let series of results; trackBy: trackBy\">\n          <svg:g\n            ngx-charts-line-series\n            [xScale]=\"timelineXScale\"\n            [yScale]=\"timelineYScale\"\n            [colors]=\"colors\"\n            [data]=\"series\"\n            [scaleType]=\"scaleType\"\n            [curve]=\"curve\"\n            [hasRange]=\"hasRange\"\n            [animations]=\"animations\"\n          />\n        </svg:g>\n      </svg:g>\n    </ngx-charts-chart>\n  ",
            encapsulation: ViewEncapsulation.None,
            changeDetection: ChangeDetectionStrategy.OnPush,
            animations: [
                trigger('animationState', [
                    transition(':leave', [
                        style({
                            opacity: 1
                        }),
                        animate(500, style({
                            opacity: 0
                        }))
                    ])
                ])
            ],
            styles: [".ngx-charts{float:left;overflow:visible}.ngx-charts .arc,.ngx-charts .bar,.ngx-charts .circle{cursor:pointer}.ngx-charts .arc.active,.ngx-charts .arc:hover,.ngx-charts .bar.active,.ngx-charts .bar:hover,.ngx-charts .card.active,.ngx-charts .card:hover,.ngx-charts .cell.active,.ngx-charts .cell:hover{opacity:.8;-webkit-transition:opacity .1s ease-in-out;transition:opacity .1s ease-in-out}.ngx-charts .arc:focus,.ngx-charts .bar:focus,.ngx-charts .card:focus,.ngx-charts .cell:focus{outline:0}.ngx-charts .arc.hidden,.ngx-charts .bar.hidden,.ngx-charts .card.hidden,.ngx-charts .cell.hidden{display:none}.ngx-charts g:focus{outline:0}.ngx-charts .area-series.inactive,.ngx-charts .line-series-range.inactive,.ngx-charts .line-series.inactive,.ngx-charts .polar-series-area.inactive,.ngx-charts .polar-series-path.inactive{-webkit-transition:opacity .1s ease-in-out;transition:opacity .1s ease-in-out;opacity:.2}.ngx-charts .line-highlight{display:none}.ngx-charts .line-highlight.active{display:block}.ngx-charts .area{opacity:.6}.ngx-charts .circle:hover{cursor:pointer}.ngx-charts .label{font-size:12px;font-weight:400}.ngx-charts .tooltip-anchor{fill:#000}.ngx-charts .gridline-path{stroke:#ddd;stroke-width:1;fill:none}.ngx-charts .refline-path{stroke-width:1;stroke-dasharray:5;stroke-dashoffset:5}.ngx-charts .refline-label{font-size:9px}.ngx-charts .reference-area{fill-opacity:.05;fill:#000}.ngx-charts .gridline-path-dotted{stroke:#ddd;stroke-width:1;fill:none;stroke-dasharray:1,20;stroke-dashoffset:3}.ngx-charts .grid-panel rect{fill:none}.ngx-charts .grid-panel.odd rect{fill:rgba(0,0,0,.05)}"]
        })
    ], LineChartComponent);
    return LineChartComponent;
}(BaseChartComponent));
export { LineChartComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGluZS1jaGFydC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Ac3dpbWxhbmUvbmd4LWNoYXJ0cy8iLCJzb3VyY2VzIjpbImxpYi9saW5lLWNoYXJ0L2xpbmUtY2hhcnQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFDTCxNQUFNLEVBQ04sWUFBWSxFQUNaLGlCQUFpQixFQUNqQixZQUFZLEVBQ1osdUJBQXVCLEVBQ3ZCLFlBQVksRUFFYixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDMUUsT0FBTyxFQUFFLFdBQVcsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBQzlELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFFdkMsT0FBTyxFQUFFLHVCQUF1QixFQUFrQixNQUFNLGtDQUFrQyxDQUFDO0FBQzNGLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUNyRCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUNwRSxPQUFPLEVBQUUsRUFBRSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQ2pDLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxZQUFZLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQTRKL0U7SUFBd0Msc0NBQWtCO0lBQTFEO1FBQUEscUVBK1VDO1FBN1VVLGlCQUFXLEdBQVcsUUFBUSxDQUFDO1FBQy9CLG9CQUFjLEdBQVcsT0FBTyxDQUFDO1FBQ2pDLG9CQUFjLEdBQVUsRUFBRSxDQUFDO1FBVTNCLG1CQUFhLEdBQVksSUFBSSxDQUFDO1FBQzlCLFdBQUssR0FBUSxXQUFXLENBQUM7UUFDekIsbUJBQWEsR0FBVSxFQUFFLENBQUM7UUFHMUIsb0JBQWMsR0FB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LENBQUMsdUJBQXVCLENBQUM7cUVBQXlDO0lBK00vRTtRQURDLFlBQVksQ0FBQyxZQUFZLENBQUM7eURBSTFCO0lBNVBVLGtCQUFrQjtRQTFKOUIsU0FBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLHVCQUF1QjtZQUNqQyxRQUFRLEVBQUUsb3RKQW9JVDtZQUVELGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO1lBQ3JDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO1lBQy9DLFVBQVUsRUFBRTtnQkFDVixPQUFPLENBQUMsZ0JBQWdCLEVBQUU7b0JBQ3hCLFVBQVUsQ0FBQyxRQUFRLEVBQUU7d0JBQ25CLEtBQUssQ0FBQzs0QkFDSixPQUFPLEVBQUUsQ0FBQzt5QkFDWCxDQUFDO3dCQUNGLE9BQU8sQ0FDTCxHQUFHLEVBQ0gsS0FBSyxDQUFDOzRCQUNKLE9BQU8sRUFBRSxDQUFDO3lCQUNYLENBQUMsQ0FDSDtxQkFDRixDQUFDO2lCQUNILENBQUM7YUFDSDs7U0FDRixDQUFDO09BQ1csa0JBQWtCLENBK1U5QjtJQUFELHlCQUFDO0NBQUEsQUEvVUQsQ0FBd0Msa0JBQWtCLEdBK1V6RDtTQS9VWSxrQkFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIElucHV0LFxuICBPdXRwdXQsXG4gIEV2ZW50RW1pdHRlcixcbiAgVmlld0VuY2Fwc3VsYXRpb24sXG4gIEhvc3RMaXN0ZW5lcixcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENvbnRlbnRDaGlsZCxcbiAgVGVtcGxhdGVSZWZcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyB0cmlnZ2VyLCBzdHlsZSwgYW5pbWF0ZSwgdHJhbnNpdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xuaW1wb3J0IHsgc2NhbGVMaW5lYXIsIHNjYWxlVGltZSwgc2NhbGVQb2ludCB9IGZyb20gJ2QzLXNjYWxlJztcbmltcG9ydCB7IGN1cnZlTGluZWFyIH0gZnJvbSAnZDMtc2hhcGUnO1xuXG5pbXBvcnQgeyBjYWxjdWxhdGVWaWV3RGltZW5zaW9ucywgVmlld0RpbWVuc2lvbnMgfSBmcm9tICcuLi9jb21tb24vdmlldy1kaW1lbnNpb25zLmhlbHBlcic7XG5pbXBvcnQgeyBDb2xvckhlbHBlciB9IGZyb20gJy4uL2NvbW1vbi9jb2xvci5oZWxwZXInO1xuaW1wb3J0IHsgQmFzZUNoYXJ0Q29tcG9uZW50IH0gZnJvbSAnLi4vY29tbW9uL2Jhc2UtY2hhcnQuY29tcG9uZW50JztcbmltcG9ydCB7IGlkIH0gZnJvbSAnLi4vdXRpbHMvaWQnO1xuaW1wb3J0IHsgZ2V0VW5pcXVlWERvbWFpblZhbHVlcywgZ2V0U2NhbGVUeXBlIH0gZnJvbSAnLi4vY29tbW9uL2RvbWFpbi5oZWxwZXInO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduZ3gtY2hhcnRzLWxpbmUtY2hhcnQnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxuZ3gtY2hhcnRzLWNoYXJ0XG4gICAgICBbdmlld109XCJbd2lkdGgsIGhlaWdodF1cIlxuICAgICAgW3Nob3dMZWdlbmRdPVwibGVnZW5kXCJcbiAgICAgIFtsZWdlbmRPcHRpb25zXT1cImxlZ2VuZE9wdGlvbnNcIlxuICAgICAgW2FjdGl2ZUVudHJpZXNdPVwiYWN0aXZlRW50cmllc1wiXG4gICAgICBbYW5pbWF0aW9uc109XCJhbmltYXRpb25zXCJcbiAgICAgIChsZWdlbmRMYWJlbENsaWNrKT1cIm9uQ2xpY2soJGV2ZW50KVwiXG4gICAgICAobGVnZW5kTGFiZWxBY3RpdmF0ZSk9XCJvbkFjdGl2YXRlKCRldmVudClcIlxuICAgICAgKGxlZ2VuZExhYmVsRGVhY3RpdmF0ZSk9XCJvbkRlYWN0aXZhdGUoJGV2ZW50KVwiXG4gICAgPlxuICAgICAgPHN2ZzpkZWZzPlxuICAgICAgICA8c3ZnOmNsaXBQYXRoIFthdHRyLmlkXT1cImNsaXBQYXRoSWRcIj5cbiAgICAgICAgICA8c3ZnOnJlY3RcbiAgICAgICAgICAgIFthdHRyLndpZHRoXT1cImRpbXMud2lkdGggKyAxMFwiXG4gICAgICAgICAgICBbYXR0ci5oZWlnaHRdPVwiZGltcy5oZWlnaHQgKyAxMFwiXG4gICAgICAgICAgICBbYXR0ci50cmFuc2Zvcm1dPVwiJ3RyYW5zbGF0ZSgtNSwgLTUpJ1wiXG4gICAgICAgICAgLz5cbiAgICAgICAgPC9zdmc6Y2xpcFBhdGg+XG4gICAgICA8L3N2ZzpkZWZzPlxuICAgICAgPHN2ZzpnIFthdHRyLnRyYW5zZm9ybV09XCJ0cmFuc2Zvcm1cIiBjbGFzcz1cImxpbmUtY2hhcnQgY2hhcnRcIj5cbiAgICAgICAgPHN2ZzpnXG4gICAgICAgICAgbmd4LWNoYXJ0cy14LWF4aXNcbiAgICAgICAgICAqbmdJZj1cInhBeGlzXCJcbiAgICAgICAgICBbeFNjYWxlXT1cInhTY2FsZVwiXG4gICAgICAgICAgW2RpbXNdPVwiZGltc1wiXG4gICAgICAgICAgW3Nob3dHcmlkTGluZXNdPVwic2hvd0dyaWRMaW5lc1wiXG4gICAgICAgICAgW3Nob3dMYWJlbF09XCJzaG93WEF4aXNMYWJlbFwiXG4gICAgICAgICAgW2xhYmVsVGV4dF09XCJ4QXhpc0xhYmVsXCJcbiAgICAgICAgICBbdHJpbVRpY2tzXT1cInRyaW1YQXhpc1RpY2tzXCJcbiAgICAgICAgICBbcm90YXRlVGlja3NdPVwicm90YXRlWEF4aXNUaWNrc1wiXG4gICAgICAgICAgW21heFRpY2tMZW5ndGhdPVwibWF4WEF4aXNUaWNrTGVuZ3RoXCJcbiAgICAgICAgICBbdGlja0Zvcm1hdHRpbmddPVwieEF4aXNUaWNrRm9ybWF0dGluZ1wiXG4gICAgICAgICAgW3RpY2tzXT1cInhBeGlzVGlja3NcIlxuICAgICAgICAgIChkaW1lbnNpb25zQ2hhbmdlZCk9XCJ1cGRhdGVYQXhpc0hlaWdodCgkZXZlbnQpXCJcbiAgICAgICAgPjwvc3ZnOmc+XG4gICAgICAgIDxzdmc6Z1xuICAgICAgICAgIG5neC1jaGFydHMteS1heGlzXG4gICAgICAgICAgKm5nSWY9XCJ5QXhpc1wiXG4gICAgICAgICAgW3lTY2FsZV09XCJ5U2NhbGVcIlxuICAgICAgICAgIFtkaW1zXT1cImRpbXNcIlxuICAgICAgICAgIFtzaG93R3JpZExpbmVzXT1cInNob3dHcmlkTGluZXNcIlxuICAgICAgICAgIFtzaG93TGFiZWxdPVwic2hvd1lBeGlzTGFiZWxcIlxuICAgICAgICAgIFtsYWJlbFRleHRdPVwieUF4aXNMYWJlbFwiXG4gICAgICAgICAgW3RyaW1UaWNrc109XCJ0cmltWUF4aXNUaWNrc1wiXG4gICAgICAgICAgW21heFRpY2tMZW5ndGhdPVwibWF4WUF4aXNUaWNrTGVuZ3RoXCJcbiAgICAgICAgICBbdGlja0Zvcm1hdHRpbmddPVwieUF4aXNUaWNrRm9ybWF0dGluZ1wiXG4gICAgICAgICAgW3RpY2tzXT1cInlBeGlzVGlja3NcIlxuICAgICAgICAgIFtyZWZlcmVuY2VMaW5lc109XCJyZWZlcmVuY2VMaW5lc1wiXG4gICAgICAgICAgW3Nob3dSZWZMaW5lc109XCJzaG93UmVmTGluZXNcIlxuICAgICAgICAgIFtzaG93UmVmTGFiZWxzXT1cInNob3dSZWZMYWJlbHNcIlxuICAgICAgICAgIChkaW1lbnNpb25zQ2hhbmdlZCk9XCJ1cGRhdGVZQXhpc1dpZHRoKCRldmVudClcIlxuICAgICAgICA+PC9zdmc6Zz5cbiAgICAgICAgPHN2ZzpnIFthdHRyLmNsaXAtcGF0aF09XCJjbGlwUGF0aFwiPlxuICAgICAgICAgIDxzdmc6ZyAqbmdGb3I9XCJsZXQgc2VyaWVzIG9mIHJlc3VsdHM7IHRyYWNrQnk6IHRyYWNrQnlcIiBbQGFuaW1hdGlvblN0YXRlXT1cIidhY3RpdmUnXCI+XG4gICAgICAgICAgICA8c3ZnOmdcbiAgICAgICAgICAgICAgbmd4LWNoYXJ0cy1saW5lLXNlcmllc1xuICAgICAgICAgICAgICBbeFNjYWxlXT1cInhTY2FsZVwiXG4gICAgICAgICAgICAgIFt5U2NhbGVdPVwieVNjYWxlXCJcbiAgICAgICAgICAgICAgW2NvbG9yc109XCJjb2xvcnNcIlxuICAgICAgICAgICAgICBbZGF0YV09XCJzZXJpZXNcIlxuICAgICAgICAgICAgICBbYWN0aXZlRW50cmllc109XCJhY3RpdmVFbnRyaWVzXCJcbiAgICAgICAgICAgICAgW3NjYWxlVHlwZV09XCJzY2FsZVR5cGVcIlxuICAgICAgICAgICAgICBbY3VydmVdPVwiY3VydmVcIlxuICAgICAgICAgICAgICBbcmFuZ2VGaWxsT3BhY2l0eV09XCJyYW5nZUZpbGxPcGFjaXR5XCJcbiAgICAgICAgICAgICAgW2hhc1JhbmdlXT1cImhhc1JhbmdlXCJcbiAgICAgICAgICAgICAgW2FuaW1hdGlvbnNdPVwiYW5pbWF0aW9uc1wiXG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvc3ZnOmc+XG5cbiAgICAgICAgICA8c3ZnOmcgKm5nSWY9XCIhdG9vbHRpcERpc2FibGVkXCIgKG1vdXNlbGVhdmUpPVwiaGlkZUNpcmNsZXMoKVwiPlxuICAgICAgICAgICAgPHN2ZzpnXG4gICAgICAgICAgICAgIG5neC1jaGFydHMtdG9vbHRpcC1hcmVhXG4gICAgICAgICAgICAgIFtkaW1zXT1cImRpbXNcIlxuICAgICAgICAgICAgICBbeFNldF09XCJ4U2V0XCJcbiAgICAgICAgICAgICAgW3hTY2FsZV09XCJ4U2NhbGVcIlxuICAgICAgICAgICAgICBbeVNjYWxlXT1cInlTY2FsZVwiXG4gICAgICAgICAgICAgIFtyZXN1bHRzXT1cInJlc3VsdHNcIlxuICAgICAgICAgICAgICBbY29sb3JzXT1cImNvbG9yc1wiXG4gICAgICAgICAgICAgIFt0b29sdGlwRGlzYWJsZWRdPVwidG9vbHRpcERpc2FibGVkXCJcbiAgICAgICAgICAgICAgW3Rvb2x0aXBUZW1wbGF0ZV09XCJzZXJpZXNUb29sdGlwVGVtcGxhdGVcIlxuICAgICAgICAgICAgICAoaG92ZXIpPVwidXBkYXRlSG92ZXJlZFZlcnRpY2FsKCRldmVudClcIlxuICAgICAgICAgICAgLz5cblxuICAgICAgICAgICAgPHN2ZzpnICpuZ0Zvcj1cImxldCBzZXJpZXMgb2YgcmVzdWx0c1wiPlxuICAgICAgICAgICAgICA8c3ZnOmdcbiAgICAgICAgICAgICAgICBuZ3gtY2hhcnRzLWNpcmNsZS1zZXJpZXNcbiAgICAgICAgICAgICAgICBbeFNjYWxlXT1cInhTY2FsZVwiXG4gICAgICAgICAgICAgICAgW3lTY2FsZV09XCJ5U2NhbGVcIlxuICAgICAgICAgICAgICAgIFtjb2xvcnNdPVwiY29sb3JzXCJcbiAgICAgICAgICAgICAgICBbZGF0YV09XCJzZXJpZXNcIlxuICAgICAgICAgICAgICAgIFtzY2FsZVR5cGVdPVwic2NhbGVUeXBlXCJcbiAgICAgICAgICAgICAgICBbdmlzaWJsZVZhbHVlXT1cImhvdmVyZWRWZXJ0aWNhbFwiXG4gICAgICAgICAgICAgICAgW2FjdGl2ZUVudHJpZXNdPVwiYWN0aXZlRW50cmllc1wiXG4gICAgICAgICAgICAgICAgW3Rvb2x0aXBEaXNhYmxlZF09XCJ0b29sdGlwRGlzYWJsZWRcIlxuICAgICAgICAgICAgICAgIFt0b29sdGlwVGVtcGxhdGVdPVwidG9vbHRpcFRlbXBsYXRlXCJcbiAgICAgICAgICAgICAgICAoc2VsZWN0KT1cIm9uQ2xpY2soJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgKGFjdGl2YXRlKT1cIm9uQWN0aXZhdGUoJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgKGRlYWN0aXZhdGUpPVwib25EZWFjdGl2YXRlKCRldmVudClcIlxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9zdmc6Zz5cbiAgICAgICAgICA8L3N2ZzpnPlxuICAgICAgICA8L3N2ZzpnPlxuICAgICAgPC9zdmc6Zz5cbiAgICAgIDxzdmc6Z1xuICAgICAgICBuZ3gtY2hhcnRzLXRpbWVsaW5lXG4gICAgICAgICpuZ0lmPVwidGltZWxpbmUgJiYgc2NhbGVUeXBlICE9ICdvcmRpbmFsJ1wiXG4gICAgICAgIFthdHRyLnRyYW5zZm9ybV09XCJ0aW1lbGluZVRyYW5zZm9ybVwiXG4gICAgICAgIFtyZXN1bHRzXT1cInJlc3VsdHNcIlxuICAgICAgICBbdmlld109XCJbdGltZWxpbmVXaWR0aCwgaGVpZ2h0XVwiXG4gICAgICAgIFtoZWlnaHRdPVwidGltZWxpbmVIZWlnaHRcIlxuICAgICAgICBbc2NoZW1lXT1cInNjaGVtZVwiXG4gICAgICAgIFtjdXN0b21Db2xvcnNdPVwiY3VzdG9tQ29sb3JzXCJcbiAgICAgICAgW3NjYWxlVHlwZV09XCJzY2FsZVR5cGVcIlxuICAgICAgICBbbGVnZW5kXT1cImxlZ2VuZFwiXG4gICAgICAgIChvbkRvbWFpbkNoYW5nZSk9XCJ1cGRhdGVEb21haW4oJGV2ZW50KVwiXG4gICAgICA+XG4gICAgICAgIDxzdmc6ZyAqbmdGb3I9XCJsZXQgc2VyaWVzIG9mIHJlc3VsdHM7IHRyYWNrQnk6IHRyYWNrQnlcIj5cbiAgICAgICAgICA8c3ZnOmdcbiAgICAgICAgICAgIG5neC1jaGFydHMtbGluZS1zZXJpZXNcbiAgICAgICAgICAgIFt4U2NhbGVdPVwidGltZWxpbmVYU2NhbGVcIlxuICAgICAgICAgICAgW3lTY2FsZV09XCJ0aW1lbGluZVlTY2FsZVwiXG4gICAgICAgICAgICBbY29sb3JzXT1cImNvbG9yc1wiXG4gICAgICAgICAgICBbZGF0YV09XCJzZXJpZXNcIlxuICAgICAgICAgICAgW3NjYWxlVHlwZV09XCJzY2FsZVR5cGVcIlxuICAgICAgICAgICAgW2N1cnZlXT1cImN1cnZlXCJcbiAgICAgICAgICAgIFtoYXNSYW5nZV09XCJoYXNSYW5nZVwiXG4gICAgICAgICAgICBbYW5pbWF0aW9uc109XCJhbmltYXRpb25zXCJcbiAgICAgICAgICAvPlxuICAgICAgICA8L3N2ZzpnPlxuICAgICAgPC9zdmc6Zz5cbiAgICA8L25neC1jaGFydHMtY2hhcnQ+XG4gIGAsXG4gIHN0eWxlVXJsczogWycuLi9jb21tb24vYmFzZS1jaGFydC5jb21wb25lbnQuc2NzcyddLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgYW5pbWF0aW9uczogW1xuICAgIHRyaWdnZXIoJ2FuaW1hdGlvblN0YXRlJywgW1xuICAgICAgdHJhbnNpdGlvbignOmxlYXZlJywgW1xuICAgICAgICBzdHlsZSh7XG4gICAgICAgICAgb3BhY2l0eTogMVxuICAgICAgICB9KSxcbiAgICAgICAgYW5pbWF0ZShcbiAgICAgICAgICA1MDAsXG4gICAgICAgICAgc3R5bGUoe1xuICAgICAgICAgICAgb3BhY2l0eTogMFxuICAgICAgICAgIH0pXG4gICAgICAgIClcbiAgICAgIF0pXG4gICAgXSlcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBMaW5lQ2hhcnRDb21wb25lbnQgZXh0ZW5kcyBCYXNlQ2hhcnRDb21wb25lbnQge1xuICBASW5wdXQoKSBsZWdlbmQ7XG4gIEBJbnB1dCgpIGxlZ2VuZFRpdGxlOiBzdHJpbmcgPSAnTGVnZW5kJztcbiAgQElucHV0KCkgbGVnZW5kUG9zaXRpb246IHN0cmluZyA9ICdyaWdodCc7XG4gIEBJbnB1dCgpIGxlZ2VuZEF2ZXJhZ2VzOiBhbnlbXSA9IFtdO1xuICBASW5wdXQoKSB4QXhpcztcbiAgQElucHV0KCkgeUF4aXM7XG4gIEBJbnB1dCgpIHNob3dYQXhpc0xhYmVsO1xuICBASW5wdXQoKSBzaG93WUF4aXNMYWJlbDtcbiAgQElucHV0KCkgeEF4aXNMYWJlbDtcbiAgQElucHV0KCkgeUF4aXNMYWJlbDtcbiAgQElucHV0KCkgYXV0b1NjYWxlO1xuICBASW5wdXQoKSB0aW1lbGluZTtcbiAgQElucHV0KCkgZ3JhZGllbnQ6IGJvb2xlYW47XG4gIEBJbnB1dCgpIHNob3dHcmlkTGluZXM6IGJvb2xlYW4gPSB0cnVlO1xuICBASW5wdXQoKSBjdXJ2ZTogYW55ID0gY3VydmVMaW5lYXI7XG4gIEBJbnB1dCgpIGFjdGl2ZUVudHJpZXM6IGFueVtdID0gW107XG4gIEBJbnB1dCgpIHNjaGVtZVR5cGU6IHN0cmluZztcbiAgQElucHV0KCkgcmFuZ2VGaWxsT3BhY2l0eTogbnVtYmVyO1xuICBASW5wdXQoKSB0cmltWEF4aXNUaWNrczogYm9vbGVhbiA9IHRydWU7XG4gIEBJbnB1dCgpIHRyaW1ZQXhpc1RpY2tzOiBib29sZWFuID0gdHJ1ZTtcbiAgQElucHV0KCkgcm90YXRlWEF4aXNUaWNrczogYm9vbGVhbiA9IHRydWU7XG4gIEBJbnB1dCgpIG1heFhBeGlzVGlja0xlbmd0aDogbnVtYmVyID0gMTY7XG4gIEBJbnB1dCgpIG1heFlBeGlzVGlja0xlbmd0aDogbnVtYmVyID0gMTY7XG4gIEBJbnB1dCgpIHhBeGlzVGlja0Zvcm1hdHRpbmc6IGFueTtcbiAgQElucHV0KCkgeUF4aXNUaWNrRm9ybWF0dGluZzogYW55O1xuICBASW5wdXQoKSB4QXhpc1RpY2tzOiBhbnlbXTtcbiAgQElucHV0KCkgeUF4aXNUaWNrczogYW55W107XG4gIEBJbnB1dCgpIHJvdW5kRG9tYWluczogYm9vbGVhbiA9IGZhbHNlO1xuICBASW5wdXQoKSB0b29sdGlwRGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KCkgc2hvd1JlZkxpbmVzOiBib29sZWFuID0gZmFsc2U7XG4gIEBJbnB1dCgpIHJlZmVyZW5jZUxpbmVzOiBhbnk7XG4gIEBJbnB1dCgpIHNob3dSZWZMYWJlbHM6IGJvb2xlYW4gPSB0cnVlO1xuICBASW5wdXQoKSB4U2NhbGVNaW46IGFueTtcbiAgQElucHV0KCkgeFNjYWxlTWF4OiBhbnk7XG4gIEBJbnB1dCgpIHlTY2FsZU1pbjogbnVtYmVyO1xuICBASW5wdXQoKSB5U2NhbGVNYXg6IG51bWJlcjtcblxuICBAT3V0cHV0KCkgYWN0aXZhdGU6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgZGVhY3RpdmF0ZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgQENvbnRlbnRDaGlsZCgndG9vbHRpcFRlbXBsYXRlJykgdG9vbHRpcFRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuICBAQ29udGVudENoaWxkKCdzZXJpZXNUb29sdGlwVGVtcGxhdGUnKSBzZXJpZXNUb29sdGlwVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgZGltczogVmlld0RpbWVuc2lvbnM7XG4gIHhTZXQ6IGFueTtcbiAgeERvbWFpbjogYW55O1xuICB5RG9tYWluOiBhbnk7XG4gIHNlcmllc0RvbWFpbjogYW55O1xuICB5U2NhbGU6IGFueTtcbiAgeFNjYWxlOiBhbnk7XG4gIGNvbG9yczogQ29sb3JIZWxwZXI7XG4gIHNjYWxlVHlwZTogc3RyaW5nO1xuICB0cmFuc2Zvcm06IHN0cmluZztcbiAgY2xpcFBhdGg6IHN0cmluZztcbiAgY2xpcFBhdGhJZDogc3RyaW5nO1xuICBzZXJpZXM6IGFueTtcbiAgYXJlYVBhdGg6IGFueTtcbiAgbWFyZ2luID0gWzEwLCAyMCwgMTAsIDIwXTtcbiAgaG92ZXJlZFZlcnRpY2FsOiBhbnk7IC8vIHRoZSB2YWx1ZSBvZiB0aGUgeCBheGlzIHRoYXQgaXMgaG92ZXJlZCBvdmVyXG4gIHhBeGlzSGVpZ2h0OiBudW1iZXIgPSAwO1xuICB5QXhpc1dpZHRoOiBudW1iZXIgPSAwO1xuICBmaWx0ZXJlZERvbWFpbjogYW55O1xuICBsZWdlbmRPcHRpb25zOiBhbnk7XG4gIGhhc1JhbmdlOiBib29sZWFuOyAvLyB3aGV0aGVyIHRoZSBsaW5lIGhhcyBhIG1pbi1tYXggcmFuZ2UgYXJvdW5kIGl0XG4gIHRpbWVsaW5lV2lkdGg6IGFueTtcbiAgdGltZWxpbmVIZWlnaHQ6IG51bWJlciA9IDUwO1xuICB0aW1lbGluZVhTY2FsZTogYW55O1xuICB0aW1lbGluZVlTY2FsZTogYW55O1xuICB0aW1lbGluZVhEb21haW46IGFueTtcbiAgdGltZWxpbmVUcmFuc2Zvcm06IGFueTtcbiAgdGltZWxpbmVQYWRkaW5nOiBudW1iZXIgPSAxMDtcblxuICB1cGRhdGUoKTogdm9pZCB7XG4gICAgc3VwZXIudXBkYXRlKCk7XG5cbiAgICB0aGlzLmRpbXMgPSBjYWxjdWxhdGVWaWV3RGltZW5zaW9ucyh7XG4gICAgICB3aWR0aDogdGhpcy53aWR0aCxcbiAgICAgIGhlaWdodDogdGhpcy5oZWlnaHQsXG4gICAgICBtYXJnaW5zOiB0aGlzLm1hcmdpbixcbiAgICAgIHNob3dYQXhpczogdGhpcy54QXhpcyxcbiAgICAgIHNob3dZQXhpczogdGhpcy55QXhpcyxcbiAgICAgIHhBeGlzSGVpZ2h0OiB0aGlzLnhBeGlzSGVpZ2h0LFxuICAgICAgeUF4aXNXaWR0aDogdGhpcy55QXhpc1dpZHRoLFxuICAgICAgc2hvd1hMYWJlbDogdGhpcy5zaG93WEF4aXNMYWJlbCxcbiAgICAgIHNob3dZTGFiZWw6IHRoaXMuc2hvd1lBeGlzTGFiZWwsXG4gICAgICBzaG93TGVnZW5kOiB0aGlzLmxlZ2VuZCxcbiAgICAgIGxlZ2VuZFR5cGU6IHRoaXMuc2NoZW1lVHlwZSxcbiAgICAgIGxlZ2VuZFBvc2l0aW9uOiB0aGlzLmxlZ2VuZFBvc2l0aW9uXG4gICAgfSk7XG5cbiAgICBpZiAodGhpcy50aW1lbGluZSkge1xuICAgICAgdGhpcy5kaW1zLmhlaWdodCAtPSB0aGlzLnRpbWVsaW5lSGVpZ2h0ICsgdGhpcy5tYXJnaW5bMl0gKyB0aGlzLnRpbWVsaW5lUGFkZGluZztcbiAgICB9XG5cbiAgICB0aGlzLnhEb21haW4gPSB0aGlzLmdldFhEb21haW4oKTtcbiAgICBpZiAodGhpcy5maWx0ZXJlZERvbWFpbikge1xuICAgICAgdGhpcy54RG9tYWluID0gdGhpcy5maWx0ZXJlZERvbWFpbjtcbiAgICB9XG5cbiAgICB0aGlzLnlEb21haW4gPSB0aGlzLmdldFlEb21haW4oKTtcbiAgICB0aGlzLnNlcmllc0RvbWFpbiA9IHRoaXMuZ2V0U2VyaWVzRG9tYWluKCk7XG5cbiAgICB0aGlzLnhTY2FsZSA9IHRoaXMuZ2V0WFNjYWxlKHRoaXMueERvbWFpbiwgdGhpcy5kaW1zLndpZHRoKTtcbiAgICB0aGlzLnlTY2FsZSA9IHRoaXMuZ2V0WVNjYWxlKHRoaXMueURvbWFpbiwgdGhpcy5kaW1zLmhlaWdodCk7XG5cbiAgICB0aGlzLnVwZGF0ZVRpbWVsaW5lKCk7XG5cbiAgICB0aGlzLnNldENvbG9ycygpO1xuICAgIHRoaXMubGVnZW5kT3B0aW9ucyA9IHRoaXMuZ2V0TGVnZW5kT3B0aW9ucygpO1xuXG4gICAgdGhpcy50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlKCR7dGhpcy5kaW1zLnhPZmZzZXR9ICwgJHt0aGlzLm1hcmdpblswXX0pYDtcblxuICAgIHRoaXMuY2xpcFBhdGhJZCA9ICdjbGlwJyArIGlkKCkudG9TdHJpbmcoKTtcbiAgICB0aGlzLmNsaXBQYXRoID0gYHVybCgjJHt0aGlzLmNsaXBQYXRoSWR9KWA7XG4gIH1cblxuICB1cGRhdGVUaW1lbGluZSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy50aW1lbGluZSkge1xuICAgICAgdGhpcy50aW1lbGluZVdpZHRoID0gdGhpcy5kaW1zLndpZHRoO1xuICAgICAgdGhpcy50aW1lbGluZVhEb21haW4gPSB0aGlzLmdldFhEb21haW4oKTtcbiAgICAgIHRoaXMudGltZWxpbmVYU2NhbGUgPSB0aGlzLmdldFhTY2FsZSh0aGlzLnRpbWVsaW5lWERvbWFpbiwgdGhpcy50aW1lbGluZVdpZHRoKTtcbiAgICAgIHRoaXMudGltZWxpbmVZU2NhbGUgPSB0aGlzLmdldFlTY2FsZSh0aGlzLnlEb21haW4sIHRoaXMudGltZWxpbmVIZWlnaHQpO1xuICAgICAgdGhpcy50aW1lbGluZVRyYW5zZm9ybSA9IGB0cmFuc2xhdGUoJHt0aGlzLmRpbXMueE9mZnNldH0sICR7LXRoaXMubWFyZ2luWzJdfSlgO1xuICAgIH1cbiAgfVxuXG4gIGdldFhEb21haW4oKTogYW55W10ge1xuICAgIGxldCB2YWx1ZXMgPSBnZXRVbmlxdWVYRG9tYWluVmFsdWVzKHRoaXMucmVzdWx0cyk7XG5cbiAgICB0aGlzLnNjYWxlVHlwZSA9IGdldFNjYWxlVHlwZSh2YWx1ZXMpO1xuICAgIGxldCBkb21haW4gPSBbXTtcblxuICAgIGlmICh0aGlzLnNjYWxlVHlwZSA9PT0gJ2xpbmVhcicpIHtcbiAgICAgIHZhbHVlcyA9IHZhbHVlcy5tYXAodiA9PiBOdW1iZXIodikpO1xuICAgIH1cblxuICAgIGxldCBtaW47XG4gICAgbGV0IG1heDtcbiAgICBpZiAodGhpcy5zY2FsZVR5cGUgPT09ICd0aW1lJyB8fCB0aGlzLnNjYWxlVHlwZSA9PT0gJ2xpbmVhcicpIHtcbiAgICAgIG1pbiA9IHRoaXMueFNjYWxlTWluID8gdGhpcy54U2NhbGVNaW4gOiBNYXRoLm1pbiguLi52YWx1ZXMpO1xuXG4gICAgICBtYXggPSB0aGlzLnhTY2FsZU1heCA/IHRoaXMueFNjYWxlTWF4IDogTWF0aC5tYXgoLi4udmFsdWVzKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5zY2FsZVR5cGUgPT09ICd0aW1lJykge1xuICAgICAgZG9tYWluID0gW25ldyBEYXRlKG1pbiksIG5ldyBEYXRlKG1heCldO1xuICAgICAgdGhpcy54U2V0ID0gWy4uLnZhbHVlc10uc29ydCgoYSwgYikgPT4ge1xuICAgICAgICBjb25zdCBhRGF0ZSA9IGEuZ2V0VGltZSgpO1xuICAgICAgICBjb25zdCBiRGF0ZSA9IGIuZ2V0VGltZSgpO1xuICAgICAgICBpZiAoYURhdGUgPiBiRGF0ZSkgcmV0dXJuIDE7XG4gICAgICAgIGlmIChiRGF0ZSA+IGFEYXRlKSByZXR1cm4gLTE7XG4gICAgICAgIHJldHVybiAwO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIGlmICh0aGlzLnNjYWxlVHlwZSA9PT0gJ2xpbmVhcicpIHtcbiAgICAgIGRvbWFpbiA9IFttaW4sIG1heF07XG4gICAgICAvLyBVc2UgY29tcGFyZSBmdW5jdGlvbiB0byBzb3J0IG51bWJlcnMgbnVtZXJpY2FsbHlcbiAgICAgIHRoaXMueFNldCA9IFsuLi52YWx1ZXNdLnNvcnQoKGEsIGIpID0+IGEgLSBiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZG9tYWluID0gdmFsdWVzO1xuICAgICAgdGhpcy54U2V0ID0gdmFsdWVzO1xuICAgIH1cblxuICAgIHJldHVybiBkb21haW47XG4gIH1cblxuICBnZXRZRG9tYWluKCk6IGFueVtdIHtcbiAgICBjb25zdCBkb21haW4gPSBbXTtcbiAgICBmb3IgKGNvbnN0IHJlc3VsdHMgb2YgdGhpcy5yZXN1bHRzKSB7XG4gICAgICBmb3IgKGNvbnN0IGQgb2YgcmVzdWx0cy5zZXJpZXMpIHtcbiAgICAgICAgaWYgKGRvbWFpbi5pbmRleE9mKGQudmFsdWUpIDwgMCkge1xuICAgICAgICAgIGRvbWFpbi5wdXNoKGQudmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkLm1pbiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgdGhpcy5oYXNSYW5nZSA9IHRydWU7XG4gICAgICAgICAgaWYgKGRvbWFpbi5pbmRleE9mKGQubWluKSA8IDApIHtcbiAgICAgICAgICAgIGRvbWFpbi5wdXNoKGQubWluKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGQubWF4ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICB0aGlzLmhhc1JhbmdlID0gdHJ1ZTtcbiAgICAgICAgICBpZiAoZG9tYWluLmluZGV4T2YoZC5tYXgpIDwgMCkge1xuICAgICAgICAgICAgZG9tYWluLnB1c2goZC5tYXgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IHZhbHVlcyA9IFsuLi5kb21haW5dO1xuICAgIGlmICghdGhpcy5hdXRvU2NhbGUpIHtcbiAgICAgIHZhbHVlcy5wdXNoKDApO1xuICAgIH1cblxuICAgIGNvbnN0IG1pbiA9IHRoaXMueVNjYWxlTWluID8gdGhpcy55U2NhbGVNaW4gOiBNYXRoLm1pbiguLi52YWx1ZXMpO1xuXG4gICAgY29uc3QgbWF4ID0gdGhpcy55U2NhbGVNYXggPyB0aGlzLnlTY2FsZU1heCA6IE1hdGgubWF4KC4uLnZhbHVlcyk7XG5cbiAgICByZXR1cm4gW21pbiwgbWF4XTtcbiAgfVxuXG4gIGdldFNlcmllc0RvbWFpbigpOiBhbnlbXSB7XG4gICAgcmV0dXJuIHRoaXMucmVzdWx0cy5tYXAoZCA9PiBkLm5hbWUpO1xuICB9XG5cbiAgZ2V0WFNjYWxlKGRvbWFpbiwgd2lkdGgpOiBhbnkge1xuICAgIGxldCBzY2FsZTtcblxuICAgIGlmICh0aGlzLnNjYWxlVHlwZSA9PT0gJ3RpbWUnKSB7XG4gICAgICBzY2FsZSA9IHNjYWxlVGltZSgpXG4gICAgICAgIC5yYW5nZShbMCwgd2lkdGhdKVxuICAgICAgICAuZG9tYWluKGRvbWFpbik7XG4gICAgfSBlbHNlIGlmICh0aGlzLnNjYWxlVHlwZSA9PT0gJ2xpbmVhcicpIHtcbiAgICAgIHNjYWxlID0gc2NhbGVMaW5lYXIoKVxuICAgICAgICAucmFuZ2UoWzAsIHdpZHRoXSlcbiAgICAgICAgLmRvbWFpbihkb21haW4pO1xuXG4gICAgICBpZiAodGhpcy5yb3VuZERvbWFpbnMpIHtcbiAgICAgICAgc2NhbGUgPSBzY2FsZS5uaWNlKCk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh0aGlzLnNjYWxlVHlwZSA9PT0gJ29yZGluYWwnKSB7XG4gICAgICBzY2FsZSA9IHNjYWxlUG9pbnQoKVxuICAgICAgICAucmFuZ2UoWzAsIHdpZHRoXSlcbiAgICAgICAgLnBhZGRpbmcoMC4xKVxuICAgICAgICAuZG9tYWluKGRvbWFpbik7XG4gICAgfVxuXG4gICAgcmV0dXJuIHNjYWxlO1xuICB9XG5cbiAgZ2V0WVNjYWxlKGRvbWFpbiwgaGVpZ2h0KTogYW55IHtcbiAgICBjb25zdCBzY2FsZSA9IHNjYWxlTGluZWFyKClcbiAgICAgIC5yYW5nZShbaGVpZ2h0LCAwXSlcbiAgICAgIC5kb21haW4oZG9tYWluKTtcblxuICAgIHJldHVybiB0aGlzLnJvdW5kRG9tYWlucyA/IHNjYWxlLm5pY2UoKSA6IHNjYWxlO1xuICB9XG5cbiAgdXBkYXRlRG9tYWluKGRvbWFpbik6IHZvaWQge1xuICAgIHRoaXMuZmlsdGVyZWREb21haW4gPSBkb21haW47XG4gICAgdGhpcy54RG9tYWluID0gdGhpcy5maWx0ZXJlZERvbWFpbjtcbiAgICB0aGlzLnhTY2FsZSA9IHRoaXMuZ2V0WFNjYWxlKHRoaXMueERvbWFpbiwgdGhpcy5kaW1zLndpZHRoKTtcbiAgfVxuXG4gIHVwZGF0ZUhvdmVyZWRWZXJ0aWNhbChpdGVtKTogdm9pZCB7XG4gICAgdGhpcy5ob3ZlcmVkVmVydGljYWwgPSBpdGVtLnZhbHVlO1xuICAgIHRoaXMuZGVhY3RpdmF0ZUFsbCgpO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignbW91c2VsZWF2ZScpXG4gIGhpZGVDaXJjbGVzKCk6IHZvaWQge1xuICAgIHRoaXMuaG92ZXJlZFZlcnRpY2FsID0gbnVsbDtcbiAgICB0aGlzLmRlYWN0aXZhdGVBbGwoKTtcbiAgfVxuXG4gIG9uQ2xpY2soZGF0YSk6IHZvaWQge1xuICAgIHRoaXMuc2VsZWN0LmVtaXQoZGF0YSk7XG4gIH1cblxuICB0cmFja0J5KGluZGV4LCBpdGVtKTogc3RyaW5nIHtcbiAgICByZXR1cm4gaXRlbS5uYW1lO1xuICB9XG5cbiAgc2V0Q29sb3JzKCk6IHZvaWQge1xuICAgIGxldCBkb21haW47XG4gICAgaWYgKHRoaXMuc2NoZW1lVHlwZSA9PT0gJ29yZGluYWwnKSB7XG4gICAgICBkb21haW4gPSB0aGlzLnNlcmllc0RvbWFpbjtcbiAgICB9IGVsc2Uge1xuICAgICAgZG9tYWluID0gdGhpcy55RG9tYWluO1xuICAgIH1cblxuICAgIHRoaXMuY29sb3JzID0gbmV3IENvbG9ySGVscGVyKHRoaXMuc2NoZW1lLCB0aGlzLnNjaGVtZVR5cGUsIGRvbWFpbiwgdGhpcy5jdXN0b21Db2xvcnMpO1xuICB9XG5cbiAgZ2V0TGVnZW5kT3B0aW9ucygpIHtcbiAgICBjb25zdCBvcHRzID0ge1xuICAgICAgc2NhbGVUeXBlOiB0aGlzLnNjaGVtZVR5cGUsXG4gICAgICBjb2xvcnM6IHVuZGVmaW5lZCxcbiAgICAgIGRvbWFpbjogW10sXG4gICAgICB0aXRsZTogdW5kZWZpbmVkLFxuICAgICAgcG9zaXRpb246IHRoaXMubGVnZW5kUG9zaXRpb24sXG4gICAgICBhdmVyYWdlczogdGhpcy5sZWdlbmRBdmVyYWdlc1xuICAgIH07XG4gICAgaWYgKG9wdHMuc2NhbGVUeXBlID09PSAnb3JkaW5hbCcpIHtcbiAgICAgIG9wdHMuZG9tYWluID0gdGhpcy5zZXJpZXNEb21haW47XG4gICAgICBvcHRzLmNvbG9ycyA9IHRoaXMuY29sb3JzO1xuICAgICAgb3B0cy50aXRsZSA9IHRoaXMubGVnZW5kVGl0bGU7XG4gICAgfSBlbHNlIHtcbiAgICAgIG9wdHMuZG9tYWluID0gdGhpcy55RG9tYWluO1xuICAgICAgb3B0cy5jb2xvcnMgPSB0aGlzLmNvbG9ycy5zY2FsZTtcbiAgICB9XG4gICAgcmV0dXJuIG9wdHM7XG4gIH1cblxuICB1cGRhdGVZQXhpc1dpZHRoKHsgd2lkdGggfSk6IHZvaWQge1xuICAgIHRoaXMueUF4aXNXaWR0aCA9IHdpZHRoO1xuICAgIHRoaXMudXBkYXRlKCk7XG4gIH1cblxuICB1cGRhdGVYQXhpc0hlaWdodCh7IGhlaWdodCB9KTogdm9pZCB7XG4gICAgdGhpcy54QXhpc0hlaWdodCA9IGhlaWdodDtcbiAgICB0aGlzLnVwZGF0ZSgpO1xuICB9XG5cbiAgb25BY3RpdmF0ZShpdGVtKSB7XG4gICAgdGhpcy5kZWFjdGl2YXRlQWxsKCk7XG5cbiAgICBjb25zdCBpZHggPSB0aGlzLmFjdGl2ZUVudHJpZXMuZmluZEluZGV4KGQgPT4ge1xuICAgICAgcmV0dXJuIGQubmFtZSA9PT0gaXRlbS5uYW1lICYmIGQudmFsdWUgPT09IGl0ZW0udmFsdWU7XG4gICAgfSk7XG4gICAgaWYgKGlkeCA+IC0xKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5hY3RpdmVFbnRyaWVzID0gW2l0ZW1dO1xuICAgIHRoaXMuYWN0aXZhdGUuZW1pdCh7IHZhbHVlOiBpdGVtLCBlbnRyaWVzOiB0aGlzLmFjdGl2ZUVudHJpZXMgfSk7XG4gIH1cblxuICBvbkRlYWN0aXZhdGUoaXRlbSkge1xuICAgIGNvbnN0IGlkeCA9IHRoaXMuYWN0aXZlRW50cmllcy5maW5kSW5kZXgoZCA9PiB7XG4gICAgICByZXR1cm4gZC5uYW1lID09PSBpdGVtLm5hbWUgJiYgZC52YWx1ZSA9PT0gaXRlbS52YWx1ZTtcbiAgICB9KTtcblxuICAgIHRoaXMuYWN0aXZlRW50cmllcy5zcGxpY2UoaWR4LCAxKTtcbiAgICB0aGlzLmFjdGl2ZUVudHJpZXMgPSBbLi4udGhpcy5hY3RpdmVFbnRyaWVzXTtcblxuICAgIHRoaXMuZGVhY3RpdmF0ZS5lbWl0KHsgdmFsdWU6IGl0ZW0sIGVudHJpZXM6IHRoaXMuYWN0aXZlRW50cmllcyB9KTtcbiAgfVxuXG4gIGRlYWN0aXZhdGVBbGwoKSB7XG4gICAgdGhpcy5hY3RpdmVFbnRyaWVzID0gWy4uLnRoaXMuYWN0aXZlRW50cmllc107XG4gICAgZm9yIChjb25zdCBlbnRyeSBvZiB0aGlzLmFjdGl2ZUVudHJpZXMpIHtcbiAgICAgIHRoaXMuZGVhY3RpdmF0ZS5lbWl0KHsgdmFsdWU6IGVudHJ5LCBlbnRyaWVzOiBbXSB9KTtcbiAgICB9XG4gICAgdGhpcy5hY3RpdmVFbnRyaWVzID0gW107XG4gIH1cbn1cbiJdfQ==