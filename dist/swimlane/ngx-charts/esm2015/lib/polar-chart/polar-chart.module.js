import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { ChartCommonModule } from '../common/chart-common.module';
import { PolarChartComponent } from './polar-chart.component';
import { PolarSeriesComponent } from './polar-series.component';
import { PieChartModule } from '../pie-chart/';
import { LineChartModule } from '../line-chart/';
let PolarChartModule = class PolarChartModule {
};
PolarChartModule = __decorate([
    NgModule({
        imports: [ChartCommonModule, PieChartModule, LineChartModule],
        declarations: [PolarChartComponent, PolarSeriesComponent],
        exports: [PolarChartComponent, PolarSeriesComponent]
    })
], PolarChartModule);
export { PolarChartModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9sYXItY2hhcnQubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHN3aW1sYW5lL25neC1jaGFydHMvIiwic291cmNlcyI6WyJsaWIvcG9sYXItY2hhcnQvcG9sYXItY2hhcnQubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQzlELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ2hFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDL0MsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBT2pELElBQWEsZ0JBQWdCLEdBQTdCLE1BQWEsZ0JBQWdCO0NBQUcsQ0FBQTtBQUFuQixnQkFBZ0I7SUFMNUIsUUFBUSxDQUFDO1FBQ1IsT0FBTyxFQUFFLENBQUMsaUJBQWlCLEVBQUUsY0FBYyxFQUFFLGVBQWUsQ0FBQztRQUM3RCxZQUFZLEVBQUUsQ0FBQyxtQkFBbUIsRUFBRSxvQkFBb0IsQ0FBQztRQUN6RCxPQUFPLEVBQUUsQ0FBQyxtQkFBbUIsRUFBRSxvQkFBb0IsQ0FBQztLQUNyRCxDQUFDO0dBQ1csZ0JBQWdCLENBQUc7U0FBbkIsZ0JBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENoYXJ0Q29tbW9uTW9kdWxlIH0gZnJvbSAnLi4vY29tbW9uL2NoYXJ0LWNvbW1vbi5tb2R1bGUnO1xuaW1wb3J0IHsgUG9sYXJDaGFydENvbXBvbmVudCB9IGZyb20gJy4vcG9sYXItY2hhcnQuY29tcG9uZW50JztcbmltcG9ydCB7IFBvbGFyU2VyaWVzQ29tcG9uZW50IH0gZnJvbSAnLi9wb2xhci1zZXJpZXMuY29tcG9uZW50JztcbmltcG9ydCB7IFBpZUNoYXJ0TW9kdWxlIH0gZnJvbSAnLi4vcGllLWNoYXJ0Lyc7XG5pbXBvcnQgeyBMaW5lQ2hhcnRNb2R1bGUgfSBmcm9tICcuLi9saW5lLWNoYXJ0Lyc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtDaGFydENvbW1vbk1vZHVsZSwgUGllQ2hhcnRNb2R1bGUsIExpbmVDaGFydE1vZHVsZV0sXG4gIGRlY2xhcmF0aW9uczogW1BvbGFyQ2hhcnRDb21wb25lbnQsIFBvbGFyU2VyaWVzQ29tcG9uZW50XSxcbiAgZXhwb3J0czogW1BvbGFyQ2hhcnRDb21wb25lbnQsIFBvbGFyU2VyaWVzQ29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBQb2xhckNoYXJ0TW9kdWxlIHt9XG4iXX0=