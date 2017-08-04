import {
  Component, 
  Input, 
  Output, 
  ChangeDetectionStrategy,   
  HostListener,
  EventEmitter
 } from '@angular/core';

@Component({
  selector: 'ngx-charts-legend-entry',
  template: `
    <span 
      [title]="formattedLabel"
      tabindex="-1"
      [class.active]="isActive"
      (click)="select.emit(formattedLabel)">
      <span
        class="legend-label-color"
        [style.background-color]="color"
        (click)="toggle.emit(formattedLabel)">
      </span>
      <span class="legend-label-text name">
        {{trimmedLabel}}
      </span>
      <span class="legend-label-text average" *ngIf="!isNaN(average?.value)">
        {{average?.value | number:'1.0-2'}}
      </span>
    </span>
  `,
  styles: [
    '.legend-label-text { padding-right: 5px; }',
    '.name { width: 65%; }',
    '.average { width: 20%; }'
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LegendEntryComponent {

  @Input() color: string;
  @Input() label: any;
  @Input() formattedLabel: string;
  @Input() isActive: boolean = false;
  @Input() average: any;

  @Output() select: EventEmitter<any> = new EventEmitter();
  @Output() activate: EventEmitter<any> = new EventEmitter();
  @Output() deactivate: EventEmitter<any> = new EventEmitter();
  @Output() toggle: EventEmitter<any> = new EventEmitter();

  get trimmedLabel(): string {
    return this.formattedLabel || '(empty)';
  }

  @HostListener('mouseenter')
  onMouseEnter(): void {
    this.activate.emit({name: this.label});
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.deactivate.emit({name: this.label});
  }

}
