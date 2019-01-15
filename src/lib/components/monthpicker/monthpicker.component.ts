import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AirCalendar, AirLanguage } from '../../classes';


@Component({
  selector: '[monthpicker]',
  template: `
    <nav class="datepicker--nav">
      <div class="datepicker--nav-action" (click)="setYear.emit(airCalendar.year - 1)"><svg><path d="M 17,12 l -5,5 l 5,5"></path></svg></div>

      <div (click)="yearSelection.emit()" class="datepicker--nav-title">{{airCalendar.year}}</div>

      <div class="datepicker--nav-action" (click)="setYear.emit(airCalendar.year + 1)"><svg><path d="M 14,12 l 5,5 l -5,5"></path></svg></div>
    </nav>

    <div class="datepicker--content">
      <div class="datepicker--months datepicker--body active">
        <div class="datepicker--cells datepicker--cells-months">
          <div *ngFor="let month of airLanguage.months; let i=index"
               (click)="setMonth.emit(i)"
               class="datepicker--cell datepicker--cell-month"
               [ngClass]="{ '-current-': airCalendar.year == airCalendar.currentYear && i == airCalendar.currentMonth }">{{month}}</div>
        </div>
      </div>
    </div>
  `
})
export class MonthpickerComponent {
  @Input() airCalendar: AirCalendar;
  @Input() airLanguage: AirLanguage;

  @Output() setMonth = new EventEmitter<number>();
  @Output() setYear = new EventEmitter<number>();
  @Output() yearSelection = new EventEmitter<void>();
}
