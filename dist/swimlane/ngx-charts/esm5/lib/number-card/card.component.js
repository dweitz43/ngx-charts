import { __decorate } from "tslib";
import { Component, Input, Output, EventEmitter, ElementRef, SimpleChanges, OnChanges, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef, NgZone, OnDestroy } from '@angular/core';
import { trimLabel } from '../common/trim-label.helper';
import { roundedRect } from '../common/shape.helper';
import { count, decimalChecker } from '../common/count';
import { escapeLabel } from '../common/label.helper';
var CardComponent = /** @class */ (function () {
    function CardComponent(element, cd, zone) {
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
    CardComponent.prototype.ngOnChanges = function (changes) {
        this.update();
    };
    CardComponent.prototype.ngOnDestroy = function () {
        cancelAnimationFrame(this.animationReq);
    };
    CardComponent.prototype.update = function () {
        var _this = this;
        this.zone.run(function () {
            var hasValue = _this.data && typeof _this.data.value !== 'undefined';
            var valueFormatting = _this.valueFormatting || (function (card) { return card.value.toLocaleString(); });
            var labelFormatting = _this.labelFormatting || (function (card) { return escapeLabel(trimLabel(card.label, 55)); });
            _this.transform = "translate(" + _this.x + " , " + _this.y + ")";
            _this.textWidth = Math.max(0, _this.width) - _this.textPadding[1] - _this.textPadding[3];
            _this.cardWidth = Math.max(0, _this.width);
            _this.cardHeight = Math.max(0, _this.height);
            _this.label = _this.label ? _this.label : _this.data.name;
            var cardData = {
                label: _this.label,
                data: _this.data,
                value: _this.data.value
            };
            _this.formattedLabel = labelFormatting(cardData);
            _this.transformBand = "translate(0 , " + (_this.cardHeight - _this.bandHeight) + ")";
            var value = hasValue ? valueFormatting(cardData) : '';
            _this.value = _this.paddedValue(value);
            _this.setPadding();
            _this.bandPath = roundedRect(0, 0, _this.cardWidth, _this.bandHeight, 3, [false, false, true, true]);
            setTimeout(function () {
                _this.scaleText();
                _this.value = value;
                if (hasValue && !_this.initialized) {
                    setTimeout(function () { return _this.startCount(); }, 20);
                }
            }, 8);
        });
    };
    CardComponent.prototype.paddedValue = function (value) {
        if (this.medianSize && this.medianSize > value.length) {
            value += '\u2007'.repeat(this.medianSize - value.length);
        }
        return value;
    };
    CardComponent.prototype.startCount = function () {
        var _this = this;
        if (!this.initialized && this.animations) {
            cancelAnimationFrame(this.animationReq);
            var val_1 = this.data.value;
            var decs = decimalChecker(val_1);
            var valueFormatting_1 = this.valueFormatting || (function (card) { return card.value.toLocaleString(); });
            var callback = function (_a) {
                var value = _a.value, finished = _a.finished;
                _this.zone.run(function () {
                    value = finished ? val_1 : value;
                    _this.value = valueFormatting_1({ label: _this.label, data: _this.data, value: value });
                    if (!finished) {
                        _this.value = _this.paddedValue(_this.value);
                    }
                    _this.cd.markForCheck();
                });
            };
            this.animationReq = count(0, val_1, decs, 1, callback);
            this.initialized = true;
        }
    };
    CardComponent.prototype.scaleText = function () {
        var _this = this;
        this.zone.run(function () {
            var _a = _this.textEl.nativeElement.getBoundingClientRect(), width = _a.width, height = _a.height;
            if (width === 0 || height === 0) {
                return;
            }
            var textPadding = (_this.textPadding[1] = _this.textPadding[3] = _this.cardWidth / 8);
            var availableWidth = _this.cardWidth - 2 * textPadding;
            var availableHeight = _this.cardHeight / 3;
            var resizeScale = Math.min(availableWidth / width, availableHeight / height);
            _this.textFontSize = Math.floor(_this.textFontSize * resizeScale);
            _this.labelFontSize = Math.min(_this.textFontSize, 15);
            _this.setPadding();
            _this.cd.markForCheck();
        });
    };
    CardComponent.prototype.setPadding = function () {
        this.textPadding[1] = this.textPadding[3] = this.cardWidth / 8;
        var padding = this.cardHeight / 2;
        this.textPadding[0] = padding - this.textFontSize - this.labelFontSize / 2;
        this.textPadding[2] = padding - this.labelFontSize;
    };
    CardComponent.prototype.onClick = function () {
        this.select.emit(this.data);
    };
    CardComponent.ctorParameters = function () { return [
        { type: ElementRef },
        { type: ChangeDetectorRef },
        { type: NgZone }
    ]; };
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
            template: "\n    <svg:g [attr.transform]=\"transform\" class=\"cell\" (click)=\"onClick()\">\n      <svg:rect class=\"card\" [style.fill]=\"color\" [attr.width]=\"cardWidth\" [attr.height]=\"cardHeight\" rx=\"3\" ry=\"3\" />\n      <svg:path\n        *ngIf=\"bandColor && bandColor !== color\"\n        class=\"card-band\"\n        [attr.fill]=\"bandColor\"\n        [attr.transform]=\"transformBand\"\n        stroke=\"none\"\n        [attr.d]=\"bandPath\"\n      />\n      <title>{{ label }}</title>\n      <svg:foreignObject\n        class=\"trimmed-label\"\n        x=\"5\"\n        [attr.x]=\"textPadding[3]\"\n        [attr.y]=\"cardHeight - textPadding[2]\"\n        [attr.width]=\"textWidth\"\n        [attr.height]=\"labelFontSize + textPadding[2]\"\n        alignment-baseline=\"hanging\"\n      >\n        <xhtml:p\n          [style.color]=\"textColor\"\n          [style.fontSize.px]=\"labelFontSize\"\n          [style.lineHeight.px]=\"labelFontSize\"\n          [innerHTML]=\"formattedLabel\"\n        >\n        </xhtml:p>\n      </svg:foreignObject>\n      <svg:text\n        #textEl\n        class=\"value-text\"\n        [attr.x]=\"textPadding[3]\"\n        [attr.y]=\"textPadding[0]\"\n        [style.fill]=\"textColor\"\n        text-anchor=\"start\"\n        alignment-baseline=\"hanging\"\n        [style.font-size.pt]=\"textFontSize\"\n      >\n        {{ value }}\n      </svg:text>\n    </svg:g>\n  ",
            changeDetection: ChangeDetectionStrategy.OnPush
        })
    ], CardComponent);
    return CardComponent;
}());
export { CardComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FyZC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Ac3dpbWxhbmUvbmd4LWNoYXJ0cy8iLCJzb3VyY2VzIjpbImxpYi9udW1iZXItY2FyZC9jYXJkLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBQ0wsTUFBTSxFQUNOLFlBQVksRUFDWixVQUFVLEVBQ1YsYUFBYSxFQUNiLFNBQVMsRUFDVCxTQUFTLEVBQ1QsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixNQUFNLEVBQ04sU0FBUyxFQUNWLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUN4RCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDckQsT0FBTyxFQUFFLEtBQUssRUFBRSxjQUFjLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUN4RCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFpRHJEO0lBdUNFLHVCQUFZLE9BQW1CLEVBQVUsRUFBcUIsRUFBVSxJQUFZO1FBQTNDLE9BQUUsR0FBRixFQUFFLENBQW1CO1FBQVUsU0FBSSxHQUFKLElBQUksQ0FBUTtRQXpCM0UsZUFBVSxHQUFZLElBQUksQ0FBQztRQUUxQixXQUFNLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUt0QyxVQUFLLEdBQVcsRUFBRSxDQUFDO1FBTW5CLGlCQUFZLEdBQVcsRUFBRSxDQUFDO1FBQzFCLGtCQUFhLEdBQVcsRUFBRSxDQUFDO1FBQzNCLGdCQUFXLEdBQVksS0FBSyxDQUFDO1FBRzdCLGVBQVUsR0FBVyxFQUFFLENBQUM7UUFFeEIsZ0JBQVcsR0FBRyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQzlCLGtCQUFhLEdBQUcsRUFBRSxDQUFDO1FBS2pCLElBQUksQ0FBQyxPQUFP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Q0Y7UUFBUixLQUFLLEVBQUU7NENBQUc7SUFDRjtRQUFSLEtBQUssRUFBRTtnREFBTztJQUNOO1FBQVIsS0FBSyxFQUFFO2lEQUFRO0lBQ1A7UUFBUixLQUFLLEVBQUU7Z0RBQU87SUFDTjtRQUFSLEtBQUssRUFBRTsrQ0FBTTtJQUNMO1FBQVIsS0FBSyxFQUFFO3FEQUFvQjtJQUNuQjtRQUFSLEtBQUssRUFBRTswREFBc0I7SUFDckI7UUFBUixLQUFLLEVBQUU7MERBQXNCO0lBQ3JCO1FBQVIsS0FBSyxFQUFFO3FEQUE0QjtJQUUxQjtRQUFULE1BQU0sRUFBRTtpREFBNkI7SUFFRTtRQUF2QyxTQUFTLENBQUMsUUFBUSxFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxDQUFDO2lEQUFvQjtJQWxCaEQsYUFBYTtRQS9DekIsU0FBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLG9CQUFvQjtZQUM5QixRQUFRLEVBQUUsdTRDQTBDVDtZQUNELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO1NBQ2hELENBQUM7T0FDVyxhQUFhLENBd0p6QjtJQUFELG9CQUFDO0NBQUEsQUF4SkQsSUF3SkM7U0F4SlksYUFBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgSW5wdXQsXG4gIE91dHB1dCxcbiAgRXZlbnRFbWl0dGVyLFxuICBFbGVtZW50UmVmLFxuICBTaW1wbGVDaGFuZ2VzLFxuICBPbkNoYW5nZXMsXG4gIFZpZXdDaGlsZCxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBOZ1pvbmUsXG4gIE9uRGVzdHJveVxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IHRyaW1MYWJlbCB9IGZyb20gJy4uL2NvbW1vbi90cmltLWxhYmVsLmhlbHBlcic7XG5pbXBvcnQgeyByb3VuZGVkUmVjdCB9IGZyb20gJy4uL2NvbW1vbi9zaGFwZS5oZWxwZXInO1xuaW1wb3J0IHsgY291bnQsIGRlY2ltYWxDaGVja2VyIH0gZnJvbSAnLi4vY29tbW9uL2NvdW50JztcbmltcG9ydCB7IGVzY2FwZUxhYmVsIH0gZnJvbSAnLi4vY29tbW9uL2xhYmVsLmhlbHBlcic7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2dbbmd4LWNoYXJ0cy1jYXJkXScsXG4gIHRlbXBsYXRlOiBgXG4gICAgPHN2ZzpnIFthdHRyLnRyYW5zZm9ybV09XCJ0cmFuc2Zvcm1cIiBjbGFzcz1cImNlbGxcIiAoY2xpY2spPVwib25DbGljaygpXCI+XG4gICAgICA8c3ZnOnJlY3QgY2xhc3M9XCJjYXJkXCIgW3N0eWxlLmZpbGxdPVwiY29sb3JcIiBbYXR0ci53aWR0aF09XCJjYXJkV2lkdGhcIiBbYXR0ci5oZWlnaHRdPVwiY2FyZEhlaWdodFwiIHJ4PVwiM1wiIHJ5PVwiM1wiIC8+XG4gICAgICA8c3ZnOnBhdGhcbiAgICAgICAgKm5nSWY9XCJiYW5kQ29sb3IgJiYgYmFuZENvbG9yICE9PSBjb2xvclwiXG4gICAgICAgIGNsYXNzPVwiY2FyZC1iYW5kXCJcbiAgICAgICAgW2F0dHIuZmlsbF09XCJiYW5kQ29sb3JcIlxuICAgICAgICBbYXR0ci50cmFuc2Zvcm1dPVwidHJhbnNmb3JtQmFuZFwiXG4gICAgICAgIHN0cm9rZT1cIm5vbmVcIlxuICAgICAgICBbYXR0ci5kXT1cImJhbmRQYXRoXCJcbiAgICAgIC8+XG4gICAgICA8dGl0bGU+e3sgbGFiZWwgfX08L3RpdGxlPlxuICAgICAgPHN2Zzpmb3JlaWduT2JqZWN0XG4gICAgICAgIGNsYXNzPVwidHJpbW1lZC1sYWJlbFwiXG4gICAgICAgIHg9XCI1XCJcbiAgICAgICAgW2F0dHIueF09XCJ0ZXh0UGFkZGluZ1szXVwiXG4gICAgICAgIFthdHRyLnldPVwiY2FyZEhlaWdodCAtIHRleHRQYWRkaW5nWzJdXCJcbiAgICAgICAgW2F0dHIud2lkdGhdPVwidGV4dFdpZHRoXCJcbiAgICAgICAgW2F0dHIuaGVpZ2h0XT1cImxhYmVsRm9udFNpemUgKyB0ZXh0UGFkZGluZ1syXVwiXG4gICAgICAgIGFsaWdubWVudC1iYXNlbGluZT1cImhhbmdpbmdcIlxuICAgICAgPlxuICAgICAgICA8eGh0bWw6cFxuICAgICAgICAgIFtzdHlsZS5jb2xvcl09XCJ0ZXh0Q29sb3JcIlxuICAgICAgICAgIFtzdHlsZS5mb250U2l6ZS5weF09XCJsYWJlbEZvbnRTaXplXCJcbiAgICAgICAgICBbc3R5bGUubGluZUhlaWdodC5weF09XCJsYWJlbEZvbnRTaXplXCJcbiAgICAgICAgICBbaW5uZXJIVE1MXT1cImZvcm1hdHRlZExhYmVsXCJcbiAgICAgICAgPlxuICAgICAgICA8L3hodG1sOnA+XG4gICAgICA8L3N2Zzpmb3JlaWduT2JqZWN0PlxuICAgICAgPHN2Zzp0ZXh0XG4gICAgICAgICN0ZXh0RWxcbiAgICAgICAgY2xhc3M9XCJ2YWx1ZS10ZXh0XCJcbiAgICAgICAgW2F0dHIueF09XCJ0ZXh0UGFkZGluZ1szXVwiXG4gICAgICAgIFthdHRyLnldPVwidGV4dFBhZGRpbmdbMF1cIlxuICAgICAgICBbc3R5bGUuZmlsbF09XCJ0ZXh0Q29sb3JcIlxuICAgICAgICB0ZXh0LWFuY2hvcj1cInN0YXJ0XCJcbiAgICAgICAgYWxpZ25tZW50LWJhc2VsaW5lPVwiaGFuZ2luZ1wiXG4gICAgICAgIFtzdHlsZS5mb250LXNpemUucHRdPVwidGV4dEZvbnRTaXplXCJcbiAgICAgID5cbiAgICAgICAge3sgdmFsdWUgfX1cbiAgICAgIDwvc3ZnOnRleHQ+XG4gICAgPC9zdmc6Zz5cbiAgYCxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgQ2FyZENvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcywgT25EZXN0cm95IHtcbiAgQElucHV0KCkgY29sb3I7XG4gIEBJbnB1dCgpIGJhbmRDb2xvcjtcbiAgQElucHV0KCkgdGV4dENvbG9yO1xuXG4gIEBJbnB1dCgpIHg7XG4gIEBJbnB1dCgpIHk7XG4gIEBJbnB1dCgpIHdpZHRoO1xuICBASW5wdXQoKSBoZWlnaHQ7XG4gIEBJbnB1dCgpIGxhYmVsO1xuICBASW5wdXQoKSBkYXRhO1xuICBASW5wdXQoKSBtZWRpYW5TaXplOiBudW1iZXI7XG4gIEBJbnB1dCgpIHZhbHVlRm9ybWF0dGluZzogYW55O1xuICBASW5wdXQoKSBsYWJlbEZvcm1hdHRpbmc6IGFueTtcbiAgQElucHV0KCkgYW5pbWF0aW9uczogYm9vbGVhbiA9IHRydWU7XG5cbiAgQE91dHB1dCgpIHNlbGVjdCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBAVmlld0NoaWxkKCd0ZXh0RWwnLCB7IHN0YXRpYzogZmFsc2UgfSkgdGV4dEVsOiBFbGVtZW50UmVmO1xuXG4gIGVsZW1lbnQ6IEhUTUxFbGVtZW50O1xuICB2YWx1ZTogc3RyaW5nID0gJyc7XG4gIHRyYW5zZm9ybTogc3RyaW5nO1xuICBmb3JtYXR0ZWRMYWJlbDogc3RyaW5nO1xuICBjYXJkV2lkdGg6IG51bWJlcjtcbiAgY2FyZEhlaWdodDogbnVtYmVyO1xuICB0ZXh0V2lkdGg6IG51bWJlcjtcbiAgdGV4dEZvbnRTaXplOiBudW1iZXIgPSAxMjtcbiAgdGV4dFRyYW5zZm9ybTogc3RyaW5nID0gJyc7XG4gIGluaXRpYWxpemVkOiBib29sZWFuID0gZmFsc2U7XG4gIGFuaW1hdGlvblJlcTogYW55O1xuXG4gIGJhbmRIZWlnaHQ6IG51bWJlciA9IDEwO1xuICB0cmFuc2Zvcm1CYW5kOiBzdHJpbmc7XG4gIHRleHRQYWRkaW5nID0gWzEwLCAyMCwgNSwgMjBdO1xuICBsYWJlbEZvbnRTaXplID0gMTU7XG5cbiAgYmFuZFBhdGg6IHN0cmluZztcblxuICBjb25zdHJ1Y3RvcihlbGVtZW50OiBFbGVtZW50UmVmLCBwcml2YXRlIGNkOiBDaGFuZ2VEZXRlY3RvclJlZiwgcHJpdmF0ZSB6b25lOiBOZ1pvbmUpIHtcbiAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50Lm5hdGl2ZUVsZW1lbnQ7XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgdGhpcy51cGRhdGUoKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIGNhbmNlbEFuaW1hdGlvbkZyYW1lKHRoaXMuYW5pbWF0aW9uUmVxKTtcbiAgfVxuXG4gIHVwZGF0ZSgpOiB2b2lkIHtcbiAgICB0aGlzLnpvbmUucnVuKCgpID0+IHtcbiAgICAgIGNvbnN0IGhhc1ZhbHVlID0gdGhpcy5kYXRhICYmIHR5cGVvZiB0aGlzLmRhdGEudmFsdWUgIT09ICd1bmRlZmluZWQnO1xuICAgICAgY29uc3QgdmFsdWVGb3JtYXR0aW5nID0gdGhpcy52YWx1ZUZvcm1hdHRpbmcgfHwgKGNhcmQgPT4gY2FyZC52YWx1ZS50b0xvY2FsZVN0cmluZygpKTtcbiAgICAgIGNvbnN0IGxhYmVsRm9ybWF0dGluZyA9IHRoaXMubGFiZWxGb3JtYXR0aW5nIHx8IChjYXJkID0+IGVzY2FwZUxhYmVsKHRyaW1MYWJlbChjYXJkLmxhYmVsLCA1NSkpKTtcblxuICAgICAgdGhpcy50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlKCR7dGhpcy54fSAsICR7dGhpcy55fSlgO1xuXG4gICAgICB0aGlzLnRleHRXaWR0aCA9IE1hdGgubWF4KDAsIHRoaXMud2lkdGgpIC0gdGhpcy50ZXh0UGFkZGluZ1sxXSAtIHRoaXMudGV4dFBhZGRpbmdbM107XG4gICAgICB0aGlzLmNhcmRXaWR0aCA9IE1hdGgubWF4KDAsIHRoaXMud2lkdGgpO1xuICAgICAgdGhpcy5jYXJkSGVpZ2h0ID0gTWF0aC5tYXgoMCwgdGhpcy5oZWlnaHQpO1xuXG4gICAgICB0aGlzLmxhYmVsID0gdGhpcy5sYWJlbCA/IHRoaXMubGFiZWwgOiB0aGlzLmRhdGEubmFtZTtcblxuICAgICAgY29uc3QgY2FyZERhdGEgPSB7XG4gICAgICAgIGxhYmVsOiB0aGlzLmxhYmVsLFxuICAgICAgICBkYXRhOiB0aGlzLmRhdGEsXG4gICAgICAgIHZhbHVlOiB0aGlzLmRhdGEudmFsdWVcbiAgICAgIH07XG5cbiAgICAgIHRoaXMuZm9ybWF0dGVkTGFiZWwgPSBsYWJlbEZvcm1hdHRpbmcoY2FyZERhdGEpO1xuICAgICAgdGhpcy50cmFuc2Zvcm1CYW5kID0gYHRyYW5zbGF0ZSgwICwgJHt0aGlzLmNhcmRIZWlnaHQgLSB0aGlzLmJhbmRIZWlnaHR9KWA7XG5cbiAgICAgIGNvbnN0IHZhbHVlID0gaGFzVmFsdWUgPyB2YWx1ZUZvcm1hdHRpbmcoY2FyZERhdGEpIDogJyc7XG5cbiAgICAgIHRoaXMudmFsdWUgPSB0aGlzLnBhZGRlZFZhbHVlKHZhbHVlKTtcbiAgICAgIHRoaXMuc2V0UGFkZGluZygpO1xuXG4gICAgICB0aGlzLmJhbmRQYXRoID0gcm91bmRlZFJlY3QoMCwgMCwgdGhpcy5jYXJkV2lkdGgsIHRoaXMuYmFuZEhlaWdodCwgMywgW2ZhbHNlLCBmYWxzZSwgdHJ1ZSwgdHJ1ZV0pO1xuXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdGhpcy5zY2FsZVRleHQoKTtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgICAgICBpZiAoaGFzVmFsdWUgJiYgIXRoaXMuaW5pdGlhbGl6ZWQpIHtcbiAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMuc3RhcnRDb3VudCgpLCAyMCk7XG4gICAgICAgIH1cbiAgICAgIH0sIDgpO1xuICAgIH0pO1xuICB9XG5cbiAgcGFkZGVkVmFsdWUodmFsdWU6IHN0cmluZykge1xuICAgIGlmICh0aGlzLm1lZGlhblNpemUgJiYgdGhpcy5tZWRpYW5TaXplID4gdmFsdWUubGVuZ3RoKSB7XG4gICAgICB2YWx1ZSArPSAnXFx1MjAwNycucmVwZWF0KHRoaXMubWVkaWFuU2l6ZSAtIHZhbHVlLmxlbmd0aCk7XG4gICAgfVxuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuXG4gIHN0YXJ0Q291bnQoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLmluaXRpYWxpemVkICYmIHRoaXMuYW5pbWF0aW9ucykge1xuICAgICAgY2FuY2VsQW5pbWF0aW9uRnJhbWUodGhpcy5hbmltYXRpb25SZXEpO1xuXG4gICAgICBjb25zdCB2YWwgPSB0aGlzLmRhdGEudmFsdWU7XG4gICAgICBjb25zdCBkZWNzID0gZGVjaW1hbENoZWNrZXIodmFsKTtcbiAgICAgIGNvbnN0IHZhbHVlRm9ybWF0dGluZyA9IHRoaXMudmFsdWVGb3JtYXR0aW5nIHx8IChjYXJkID0+IGNhcmQudmFsdWUudG9Mb2NhbGVTdHJpbmcoKSk7XG5cbiAgICAgIGNvbnN0IGNhbGxiYWNrID0gKHsgdmFsdWUsIGZpbmlzaGVkIH0pID0+IHtcbiAgICAgICAgdGhpcy56b25lLnJ1bigoKSA9PiB7XG4gICAgICAgICAgdmFsdWUgPSBmaW5pc2hlZCA/IHZhbCA6IHZhbHVlO1xuICAgICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZUZvcm1hdHRpbmcoeyBsYWJlbDogdGhpcy5sYWJlbCwgZGF0YTogdGhpcy5kYXRhLCB2YWx1ZSB9KTtcbiAgICAgICAgICBpZiAoIWZpbmlzaGVkKSB7XG4gICAgICAgICAgICB0aGlzLnZhbHVlID0gdGhpcy5wYWRkZWRWYWx1ZSh0aGlzLnZhbHVlKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgfSk7XG4gICAgICB9O1xuXG4gICAgICB0aGlzLmFuaW1hdGlvblJlcSA9IGNvdW50KDAsIHZhbCwgZGVjcywgMSwgY2FsbGJhY2spO1xuICAgICAgdGhpcy5pbml0aWFsaXplZCA9IHRydWU7XG4gICAgfVxuICB9XG5cbiAgc2NhbGVUZXh0KCk6IHZvaWQge1xuICAgIHRoaXMuem9uZS5ydW4oKCkgPT4ge1xuICAgICAgY29uc3QgeyB3aWR0aCwgaGVpZ2h0IH0gPSB0aGlzLnRleHRFbC5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgaWYgKHdpZHRoID09PSAwIHx8IGhlaWdodCA9PT0gMCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHRleHRQYWRkaW5nID0gKHRoaXMudGV4dFBhZGRpbmdbMV0gPSB0aGlzLnRleHRQYWRkaW5nWzNdID0gdGhpcy5jYXJkV2lkdGggLyA4KTtcbiAgICAgIGNvbnN0IGF2YWlsYWJsZVdpZHRoID0gdGhpcy5jYXJkV2lkdGggLSAyICogdGV4dFBhZGRpbmc7XG4gICAgICBjb25zdCBhdmFpbGFibGVIZWlnaHQgPSB0aGlzLmNhcmRIZWlnaHQgLyAzO1xuXG4gICAgICBjb25zdCByZXNpemVTY2FsZSA9IE1hdGgubWluKGF2YWlsYWJsZVdpZHRoIC8gd2lkdGgsIGF2YWlsYWJsZUhlaWdodCAvIGhlaWdodCk7XG4gICAgICB0aGlzLnRleHRGb250U2l6ZSA9IE1hdGguZmxvb3IodGhpcy50ZXh0Rm9udFNpemUgKiByZXNpemVTY2FsZSk7XG4gICAgICB0aGlzLmxhYmVsRm9udFNpemUgPSBNYXRoLm1pbih0aGlzLnRleHRGb250U2l6ZSwgMTUpO1xuXG4gICAgICB0aGlzLnNldFBhZGRpbmcoKTtcbiAgICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XG4gICAgfSk7XG4gIH1cblxuICBzZXRQYWRkaW5nKCkge1xuICAgIHRoaXMudGV4dFBhZGRpbmdbMV0gPSB0aGlzLnRleHRQYWRkaW5nWzNdID0gdGhpcy5jYXJkV2lkdGggLyA4O1xuICAgIGNvbnN0IHBhZGRpbmcgPSB0aGlzLmNhcmRIZWlnaHQgLyAyO1xuICAgIHRoaXMudGV4dFBhZGRpbmdbMF0gPSBwYWRkaW5nIC0gdGhpcy50ZXh0Rm9udFNpemUgLSB0aGlzLmxhYmVsRm9udFNpemUgLyAyO1xuICAgIHRoaXMudGV4dFBhZGRpbmdbMl0gPSBwYWRkaW5nIC0gdGhpcy5sYWJlbEZvbnRTaXplO1xuICB9XG5cbiAgb25DbGljaygpOiB2b2lkIHtcbiAgICB0aGlzLnNlbGVjdC5lbWl0KHRoaXMuZGF0YSk7XG4gIH1cbn1cbiJdfQ==