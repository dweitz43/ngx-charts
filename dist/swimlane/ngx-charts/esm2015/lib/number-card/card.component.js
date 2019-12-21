import { __decorate } from "tslib";
import { Component, Input, Output, EventEmitter, ElementRef, SimpleChanges, OnChanges, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef, NgZone, OnDestroy } from '@angular/core';
import { trimLabel } from '../common/trim-label.helper';
import { roundedRect } from '../common/shape.helper';
import { count, decimalChecker } from '../common/count';
import { escapeLabel } from '../common/label.helper';
let CardComponent = class CardComponent {
    constructor(element, cd, zone) {
        this.cd = cd;
        this.zone = zone;
        this.animations = true;
        this.select = new EventEmitter();
        this.value = '';
        this.textFontSize = 12;
        this.textTransform = '';
        this.initialized = false;
        this.bandHeight = 10;
        this.textPadding = [10, 20, 5, 20];
        this.labelFontSize = 15;
        this.element = element.nativeElement;
    }
    ngOnChanges(changes) {
        this.update();
    }
    ngOnDestroy() {
        cancelAnimationFrame(this.animationReq);
    }
    update() {
        this.zone.run(() => {
            const hasValue = this.data && typeof this.data.value !== 'undefined';
            const valueFormatting = this.valueFormatting || (card => card.value.toLocaleString());
            const labelFormatting = this.labelFormatting || (card => escapeLabel(trimLabel(card.label, 55)));
            this.transform = `translate(${this.x} , ${this.y})`;
            this.textWidth = Math.max(0, this.width) - this.textPadding[1] - this.textPadding[3];
            this.cardWidth = Math.max(0, this.width);
            this.cardHeight = Math.max(0, this.height);
            this.label = this.label ? this.label : this.data.name;
            const cardData = {
                label: this.label,
                data: this.data,
                value: this.data.value
            };
            this.formattedLabel = labelFormatting(cardData);
            this.transformBand = `translate(0 , ${this.cardHeight - this.bandHeight})`;
            const value = hasValue ? valueFormatting(cardData) : '';
            this.value = this.paddedValue(value);
            this.setPadding();
            this.bandPath = roundedRect(0, 0, this.cardWidth, this.bandHeight, 3, [false, false, true, true]);
            setTimeout(() => {
                this.scaleText();
                this.value = value;
                if (hasValue && !this.initialized) {
                    setTimeout(() => this.startCount(), 20);
                }
            }, 8);
        });
    }
    paddedValue(value) {
        if (this.medianSize && this.medianSize > value.length) {
            value += '\u2007'.repeat(this.medianSize - value.length);
        }
        return value;
    }
    startCount() {
        if (!this.initialized && this.animations) {
            cancelAnimationFrame(this.animationReq);
            const val = this.data.value;
            const decs = decimalChecker(val);
            const valueFormatting = this.valueFormatting || (card => card.value.toLocaleString());
            const callback = ({ value, finished }) => {
                this.zone.run(() => {
                    value = finished ? val : value;
                    this.value = valueFormatting({ label: this.label, data: this.data, value });
                    if (!finished) {
                        this.value = this.paddedValue(this.value);
                    }
                    this.cd.markForCheck();
                });
            };
            this.animationReq = count(0, val, decs, 1, callback);
            this.initialized = true;
        }
    }
    scaleText() {
        this.zone.run(() => {
            const { width, height } = this.textEl.nativeElement.getBoundingClientRect();
            if (width === 0 || height === 0) {
                return;
            }
            const textPadding = (this.textPadding[1] = this.textPadding[3] = this.cardWidth / 8);
            const availableWidth = this.cardWidth - 2 * textPadding;
            const availableHeight = this.cardHeight / 3;
            const resizeScale = Math.min(availableWidth / width, availableHeight / height);
            this.textFontSize = Math.floor(this.textFontSize * resizeScale);
            this.labelFontSize = Math.min(this.textFontSize, 15);
            this.setPadding();
            this.cd.markForCheck();
        });
    }
    setPadding() {
        this.textPadding[1] = this.textPadding[3] = this.cardWidth / 8;
        const padding = this.cardHeight / 2;
        this.textPadding[0] = padding - this.textFontSize - this.labelFontSize / 2;
        this.textPadding[2] = padding - this.labelFontSize;
    }
    onClick() {
        this.select.emit(this.data);
    }
};
CardComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: ChangeDetectorRef },
    { type: NgZone }
];
__decorate([
    Input()
], CardComponent.prototype, "color", void 0);
__decorate([
    Input()
], CardComponent.prototype, "bandColor", void 0);
__decorate([
    Input()
], CardComponent.prototype, "textColor", void 0);
__decorate([
    Input()
], CardComponent.prototype, "x", void 0);
__decorate([
    Input()
], CardComponent.prototype, "y", void 0);
__decorate([
    Input()
], CardComponent.prototype, "width", void 0);
__decorate([
    Input()
], CardComponent.prototype, "height", void 0);
__decorate([
    Input()
], CardComponent.prototype, "label", void 0);
__decorate([
    Input()
], CardComponent.prototype, "data", void 0);
__decorate([
    Input()
], CardComponent.prototype, "medianSize", void 0);
__decorate([
    Input()
], CardComponent.prototype, "valueFormatting", void 0);
__decorate([
    Input()
], CardComponent.prototype, "labelFormatting", void 0);
__decorate([
    Input()
], CardComponent.prototype, "animations", void 0);
__decorate([
    Output()
], CardComponent.prototype, "select", void 0);
__decorate([
    ViewChild('textEl', { static: false })
], CardComponent.prototype, "textEl", void 0);
CardComponent = __decorate([
    Component({
        selector: 'g[ngx-charts-card]',
        template: `
    <svg:g [attr.transform]="transform" class="cell" (click)="onClick()">
      <svg:rect class="card" [style.fill]="color" [attr.width]="cardWidth" [attr.height]="cardHeight" rx="3" ry="3" />
      <svg:path
        *ngIf="bandColor && bandColor !== color"
        class="card-band"
        [attr.fill]="bandColor"
        [attr.transform]="transformBand"
        stroke="none"
        [attr.d]="bandPath"
      />
      <title>{{ label }}</title>
      <svg:foreignObject
        class="trimmed-label"
        x="5"
        [attr.x]="textPadding[3]"
        [attr.y]="cardHeight - textPadding[2]"
        [attr.width]="textWidth"
        [attr.height]="labelFontSize + textPadding[2]"
        alignment-baseline="hanging"
      >
        <xhtml:p
          [style.color]="textColor"
          [style.fontSize.px]="labelFontSize"
          [style.lineHeight.px]="labelFontSize"
          [innerHTML]="formattedLabel"
        >
        </xhtml:p>
      </svg:foreignObject>
      <svg:text
        #textEl
        class="value-text"
        [attr.x]="textPadding[3]"
        [attr.y]="textPadding[0]"
        [style.fill]="textColor"
        text-anchor="start"
        alignment-baseline="hanging"
        [style.font-size.pt]="textFontSize"
      >
        {{ value }}
      </svg:text>
    </svg:g>
  `,
        changeDetection: ChangeDetectionStrategy.OnPush
    })
], CardComponent);
export { CardComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FyZC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Ac3dpbWxhbmUvbmd4LWNoYXJ0cy8iLCJzb3VyY2VzIjpbImxpYi9udW1iZXItY2FyZC9jYXJkLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBQ0wsTUFBTSxFQUNOLFlBQVksRUFDWixVQUFVLEVBQ1YsYUFBYSxFQUNiLFNBQVMsRUFDVCxTQUFTLEVBQ1QsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixNQUFNLEVBQ04sU0FBUyxFQUNWLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUN4RCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDckQsT0FBTyxFQUFFLEtBQUssRUFBRSxjQUFjLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUN4RCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFpRHJELElBQWEsYUFBYSxHQUExQixNQUFhLGFBQWE7SUF1Q3hCLFlBQVksT0FBbUIsRUFBVSxFQUFxQixFQUFVLElBQVk7UUFBM0MsT0FBRSxHQUFGLEVBQUUsQ0FBbUI7UUFBVSxTQUFJLEdBQUosSUFBSSxDQUFRO1FBekIzRSxlQUFVLEdBQVksSUFBSSxDQUFDO1FBRTFCLFdBQU0sR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBS3RDLFVBQUssR0FBVyxFQUFFLENBQUM7UUFNbkIsaUJBQVksR0FBVyxFQUFFLENBQUM7UUFDMUIsa0JBQWEsR0FBVyxFQUFFLENBQUM7UUFDM0IsZ0JBQVcsR0FBWSxLQUFLLENBQUM7UUFHN0IsZUFBVSxHQUFXLEVBQUUsQ0FBQztRQUV4QixnQkFBVyxHQUFHLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDOUIsa0JBQWEsR0FBRyxFQUFF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QUU7d0NBQUc7QUFDRjtJQUFSLEtBQUssRUFBRTs0Q0FBTztBQUNOO0lBQVIsS0FBSyxFQUFFOzZDQUFRO0FBQ1A7SUFBUixLQUFLLEVBQUU7NENBQU87QUFDTjtJQUFSLEtBQUssRUFBRTsyQ0FBTTtBQUNMO0lBQVIsS0FBSyxFQUFFO2lEQUFvQjtBQUNuQjtJQUFSLEtBQUssRUFBRTtzREFBc0I7QUFDckI7SUFBUixLQUFLLEVBQUU7c0RBQXNCO0FBQ3JCO0lBQVIsS0FBSyxFQUFFO2lEQUE0QjtBQUUxQjtJQUFULE1BQU0sRUFBRTs2Q0FBNkI7QUFFRTtJQUF2QyxTQUFTLENBQUMsUUFBUSxFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxDQUFDOzZDQUFvQjtBQWxCaEQsYUFBYTtJQS9DekIsU0FBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLG9CQUFvQjtRQUM5QixRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTBDVDtRQUNELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO0tBQ2hELENBQUM7R0FDVyxhQUFhLENBd0p6QjtTQXhKWSxhQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBJbnB1dCxcbiAgT3V0cHV0LFxuICBFdmVudEVtaXR0ZXIsXG4gIEVsZW1lbnRSZWYsXG4gIFNpbXBsZUNoYW5nZXMsXG4gIE9uQ2hhbmdlcyxcbiAgVmlld0NoaWxkLFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIE5nWm9uZSxcbiAgT25EZXN0cm95XG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgdHJpbUxhYmVsIH0gZnJvbSAnLi4vY29tbW9uL3RyaW0tbGFiZWwuaGVscGVyJztcbmltcG9ydCB7IHJvdW5kZWRSZWN0IH0gZnJvbSAnLi4vY29tbW9uL3NoYXBlLmhlbHBlcic7XG5pbXBvcnQgeyBjb3VudCwgZGVjaW1hbENoZWNrZXIgfSBmcm9tICcuLi9jb21tb24vY291bnQnO1xuaW1wb3J0IHsgZXNjYXBlTGFiZWwgfSBmcm9tICcuLi9jb21tb24vbGFiZWwuaGVscGVyJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZ1tuZ3gtY2hhcnRzLWNhcmRdJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8c3ZnOmcgW2F0dHIudHJhbnNmb3JtXT1cInRyYW5zZm9ybVwiIGNsYXNzPVwiY2VsbFwiIChjbGljayk9XCJvbkNsaWNrKClcIj5cbiAgICAgIDxzdmc6cmVjdCBjbGFzcz1cImNhcmRcIiBbc3R5bGUuZmlsbF09XCJjb2xvclwiIFthdHRyLndpZHRoXT1cImNhcmRXaWR0aFwiIFthdHRyLmhlaWdodF09XCJjYXJkSGVpZ2h0XCIgcng9XCIzXCIgcnk9XCIzXCIgLz5cbiAgICAgIDxzdmc6cGF0aFxuICAgICAgICAqbmdJZj1cImJhbmRDb2xvciAmJiBiYW5kQ29sb3IgIT09IGNvbG9yXCJcbiAgICAgICAgY2xhc3M9XCJjYXJkLWJhbmRcIlxuICAgICAgICBbYXR0ci5maWxsXT1cImJhbmRDb2xvclwiXG4gICAgICAgIFthdHRyLnRyYW5zZm9ybV09XCJ0cmFuc2Zvcm1CYW5kXCJcbiAgICAgICAgc3Ryb2tlPVwibm9uZVwiXG4gICAgICAgIFthdHRyLmRdPVwiYmFuZFBhdGhcIlxuICAgICAgLz5cbiAgICAgIDx0aXRsZT57eyBsYWJlbCB9fTwvdGl0bGU+XG4gICAgICA8c3ZnOmZvcmVpZ25PYmplY3RcbiAgICAgICAgY2xhc3M9XCJ0cmltbWVkLWxhYmVsXCJcbiAgICAgICAgeD1cIjVcIlxuICAgICAgICBbYXR0ci54XT1cInRleHRQYWRkaW5nWzNdXCJcbiAgICAgICAgW2F0dHIueV09XCJjYXJkSGVpZ2h0IC0gdGV4dFBhZGRpbmdbMl1cIlxuICAgICAgICBbYXR0ci53aWR0aF09XCJ0ZXh0V2lkdGhcIlxuICAgICAgICBbYXR0ci5oZWlnaHRdPVwibGFiZWxGb250U2l6ZSArIHRleHRQYWRkaW5nWzJdXCJcbiAgICAgICAgYWxpZ25tZW50LWJhc2VsaW5lPVwiaGFuZ2luZ1wiXG4gICAgICA+XG4gICAgICAgIDx4aHRtbDpwXG4gICAgICAgICAgW3N0eWxlLmNvbG9yXT1cInRleHRDb2xvclwiXG4gICAgICAgICAgW3N0eWxlLmZvbnRTaXplLnB4XT1cImxhYmVsRm9udFNpemVcIlxuICAgICAgICAgIFtzdHlsZS5saW5lSGVpZ2h0LnB4XT1cImxhYmVsRm9udFNpemVcIlxuICAgICAgICAgIFtpbm5lckhUTUxdPVwiZm9ybWF0dGVkTGFiZWxcIlxuICAgICAgICA+XG4gICAgICAgIDwveGh0bWw6cD5cbiAgICAgIDwvc3ZnOmZvcmVpZ25PYmplY3Q+XG4gICAgICA8c3ZnOnRleHRcbiAgICAgICAgI3RleHRFbFxuICAgICAgICBjbGFzcz1cInZhbHVlLXRleHRcIlxuICAgICAgICBbYXR0ci54XT1cInRleHRQYWRkaW5nWzNdXCJcbiAgICAgICAgW2F0dHIueV09XCJ0ZXh0UGFkZGluZ1swXVwiXG4gICAgICAgIFtzdHlsZS5maWxsXT1cInRleHRDb2xvclwiXG4gICAgICAgIHRleHQtYW5jaG9yPVwic3RhcnRcIlxuICAgICAgICBhbGlnbm1lbnQtYmFzZWxpbmU9XCJoYW5naW5nXCJcbiAgICAgICAgW3N0eWxlLmZvbnQtc2l6ZS5wdF09XCJ0ZXh0Rm9udFNpemVcIlxuICAgICAgPlxuICAgICAgICB7eyB2YWx1ZSB9fVxuICAgICAgPC9zdmc6dGV4dD5cbiAgICA8L3N2ZzpnPlxuICBgLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBDYXJkQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzLCBPbkRlc3Ryb3kge1xuICBASW5wdXQoKSBjb2xvcjtcbiAgQElucHV0KCkgYmFuZENvbG9yO1xuICBASW5wdXQoKSB0ZXh0Q29sb3I7XG5cbiAgQElucHV0KCkgeDtcbiAgQElucHV0KCkgeTtcbiAgQElucHV0KCkgd2lkdGg7XG4gIEBJbnB1dCgpIGhlaWdodDtcbiAgQElucHV0KCkgbGFiZWw7XG4gIEBJbnB1dCgpIGRhdGE7XG4gIEBJbnB1dCgpIG1lZGlhblNpemU6IG51bWJlcjtcbiAgQElucHV0KCkgdmFsdWVGb3JtYXR0aW5nOiBhbnk7XG4gIEBJbnB1dCgpIGxhYmVsRm9ybWF0dGluZzogYW55O1xuICBASW5wdXQoKSBhbmltYXRpb25zOiBib29sZWFuID0gdHJ1ZTtcblxuICBAT3V0cHV0KCkgc2VsZWN0ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIEBWaWV3Q2hpbGQoJ3RleHRFbCcsIHsgc3RhdGljOiBmYWxzZSB9KSB0ZXh0RWw6IEVsZW1lbnRSZWY7XG5cbiAgZWxlbWVudDogSFRNTEVsZW1lbnQ7XG4gIHZhbHVlOiBzdHJpbmcgPSAnJztcbiAgdHJhbnNmb3JtOiBzdHJpbmc7XG4gIGZvcm1hdHRlZExhYmVsOiBzdHJpbmc7XG4gIGNhcmRXaWR0aDogbnVtYmVyO1xuICBjYXJkSGVpZ2h0OiBudW1iZXI7XG4gIHRleHRXaWR0aDogbnVtYmVyO1xuICB0ZXh0Rm9udFNpemU6IG51bWJlciA9IDEyO1xuICB0ZXh0VHJhbnNmb3JtOiBzdHJpbmcgPSAnJztcbiAgaW5pdGlhbGl6ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgYW5pbWF0aW9uUmVxOiBhbnk7XG5cbiAgYmFuZEhlaWdodDogbnVtYmVyID0gMTA7XG4gIHRyYW5zZm9ybUJhbmQ6IHN0cmluZztcbiAgdGV4dFBhZGRpbmcgPSBbMTAsIDIwLCA1LCAyMF07XG4gIGxhYmVsRm9udFNpemUgPSAxNTtcblxuICBiYW5kUGF0aDogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKGVsZW1lbnQ6IEVsZW1lbnRSZWYsIHByaXZhdGUgY2Q6IENoYW5nZURldGVjdG9yUmVmLCBwcml2YXRlIHpvbmU6IE5nWm9uZSkge1xuICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnQubmF0aXZlRWxlbWVudDtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICB0aGlzLnVwZGF0ZSgpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgY2FuY2VsQW5pbWF0aW9uRnJhbWUodGhpcy5hbmltYXRpb25SZXEpO1xuICB9XG5cbiAgdXBkYXRlKCk6IHZvaWQge1xuICAgIHRoaXMuem9uZS5ydW4oKCkgPT4ge1xuICAgICAgY29uc3QgaGFzVmFsdWUgPSB0aGlzLmRhdGEgJiYgdHlwZW9mIHRoaXMuZGF0YS52YWx1ZSAhPT0gJ3VuZGVmaW5lZCc7XG4gICAgICBjb25zdCB2YWx1ZUZvcm1hdHRpbmcgPSB0aGlzLnZhbHVlRm9ybWF0dGluZyB8fCAoY2FyZCA9PiBjYXJkLnZhbHVlLnRvTG9jYWxlU3RyaW5nKCkpO1xuICAgICAgY29uc3QgbGFiZWxGb3JtYXR0aW5nID0gdGhpcy5sYWJlbEZvcm1hdHRpbmcgfHwgKGNhcmQgPT4gZXNjYXBlTGFiZWwodHJpbUxhYmVsKGNhcmQubGFiZWwsIDU1KSkpO1xuXG4gICAgICB0aGlzLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGUoJHt0aGlzLnh9ICwgJHt0aGlzLnl9KWA7XG5cbiAgICAgIHRoaXMudGV4dFdpZHRoID0gTWF0aC5tYXgoMCwgdGhpcy53aWR0aCkgLSB0aGlzLnRleHRQYWRkaW5nWzFdIC0gdGhpcy50ZXh0UGFkZGluZ1szXTtcbiAgICAgIHRoaXMuY2FyZFdpZHRoID0gTWF0aC5tYXgoMCwgdGhpcy53aWR0aCk7XG4gICAgICB0aGlzLmNhcmRIZWlnaHQgPSBNYXRoLm1heCgwLCB0aGlzLmhlaWdodCk7XG5cbiAgICAgIHRoaXMubGFiZWwgPSB0aGlzLmxhYmVsID8gdGhpcy5sYWJlbCA6IHRoaXMuZGF0YS5uYW1lO1xuXG4gICAgICBjb25zdCBjYXJkRGF0YSA9IHtcbiAgICAgICAgbGFiZWw6IHRoaXMubGFiZWwsXG4gICAgICAgIGRhdGE6IHRoaXMuZGF0YSxcbiAgICAgICAgdmFsdWU6IHRoaXMuZGF0YS52YWx1ZVxuICAgICAgfTtcblxuICAgICAgdGhpcy5mb3JtYXR0ZWRMYWJlbCA9IGxhYmVsRm9ybWF0dGluZyhjYXJkRGF0YSk7XG4gICAgICB0aGlzLnRyYW5zZm9ybUJhbmQgPSBgdHJhbnNsYXRlKDAgLCAke3RoaXMuY2FyZEhlaWdodCAtIHRoaXMuYmFuZEhlaWdodH0pYDtcblxuICAgICAgY29uc3QgdmFsdWUgPSBoYXNWYWx1ZSA/IHZhbHVlRm9ybWF0dGluZyhjYXJkRGF0YSkgOiAnJztcblxuICAgICAgdGhpcy52YWx1ZSA9IHRoaXMucGFkZGVkVmFsdWUodmFsdWUpO1xuICAgICAgdGhpcy5zZXRQYWRkaW5nKCk7XG5cbiAgICAgIHRoaXMuYmFuZFBhdGggPSByb3VuZGVkUmVjdCgwLCAwLCB0aGlzLmNhcmRXaWR0aCwgdGhpcy5iYW5kSGVpZ2h0LCAzLCBbZmFsc2UsIGZhbHNlLCB0cnVlLCB0cnVlXSk7XG5cbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB0aGlzLnNjYWxlVGV4dCgpO1xuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgICAgIGlmIChoYXNWYWx1ZSAmJiAhdGhpcy5pbml0aWFsaXplZCkge1xuICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5zdGFydENvdW50KCksIDIwKTtcbiAgICAgICAgfVxuICAgICAgfSwgOCk7XG4gICAgfSk7XG4gIH1cblxuICBwYWRkZWRWYWx1ZSh2YWx1ZTogc3RyaW5nKSB7XG4gICAgaWYgKHRoaXMubWVkaWFuU2l6ZSAmJiB0aGlzLm1lZGlhblNpemUgPiB2YWx1ZS5sZW5ndGgpIHtcbiAgICAgIHZhbHVlICs9ICdcXHUyMDA3Jy5yZXBlYXQodGhpcy5tZWRpYW5TaXplIC0gdmFsdWUubGVuZ3RoKTtcbiAgICB9XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG5cbiAgc3RhcnRDb3VudCgpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuaW5pdGlhbGl6ZWQgJiYgdGhpcy5hbmltYXRpb25zKSB7XG4gICAgICBjYW5jZWxBbmltYXRpb25GcmFtZSh0aGlzLmFuaW1hdGlvblJlcSk7XG5cbiAgICAgIGNvbnN0IHZhbCA9IHRoaXMuZGF0YS52YWx1ZTtcbiAgICAgIGNvbnN0IGRlY3MgPSBkZWNpbWFsQ2hlY2tlcih2YWwpO1xuICAgICAgY29uc3QgdmFsdWVGb3JtYXR0aW5nID0gdGhpcy52YWx1ZUZvcm1hdHRpbmcgfHwgKGNhcmQgPT4gY2FyZC52YWx1ZS50b0xvY2FsZVN0cmluZygpKTtcblxuICAgICAgY29uc3QgY2FsbGJhY2sgPSAoeyB2YWx1ZSwgZmluaXNoZWQgfSkgPT4ge1xuICAgICAgICB0aGlzLnpvbmUucnVuKCgpID0+IHtcbiAgICAgICAgICB2YWx1ZSA9IGZpbmlzaGVkID8gdmFsIDogdmFsdWU7XG4gICAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlRm9ybWF0dGluZyh7IGxhYmVsOiB0aGlzLmxhYmVsLCBkYXRhOiB0aGlzLmRhdGEsIHZhbHVlIH0pO1xuICAgICAgICAgIGlmICghZmluaXNoZWQpIHtcbiAgICAgICAgICAgIHRoaXMudmFsdWUgPSB0aGlzLnBhZGRlZFZhbHVlKHRoaXMudmFsdWUpO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICB9KTtcbiAgICAgIH07XG5cbiAgICAgIHRoaXMuYW5pbWF0aW9uUmVxID0gY291bnQoMCwgdmFsLCBkZWNzLCAxLCBjYWxsYmFjayk7XG4gICAgICB0aGlzLmluaXRpYWxpemVkID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICBzY2FsZVRleHQoKTogdm9pZCB7XG4gICAgdGhpcy56b25lLnJ1bigoKSA9PiB7XG4gICAgICBjb25zdCB7IHdpZHRoLCBoZWlnaHQgfSA9IHRoaXMudGV4dEVsLm5hdGl2ZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICBpZiAod2lkdGggPT09IDAgfHwgaGVpZ2h0ID09PSAwKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgY29uc3QgdGV4dFBhZGRpbmcgPSAodGhpcy50ZXh0UGFkZGluZ1sxXSA9IHRoaXMudGV4dFBhZGRpbmdbM10gPSB0aGlzLmNhcmRXaWR0aCAvIDgpO1xuICAgICAgY29uc3QgYXZhaWxhYmxlV2lkdGggPSB0aGlzLmNhcmRXaWR0aCAtIDIgKiB0ZXh0UGFkZGluZztcbiAgICAgIGNvbnN0IGF2YWlsYWJsZUhlaWdodCA9IHRoaXMuY2FyZEhlaWdodCAvIDM7XG5cbiAgICAgIGNvbnN0IHJlc2l6ZVNjYWxlID0gTWF0aC5taW4oYXZhaWxhYmxlV2lkdGggLyB3aWR0aCwgYXZhaWxhYmxlSGVpZ2h0IC8gaGVpZ2h0KTtcbiAgICAgIHRoaXMudGV4dEZvbnRTaXplID0gTWF0aC5mbG9vcih0aGlzLnRleHRGb250U2l6ZSAqIHJlc2l6ZVNjYWxlKTtcbiAgICAgIHRoaXMubGFiZWxGb250U2l6ZSA9IE1hdGgubWluKHRoaXMudGV4dEZvbnRTaXplLCAxNSk7XG5cbiAgICAgIHRoaXMuc2V0UGFkZGluZygpO1xuICAgICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcbiAgICB9KTtcbiAgfVxuXG4gIHNldFBhZGRpbmcoKSB7XG4gICAgdGhpcy50ZXh0UGFkZGluZ1sxXSA9IHRoaXMudGV4dFBhZGRpbmdbM10gPSB0aGlzLmNhcmRXaWR0aCAvIDg7XG4gICAgY29uc3QgcGFkZGluZyA9IHRoaXMuY2FyZEhlaWdodCAvIDI7XG4gICAgdGhpcy50ZXh0UGFkZGluZ1swXSA9IHBhZGRpbmcgLSB0aGlzLnRleHRGb250U2l6ZSAtIHRoaXMubGFiZWxGb250U2l6ZSAvIDI7XG4gICAgdGhpcy50ZXh0UGFkZGluZ1syXSA9IHBhZGRpbmcgLSB0aGlzLmxhYmVsRm9udFNpemU7XG4gIH1cblxuICBvbkNsaWNrKCk6IHZvaWQge1xuICAgIHRoaXMuc2VsZWN0LmVtaXQodGhpcy5kYXRhKTtcbiAgfVxufVxuIl19