import { __decorate } from "tslib";
import { Component, Input, Output, ChangeDetectionStrategy, HostListener, EventEmitter } from '@angular/core';
let LegendEntryComponent = class LegendEntryComponent {
    constructor() {
        this.isActive = false;
        this.select = new EventEmitter();
        this.activate = new EventEmitter();
        this.deactivate = new EventEmitter();
        this.toggle = new EventEmitter();
    }
    get trimmedLabel() {
        return this.formattedLabel || '(empty)';
    }
    onMouseEnter() {
        this.activate.emit({ name: this.label });
    }
    onMouseLeave() {
        this.deactivate.emit({ name: this.label });
    }
    isNotANumber(value) {
        return isNaN(value);
    }
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
        template: `
    <span [title]="formattedLabel" tabindex="-1" [class.active]="isActive" (click)="select.emit(formattedLabel)">
      <span class="legend-label-color" [style.background-color]="color" (click)="toggle.emit(formattedLabel)"> </span>
      <span class="legend-label-text name">
        {{ trimmedLabel }}
      </span>
      <span class="legend-label-text average" *ngIf="!isNotANumber(average?.value)">
        {{average?.value | number:'1.0-2'}}
      </span>
    </span>
  `,
        changeDetection: ChangeDetectionStrategy.OnPush,
        styles: ['.legend-label-text { padding-right: 5px; }',
            '.name { width: 65%; }',
            '.average { width: 20%; }']
    })
], LegendEntryComponent);
export { LegendEntryComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGVnZW5kLWVudHJ5LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bzd2ltbGFuZS9uZ3gtY2hhcnRzLyIsInNvdXJjZXMiOlsibGliL2NvbW1vbi9sZWdlbmQvbGVnZW5kLWVudHJ5LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLHVCQUF1QixFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFzQjlHLElBQWEsb0JBQW9CLEdBQWpDLE1BQWEsb0JBQW9CO0lBQWpDO1FBSVcsYUFBUSxHQUFZLEtBQUssQ0FBQztRQUd6QixXQUFNLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFDL0MsYUFBUSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ2pELGVBQVUsR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUNuRCxXQUFNLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7SUFvQjNELENBQUM7SUFsQkMsSUFBSSxZQUFZO1FBQ2QsT0FBTyxJQUFJLENBQUMsY0FBYyxJQUFJLFNBQVMsQ0FBQztJQUMxQyxDQUFDO0lBR0QsWUFBWTtRQUNWLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO0lBQzNDLENBQUM7SUFHRCxZQUFZO1FBQ1YsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7SUFDN0MsQ0FBQztJQUVELFlBQVksQ0FBQyxLQUFLO1FBQ2hCLE9BQU8sS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3RCLENBQUM7Q0FFRixDQUFBO0FBN0JVO0lBQVIsS0FBSyxFQUFFO21EQUFlO0FBQ2Q7SUFBUixLQUFLLEVBQUU7bURBQVk7QUFDWDtJQUFSLEtBQUssRUFBRTs0REFBd0I7QUFDdkI7SUFBUixLQUFLLEVBQUU7c0RBQTJCO0FBQzFCO0lBQVIsS0FBSyxFQUFFO3FEQUFjO0FBRVo7SUFBVCxNQUFNLEVBQUU7b0RBQWdEO0FBQy9DO0lBQVQsTUFBTSxFQUFFO3NEQUFrRDtBQUNqRDtJQUFULE1BQU0sRUFBRTt3REFBb0Q7QUFDbkQ7SUFBVCxNQUFNLEVBQUU7b0RBQWdEO0FBT3pEO0lBREMsWUFBWSxDQUFDLFlBQVksQ0FBQzt3REFHMUI7QUFHRDtJQURDLFlBQVksQ0FBQyxZQUFZLENBQUM7d0RBRzFCO0FBeEJVLG9CQUFvQjtJQXBCaEMsU0FBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLHlCQUF5QjtRQUNuQyxRQUFRLEVBQUU7Ozs7Ozs7Ozs7R0FVVDtRQU1ELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2lCQUo3Qyw0Q0FBNEM7WUFDNUMsdUJBQXVCO1lBQ3ZCLDBCQUEwQjtLQUc3QixDQUFDO0dBQ1csb0JBQW9CLENBOEJoQztTQTlCWSxvQkFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPdXRwdXQsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBIb3N0TGlzdGVuZXIsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduZ3gtY2hhcnRzLWxlZ2VuZC1lbnRyeScsXG4gIHRlbXBsYXRlOiBgXG4gICAgPHNwYW4gW3RpdGxlXT1cImZvcm1hdHRlZExhYmVsXCIgdGFiaW5kZXg9XCItMVwiIFtjbGFzcy5hY3RpdmVdPVwiaXNBY3RpdmVcIiAoY2xpY2spPVwic2VsZWN0LmVtaXQoZm9ybWF0dGVkTGFiZWwpXCI+XG4gICAgICA8c3BhbiBjbGFzcz1cImxlZ2VuZC1sYWJlbC1jb2xvclwiIFtzdHlsZS5iYWNrZ3JvdW5kLWNvbG9yXT1cImNvbG9yXCIgKGNsaWNrKT1cInRvZ2dsZS5lbWl0KGZvcm1hdHRlZExhYmVsKVwiPiA8L3NwYW4+XG4gICAgICA8c3BhbiBjbGFzcz1cImxlZ2VuZC1sYWJlbC10ZXh0IG5hbWVcIj5cbiAgICAgICAge3sgdHJpbW1lZExhYmVsIH19XG4gICAgICA8L3NwYW4+XG4gICAgICA8c3BhbiBjbGFzcz1cImxlZ2VuZC1sYWJlbC10ZXh0IGF2ZXJhZ2VcIiAqbmdJZj1cIiFpc05vdEFOdW1iZXIoYXZlcmFnZT8udmFsdWUpXCI+XG4gICAgICAgIHt7YXZlcmFnZT8udmFsdWUgfCBudW1iZXI6JzEuMC0yJ319XG4gICAgICA8L3NwYW4+XG4gICAgPC9zcGFuPlxuICBgLFxuICBzdHlsZXM6IFtcbiAgICAnLmxlZ2VuZC1sYWJlbC10ZXh0IHsgcGFkZGluZy1yaWdodDogNXB4OyB9JyxcbiAgICAnLm5hbWUgeyB3aWR0aDogNjUlOyB9JyxcbiAgICAnLmF2ZXJhZ2UgeyB3aWR0aDogMjAlOyB9J1xuICBdLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBMZWdlbmRFbnRyeUNvbXBvbmVudCB7XG4gIEBJbnB1dCgpIGNvbG9yOiBzdHJpbmc7XG4gIEBJbnB1dCgpIGxhYmVsOiBhbnk7XG4gIEBJbnB1dCgpIGZvcm1hdHRlZExhYmVsOiBzdHJpbmc7XG4gIEBJbnB1dCgpIGlzQWN0aXZlOiBib29sZWFuID0gZmFsc2U7XG4gIEBJbnB1dCgpIGF2ZXJhZ2U6IGFueTtcblxuICBAT3V0cHV0KCkgc2VsZWN0OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIGFjdGl2YXRlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIGRlYWN0aXZhdGU6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgdG9nZ2xlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBnZXQgdHJpbW1lZExhYmVsKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuZm9ybWF0dGVkTGFiZWwgfHwgJyhlbXB0eSknO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignbW91c2VlbnRlcicpXG4gIG9uTW91c2VFbnRlcigpOiB2b2lkIHtcbiAgICB0aGlzLmFjdGl2YXRlLmVtaXQoeyBuYW1lOiB0aGlzLmxhYmVsIH0pO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignbW91c2VsZWF2ZScpXG4gIG9uTW91c2VMZWF2ZSgpOiB2b2lkIHtcbiAgICB0aGlzLmRlYWN0aXZhdGUuZW1pdCh7IG5hbWU6IHRoaXMubGFiZWwgfSk7XG4gIH1cblxuICBpc05vdEFOdW1iZXIodmFsdWUpIHtcbiAgICByZXR1cm4gaXNOYU4odmFsdWUpO1xuICB9XG5cbn1cbiJdfQ==