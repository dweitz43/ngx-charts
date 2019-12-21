var InjectionService_1;
import { __decorate } from "tslib";
import { ApplicationRef, ComponentFactoryResolver, ComponentRef, Injectable, Injector, ViewContainerRef, EmbeddedViewRef, Type } from '@angular/core';
import { DomPortalHost, ComponentPortal } from '@angular/cdk/portal';
/**
 * Injection service is a helper to append components
 * dynamically to a known location in the DOM, most
 * noteably for dialogs/tooltips appending to body.
 *
 * @export
 */
let InjectionService = InjectionService_1 = class InjectionService {
    constructor(applicationRef, componentFactoryResolver, injector) {
        this.applicationRef = applicationRef;
        this.componentFactoryResolver = componentFactoryResolver;
        this.injector = injector;
    }
    /**
     * Sets a default global root view container. This is useful for
     * things like ngUpgrade that doesn't have a ApplicationRef root.
     *
     * @param container
     */
    static setGlobalRootViewContainer(container) {
        InjectionService_1.globalRootViewContainer = container;
    }
    /**
     * Gets the root view container to inject the component to.
     *
     * @memberOf InjectionService
     */
    getRootViewContainer() {
        if (this._container)
            return this._container;
        if (InjectionService_1.globalRootViewContainer)
            return InjectionService_1.globalRootViewContainer;
        if (this.applicationRef.components.length)
            return this.applicationRef.components[0];
        throw new Error('View Container not found! ngUpgrade needs to manually set this via setRootViewContainer or setGlobalRootViewContainer.');
    }
    /**
     * Overrides the default root view container. This is useful for
     * things like ngUpgrade that doesn't have a ApplicationRef root.
     *
     * @param container
     *
     * @memberOf InjectionService
     */
    setRootViewContainer(container) {
        this._container = container;
    }
    /**
     * Gets the html element for a component ref.
     *
     * @param componentRef
     *
     * @memberOf InjectionService
     */
    getComponentRootNode(componentRef) {
        if (componentRef.hostView && componentRef.hostView.rootNodes.length > 0) {
            return componentRef.hostView.rootNodes[0];
        }
        // the top most component root node has no `hostView`
        return componentRef.location.nativeElement;
    }
    /**
     * Gets the root component container html element.
     *
     * @memberOf InjectionService
     */
    getRootViewContainerNode(componentRef) {
        return this.getComponentRootNode(componentRef);
    }
    /**
     * Projects the bindings onto the component
     *
     * @param component
     * @param options
     *
     * @memberOf InjectionService
     */
    projectComponentBindings(component, bindings) {
        if (bindings) {
            if (bindings.inputs !== undefined) {
                const bindingKeys = Object.getOwnPropertyNames(bindings.inputs);
                for (const bindingName of bindingKeys) {
                    component.instance[bindingName] = bindings.inputs[bindingName];
                }
            }
            if (bindings.outputs !== undefined) {
                const eventKeys = Object.getOwnPropertyNames(bindings.outputs);
                for (const eventName of eventKeys) {
                    component.instance[eventName] = bindings.outputs[eventName];
                }
            }
        }
        return component;
    }
    /**
     * Appends a component to a adjacent location
     *
     * @param componentClass
     * @param [options={}]
     * @param [location]
     *
     * @memberOf InjectionService
     */
    appendComponent(componentClass, bindings = {}, location) {
        if (!location)
            location = this.getRootViewContainer();
        const appendLocation = this.getComponentRootNode(location);
        const portalHost = new DomPortalHost(appendLocation, this.componentFactoryResolver, this.applicationRef, this.injector);
        const portal = new ComponentPortal(componentClass);
        const componentRef = portalHost.attach(portal);
        this.projectComponentBindings(componentRef, bindings);
        return componentRef;
    }
};
InjectionService.globalRootViewContainer = null;
InjectionService.ctorParameters = () => [
    { type: ApplicationRef },
    { type: ComponentFactoryResolver },
    { type: Injector }
];
InjectionService = InjectionService_1 = __decorate([
    Injectable()
], InjectionService);
export { InjectionService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5qZWN0aW9uLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Ac3dpbWxhbmUvbmd4LWNoYXJ0cy8iLCJzb3VyY2VzIjpbImxpYi9jb21tb24vdG9vbHRpcC9pbmplY3Rpb24uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLE9BQU8sRUFDTCxjQUFjLEVBQ2Qsd0JBQXdCLEVBQ3hCLFlBQVksRUFDWixVQUFVLEVBQ1YsUUFBUSxFQUNSLGdCQUFnQixFQUNoQixlQUFlLEVBQ2YsSUFBSSxFQUNMLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxhQUFhLEVBQUUsZUFBZSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFFckU7Ozs7OztHQU1HO0FBRUgsSUFBYSxnQkFBZ0Isd0JBQTdCLE1BQWEsZ0JBQWdCO0lBZTNCLFlBQ1UsY0FBOEIsRUFDOUIsd0JBQWtELEVBQ2xELFFBQWtCO1FBRmxCLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUM5Qiw2QkFBd0IsR0FBeEIsd0JBQXdCLENBQTBCO1FBQ2xELGFBQVEsR0FBUixRQUFRLENBQVU7SUFDekIsQ0FBQztJQWhCSjs7Ozs7T0FLRztJQUNILE1BQU0sQ0FBQywwQkFBMEIsQ0FBQyxTQUEyQjtRQUMzRCxrQkFBZ0IsQ0FBQyx1QkFBdUIsR0FBRyxTQUFTLENBQUM7SUFDdkQsQ0FBQztJQVVEOzs7O09BSUc7SUFDSCxvQkFBb0I7UUFDbEIsSUFBSSxJQUFJLENBQUMsVUFBVTtZQUFFLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQztRQUM1QyxJQUFJLGtCQUFnQixDQUFDLHVCQUF1QjtZQUFFLE9BQU8sa0JBQWdCLENBQUMsdUJBQXVCLENBQUM7UUFFOUYsSUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxNQUFNO1lBQUUsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUVwRixNQUFNLElBQUksS0FBSyxDQUNiLHdIQUF3SCxDQUN6SCxDQUFDO0lBQ0osQ0FBQztJQUVEOzs7Ozs7O09BT0c7SUFDSCxvQkFBb0IsQ0FBQyxTQUEyQjtRQUM5QyxJQUFJLENBQUMsVUFBVSxHQUFHLFNBQVMsQ0FBQztJQUM5QixDQUFDO0lBRUQ7Ozs7OztPQU1HO0lBQ0gsb0JBQW9CLENBQUMsWUFBaUI7UUFDcEMsSUFBSSxZQUFZLENBQUMsUUFBUSxJQUFLLFlBQVksQ0FBQyxRQUFpQyxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQ2pHLE9BQVEsWUFBWSxDQUFDLFFBQWlDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBZ0IsQ0FBQztTQUNwRjtRQUVELHFEQUFxRDtRQUNyRCxPQUFPLFlBQVksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDO0lBQzdDLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsd0JBQXdCLENBQUMsWUFBWTtRQUNuQyxPQUFPLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUNqRCxDQUFDO0lBRUQ7Ozs7Ozs7T0FPRztJQUNILHdCQUF3QixDQUFDLFNBQTRCLEVBQUUsUUFBYTtRQUNsRSxJQUFJLFFBQVEsRUFBRTtZQUNaLElBQUksUUFBUSxDQUFDLE1BQU0sS0FBSyxTQUFTLEVBQUU7Z0JBQ2pDLE1BQU0sV0FBVyxHQUFHLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ2hFLEtBQUssTUFBTSxXQUFXLElBQUksV0FBVyxFQUFFO29CQUNyQyxTQUFTLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7aUJBQ2hFO2FBQ0Y7WUFFRCxJQUFJLFFBQVEsQ0FBQyxPQUFPLEtBQUssU0FBUyxFQUFFO2dCQUNsQyxNQUFNLFNBQVMsR0FBRyxNQUFNLENBQUMsbUJBQW1CLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUMvRCxLQUFLLE1BQU0sU0FBUyxJQUFJLFNBQVMsRUFBRTtvQkFDakMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO2lCQUM3RDthQUNGO1NBQ0Y7UUFFRCxPQUFPLFNBQVMsQ0FBQztJQUNuQixDQUFDO0lBRUQ7Ozs7Ozs7O09BUUc7SUFDSCxlQUFlLENBQUksY0FBdUIsRUFBRSxXQUFnQixFQUFFLEVBQUUsUUFBYztRQUM1RSxJQUFJLENBQUMsUUFBUTtZQUFFLFFBQVEsR0FBRyxJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztRQUN0RCxNQUFNLGNBQWMsR0FBRyxJQUFJLENBQUMsb0JBQW9CLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFM0QsTUFBTSxVQUFVLEdBQUcsSUFBSSxhQUFhLENBQ2xDLGNBQWMsRUFDZCxJQUFJLENBQUMsd0JBQXdCLEVBQzdCLElBQUksQ0FBQyxjQUFjLEVBQ25CLElBQUksQ0FBQyxRQUFRLENBQ2QsQ0FBQztRQUVGLE1BQU0sTUFBTSxHQUFHLElBQUksZUFBZSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBRW5ELE1BQU0sWUFBWSxHQUFHLFVBQVUsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDL0MsSUFBSSxDQUFDLHdCQUF3QixDQUFDLFlBQVksRUFBRSxRQUFRLENBQUMsQ0FBQztRQUN0RCxPQUFPLFlBQVksQ0FBQztJQUN0QixDQUFDO0NBQ0YsQ0FBQTtBQS9IUSx3Q0FBdUIsR0FBcUIsSUFBSSxDQUFDOztZQWU5QixjQUFjO1lBQ0osd0JBQXdCO1lBQ3hDLFFBQVE7O0FBbEJqQixnQkFBZ0I7SUFENUIsVUFBVSxFQUFFO0dBQ0EsZ0JBQWdCLENBZ0k1QjtTQWhJWSxnQkFBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBBcHBsaWNhdGlvblJlZixcbiAgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxuICBDb21wb25lbnRSZWYsXG4gIEluamVjdGFibGUsXG4gIEluamVjdG9yLFxuICBWaWV3Q29udGFpbmVyUmVmLFxuICBFbWJlZGRlZFZpZXdSZWYsXG4gIFR5cGVcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEb21Qb3J0YWxIb3N0LCBDb21wb25lbnRQb3J0YWwgfSBmcm9tICdAYW5ndWxhci9jZGsvcG9ydGFsJztcblxuLyoqXG4gKiBJbmplY3Rpb24gc2VydmljZSBpcyBhIGhlbHBlciB0byBhcHBlbmQgY29tcG9uZW50c1xuICogZHluYW1pY2FsbHkgdG8gYSBrbm93biBsb2NhdGlvbiBpbiB0aGUgRE9NLCBtb3N0XG4gKiBub3RlYWJseSBmb3IgZGlhbG9ncy90b29sdGlwcyBhcHBlbmRpbmcgdG8gYm9keS5cbiAqXG4gKiBAZXhwb3J0XG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBJbmplY3Rpb25TZXJ2aWNlIHtcbiAgc3RhdGljIGdsb2JhbFJvb3RWaWV3Q29udGFpbmVyOiBWaWV3Q29udGFpbmVyUmVmID0gbnVsbDtcblxuICAvKipcbiAgICogU2V0cyBhIGRlZmF1bHQgZ2xvYmFsIHJvb3QgdmlldyBjb250YWluZXIuIFRoaXMgaXMgdXNlZnVsIGZvclxuICAgKiB0aGluZ3MgbGlrZSBuZ1VwZ3JhZGUgdGhhdCBkb2Vzbid0IGhhdmUgYSBBcHBsaWNhdGlvblJlZiByb290LlxuICAgKlxuICAgKiBAcGFyYW0gY29udGFpbmVyXG4gICAqL1xuICBzdGF0aWMgc2V0R2xvYmFsUm9vdFZpZXdDb250YWluZXIoY29udGFpbmVyOiBWaWV3Q29udGFpbmVyUmVmKTogdm9pZCB7XG4gICAgSW5qZWN0aW9uU2VydmljZS5nbG9iYWxSb290Vmlld0NvbnRhaW5lciA9IGNvbnRhaW5lcjtcbiAgfVxuXG4gIHByaXZhdGUgX2NvbnRhaW5lcjogVmlld0NvbnRhaW5lclJlZjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGFwcGxpY2F0aW9uUmVmOiBBcHBsaWNhdGlvblJlZixcbiAgICBwcml2YXRlIGNvbXBvbmVudEZhY3RvcnlSZXNvbHZlcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxuICAgIHByaXZhdGUgaW5qZWN0b3I6IEluamVjdG9yXG4gICkge31cblxuICAvKipcbiAgICogR2V0cyB0aGUgcm9vdCB2aWV3IGNvbnRhaW5lciB0byBpbmplY3QgdGhlIGNvbXBvbmVudCB0by5cbiAgICpcbiAgICogQG1lbWJlck9mIEluamVjdGlvblNlcnZpY2VcbiAgICovXG4gIGdldFJvb3RWaWV3Q29udGFpbmVyKCk6IFZpZXdDb250YWluZXJSZWYgfCBDb21wb25lbnRSZWY8YW55PiB7XG4gICAgaWYgKHRoaXMuX2NvbnRhaW5lcikgcmV0dXJuIHRoaXMuX2NvbnRhaW5lcjtcbiAgICBpZiAoSW5qZWN0aW9uU2VydmljZS5nbG9iYWxSb290Vmlld0NvbnRhaW5lcikgcmV0dXJuIEluamVjdGlvblNlcnZpY2UuZ2xvYmFsUm9vdFZpZXdDb250YWluZXI7XG5cbiAgICBpZiAodGhpcy5hcHBsaWNhdGlvblJlZi5jb21wb25lbnRzLmxlbmd0aCkgcmV0dXJuIHRoaXMuYXBwbGljYXRpb25SZWYuY29tcG9uZW50c1swXTtcblxuICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICdWaWV3IENvbnRhaW5lciBub3QgZm91bmQhIG5nVXBncmFkZSBuZWVkcyB0byBtYW51YWxseSBzZXQgdGhpcyB2aWEgc2V0Um9vdFZpZXdDb250YWluZXIgb3Igc2V0R2xvYmFsUm9vdFZpZXdDb250YWluZXIuJ1xuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogT3ZlcnJpZGVzIHRoZSBkZWZhdWx0IHJvb3QgdmlldyBjb250YWluZXIuIFRoaXMgaXMgdXNlZnVsIGZvclxuICAgKiB0aGluZ3MgbGlrZSBuZ1VwZ3JhZGUgdGhhdCBkb2Vzbid0IGhhdmUgYSBBcHBsaWNhdGlvblJlZiByb290LlxuICAgKlxuICAgKiBAcGFyYW0gY29udGFpbmVyXG4gICAqXG4gICAqIEBtZW1iZXJPZiBJbmplY3Rpb25TZXJ2aWNlXG4gICAqL1xuICBzZXRSb290Vmlld0NvbnRhaW5lcihjb250YWluZXI6IFZpZXdDb250YWluZXJSZWYpOiB2b2lkIHtcbiAgICB0aGlzLl9jb250YWluZXIgPSBjb250YWluZXI7XG4gIH1cblxuICAvKipcbiAgICogR2V0cyB0aGUgaHRtbCBlbGVtZW50IGZvciBhIGNvbXBvbmVudCByZWYuXG4gICAqXG4gICAqIEBwYXJhbSBjb21wb25lbnRSZWZcbiAgICpcbiAgICogQG1lbWJlck9mIEluamVjdGlvblNlcnZpY2VcbiAgICovXG4gIGdldENvbXBvbmVudFJvb3ROb2RlKGNvbXBvbmVudFJlZjogYW55KTogSFRNTEVsZW1lbnQge1xuICAgIGlmIChjb21wb25lbnRSZWYuaG9zdFZpZXcgJiYgKGNvbXBvbmVudFJlZi5ob3N0VmlldyBhcyBFbWJlZGRlZFZpZXdSZWY8YW55Pikucm9vdE5vZGVzLmxlbmd0aCA+IDApIHtcbiAgICAgIHJldHVybiAoY29tcG9uZW50UmVmLmhvc3RWaWV3IGFzIEVtYmVkZGVkVmlld1JlZjxhbnk+KS5yb290Tm9kZXNbMF0gYXMgSFRNTEVsZW1lbnQ7XG4gICAgfVxuXG4gICAgLy8gdGhlIHRvcCBtb3N0IGNvbXBvbmVudCByb290IG5vZGUgaGFzIG5vIGBob3N0Vmlld2BcbiAgICByZXR1cm4gY29tcG9uZW50UmVmLmxvY2F0aW9uLm5hdGl2ZUVsZW1lbnQ7XG4gIH1cblxuICAvKipcbiAgICogR2V0cyB0aGUgcm9vdCBjb21wb25lbnQgY29udGFpbmVyIGh0bWwgZWxlbWVudC5cbiAgICpcbiAgICogQG1lbWJlck9mIEluamVjdGlvblNlcnZpY2VcbiAgICovXG4gIGdldFJvb3RWaWV3Q29udGFpbmVyTm9kZShjb21wb25lbnRSZWYpOiBIVE1MRWxlbWVudCB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0Q29tcG9uZW50Um9vdE5vZGUoY29tcG9uZW50UmVmKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQcm9qZWN0cyB0aGUgYmluZGluZ3Mgb250byB0aGUgY29tcG9uZW50XG4gICAqXG4gICAqIEBwYXJhbSBjb21wb25lbnRcbiAgICogQHBhcmFtIG9wdGlvbnNcbiAgICpcbiAgICogQG1lbWJlck9mIEluamVjdGlvblNlcnZpY2VcbiAgICovXG4gIHByb2plY3RDb21wb25lbnRCaW5kaW5ncyhjb21wb25lbnQ6IENvbXBvbmVudFJlZjxhbnk+LCBiaW5kaW5nczogYW55KTogQ29tcG9uZW50UmVmPGFueT4ge1xuICAgIGlmIChiaW5kaW5ncykge1xuICAgICAgaWYgKGJpbmRpbmdzLmlucHV0cyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGNvbnN0IGJpbmRpbmdLZXlzID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoYmluZGluZ3MuaW5wdXRzKTtcbiAgICAgICAgZm9yIChjb25zdCBiaW5kaW5nTmFtZSBvZiBiaW5kaW5nS2V5cykge1xuICAgICAgICAgIGNvbXBvbmVudC5pbnN0YW5jZVtiaW5kaW5nTmFtZV0gPSBiaW5kaW5ncy5pbnB1dHNbYmluZGluZ05hbWVdO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChiaW5kaW5ncy5vdXRwdXRzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgY29uc3QgZXZlbnRLZXlzID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoYmluZGluZ3Mub3V0cHV0cyk7XG4gICAgICAgIGZvciAoY29uc3QgZXZlbnROYW1lIG9mIGV2ZW50S2V5cykge1xuICAgICAgICAgIGNvbXBvbmVudC5pbnN0YW5jZVtldmVudE5hbWVdID0gYmluZGluZ3Mub3V0cHV0c1tldmVudE5hbWVdO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGNvbXBvbmVudDtcbiAgfVxuXG4gIC8qKlxuICAgKiBBcHBlbmRzIGEgY29tcG9uZW50IHRvIGEgYWRqYWNlbnQgbG9jYXRpb25cbiAgICpcbiAgICogQHBhcmFtIGNvbXBvbmVudENsYXNzXG4gICAqIEBwYXJhbSBbb3B0aW9ucz17fV1cbiAgICogQHBhcmFtIFtsb2NhdGlvbl1cbiAgICpcbiAgICogQG1lbWJlck9mIEluamVjdGlvblNlcnZpY2VcbiAgICovXG4gIGFwcGVuZENvbXBvbmVudDxUPihjb21wb25lbnRDbGFzczogVHlwZTxUPiwgYmluZGluZ3M6IGFueSA9IHt9LCBsb2NhdGlvbj86IGFueSk6IENvbXBvbmVudFJlZjxhbnk+IHtcbiAgICBpZiAoIWxvY2F0aW9uKSBsb2NhdGlvbiA9IHRoaXMuZ2V0Um9vdFZpZXdDb250YWluZXIoKTtcbiAgICBjb25zdCBhcHBlbmRMb2NhdGlvbiA9IHRoaXMuZ2V0Q29tcG9uZW50Um9vdE5vZGUobG9jYXRpb24pO1xuXG4gICAgY29uc3QgcG9ydGFsSG9zdCA9IG5ldyBEb21Qb3J0YWxIb3N0KFxuICAgICAgYXBwZW5kTG9jYXRpb24sXG4gICAgICB0aGlzLmNvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgICAgIHRoaXMuYXBwbGljYXRpb25SZWYsXG4gICAgICB0aGlzLmluamVjdG9yXG4gICAgKTtcblxuICAgIGNvbnN0IHBvcnRhbCA9IG5ldyBDb21wb25lbnRQb3J0YWwoY29tcG9uZW50Q2xhc3MpO1xuXG4gICAgY29uc3QgY29tcG9uZW50UmVmID0gcG9ydGFsSG9zdC5hdHRhY2gocG9ydGFsKTtcbiAgICB0aGlzLnByb2plY3RDb21wb25lbnRCaW5kaW5ncyhjb21wb25lbnRSZWYsIGJpbmRpbmdzKTtcbiAgICByZXR1cm4gY29tcG9uZW50UmVmO1xuICB9XG59XG4iXX0=