import { __decorate, __values } from "tslib";
import { ApplicationRef, ComponentFactoryResolver, ComponentRef, Injectable, Injector, ViewContainerRef, EmbeddedViewRef, Type } from '@angular/core';
import { DomPortalHost, ComponentPortal } from '@angular/cdk/portal';
/**
 * Injection service is a helper to append components
 * dynamically to a known location in the DOM, most
 * noteably for dialogs/tooltips appending to body.
 *
 * @export
 */
var InjectionService = /** @class */ (function () {
    function InjectionService(applicationRef, componentFactoryResolver, injector) {
        this.applicationRef = applicationRef;
        this.componentFactoryResolver = componentFactoryResolver;
        this.injector = injector;
    }
    InjectionService_1 = InjectionService;
    /**
     * Sets a default global root view container. This is useful for
     * things like ngUpgrade that doesn't have a ApplicationRef root.
     *
     * @param container
     */
    InjectionService.setGlobalRootViewContainer = function (container) {
        InjectionService_1.globalRootViewContainer = container;
    };
    /**
     * Gets the root view container to inject the component to.
     *
     * @memberOf InjectionService
     */
    InjectionService.prototype.getRootViewContainer = function () {
        if (this._container)
            return this._container;
        if (InjectionService_1.globalRootViewContainer)
            return InjectionService_1.globalRootViewContainer;
        if (this.applicationRef.components.length)
            return this.applicationRef.components[0];
        throw new Error('View Container not found! ngUpgrade needs to manually set this via setRootViewContainer or setGlobalRootViewContainer.');
    };
    /**
     * Overrides the default root view container. This is useful for
     * things like ngUpgrade that doesn't have a ApplicationRef root.
     *
     * @param container
     *
     * @memberOf InjectionService
     */
    InjectionService.prototype.setRootViewContainer = function (container) {
        this._container = container;
    };
    /**
     * Gets the html element for a component ref.
     *
     * @param componentRef
     *
     * @memberOf InjectionService
     */
    InjectionService.prototype.getComponentRootNode = function (componentRef) {
        if (componentRef.hostView && componentRef.hostView.rootNodes.length > 0) {
            return componentRef.hostView.rootNodes[0];
        }
        // the top most component root node has no `hostView`
        return componentRef.location.nativeElement;
    };
    /**
     * Gets the root component container html element.
     *
     * @memberOf InjectionService
     */
    InjectionService.prototype.getRootViewContainerNode = function (componentRef) {
        return this.getComponentRootNode(componentRef);
    };
    /**
     * Projects the bindings onto the component
     *
     * @param component
     * @param options
     *
     * @memberOf InjectionService
     */
    InjectionService.prototype.projectComponentBindings = function (component, bindings) {
        var e_1, _a, e_2, _b;
        if (bindings) {
            if (bindings.inputs !== undefined) {
                var bindingKeys = Object.getOwnPropertyNames(bindings.inputs);
                try {
                    for (var bindingKeys_1 = __values(bindingKeys), bindingKeys_1_1 = bindingKeys_1.next(); !bindingKeys_1_1.done; bindingKeys_1_1 = bindingKeys_1.next()) {
                        var bindingName = bindingKeys_1_1.value;
                        component.instance[bindingName] = bindings.inputs[bindingName];
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (bindingKeys_1_1 && !bindingKeys_1_1.done && (_a = bindingKeys_1.return)) _a.call(bindingKeys_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            }
            if (bindings.outputs !== undefined) {
                var eventKeys = Object.getOwnPropertyNames(bindings.outputs);
                try {
                    for (var eventKeys_1 = __values(eventKeys), eventKeys_1_1 = eventKeys_1.next(); !eventKeys_1_1.done; eventKeys_1_1 = eventKeys_1.next()) {
                        var eventName = eventKeys_1_1.value;
                        component.instance[eventName] = bindings.outputs[eventName];
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (eventKeys_1_1 && !eventKeys_1_1.done && (_b = eventKeys_1.return)) _b.call(eventKeys_1);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
            }
        }
        return component;
    };
    /**
     * Appends a component to a adjacent location
     *
     * @param componentClass
     * @param [options={}]
     * @param [location]
     *
     * @memberOf InjectionService
     */
    InjectionService.prototype.appendComponent = function (componentClass, bindings, location) {
        if (bindings === void 0) { bindings = {}; }
        if (!location)
            location = this.getRootViewContainer();
        var appendLocation = this.getComponentRootNode(location);
        var portalHost = new DomPortalHost(appendLocation, this.componentFactoryResolver, this.applicationRef, this.injector);
        var portal = new ComponentPortal(componentClass);
        var componentRef = portalHost.attach(portal);
        this.projectComponentBindings(componentRef, bindings);
        return componentRef;
    };
    var InjectionService_1;
    InjectionService.globalRootViewContainer = null;
    InjectionService.ctorParameters = function () { return [
        { type: ApplicationRef },
        { type: ComponentFactoryResolver },
        { type: Injector }
    ]; };
    InjectionService = InjectionService_1 = __decorate([
        Injectable()
    ], InjectionService);
    return InjectionService;
}());
export { InjectionService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5qZWN0aW9uLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Ac3dpbWxhbmUvbmd4LWNoYXJ0cy8iLCJzb3VyY2VzIjpbImxpYi9jb21tb24vdG9vbHRpcC9pbmplY3Rpb24uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUNMLGNBQWMsRUFDZCx3QkFBd0IsRUFDeEIsWUFBWSxFQUNaLFVBQVUsRUFDVixRQUFRLEVBQ1IsZ0JBQWdCLEVBQ2hCLGVBQWUsRUFDZixJQUFJLEVBQ0wsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLGFBQWEsRUFBRSxlQUFlLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUVyRTs7Ozs7O0dBTUc7QUFFSDtJQWVFLDBCQUNVLGNBQThCLEVBQzlCLHdCQUFrRCxFQUNsRCxRQUFrQjtRQUZsQixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFDOUIsNkJBQXdCLEdBQXhCLHdCQUF3QixDQUEwQjtRQUNsRCxhQUFRLEdBQVIsUUFBUSxDQUFVO0lBQ3pCLENBQUM7eUJBbkJPLGdCQUFnQjtJQUczQjs7Ozs7T0FLRztJQUNJLDJDQUEwQixHQUFqQyxVQUFrQyxTQUEyQjtRQUMzRCxrQkFBZ0IsQ0FBQyx1QkFBdUIsR0FBRyxTQUFTLENBQUM7SUFDdkQsQ0FBQztJQVVEOzs7O09BSUc7SUFDSCwrQ0FBb0IsR0FBcEI7UUFDRSxJQUFJLElBQUksQ0FBQyxVQUFVO1lBQUUsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDO1FBQzVDLElBQUksa0JBQWdCLENBQUMsdUJBQXVCO1lBQUUsT0FBTyxrQkFBZ0IsQ0FBQyx1QkFBdUIsQ0FBQztRQUU5RixJQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLE1BQU07WUFBRSxPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRXBGLE1BQU0sSUFBSSxLQUFLLENBQ2Isd0hBQXdILENBQ3pILENBQUM7SUFD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Z0JBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQXBwbGljYXRpb25SZWYsXG4gIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgQ29tcG9uZW50UmVmLFxuICBJbmplY3RhYmxlLFxuICBJbmplY3RvcixcbiAgVmlld0NvbnRhaW5lclJlZixcbiAgRW1iZWRkZWRWaWV3UmVmLFxuICBUeXBlXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRG9tUG9ydGFsSG9zdCwgQ29tcG9uZW50UG9ydGFsIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BvcnRhbCc7XG5cbi8qKlxuICogSW5qZWN0aW9uIHNlcnZpY2UgaXMgYSBoZWxwZXIgdG8gYXBwZW5kIGNvbXBvbmVudHNcbiAqIGR5bmFtaWNhbGx5IHRvIGEga25vd24gbG9jYXRpb24gaW4gdGhlIERPTSwgbW9zdFxuICogbm90ZWFibHkgZm9yIGRpYWxvZ3MvdG9vbHRpcHMgYXBwZW5kaW5nIHRvIGJvZHkuXG4gKlxuICogQGV4cG9ydFxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgSW5qZWN0aW9uU2VydmljZSB7XG4gIHN0YXRpYyBnbG9iYWxSb290Vmlld0NvbnRhaW5lcjogVmlld0NvbnRhaW5lclJlZiA9IG51bGw7XG5cbiAgLyoqXG4gICAqIFNldHMgYSBkZWZhdWx0IGdsb2JhbCByb290IHZpZXcgY29udGFpbmVyLiBUaGlzIGlzIHVzZWZ1bCBmb3JcbiAgICogdGhpbmdzIGxpa2UgbmdVcGdyYWRlIHRoYXQgZG9lc24ndCBoYXZlIGEgQXBwbGljYXRpb25SZWYgcm9vdC5cbiAgICpcbiAgICogQHBhcmFtIGNvbnRhaW5lclxuICAgKi9cbiAgc3RhdGljIHNldEdsb2JhbFJvb3RWaWV3Q29udGFpbmVyKGNvbnRhaW5lcjogVmlld0NvbnRhaW5lclJlZik6IHZvaWQge1xuICAgIEluamVjdGlvblNlcnZpY2UuZ2xvYmFsUm9vdFZpZXdDb250YWluZXIgPSBjb250YWluZXI7XG4gIH1cblxuICBwcml2YXRlIF9jb250YWluZXI6IFZpZXdDb250YWluZXJSZWY7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBhcHBsaWNhdGlvblJlZjogQXBwbGljYXRpb25SZWYsXG4gICAgcHJpdmF0ZSBjb21wb25lbnRGYWN0b3J5UmVzb2x2ZXI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgICBwcml2YXRlIGluamVjdG9yOiBJbmplY3RvclxuICApIHt9XG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIHJvb3QgdmlldyBjb250YWluZXIgdG8gaW5qZWN0IHRoZSBjb21wb25lbnQgdG8uXG4gICAqXG4gICAqIEBtZW1iZXJPZiBJbmplY3Rpb25TZXJ2aWNlXG4gICAqL1xuICBnZXRSb290Vmlld0NvbnRhaW5lcigpOiBWaWV3Q29udGFpbmVyUmVmIHwgQ29tcG9uZW50UmVmPGFueT4ge1xuICAgIGlmICh0aGlzLl9jb250YWluZXIpIHJldHVybiB0aGlzLl9jb250YWluZXI7XG4gICAgaWYgKEluamVjdGlvblNlcnZpY2UuZ2xvYmFsUm9vdFZpZXdDb250YWluZXIpIHJldHVybiBJbmplY3Rpb25TZXJ2aWNlLmdsb2JhbFJvb3RWaWV3Q29udGFpbmVyO1xuXG4gICAgaWYgKHRoaXMuYXBwbGljYXRpb25SZWYuY29tcG9uZW50cy5sZW5ndGgpIHJldHVybiB0aGlzLmFwcGxpY2F0aW9uUmVmLmNvbXBvbmVudHNbMF07XG5cbiAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAnVmlldyBDb250YWluZXIgbm90IGZvdW5kISBuZ1VwZ3JhZGUgbmVlZHMgdG8gbWFudWFsbHkgc2V0IHRoaXMgdmlhIHNldFJvb3RWaWV3Q29udGFpbmVyIG9yIHNldEdsb2JhbFJvb3RWaWV3Q29udGFpbmVyLidcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIE92ZXJyaWRlcyB0aGUgZGVmYXVsdCByb290IHZpZXcgY29udGFpbmVyLiBUaGlzIGlzIHVzZWZ1bCBmb3JcbiAgICogdGhpbmdzIGxpa2UgbmdVcGdyYWRlIHRoYXQgZG9lc24ndCBoYXZlIGEgQXBwbGljYXRpb25SZWYgcm9vdC5cbiAgICpcbiAgICogQHBhcmFtIGNvbnRhaW5lclxuICAgKlxuICAgKiBAbWVtYmVyT2YgSW5qZWN0aW9uU2VydmljZVxuICAgKi9cbiAgc2V0Um9vdFZpZXdDb250YWluZXIoY29udGFpbmVyOiBWaWV3Q29udGFpbmVyUmVmKTogdm9pZCB7XG4gICAgdGhpcy5fY29udGFpbmVyID0gY29udGFpbmVyO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIGh0bWwgZWxlbWVudCBmb3IgYSBjb21wb25lbnQgcmVmLlxuICAgKlxuICAgKiBAcGFyYW0gY29tcG9uZW50UmVmXG4gICAqXG4gICAqIEBtZW1iZXJPZiBJbmplY3Rpb25TZXJ2aWNlXG4gICAqL1xuICBnZXRDb21wb25lbnRSb290Tm9kZShjb21wb25lbnRSZWY6IGFueSk6IEhUTUxFbGVtZW50IHtcbiAgICBpZiAoY29tcG9uZW50UmVmLmhvc3RWaWV3ICYmIChjb21wb25lbnRSZWYuaG9zdFZpZXcgYXMgRW1iZWRkZWRWaWV3UmVmPGFueT4pLnJvb3ROb2Rlcy5sZW5ndGggPiAwKSB7XG4gICAgICByZXR1cm4gKGNvbXBvbmVudFJlZi5ob3N0VmlldyBhcyBFbWJlZGRlZFZpZXdSZWY8YW55Pikucm9vdE5vZGVzWzBdIGFzIEhUTUxFbGVtZW50O1xuICAgIH1cblxuICAgIC8vIHRoZSB0b3AgbW9zdCBjb21wb25lbnQgcm9vdCBub2RlIGhhcyBubyBgaG9zdFZpZXdgXG4gICAgcmV0dXJuIGNvbXBvbmVudFJlZi5sb2NhdGlvbi5uYXRpdmVFbGVtZW50O1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIHJvb3QgY29tcG9uZW50IGNvbnRhaW5lciBodG1sIGVsZW1lbnQuXG4gICAqXG4gICAqIEBtZW1iZXJPZiBJbmplY3Rpb25TZXJ2aWNlXG4gICAqL1xuICBnZXRSb290Vmlld0NvbnRhaW5lck5vZGUoY29tcG9uZW50UmVmKTogSFRNTEVsZW1lbnQge1xuICAgIHJldHVybiB0aGlzLmdldENvbXBvbmVudFJvb3ROb2RlKGNvbXBvbmVudFJlZik7XG4gIH1cblxuICAvKipcbiAgICogUHJvamVjdHMgdGhlIGJpbmRpbmdzIG9udG8gdGhlIGNvbXBvbmVudFxuICAgKlxuICAgKiBAcGFyYW0gY29tcG9uZW50XG4gICAqIEBwYXJhbSBvcHRpb25zXG4gICAqXG4gICAqIEBtZW1iZXJPZiBJbmplY3Rpb25TZXJ2aWNlXG4gICAqL1xuICBwcm9qZWN0Q29tcG9uZW50QmluZGluZ3MoY29tcG9uZW50OiBDb21wb25lbnRSZWY8YW55PiwgYmluZGluZ3M6IGFueSk6IENvbXBvbmVudFJlZjxhbnk+IHtcbiAgICBpZiAoYmluZGluZ3MpIHtcbiAgICAgIGlmIChiaW5kaW5ncy5pbnB1dHMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBjb25zdCBiaW5kaW5nS2V5cyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKGJpbmRpbmdzLmlucHV0cyk7XG4gICAgICAgIGZvciAoY29uc3QgYmluZGluZ05hbWUgb2YgYmluZGluZ0tleXMpIHtcbiAgICAgICAgICBjb21wb25lbnQuaW5zdGFuY2VbYmluZGluZ05hbWVdID0gYmluZGluZ3MuaW5wdXRzW2JpbmRpbmdOYW1lXTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoYmluZGluZ3Mub3V0cHV0cyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGNvbnN0IGV2ZW50S2V5cyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKGJpbmRpbmdzLm91dHB1dHMpO1xuICAgICAgICBmb3IgKGNvbnN0IGV2ZW50TmFtZSBvZiBldmVudEtleXMpIHtcbiAgICAgICAgICBjb21wb25lbnQuaW5zdGFuY2VbZXZlbnROYW1lXSA9IGJpbmRpbmdzLm91dHB1dHNbZXZlbnROYW1lXTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBjb21wb25lbnQ7XG4gIH1cblxuICAvKipcbiAgICogQXBwZW5kcyBhIGNvbXBvbmVudCB0byBhIGFkamFjZW50IGxvY2F0aW9uXG4gICAqXG4gICAqIEBwYXJhbSBjb21wb25lbnRDbGFzc1xuICAgKiBAcGFyYW0gW29wdGlvbnM9e31dXG4gICAqIEBwYXJhbSBbbG9jYXRpb25dXG4gICAqXG4gICAqIEBtZW1iZXJPZiBJbmplY3Rpb25TZXJ2aWNlXG4gICAqL1xuICBhcHBlbmRDb21wb25lbnQ8VD4oY29tcG9uZW50Q2xhc3M6IFR5cGU8VD4sIGJpbmRpbmdzOiBhbnkgPSB7fSwgbG9jYXRpb24/OiBhbnkpOiBDb21wb25lbnRSZWY8YW55PiB7XG4gICAgaWYgKCFsb2NhdGlvbikgbG9jYXRpb24gPSB0aGlzLmdldFJvb3RWaWV3Q29udGFpbmVyKCk7XG4gICAgY29uc3QgYXBwZW5kTG9jYXRpb24gPSB0aGlzLmdldENvbXBvbmVudFJvb3ROb2RlKGxvY2F0aW9uKTtcblxuICAgIGNvbnN0IHBvcnRhbEhvc3QgPSBuZXcgRG9tUG9ydGFsSG9zdChcbiAgICAgIGFwcGVuZExvY2F0aW9uLFxuICAgICAgdGhpcy5jb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gICAgICB0aGlzLmFwcGxpY2F0aW9uUmVmLFxuICAgICAgdGhpcy5pbmplY3RvclxuICAgICk7XG5cbiAgICBjb25zdCBwb3J0YWwgPSBuZXcgQ29tcG9uZW50UG9ydGFsKGNvbXBvbmVudENsYXNzKTtcblxuICAgIGNvbnN0IGNvbXBvbmVudFJlZiA9IHBvcnRhbEhvc3QuYXR0YWNoKHBvcnRhbCk7XG4gICAgdGhpcy5wcm9qZWN0Q29tcG9uZW50QmluZGluZ3MoY29tcG9uZW50UmVmLCBiaW5kaW5ncyk7XG4gICAgcmV0dXJuIGNvbXBvbmVudFJlZjtcbiAgfVxufVxuIl19