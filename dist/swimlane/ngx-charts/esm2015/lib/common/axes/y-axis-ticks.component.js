import { __decorate } from "tslib";
import { Component, Input, Output, ViewChild, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { trimLabel } from '../trim-label.helper';
import { reduceTicks } from './ticks.helper';
import { roundedRect } from '../../common/shape.helper';
let YAxisTicksComponent = class YAxisTicksComponent {
    constructor() {
        this.tickArguments = [5];
        this.tickStroke = '#ccc';
        this.trimTicks = true;
        this.maxTickLength = 16;
        this.showGridLines = false;
        this.showRefLabels = false;
        this.showRefLines = false;
        this.dimensionsChanged = new EventEmitter();
        this.innerTickSize = 6;
        this.tickPadding = 3;
        this.verticalSpacing = 20;
        this.textAnchor = 'middle';
        this.width = 0;
        this.outerTickSize = 6;
        this.rotateLabels = false;
        this.referenceLineLength = 0;
    }
    ngOnChanges(changes) {
        this.update();
    }
    ngAfterViewInit() {
        setTimeout(() => this.updateDims());
    }
    updateDims() {
        const width = parseInt(this.ticksElement.nativeElement.getBoundingClientRect().width, 10);
        if (width !== this.width) {
            this.width = width;
            this.dimensionsChanged.emit({ width });
            setTimeout(() => this.updateDims());
        }
    }
    update() {
        let scale;
        const sign = this.orient === 'top' || this.orient === 'right' ? -1 : 1;
        this.tickSpacing = Math.max(this.innerTickSize, 0) + this.tickPadding;
        scale = this.scale;
        this.ticks = this.getTicks();
        if (this.tickFormatting) {
            this.tickFormat = this.tickFormatting;
        }
        else if (scale.tickFormat) {
            this.tickFormat = scale.tickFormat.apply(scale, this.tickArguments);
        }
        else {
            this.tickFormat = function (d) {
                if (d.constructor.name === 'Date') {
                    return d.toLocaleDateString();
                }
                return d.toLocaleString();
            };
        }
        this.adjustedScale = scale.bandwidth
            ? function (d) {
                return scale(d) + scale.bandwidth() * 0.5;
            }
            : scale;
        if (this.showRefLines && this.referenceLines) {
            this.setReferencelines();
        }
        switch (this.orient) {
            case 'top':
                this.transform = function (tick) {
                    return 'translate(' + this.adjustedScale(tick) + ',0)';
                };
                this.textAnchor = 'middle';
                this.y2 = this.innerTickSize * sign;
                this.y1 = this.tickSpacing * sign;
                this.dy = sign < 0 ? '0em' : '.71em';
                break;
            case 'bottom':
                this.transform = function (tick) {
                    return 'translate(' + this.adjustedScale(tick) + ',0)';
                };
                this.textAnchor = 'middle';
                this.y2 = this.innerTickSize * sign;
                this.y1 = this.tickSpacing * sign;
                this.dy = sign < 0 ? '0em' : '.71em';
                break;
            case 'left':
                this.transform = function (tick) {
                    return 'translate(0,' + this.adjustedScale(tick) + ')';
                };
                this.textAnchor = 'end';
                this.x2 = this.innerTickSize * -sign;
                this.x1 = this.tickSpacing * -sign;
                this.dy = '.32em';
                break;
            case 'right':
                this.transform = function (tick) {
                    return 'translate(0,' + this.adjustedScale(tick) + ')';
                };
                this.textAnchor = 'start';
                this.x2 = this.innerTickSize * -sign;
                this.x1 = this.tickSpacing * -sign;
                this.dy = '.32em';
                break;
            default:
        }
        setTimeout(() => this.updateDims());
    }
    setReferencelines() {
        this.refMin = this.adjustedScale(Math.min.apply(null, this.referenceLines.map(item => item.value)));
        this.refMax = this.adjustedScale(Math.max.apply(null, this.referenceLines.map(item => item.value)));
        this.referenceLineLength = this.referenceLines.length;
        this.referenceAreaPath = roundedRect(0, this.refMax, this.gridLineWidth, this.refMin - this.refMax, 0, [
            false,
            false,
            false,
            false
        ]);
    }
    getTicks() {
        let ticks;
        const maxTicks = this.getMaxTicks(20);
        const maxScaleTicks = this.getMaxTicks(50);
        if (this.tickValues) {
            ticks = this.tickValues;
        }
        else if (this.scale.ticks) {
            ticks = this.scale.ticks.apply(this.scale, [maxScaleTicks]);
        }
        else {
            ticks = this.scale.domain();
            ticks = reduceTicks(ticks, maxTicks);
        }
        return ticks;
    }
    getMaxTicks(tickHeight) {
        return Math.floor(this.height / tickHeight);
    }
    tickTransform(tick) {
        return `translate(${this.adjustedScale(tick)},${this.verticalSpacing})`;
    }
    gridLineTransform() {
        return `translate(5,0)`;
    }
    tickTrim(label) {
        return this.trimTicks ? trimLabel(label, this.maxTickLength) : label;
    }
    isNotANumber(value) {
        return isNaN(value);
    }
};
__decorate([
    Input()
], YAxisTicksComponent.prototype, "scale", void 0);
__decorate([
    Input()
], YAxisTicksComponent.prototype, "orient", void 0);
__decorate([
    Input()
], YAxisTicksComponent.prototype, "tickArguments", void 0);
__decorate([
    Input()
], YAxisTicksComponent.prototype, "tickValues", void 0);
__decorate([
    Input()
], YAxisTicksComponent.prototype, "tickStroke", void 0);
__decorate([
    Input()
], YAxisTicksComponent.prototype, "trimTicks", void 0);
__decorate([
    Input()
], YAxisTicksComponent.prototype, "maxTickLength", void 0);
__decorate([
    Input()
], YAxisTicksComponent.prototype, "tickFormatting", void 0);
__decorate([
    Input()
], YAxisTicksComponent.prototype, "showGridLines", void 0);
__decorate([
    Input()
], YAxisTicksComponent.prototype, "gridLineWidth", void 0);
__decorate([
    Input()
], YAxisTicksComponent.prototype, "height", void 0);
__decorate([
    Input()
], YAxisTicksComponent.prototype, "referenceLines", void 0);
__decorate([
    Input()
], YAxisTicksComponent.prototype, "showRefLabels", void 0);
__decorate([
    Input()
], YAxisTicksComponent.prototype, "showRefLines", void 0);
__decorate([
    Output()
], YAxisTicksComponent.prototype, "dimensionsChanged", void 0);
__decorate([
    ViewChild('ticksel')
], YAxisTicksComponent.prototype, "ticksElement", void 0);
YAxisTicksComponent = __decorate([
    Component({
        selector: 'g[ngx-charts-y-axis-ticks]',
        template: `
    <svg:g #ticksel>
      <svg:g *ngFor="let tick of ticks" class="tick" [attr.transform]="transform(tick)">
        <title>{{ tickFormat(tick) }}</title>
        <svg:text
          stroke-width="0.01"
          [attr.dy]="dy"
          [attr.x]="x1"
          [attr.y]="y1"
          [attr.text-anchor]="textAnchor"
          [style.font-size]="'12px'"
        >
          {{ tickTrim(tickFormat(tick)) }}
        </svg:text>
      </svg:g>
    </svg:g>

    <svg:path
      *ngIf="referenceLineLength > 1 && refMax && refMin && showRefLines"
      class="reference-area"
      [attr.d]="referenceAreaPath"
      [attr.transform]="gridLineTransform()"
    />
    <svg:g *ngFor="let tick of ticks" [attr.transform]="transform(tick)">
      <svg:g *ngIf="showGridLines" [attr.transform]="gridLineTransform()">
        <svg:line
          *ngIf="orient === 'left'"
          class="gridline-path gridline-path-horizontal"
          x1="0"
          [attr.x2]="gridLineWidth"
        />
        <svg:line
          *ngIf="orient === 'right'"
          class="gridline-path gridline-path-horizontal"
          x1="0"
          [attr.x2]="-gridLineWidth"
        />
      </svg:g>
    </svg:g>

    <svg:g *ngFor="let refLine of referenceLines">
      <svg:g *ngIf="showRefLines && !isNotANumber(refLine.value)" [attr.transform]="transform(refLine.value)">
        <svg:line
          class="refline-path gridline-path-horizontal"
          x1="0"
          [attr.fill]="refLine.color"
          [attr.stroke]="refLine.color"
          [attr.x2]="gridLineWidth"
          [attr.transform]="gridLineTransform()"
        />
        <svg:g *ngIf="showRefLabels">
          <title>{{ tickTrim(tickFormat(refLine.value)) }}</title>
          <svg:text
            class="refline-label"
            [attr.fill]="refLine.color"
            [attr.dy]="dy"
            [attr.y]="-6"
            [attr.x]="gridLineWidth"
            [attr.text-anchor]="textAnchor"
          >
            {{ refLine.name }}
          </svg:text>

          <svg:text
            stroke-width="0.01"
            [attr.fill]="refLine.color"
            [attr.dy]="dy"
            [attr.x]="x1"
            [attr.y]="y1"
            [attr.text-anchor]="textAnchor"
            [style.font-size]="'12px'">
            {{refLine.value | number:'1.1-2'}}
          </svg:text>
        </svg:g>
      </svg:g>
    </svg:g>
  `,
        changeDetection: ChangeDetectionStrategy.OnPush
    })
], YAxisTicksComponent);
export { YAxisTicksComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieS1heGlzLXRpY2tzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bzd2ltbGFuZS9uZ3gtY2hhcnRzLyIsInNvdXJjZXMiOlsibGliL2NvbW1vbi9heGVzL3ktYXhpcy10aWNrcy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsS0FBSyxFQUNMLE1BQU0sRUFHTixTQUFTLEVBQ1QsWUFBWSxFQUVaLHVCQUF1QixFQUV4QixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDakQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzdDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQW1GeEQsSUFBYSxtQkFBbUIsR0FBaEMsTUFBYSxtQkFBbUI7SUFBaEM7UUFHVyxrQkFBYSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFcEIsZUFBVSxHQUFHLE1BQU0sQ0FBQztRQUNwQixjQUFTLEdBQVksSUFBSSxDQUFDO1FBQzFCLGtCQUFhLEdBQVcsRUFBRSxDQUFDO1FBRTNCLGtCQUFhLEdBQUcsS0FBSyxDQUFDO1FBSXRCLGtCQUFhLEdBQVksS0FBSyxDQUFDO1FBQy9CLGlCQUFZLEdBQVksS0FBSyxDQUFDO1FBRTdCLHNCQUFpQixHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFFakQsa0JBQWEsR0FBUSxDQUFDLENBQUM7UUFDdkIsZ0JBQVcsR0FBUSxDQUFDLENBQUM7UUFFckIsb0JBQWUsR0FBVyxFQUFFLENBQUM7UUFDN0IsZUFBVSxHQUFRLFFBQVEsQ0FBQztRQVUzQixVQUFLLEdBQVcsQ0FBQyxDQUFDO1FBQ2xCLGtCQUFhLEdBQVcsQ0FBQyxDQUFDO1FBQzFCLGlCQUFZLEdBQVksS0FBSyxDQUFDO1FBRzlCLHdCQUFtQixHQUFXLENBQUMsQ0FBQztJQTBKbEMsQ0FBQztJQXJK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QUFFLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO0lBQ3ZFLENBQUM7SUFDRCxZQUFZLENBQUMsS0FBSztRQUNoQixPQUFPLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN0QixDQUFDO0NBRUYsQ0FBQTtBQTlMVTtJQUFSLEtBQUssRUFBRTtrREFBTztBQUNOO0lBQVIsS0FBSyxFQUFFO21EQUFRO0FBQ1A7SUFBUixLQUFLLEVBQUU7MERBQXFCO0FBQ3BCO0lBQVIsS0FBSyxFQUFFO3VEQUFtQjtBQUNsQjtJQUFSLEtBQUssRUFBRTt1REFBcUI7QUFDcEI7SUFBUixLQUFLLEVBQUU7c0RBQTJCO0FBQzFCO0lBQVIsS0FBSyxFQUFFOzBEQUE0QjtBQUMzQjtJQUFSLEtBQUssRUFBRTsyREFBZ0I7QUFDZjtJQUFSLEtBQUssRUFBRTswREFBdUI7QUFDdEI7SUFBUixLQUFLLEVBQUU7MERBQWU7QUFDZDtJQUFSLEtBQUssRUFBRTttREFBUTtBQUNQO0lBQVIsS0FBSyxFQUFFOzJEQUFnQjtBQUNmO0lBQVIsS0FBSyxFQUFFOzBEQUFnQztBQUMvQjtJQUFSLEtBQUssRUFBRTt5REFBK0I7QUFFN0I7SUFBVCxNQUFNLEVBQUU7OERBQXdDO0FBd0IzQjtJQUFyQixTQUFTLENBQUMsU0FBUyxDQUFDO3lEQUEwQjtBQXhDcEMsbUJBQW1CO0lBakYvQixTQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsNEJBQTRCO1FBQ3RDLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTRFVDtRQUNELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO0tBQ2hELENBQUM7R0FDVyxtQkFBbUIsQ0ErTC9CO1NBL0xZLG1CQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgSW5wdXQsXG4gIE91dHB1dCxcbiAgT25DaGFuZ2VzLFxuICBFbGVtZW50UmVmLFxuICBWaWV3Q2hpbGQsXG4gIEV2ZW50RW1pdHRlcixcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIFNpbXBsZUNoYW5nZXNcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyB0cmltTGFiZWwgfSBmcm9tICcuLi90cmltLWxhYmVsLmhlbHBlcic7XG5pbXBvcnQgeyByZWR1Y2VUaWNrcyB9IGZyb20gJy4vdGlja3MuaGVscGVyJztcbmltcG9ydCB7IHJvdW5kZWRSZWN0IH0gZnJvbSAnLi4vLi4vY29tbW9uL3NoYXBlLmhlbHBlcic7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2dbbmd4LWNoYXJ0cy15LWF4aXMtdGlja3NdJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8c3ZnOmcgI3RpY2tzZWw+XG4gICAgICA8c3ZnOmcgKm5nRm9yPVwibGV0IHRpY2sgb2YgdGlja3NcIiBjbGFzcz1cInRpY2tcIiBbYXR0ci50cmFuc2Zvcm1dPVwidHJhbnNmb3JtKHRpY2spXCI+XG4gICAgICAgIDx0aXRsZT57eyB0aWNrRm9ybWF0KHRpY2spIH19PC90aXRsZT5cbiAgICAgICAgPHN2Zzp0ZXh0XG4gICAgICAgICAgc3Ryb2tlLXdpZHRoPVwiMC4wMVwiXG4gICAgICAgICAgW2F0dHIuZHldPVwiZHlcIlxuICAgICAgICAgIFthdHRyLnhdPVwieDFcIlxuICAgICAgICAgIFthdHRyLnldPVwieTFcIlxuICAgICAgICAgIFthdHRyLnRleHQtYW5jaG9yXT1cInRleHRBbmNob3JcIlxuICAgICAgICAgIFtzdHlsZS5mb250LXNpemVdPVwiJzEycHgnXCJcbiAgICAgICAgPlxuICAgICAgICAgIHt7IHRpY2tUcmltKHRpY2tGb3JtYXQodGljaykpIH19XG4gICAgICAgIDwvc3ZnOnRleHQ+XG4gICAgICA8L3N2ZzpnPlxuICAgIDwvc3ZnOmc+XG5cbiAgICA8c3ZnOnBhdGhcbiAgICAgICpuZ0lmPVwicmVmZXJlbmNlTGluZUxlbmd0aCA+IDEgJiYgcmVmTWF4ICYmIHJlZk1pbiAmJiBzaG93UmVmTGluZXNcIlxuICAgICAgY2xhc3M9XCJyZWZlcmVuY2UtYXJlYVwiXG4gICAgICBbYXR0ci5kXT1cInJlZmVyZW5jZUFyZWFQYXRoXCJcbiAgICAgIFthdHRyLnRyYW5zZm9ybV09XCJncmlkTGluZVRyYW5zZm9ybSgpXCJcbiAgICAvPlxuICAgIDxzdmc6ZyAqbmdGb3I9XCJsZXQgdGljayBvZiB0aWNrc1wiIFthdHRyLnRyYW5zZm9ybV09XCJ0cmFuc2Zvcm0odGljaylcIj5cbiAgICAgIDxzdmc6ZyAqbmdJZj1cInNob3dHcmlkTGluZXNcIiBbYXR0ci50cmFuc2Zvcm1dPVwiZ3JpZExpbmVUcmFuc2Zvcm0oKVwiPlxuICAgICAgICA8c3ZnOmxpbmVcbiAgICAgICAgICAqbmdJZj1cIm9yaWVudCA9PT0gJ2xlZnQnXCJcbiAgICAgICAgICBjbGFzcz1cImdyaWRsaW5lLXBhdGggZ3JpZGxpbmUtcGF0aC1ob3Jpem9udGFsXCJcbiAgICAgICAgICB4MT1cIjBcIlxuICAgICAgICAgIFthdHRyLngyXT1cImdyaWRMaW5lV2lkdGhcIlxuICAgICAgICAvPlxuICAgICAgICA8c3ZnOmxpbmVcbiAgICAgICAgICAqbmdJZj1cIm9yaWVudCA9PT0gJ3JpZ2h0J1wiXG4gICAgICAgICAgY2xhc3M9XCJncmlkbGluZS1wYXRoIGdyaWRsaW5lLXBhdGgtaG9yaXpvbnRhbFwiXG4gICAgICAgICAgeDE9XCIwXCJcbiAgICAgICAgICBbYXR0ci54Ml09XCItZ3JpZExpbmVXaWR0aFwiXG4gICAgICAgIC8+XG4gICAgICA8L3N2ZzpnPlxuICAgIDwvc3ZnOmc+XG5cbiAgICA8c3ZnOmcgKm5nRm9yPVwibGV0IHJlZkxpbmUgb2YgcmVmZXJlbmNlTGluZXNcIj5cbiAgICAgIDxzdmc6ZyAqbmdJZj1cInNob3dSZWZMaW5lcyAmJiAhaXNOb3RBTnVtYmVyKHJlZkxpbmUudmFsdWUpXCIgW2F0dHIudHJhbnNmb3JtXT1cInRyYW5zZm9ybShyZWZMaW5lLnZhbHVlKVwiPlxuICAgICAgICA8c3ZnOmxpbmVcbiAgICAgICAgICBjbGFzcz1cInJlZmxpbmUtcGF0aCBncmlkbGluZS1wYXRoLWhvcml6b250YWxcIlxuICAgICAgICAgIHgxPVwiMFwiXG4gICAgICAgICAgW2F0dHIuZmlsbF09XCJyZWZMaW5lLmNvbG9yXCJcbiAgICAgICAgICBbYXR0ci5zdHJva2VdPVwicmVmTGluZS5jb2xvclwiXG4gICAgICAgICAgW2F0dHIueDJdPVwiZ3JpZExpbmVXaWR0aFwiXG4gICAgICAgICAgW2F0dHIudHJhbnNmb3JtXT1cImdyaWRMaW5lVHJhbnNmb3JtKClcIlxuICAgICAgICAvPlxuICAgICAgICA8c3ZnOmcgKm5nSWY9XCJzaG93UmVmTGFiZWxzXCI+XG4gICAgICAgICAgPHRpdGxlPnt7IHRpY2tUcmltKHRpY2tGb3JtYXQocmVmTGluZS52YWx1ZSkpIH19PC90aXRsZT5cbiAgICAgICAgICA8c3ZnOnRleHRcbiAgICAgICAgICAgIGNsYXNzPVwicmVmbGluZS1sYWJlbFwiXG4gICAgICAgICAgICBbYXR0ci5maWxsXT1cInJlZkxpbmUuY29sb3JcIlxuICAgICAgICAgICAgW2F0dHIuZHldPVwiZHlcIlxuICAgICAgICAgICAgW2F0dHIueV09XCItNlwiXG4gICAgICAgICAgICBbYXR0ci54XT1cImdyaWRMaW5lV2lkdGhcIlxuICAgICAgICAgICAgW2F0dHIudGV4dC1hbmNob3JdPVwidGV4dEFuY2hvclwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAge3sgcmVmTGluZS5uYW1lIH19XG4gICAgICAgICAgPC9zdmc6dGV4dD5cblxuICAgICAgICAgIDxzdmc6dGV4dFxuICAgICAgICAgICAgc3Ryb2tlLXdpZHRoPVwiMC4wMVwiXG4gICAgICAgICAgICBbYXR0ci5maWxsXT1cInJlZkxpbmUuY29sb3JcIlxuICAgICAgICAgICAgW2F0dHIuZHldPVwiZHlcIlxuICAgICAgICAgICAgW2F0dHIueF09XCJ4MVwiXG4gICAgICAgICAgICBbYXR0ci55XT1cInkxXCJcbiAgICAgICAgICAgIFthdHRyLnRleHQtYW5jaG9yXT1cInRleHRBbmNob3JcIlxuICAgICAgICAgICAgW3N0eWxlLmZvbnQtc2l6ZV09XCInMTJweCdcIj5cbiAgICAgICAgICAgIHt7cmVmTGluZS52YWx1ZSB8IG51bWJlcjonMS4xLTInfX1cbiAgICAgICAgICA8L3N2Zzp0ZXh0PlxuICAgICAgICA8L3N2ZzpnPlxuICAgICAgPC9zdmc6Zz5cbiAgICA8L3N2ZzpnPlxuICBgLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBZQXhpc1RpY2tzQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzLCBBZnRlclZpZXdJbml0IHtcbiAgQElucHV0KCkgc2NhbGU7XG4gIEBJbnB1dCgpIG9yaWVudDtcbiAgQElucHV0KCkgdGlja0FyZ3VtZW50cyA9IFs1XTtcbiAgQElucHV0KCkgdGlja1ZhbHVlczogYW55W107XG4gIEBJbnB1dCgpIHRpY2tTdHJva2UgPSAnI2NjYyc7XG4gIEBJbnB1dCgpIHRyaW1UaWNrczogYm9vbGVhbiA9IHRydWU7XG4gIEBJbnB1dCgpIG1heFRpY2tMZW5ndGg6IG51bWJlciA9IDE2O1xuICBASW5wdXQoKSB0aWNrRm9ybWF0dGluZztcbiAgQElucHV0KCkgc2hvd0dyaWRMaW5lcyA9IGZhbHNlO1xuICBASW5wdXQoKSBncmlkTGluZVdpZHRoO1xuICBASW5wdXQoKSBoZWlnaHQ7XG4gIEBJbnB1dCgpIHJlZmVyZW5jZUxpbmVzO1xuICBASW5wdXQoKSBzaG93UmVmTGFiZWxzOiBib29sZWFuID0gZmFsc2U7XG4gIEBJbnB1dCgpIHNob3dSZWZMaW5lczogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIEBPdXRwdXQoKSBkaW1lbnNpb25zQ2hhbmdlZCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBpbm5lclRpY2tTaXplOiBhbnkgPSA2O1xuICB0aWNrUGFkZGluZzogYW55ID0gMztcbiAgdGlja1NwYWNpbmc6IGFueTtcbiAgdmVydGljYWxTcGFjaW5nOiBudW1iZXIgPSAyMDtcbiAgdGV4dEFuY2hvcjogYW55ID0gJ21pZGRsZSc7XG4gIGR5OiBhbnk7XG4gIHgxOiBhbnk7XG4gIHgyOiBhbnk7XG4gIHkxOiBhbnk7XG4gIHkyOiBhbnk7XG4gIGFkanVzdGVkU2NhbGU6IGFueTtcbiAgdHJhbnNmb3JtOiAobzogYW55KSA9PiBzdHJpbmc7XG4gIHRpY2tGb3JtYXQ6IChvOiBhbnkpID0+IHN0cmluZztcbiAgdGlja3M6IGFueTtcbiAgd2lkdGg6IG51bWJlciA9IDA7XG4gIG91dGVyVGlja1NpemU6IG51bWJlciA9IDY7XG4gIHJvdGF0ZUxhYmVsczogYm9vbGVhbiA9IGZhbHNlO1xuICByZWZNYXg6IG51bWJlcjtcbiAgcmVmTWluOiBudW1iZXI7XG4gIHJlZmVyZW5jZUxpbmVMZW5ndGg6IG51bWJlciA9IDA7XG4gIHJlZmVyZW5jZUFyZWFQYXRoOiBzdHJpbmc7XG5cbiAgQFZpZXdDaGlsZCgndGlja3NlbCcpIHRpY2tzRWxlbWVudDogRWxlbWVudFJlZjtcblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgdGhpcy51cGRhdGUoKTtcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMudXBkYXRlRGltcygpKTtcbiAgfVxuXG4gIHVwZGF0ZURpbXMoKTogdm9pZCB7XG4gICAgY29uc3Qgd2lkdGggPSBwYXJzZUludCh0aGlzLnRpY2tzRWxlbWVudC5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoLCAxMCk7XG4gICAgaWYgKHdpZHRoICE9PSB0aGlzLndpZHRoKSB7XG4gICAgICB0aGlzLndpZHRoID0gd2lkdGg7XG4gICAgICB0aGlzLmRpbWVuc2lvbnNDaGFuZ2VkLmVtaXQoeyB3aWR0aCB9KTtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy51cGRhdGVEaW1zKCkpO1xuICAgIH1cbiAgfVxuXG4gIHVwZGF0ZSgpOiB2b2lkIHtcbiAgICBsZXQgc2NhbGU7XG4gICAgY29uc3Qgc2lnbiA9IHRoaXMub3JpZW50ID09PSAndG9wJyB8fCB0aGlzLm9yaWVudCA9PT0gJ3JpZ2h0JyA/IC0xIDogMTtcbiAgICB0aGlzLnRpY2tTcGFjaW5nID0gTWF0aC5tYXgodGhpcy5pbm5lclRpY2tTaXplLCAwKSArIHRoaXMudGlja1BhZGRpbmc7XG5cbiAgICBzY2FsZSA9IHRoaXMuc2NhbGU7XG4gICAgdGhpcy50aWNrcyA9IHRoaXMuZ2V0VGlja3MoKTtcblxuICAgIGlmICh0aGlzLnRpY2tGb3JtYXR0aW5nKSB7XG4gICAgICB0aGlzLnRpY2tGb3JtYXQgPSB0aGlzLnRpY2tGb3JtYXR0aW5nO1xuICAgIH0gZWxzZSBpZiAoc2NhbGUudGlja0Zvcm1hdCkge1xuICAgICAgdGhpcy50aWNrRm9ybWF0ID0gc2NhbGUudGlja0Zvcm1hdC5hcHBseShzY2FsZSwgdGhpcy50aWNrQXJndW1lbnRzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy50aWNrRm9ybWF0ID0gZnVuY3Rpb24oZCkge1xuICAgICAgICBpZiAoZC5jb25zdHJ1Y3Rvci5uYW1lID09PSAnRGF0ZScpIHtcbiAgICAgICAgICByZXR1cm4gZC50b0xvY2FsZURhdGVTdHJpbmcoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZC50b0xvY2FsZVN0cmluZygpO1xuICAgICAgfTtcbiAgICB9XG5cbiAgICB0aGlzLmFkanVzdGVkU2NhbGUgPSBzY2FsZS5iYW5kd2lkdGhcbiAgICAgID8gZnVuY3Rpb24oZCkge1xuICAgICAgICAgIHJldHVybiBzY2FsZShkKSArIHNjYWxlLmJhbmR3aWR0aCgpICogMC41O1xuICAgICAgICB9XG4gICAgICA6IHNjYWxlO1xuXG4gICAgaWYgKHRoaXMuc2hvd1JlZkxpbmVzICYmIHRoaXMucmVmZXJlbmNlTGluZXMpIHtcbiAgICAgIHRoaXMuc2V0UmVmZXJlbmNlbGluZXMoKTtcbiAgICB9XG5cbiAgICBzd2l0Y2ggKHRoaXMub3JpZW50KSB7XG4gICAgICBjYXNlICd0b3AnOlxuICAgICAgICB0aGlzLnRyYW5zZm9ybSA9IGZ1bmN0aW9uKHRpY2spIHtcbiAgICAgICAgICByZXR1cm4gJ3RyYW5zbGF0ZSgnICsgdGhpcy5hZGp1c3RlZFNjYWxlKHRpY2spICsgJywwKSc7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMudGV4dEFuY2hvciA9ICdtaWRkbGUnO1xuICAgICAgICB0aGlzLnkyID0gdGhpcy5pbm5lclRpY2tTaXplICogc2lnbjtcbiAgICAgICAgdGhpcy55MSA9IHRoaXMudGlja1NwYWNpbmcgKiBzaWduO1xuICAgICAgICB0aGlzLmR5ID0gc2lnbiA8IDAgPyAnMGVtJyA6ICcuNzFlbSc7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnYm90dG9tJzpcbiAgICAgICAgdGhpcy50cmFuc2Zvcm0gPSBmdW5jdGlvbih0aWNrKSB7XG4gICAgICAgICAgcmV0dXJuICd0cmFuc2xhdGUoJyArIHRoaXMuYWRqdXN0ZWRTY2FsZSh0aWNrKSArICcsMCknO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLnRleHRBbmNob3IgPSAnbWlkZGxlJztcbiAgICAgICAgdGhpcy55MiA9IHRoaXMuaW5uZXJUaWNrU2l6ZSAqIHNpZ247XG4gICAgICAgIHRoaXMueTEgPSB0aGlzLnRpY2tTcGFjaW5nICogc2lnbjtcbiAgICAgICAgdGhpcy5keSA9IHNpZ24gPCAwID8gJzBlbScgOiAnLjcxZW0nO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2xlZnQnOlxuICAgICAgICB0aGlzLnRyYW5zZm9ybSA9IGZ1bmN0aW9uKHRpY2spIHtcbiAgICAgICAgICByZXR1cm4gJ3RyYW5zbGF0ZSgwLCcgKyB0aGlzLmFkanVzdGVkU2NhbGUodGljaykgKyAnKSc7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMudGV4dEFuY2hvciA9ICdlbmQnO1xuICAgICAgICB0aGlzLngyID0gdGhpcy5pbm5lclRpY2tTaXplICogLXNpZ247XG4gICAgICAgIHRoaXMueDEgPSB0aGlzLnRpY2tTcGFjaW5nICogLXNpZ247XG4gICAgICAgIHRoaXMuZHkgPSAnLjMyZW0nO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3JpZ2h0JzpcbiAgICAgICAgdGhpcy50cmFuc2Zvcm0gPSBmdW5jdGlvbih0aWNrKSB7XG4gICAgICAgICAgcmV0dXJuICd0cmFuc2xhdGUoMCwnICsgdGhpcy5hZGp1c3RlZFNjYWxlKHRpY2spICsgJyknO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLnRleHRBbmNob3IgPSAnc3RhcnQnO1xuICAgICAgICB0aGlzLngyID0gdGhpcy5pbm5lclRpY2tTaXplICogLXNpZ247XG4gICAgICAgIHRoaXMueDEgPSB0aGlzLnRpY2tTcGFjaW5nICogLXNpZ247XG4gICAgICAgIHRoaXMuZHkgPSAnLjMyZW0nO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgfVxuICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy51cGRhdGVEaW1zKCkpO1xuICB9XG5cbiAgc2V0UmVmZXJlbmNlbGluZXMoKTogdm9pZCB7XG4gICAgdGhpcy5yZWZNaW4gPSB0aGlzLmFkanVzdGVkU2NhbGUoXG4gICAgICBNYXRoLm1pbi5hcHBseShcbiAgICAgICAgbnVsbCxcbiAgICAgICAgdGhpcy5yZWZlcmVuY2VMaW5lcy5tYXAoaXRlbSA9PiBpdGVtLnZhbHVlKVxuICAgICAgKVxuICAgICk7XG4gICAgdGhpcy5yZWZNYXggPSB0aGlzLmFkanVzdGVkU2NhbGUoXG4gICAgICBNYXRoLm1heC5hcHBseShcbiAgICAgICAgbnVsbCxcbiAgICAgICAgdGhpcy5yZWZlcmVuY2VMaW5lcy5tYXAoaXRlbSA9PiBpdGVtLnZhbHVlKVxuICAgICAgKVxuICAgICk7XG4gICAgdGhpcy5yZWZlcmVuY2VMaW5lTGVuZ3RoID0gdGhpcy5yZWZlcmVuY2VMaW5lcy5sZW5ndGg7XG5cbiAgICB0aGlzLnJlZmVyZW5jZUFyZWFQYXRoID0gcm91bmRlZFJlY3QoMCwgdGhpcy5yZWZNYXgsIHRoaXMuZ3JpZExpbmVXaWR0aCwgdGhpcy5yZWZNaW4gLSB0aGlzLnJlZk1heCwgMCwgW1xuICAgICAgZmFsc2UsXG4gICAgICBmYWxzZSxcbiAgICAgIGZhbHNlLFxuICAgICAgZmFsc2VcbiAgICBdKTtcbiAgfVxuXG4gIGdldFRpY2tzKCk6IGFueSB7XG4gICAgbGV0IHRpY2tzO1xuICAgIGNvbnN0IG1heFRpY2tzID0gdGhpcy5nZXRNYXhUaWNrcygyMCk7XG4gICAgY29uc3QgbWF4U2NhbGVUaWNrcyA9IHRoaXMuZ2V0TWF4VGlja3MoNTApO1xuXG4gICAgaWYgKHRoaXMudGlja1ZhbHVlcykge1xuICAgICAgdGlja3MgPSB0aGlzLnRpY2tWYWx1ZXM7XG4gICAgfSBlbHNlIGlmICh0aGlzLnNjYWxlLnRpY2tzKSB7XG4gICAgICB0aWNrcyA9IHRoaXMuc2NhbGUudGlja3MuYXBwbHkodGhpcy5zY2FsZSwgW21heFNjYWxlVGlja3NdKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGlja3MgPSB0aGlzLnNjYWxlLmRvbWFpbigpO1xuICAgICAgdGlja3MgPSByZWR1Y2VUaWNrcyh0aWNrcywgbWF4VGlja3MpO1xuICAgIH1cblxuICAgIHJldHVybiB0aWNrcztcbiAgfVxuXG4gIGdldE1heFRpY2tzKHRpY2tIZWlnaHQ6IG51bWJlcik6IG51bWJlciB7XG4gICAgcmV0dXJuIE1hdGguZmxvb3IodGhpcy5oZWlnaHQgLyB0aWNrSGVpZ2h0KTtcbiAgfVxuXG4gIHRpY2tUcmFuc2Zvcm0odGljayk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGB0cmFuc2xhdGUoJHt0aGlzLmFkanVzdGVkU2NhbGUodGljayl9LCR7dGhpcy52ZXJ0aWNhbFNwYWNpbmd9KWA7XG4gIH1cblxuICBncmlkTGluZVRyYW5zZm9ybSgpOiBzdHJpbmcge1xuICAgIHJldHVybiBgdHJhbnNsYXRlKDUsMClgO1xuICB9XG5cbiAgdGlja1RyaW0obGFiZWw6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMudHJpbVRpY2tzID8gdHJpbUxhYmVsKGxhYmVsLCB0aGlzLm1heFRpY2tMZW5ndGgpIDogbGFiZWw7XG4gIH1cbiAgaXNOb3RBTnVtYmVyKHZhbHVlKSB7XG4gICAgcmV0dXJuIGlzTmFOKHZhbHVlKTtcbiAgfVxuXG59XG4iXX0=