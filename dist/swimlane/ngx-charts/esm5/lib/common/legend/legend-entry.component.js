import { __decorate } from "tslib";
import { Component, Input, Output, ChangeDetectionStrategy, HostListener, EventEmitter } from '@angular/core';
var LegendEntryComponent = /** @class */ (function () {
    function LegendEntryComponent() {
        this.isActive = false;
        this.select = new EventEmitter();
        this.activate = new EventEmitter();
        this.deactivate = new EventEmitter();
        this.toggle = new EventEmitter();
    }
    Object.defineProperty(LegendEntryComponent.prototype, "trimmedLabel", {
        get: function () {
            return this.formattedLabel || '(empty)';
        },
        enumerable: true,
        configurable: true
    });
    LegendEntryComponent.prototype.onMouseEnter = function () {
        this.activate.emit({ name: this.label });
    };
    LegendEntryComponent.prototype.onMouseLeave = function () {
        this.deactivate.emit({ name: this.label });
    };
    LegendEntryComponent.prototype.isNotANumber = function (value) {
        return isNaN(value);
    };
    __decorate([
        Input()
    ], LegendEntryComponent.prototype, "color", void 0);
    __decorate([
        Input()
    ], LegendEntryComponent.prototype, "label", void 0);
    __decorate([
        Input()
    ], LegendEntryComponent.prototype, "formattedLabel", void 0);
    __decorate([
        Input()
    ], LegendEntryComponent.prototype, "isActive", void 0);
    __decorate([
        Input()
    ], LegendEntryComponent.prototype, "average", void 0);
    __decorate([
        Output()
    ], LegendEntryComponent.prototype, "select", void 0);
    __decorate([
        Output()
    ], LegendEntryComponent.prototype, "activate", void 0);
    __decorate([
        Output()
    ], LegendEntryComponent.prototype, "deactivate", void 0);
    __decorate([
        Output()
    ], LegendEntryComponent.prototype, "toggle", void 0);
    __decorate([
        HostListener('mouseenter')
    ], LegendEntryComponent.prototype, "onMouseEnter", null);
    __decorate([
        HostListener('mouseleave')
    ], LegendEntryComponent.prototype, "onMouseLeave", null);
    LegendEntryComponent = __decorate([
        Component({
            selector: 'ngx-charts-legend-entry',
            template: "\n    <span [title]=\"formattedLabel\" tabindex=\"-1\" [class.active]=\"isActive\" (click)=\"select.emit(formattedLabel)\">\n      <span class=\"legend-label-color\" [style.background-color]=\"color\" (click)=\"toggle.emit(formattedLabel)\"> </span>\n      <span class=\"legend-label-text name\">\n        {{ trimmedLabel }}\n      </span>\n      <span class=\"legend-label-text average\" *ngIf=\"!isNotANumber(average?.value)\">\n        {{average?.value | number:'1.0-2'}}\n      </span>\n    </span>\n  ",
            changeDetection: ChangeDetectionStrategy.OnPush,
            styles: ['.legend-label-text { padding-right: 5px; }',
                '.name { width: 65%; }',
                '.average { width: 20%; }']
        })
    ], LegendEntryComponent);
    return LegendEntryComponent;
}());
export { LegendEntryComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGVnZW5kLWVudHJ5LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bzd2ltbGFuZS9uZ3gtY2hhcnRzLyIsInNvdXJjZXMiOlsibGliL2NvbW1vbi9sZWdlbmQvbGVnZW5kLWVudHJ5LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLHVCQUF1QixFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFzQjlHO0lBQUE7UUFJVyxhQUFRLEdBQVksS0FBSyxDQUFDO1FBR3pCLFdBQU0sR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUMvQyxhQUFRLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFDakQsZUFBVSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ25ELFdBQU0sR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztJQW9CM0QsQ0FBQztJQWxCQyxzQkFBSSw4Q0FBWTthQUFoQjtZQUNFLE9BQU8sSUFBSSxDQUFDLGNBQWMsSUFBSSxTQUFTLENBQUM7UUFDMUMsQ0FBQzs7O09BQUE7SUFHRCwyQ0FBWSxHQUFaO1FBQ0UsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7SUFDM0MsQ0FBQztJQUdELDJDQUFZLEdBQVo7UUFDRSxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQztJQUM3QyxDQUFDO0lBRUQsMkNBQVksR0FBWixVQUFhLEtBQUs7UUFDaEIsT0FBTyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDdEIsQ0FBQztJQTNCUTtRQUFSLEtBQUssRUFBRTt1REFBZTtJQUNkO1FBQVIsS0FBSyxFQUFFO3VEQUFZO0lBQ1g7UUFBUixLQUFLLEVBQUU7Z0VBQXdCO0lBQ3ZCO1FBQVIsS0FBSyxFQUFFOzBEQUEyQjtJQUMxQjtRQUFSLEtBQUssRUFBRTt5REFBYztJQUVaO1FBQVQsTUFBTSxFQUFFO3dEQUFnRDtJQUMvQztRQUFULE1BQU0sRUFBRTswREFBa0Q7SUFDakQ7UUFBVCxNQUFNLEVBQUU7NERBQW9EO0lBQ25EO1FBQVQsTUFBTSxFQUFFO3dEQUFnRDtJQU96RDtRQURDLFlBQVksQ0FBQyxZQUFZLENBQUM7NERBRzFCO0lBR0Q7UUFEQyxZQUFZLENBQUMsWUFBWSxDQUFDOzREQUcxQjtJQXhCVSxvQkFBb0I7UUFwQmhDLFNBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSx5QkFBeUI7WUFDbkMsUUFBUSxFQUFFLDRmQVVUO1lBTUQsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07cUJBSjdDLDRDQUE0QztnQkFDNUMsdUJBQXVCO2dCQUN2QiwwQkFBMEI7U0FHN0IsQ0FBQztPQUNXLG9CQUFvQixDQThCaEM7SUFBRCwyQkFBQztDQUFBLEFBOUJELElBOEJDO1NBOUJZLG9CQUFvQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE91dHB1dCwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIEhvc3RMaXN0ZW5lciwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25neC1jaGFydHMtbGVnZW5kLWVudHJ5JyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8c3BhbiBbdGl0bGVdPVwiZm9ybWF0dGVkTGFiZWxcIiB0YWJpbmRleD1cIi0xXCIgW2NsYXNzLmFjdGl2ZV09XCJpc0FjdGl2ZVwiIChjbGljayk9XCJzZWxlY3QuZW1pdChmb3JtYXR0ZWRMYWJlbClcIj5cbiAgICAgIDxzcGFuIGNsYXNzPVwibGVnZW5kLWxhYmVsLWNvbG9yXCIgW3N0eWxlLmJhY2tncm91bmQtY29sb3JdPVwiY29sb3JcIiAoY2xpY2spPVwidG9nZ2xlLmVtaXQoZm9ybWF0dGVkTGFiZWwpXCI+IDwvc3Bhbj5cbiAgICAgIDxzcGFuIGNsYXNzPVwibGVnZW5kLWxhYmVsLXRleHQgbmFtZVwiPlxuICAgICAgICB7eyB0cmltbWVkTGFiZWwgfX1cbiAgICAgIDwvc3Bhbj5cbiAgICAgIDxzcGFuIGNsYXNzPVwibGVnZW5kLWxhYmVsLXRleHQgYXZlcmFnZVwiICpuZ0lmPVwiIWlzTm90QU51bWJlcihhdmVyYWdlPy52YWx1ZSlcIj5cbiAgICAgICAge3thdmVyYWdlPy52YWx1ZSB8IG51bWJlcjonMS4wLTInfX1cbiAgICAgIDwvc3Bhbj5cbiAgICA8L3NwYW4+XG4gIGAsXG4gIHN0eWxlczogW1xuICAgICcubGVnZW5kLWxhYmVsLXRleHQgeyBwYWRkaW5nLXJpZ2h0OiA1cHg7IH0nLFxuICAgICcubmFtZSB7IHdpZHRoOiA2NSU7IH0nLFxuICAgICcuYXZlcmFnZSB7IHdpZHRoOiAyMCU7IH0nXG4gIF0sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIExlZ2VuZEVudHJ5Q29tcG9uZW50IHtcbiAgQElucHV0KCkgY29sb3I6IHN0cmluZztcbiAgQElucHV0KCkgbGFiZWw6IGFueTtcbiAgQElucHV0KCkgZm9ybWF0dGVkTGFiZWw6IHN0cmluZztcbiAgQElucHV0KCkgaXNBY3RpdmU6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KCkgYXZlcmFnZTogYW55O1xuXG4gIEBPdXRwdXQoKSBzZWxlY3Q6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgYWN0aXZhdGU6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgZGVhY3RpdmF0ZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSB0b2dnbGU6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIGdldCB0cmltbWVkTGFiZWwoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5mb3JtYXR0ZWRMYWJlbCB8fCAnKGVtcHR5KSc7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdtb3VzZWVudGVyJylcbiAgb25Nb3VzZUVudGVyKCk6IHZvaWQge1xuICAgIHRoaXMuYWN0aXZhdGUuZW1pdCh7IG5hbWU6IHRoaXMubGFiZWwgfSk7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdtb3VzZWxlYXZlJylcbiAgb25Nb3VzZUxlYXZlKCk6IHZvaWQge1xuICAgIHRoaXMuZGVhY3RpdmF0ZS5lbWl0KHsgbmFtZTogdGhpcy5sYWJlbCB9KTtcbiAgfVxuXG4gIGlzTm90QU51bWJlcih2YWx1ZSkge1xuICAgIHJldHVybiBpc05hTih2YWx1ZSk7XG4gIH1cblxufVxuIl19