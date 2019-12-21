import { __decorate } from "tslib";
import { Component, Input, ChangeDetectionStrategy, Output, EventEmitter, SimpleChanges, OnChanges, ChangeDetectorRef, ViewEncapsulation } from '@angular/core';
import { formatLabel } from '../label.helper';
let LegendComponent = class LegendComponent {
    constructor(cd) {
        this.cd = cd;
        this.horizontal = false;
        this.labelClick = new EventEmitter();
        this.labelActivate = new EventEmitter();
        this.labelDeactivate = new EventEmitter();
        this.legendEntries = [];
    }
    ngOnChanges(changes) {
        this.update();
    }
    update() {
        this.cd.markForCheck();
        this.legendEntries = this.getLegendEntries();
    }
    getLegendEntries() {
        const items = [];
        for (const label of this.data) {
            const formattedLabel = formatLabel(label);
            const idx = items.findIndex(i => {
                return i.label === formattedLabel;
            });
            if (idx === -1) {
                items.push({
                    label,
                    formattedLabel,
                    color: this.colors.getColor(label)
                });
            }
        }
        return items;
    }
    isActive(entry) {
        if (!this.activeEntries)
            return false;
        const item = this.activeEntries.find(d => {
            return entry.label === d.name;
        });
        return item !== undefined;
    }
    activate(item) {
        this.labelActivate.emit(item);
    }
    deactivate(item) {
        this.labelDeactivate.emit(item);
    }
    trackBy(index, item) {
        return item.label;
    }
};
LegendComponent.ctorParameters = () => [
    { type: ChangeDetectorRef }
];
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
        template: `
    <div [style.width.px]="width">
      <header class="legend-title" *ngIf="title?.length > 0">
        <span class="legend-title-text">{{ title }}</span>
        <span class="legend-title-text avg">Avg</span>
      </header>
      <div class="legend-wrap">
        <ul class="legend-labels" [class.horizontal-legend]="horizontal" [style.max-height.px]="height - 45">
          <li *ngFor="let entry of legendEntries; let i = index; trackBy: trackBy" class="legend-label">
            <ngx-charts-legend-entry
              [label]="entry.label"
              [formattedLabel]="entry.formattedLabel"
              [color]="entry.color"
              [average]="averages[i]"
              [isActive]="isActive(entry)"
              (select)="labelClick.emit($event)"
              (activate)="activate($event)"
              (deactivate)="deactivate($event)"
            >
            </ngx-charts-legend-entry>
          </li>
        </ul>
      </div>
    </div>
  `,
        encapsulation: ViewEncapsulation.None,
        changeDetection: ChangeDetectionStrategy.OnPush,
        styles: [".chart-legend{display:inline-block;padding:0;width:auto!important}.chart-legend .legend-title{white-space:nowrap;overflow:hidden;margin-left:10px;margin-bottom:5px;font-size:14px;font-weight:700}.chart-legend .legend-title .legend-title-text{padding-right:5px}.chart-legend .legend-title .legend-title-text.stat{width:65%}.chart-legend .legend-title .legend-title-text.avg{width:15%}.chart-legend li,.chart-legend ul{padding:0;margin:0;list-style:none}.chart-legend .horizontal-legend li{display:inline-block}.chart-legend .legend-wrap{width:calc(100% - 10px)}.chart-legend .legend-labels{line-height:85%;list-style:none;text-align:left;float:left;width:100%;border-radius:3px;overflow-y:auto;overflow-x:hidden;white-space:nowrap;background:rgba(0,0,0,.05)}.chart-legend .legend-label{cursor:pointer;font-size:90%;margin:8px;color:#afb7c8}.chart-legend .legend-label:hover{color:#000;-webkit-transition:.2s;transition:.2s}.chart-legend .legend-label .active .legend-label-text{color:#000}.chart-legend .legend-label-color{display:inline-block;height:15px;width:15px;margin-right:5px;color:#5b646b;border-radius:3px}.chart-legend .legend-label-text{display:inline-block;vertical-align:top;line-height:15px;font-size:12px;width:calc(100% - 20px);text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.chart-legend .legend-title-text{vertical-align:bottom;display:inline-block;line-height:16px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}"]
    })
], LegendComponent);
export { LegendComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGVnZW5kLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bzd2ltbGFuZS9uZ3gtY2hhcnRzLyIsInNvdXJjZXMiOlsibGliL2NvbW1vbi9sZWdlbmQvbGVnZW5kLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBQ0wsdUJBQXVCLEVBQ3ZCLE1BQU0sRUFDTixZQUFZLEVBQ1osYUFBYSxFQUNiLFNBQVMsRUFDVCxpQkFBaUIsRUFDakIsaUJBQWlCLEVBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQWlDOUMsSUFBYSxlQUFlLEdBQTVCLE1BQWEsZUFBZTtJQWdCMUIsWUFBb0IsRUFBcUI7UUFBckIsT0FBRSxHQUFGLEVBQUUsQ0FBbUI7UUFUaEMsZUFBVSxHQUFHLEtBQUssQ0FBQztRQUdsQixlQUFVLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFDbkQsa0JBQWEsR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUN0RCxvQkFBZSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBRWxFLGtCQUFhLEdBQVUsRUFBRSxDQUFDO0lBRWtCLENBQUM7SUFFN0MsV0FBVyxDQUFDLE9BQXNCO1FBQ2hDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUNoQixDQUFDO0lBRUQsTUFBTTtRQUNKLElBQUksQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDdkIsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztJQUMvQyxDQUFDO0lBRUQsZ0JBQWdCO1FBQ2QsTUFBTSxLQUFLLEdBQUcsRUFBRSxDQUFDO1FBRWpCLEtBQUssTUFBTSxLQUFLLElBQUksSUFBSSxDQUFDLElBQUksRUFBRTtZQUM3QixNQUFNLGNBQWMsR0FBRyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7WUFFMUMsTUFBTSxHQUFHLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRTtnQkFDOUIsT0FBTyxDQUFDLENBQUMsS0FBSyxLQUFLLGNBQWMsQ0FBQztZQUNwQyxDQUFDLENBQUMsQ0FBQztZQUVILElBQUksR0FBRyxLQUFLLENBQUMsQ0FBQyxFQUFFO2dCQUNkLEtBQUssQ0FBQyxJQUFJLENBQUM7b0JBQ1QsS0FBSztvQkFDTCxjQUFjO29CQUNkLEtBQUssRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUM7aUJBQ25DLENBQUMsQ0FBQzthQUNKO1NBQ0Y7UUFFRCxPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7SUFFRCxRQUFRLENBQUMsS0FBSztRQUNaLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYTtZQUFFLE9BQU8sS0FBSyxDQUFDO1FBQ3RDLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFO1lBQ3ZDLE9BQU8sS0FBSyxDQUFDLEtBQUssS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDO1FBQ2hDLENBQUMsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxJQUFJLEtBQUssU0FBUyxDQUFDO0lBQzVCLENBQUM7SUFFRCxRQUFRLENBQUMsSUFBSTtRQUNYLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2hDLENBQUM7SUFFRCxVQUFVLENBQUMsSUFBSTtRQUNiLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2xDLENBQUM7SUFFRCxPQUFPLENBQUMsS0FBSyxFQUFFLElBQUk7UUFDakIsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO0lBQ3BCLENBQUM7Q0FDRixDQUFBOztZQXBEeUIsaUJBQWlCOztBQWZoQztJQUFSLEtBQUssRUFBRTs2Q0FBTTtBQUNMO0lBQVIsS0FBSyxFQUFFOzhDQUFPO0FBQ047SUFBUixLQUFLLEVBQUU7K0NBQVE7QUFDUDtJQUFSLEtBQUssRUFBRTsrQ0FBUTtBQUNQO0lBQVIsS0FBSyxFQUFFOzhDQUFPO0FBQ047SUFBUixLQUFLLEVBQUU7c0RBQWU7QUFDZDtJQUFSLEtBQUssRUFBRTttREFBb0I7QUFDbkI7SUFBUixLQUFLLEVBQUU7aURBQWlCO0FBRWY7SUFBVCxNQUFNLEVBQUU7bURBQW9EO0FBQ25EO0lBQVQsTUFBTSxFQUFFO3NEQUF1RDtBQUN0RDtJQUFULE1BQU0sRUFBRTt3REFBeUQ7QUFadkQsZUFBZTtJQS9CM0IsU0FBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLG1CQUFtQjtRQUM3QixRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXdCVDtRQUVELGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO1FBQ3JDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOztLQUNoRCxDQUFDO0dBQ1csZUFBZSxDQW9FM0I7U0FwRVksZUFBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgSW5wdXQsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBPdXRwdXQsXG4gIEV2ZW50RW1pdHRlcixcbiAgU2ltcGxlQ2hhbmdlcyxcbiAgT25DaGFuZ2VzLFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBmb3JtYXRMYWJlbCB9IGZyb20gJy4uL2xhYmVsLmhlbHBlcic7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25neC1jaGFydHMtbGVnZW5kJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2IFtzdHlsZS53aWR0aC5weF09XCJ3aWR0aFwiPlxuICAgICAgPGhlYWRlciBjbGFzcz1cImxlZ2VuZC10aXRsZVwiICpuZ0lmPVwidGl0bGU/Lmxlbmd0aCA+IDBcIj5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJsZWdlbmQtdGl0bGUtdGV4dFwiPnt7IHRpdGxlIH19PC9zcGFuPlxuICAgICAgICA8c3BhbiBjbGFzcz1cImxlZ2VuZC10aXRsZS10ZXh0IGF2Z1wiPkF2Zzwvc3Bhbj5cbiAgICAgIDwvaGVhZGVyPlxuICAgICAgPGRpdiBjbGFzcz1cImxlZ2VuZC13cmFwXCI+XG4gICAgICAgIDx1bCBjbGFzcz1cImxlZ2VuZC1sYWJlbHNcIiBbY2xhc3MuaG9yaXpvbnRhbC1sZWdlbmRdPVwiaG9yaXpvbnRhbFwiIFtzdHlsZS5tYXgtaGVpZ2h0LnB4XT1cImhlaWdodCAtIDQ1XCI+XG4gICAgICAgICAgPGxpICpuZ0Zvcj1cImxldCBlbnRyeSBvZiBsZWdlbmRFbnRyaWVzOyBsZXQgaSA9IGluZGV4OyB0cmFja0J5OiB0cmFja0J5XCIgY2xhc3M9XCJsZWdlbmQtbGFiZWxcIj5cbiAgICAgICAgICAgIDxuZ3gtY2hhcnRzLWxlZ2VuZC1lbnRyeVxuICAgICAgICAgICAgICBbbGFiZWxdPVwiZW50cnkubGFiZWxcIlxuICAgICAgICAgICAgICBbZm9ybWF0dGVkTGFiZWxdPVwiZW50cnkuZm9ybWF0dGVkTGFiZWxcIlxuICAgICAgICAgICAgICBbY29sb3JdPVwiZW50cnkuY29sb3JcIlxuICAgICAgICAgICAgICBbYXZlcmFnZV09XCJhdmVyYWdlc1tpXVwiXG4gICAgICAgICAgICAgIFtpc0FjdGl2ZV09XCJpc0FjdGl2ZShlbnRyeSlcIlxuICAgICAgICAgICAgICAoc2VsZWN0KT1cImxhYmVsQ2xpY2suZW1pdCgkZXZlbnQpXCJcbiAgICAgICAgICAgICAgKGFjdGl2YXRlKT1cImFjdGl2YXRlKCRldmVudClcIlxuICAgICAgICAgICAgICAoZGVhY3RpdmF0ZSk9XCJkZWFjdGl2YXRlKCRldmVudClcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgPC9uZ3gtY2hhcnRzLWxlZ2VuZC1lbnRyeT5cbiAgICAgICAgICA8L2xpPlxuICAgICAgICA8L3VsPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIGAsXG4gIHN0eWxlVXJsczogWycuL2xlZ2VuZC5jb21wb25lbnQuc2NzcyddLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBMZWdlbmRDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xuICBASW5wdXQoKSBkYXRhO1xuICBASW5wdXQoKSB0aXRsZTtcbiAgQElucHV0KCkgY29sb3JzO1xuICBASW5wdXQoKSBoZWlnaHQ7XG4gIEBJbnB1dCgpIHdpZHRoO1xuICBASW5wdXQoKSBhY3RpdmVFbnRyaWVzO1xuICBASW5wdXQoKSBob3Jpem9udGFsID0gZmFsc2U7XG4gIEBJbnB1dCgpIGF2ZXJhZ2VzOiBhbnlbXTtcblxuICBAT3V0cHV0KCkgbGFiZWxDbGljazogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBsYWJlbEFjdGl2YXRlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIGxhYmVsRGVhY3RpdmF0ZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgbGVnZW5kRW50cmllczogYW55W10gPSBbXTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNkOiBDaGFuZ2VEZXRlY3RvclJlZikge31cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgdGhpcy51cGRhdGUoKTtcbiAgfVxuXG4gIHVwZGF0ZSgpOiB2b2lkIHtcbiAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xuICAgIHRoaXMubGVnZW5kRW50cmllcyA9IHRoaXMuZ2V0TGVnZW5kRW50cmllcygpO1xuICB9XG5cbiAgZ2V0TGVnZW5kRW50cmllcygpOiBhbnlbXSB7XG4gICAgY29uc3QgaXRlbXMgPSBbXTtcblxuICAgIGZvciAoY29uc3QgbGFiZWwgb2YgdGhpcy5kYXRhKSB7XG4gICAgICBjb25zdCBmb3JtYXR0ZWRMYWJlbCA9IGZvcm1hdExhYmVsKGxhYmVsKTtcblxuICAgICAgY29uc3QgaWR4ID0gaXRlbXMuZmluZEluZGV4KGkgPT4ge1xuICAgICAgICByZXR1cm4gaS5sYWJlbCA9PT0gZm9ybWF0dGVkTGFiZWw7XG4gICAgICB9KTtcblxuICAgICAgaWYgKGlkeCA9PT0gLTEpIHtcbiAgICAgICAgaXRlbXMucHVzaCh7XG4gICAgICAgICAgbGFiZWwsXG4gICAgICAgICAgZm9ybWF0dGVkTGFiZWwsXG4gICAgICAgICAgY29sb3I6IHRoaXMuY29sb3JzLmdldENvbG9yKGxhYmVsKVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gaXRlbXM7XG4gIH1cblxuICBpc0FjdGl2ZShlbnRyeSk6IGJvb2xlYW4ge1xuICAgIGlmICghdGhpcy5hY3RpdmVFbnRyaWVzKSByZXR1cm4gZmFsc2U7XG4gICAgY29uc3QgaXRlbSA9IHRoaXMuYWN0aXZlRW50cmllcy5maW5kKGQgPT4ge1xuICAgICAgcmV0dXJuIGVudHJ5LmxhYmVsID09PSBkLm5hbWU7XG4gICAgfSk7XG4gICAgcmV0dXJuIGl0ZW0gIT09IHVuZGVmaW5lZDtcbiAgfVxuXG4gIGFjdGl2YXRlKGl0ZW0pIHtcbiAgICB0aGlzLmxhYmVsQWN0aXZhdGUuZW1pdChpdGVtKTtcbiAgfVxuXG4gIGRlYWN0aXZhdGUoaXRlbSkge1xuICAgIHRoaXMubGFiZWxEZWFjdGl2YXRlLmVtaXQoaXRlbSk7XG4gIH1cblxuICB0cmFja0J5KGluZGV4LCBpdGVtKTogc3RyaW5nIHtcbiAgICByZXR1cm4gaXRlbS5sYWJlbDtcbiAgfVxufVxuIl19