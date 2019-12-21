import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartComponent } from './charts/chart.component';
import { ScaleLegendComponent, LegendComponent, LegendEntryComponent, AdvancedLegendComponent } from './legend';
import { BaseChartComponent } from './base-chart.component';
import { AxesModule } from './axes/axes.module';
import { TooltipModule } from './tooltip';
import { CircleSeriesComponent } from './circle-series.component';
import { CircleComponent } from './circle.component';
import { GridPanelComponent } from './grid-panel.component';
import { GridPanelSeriesComponent } from './grid-panel-series.component';
import { SvgLinearGradientComponent } from './svg-linear-gradient.component';
import { SvgRadialGradientComponent } from './svg-radial-gradient.component';
import { Timeline } from './timeline';
import { AreaComponent } from './area.component';
import { TooltipArea } from './tooltip-area.component';
import { CountUpDirective } from './count';
const COMPONENTS = [
    AreaComponent,
    BaseChartComponent,
    CountUpDirective,
    TooltipArea,
    ChartComponent,
    LegendComponent,
    LegendEntryComponent,
    ScaleLegendComponent,
    CircleComponent,
    CircleSeriesComponent,
    GridPanelComponent,
    GridPanelSeriesComponent,
    SvgLinearGradientComponent,
    SvgRadialGradientComponent,
    Timeline,
    AdvancedLegendComponent
];
let ChartCommonModule = class ChartCommonModule {
};
ChartCommonModule = __decorate([
    NgModule({
        imports: [CommonModule, AxesModule, TooltipModule],
        declarations: [...COMPONENTS],
        exports: [CommonModule, AxesModule, TooltipModule, ...COMPONENTS]
    })
], ChartCommonModule);
export { ChartCommonModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhcnQtY29tbW9uLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bzd2ltbGFuZS9uZ3gtY2hhcnRzLyIsInNvdXJjZXMiOlsibGliL2NvbW1vbi9jaGFydC1jb21tb24ubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUUvQyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDMUQsT0FBTyxFQUFFLG9CQUFvQixFQUFFLGVBQWUsRUFBRSxvQkFBb0IsRUFBRSx1QkFBdUIsRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUNoSCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUM1RCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDaEQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUMxQyxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUNsRSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDckQsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDNUQsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDekUsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDN0UsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDN0UsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLFlBQVksQ0FBQztBQUN0QyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDakQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLFNBQVMsQ0FBQztBQUUzQyxNQUFNLFVBQVUsR0FBRztJQUNqQixhQUFhO0lBQ2Isa0JBQWtCO0lBQ2xCLGdCQUFnQjtJQUNoQixXQUFXO0lBQ1gsY0FBYztJQUNkLGVBQWU7SUFDZixvQkFBb0I7SUFDcEIsb0JBQW9CO0lBQ3BCLGVBQWU7SUFDZixxQkFBcUI7SUFDckIsa0JBQWtCO0lBQ2xCLHdCQUF3QjtJQUN4QiwwQkFBMEI7SUFDMUIsMEJBQTBCO0lBQzFCLFFBQVE7SUFDUix1QkFBdUI7Q0FDeEIsQ0FBQztBQU9GLElBQWEsaUJBQWlCLEdBQTlCLE1BQWEsaUJBQWlCO0NBQUcsQ0FBQTtBQUFwQixpQkFBaUI7SUFMN0IsUUFBUSxDQUFDO1FBQ1IsT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLFVBQVUsRUFBRSxhQUFhLENBQUM7UUFDbEQsWUFBWSxFQUFFLENBQUMsR0FBRyxVQUFVLENBQUM7UUFDN0IsT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLFVBQVUsRUFBRSxhQUFhLEVBQUUsR0FBRyxVQUFVLENBQUM7S0FDbEUsQ0FBQztHQUNXLGlCQUFpQixDQUFHO1NBQXBCLGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG5pbXBvcnQgeyBDaGFydENvbXBvbmVudCB9IGZyb20gJy4vY2hhcnRzL2NoYXJ0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBTY2FsZUxlZ2VuZENvbXBvbmVudCwgTGVnZW5kQ29tcG9uZW50LCBMZWdlbmRFbnRyeUNvbXBvbmVudCwgQWR2YW5jZWRMZWdlbmRDb21wb25lbnQgfSBmcm9tICcuL2xlZ2VuZCc7XG5pbXBvcnQgeyBCYXNlQ2hhcnRDb21wb25lbnQgfSBmcm9tICcuL2Jhc2UtY2hhcnQuY29tcG9uZW50JztcbmltcG9ydCB7IEF4ZXNNb2R1bGUgfSBmcm9tICcuL2F4ZXMvYXhlcy5tb2R1bGUnO1xuaW1wb3J0IHsgVG9vbHRpcE1vZHVsZSB9IGZyb20gJy4vdG9vbHRpcCc7XG5pbXBvcnQgeyBDaXJjbGVTZXJpZXNDb21wb25lbnQgfSBmcm9tICcuL2NpcmNsZS1zZXJpZXMuY29tcG9uZW50JztcbmltcG9ydCB7IENpcmNsZUNvbXBvbmVudCB9IGZyb20gJy4vY2lyY2xlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBHcmlkUGFuZWxDb21wb25lbnQgfSBmcm9tICcuL2dyaWQtcGFuZWwuY29tcG9uZW50JztcbmltcG9ydCB7IEdyaWRQYW5lbFNlcmllc0NvbXBvbmVudCB9IGZyb20gJy4vZ3JpZC1wYW5lbC1zZXJpZXMuY29tcG9uZW50JztcbmltcG9ydCB7IFN2Z0xpbmVhckdyYWRpZW50Q29tcG9uZW50IH0gZnJvbSAnLi9zdmctbGluZWFyLWdyYWRpZW50LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBTdmdSYWRpYWxHcmFkaWVudENvbXBvbmVudCB9IGZyb20gJy4vc3ZnLXJhZGlhbC1ncmFkaWVudC5jb21wb25lbnQnO1xuaW1wb3J0IHsgVGltZWxpbmUgfSBmcm9tICcuL3RpbWVsaW5lJztcbmltcG9ydCB7IEFyZWFDb21wb25lbnQgfSBmcm9tICcuL2FyZWEuY29tcG9uZW50JztcbmltcG9ydCB7IFRvb2x0aXBBcmVhIH0gZnJvbSAnLi90b29sdGlwLWFyZWEuY29tcG9uZW50JztcbmltcG9ydCB7IENvdW50VXBEaXJlY3RpdmUgfSBmcm9tICcuL2NvdW50JztcblxuY29uc3QgQ09NUE9ORU5UUyA9IFtcbiAgQXJlYUNvbXBvbmVudCxcbiAgQmFzZUNoYXJ0Q29tcG9uZW50LFxuICBDb3VudFVwRGlyZWN0aXZlLFxuICBUb29sdGlwQXJlYSxcbiAgQ2hhcnRDb21wb25lbnQsXG4gIExlZ2VuZENvbXBvbmVudCxcbiAgTGVnZW5kRW50cnlDb21wb25lbnQsXG4gIFNjYWxlTGVnZW5kQ29tcG9uZW50LFxuICBDaXJjbGVDb21wb25lbnQsXG4gIENpcmNsZVNlcmllc0NvbXBvbmVudCxcbiAgR3JpZFBhbmVsQ29tcG9uZW50LFxuICBHcmlkUGFuZWxTZXJpZXNDb21wb25lbnQsXG4gIFN2Z0xpbmVhckdyYWRpZW50Q29tcG9uZW50LFxuICBTdmdSYWRpYWxHcmFkaWVudENvbXBvbmVudCxcbiAgVGltZWxpbmUsXG4gIEFkdmFuY2VkTGVnZW5kQ29tcG9uZW50XG5dO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBBeGVzTW9kdWxlLCBUb29sdGlwTW9kdWxlXSxcbiAgZGVjbGFyYXRpb25zOiBbLi4uQ09NUE9ORU5UU10sXG4gIGV4cG9ydHM6IFtDb21tb25Nb2R1bGUsIEF4ZXNNb2R1bGUsIFRvb2x0aXBNb2R1bGUsIC4uLkNPTVBPTkVOVFNdXG59KVxuZXhwb3J0IGNsYXNzIENoYXJ0Q29tbW9uTW9kdWxlIHt9XG4iXX0=