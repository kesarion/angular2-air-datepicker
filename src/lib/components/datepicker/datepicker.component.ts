import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AirCalendar, AirLanguage, AirOptions } from '../../classes';


@Component({
  selector: '[datepicker]',
  template: `
    <nav class="datepicker--nav">
      <div class="datepicker--nav-action" (click)="setMonth.emit(airCalendar.month - 1)"><svg><path d="M 17,12 l -5,5 l 5,5"></path></svg></div>

      <div (click)="monthSelection.emit()" class="datepicker--nav-title">{{airLanguage.months[airCalendar.month]}}, <i>{{airCalendar.year}}</i></div>

      <div class="datepicker--nav-action" (click)="setMonth.emit(airCalendar.month + 1)"><svg><path d="M 14,12 l 5,5 l -5,5"></path></svg></div>
    </nav>

    <div class="datepicker--content">
      <div class="datepicker--days datepicker--body active">
        <div class="datepicker--days-names">
          <div *ngFor="let day of [0,1,2,3,4,5,6]" class="datepicker--day-name" [class.-weekend-]="day == 5 || day == 6"
          >{{airLanguage[airOptions.fullDays ? 'days' : 'daysMin'][day]}}</div>
        </div>

        <div class="datepicker--cells datepicker--cells-days">
          <div *ngFor="let airDay of airCalendar.airDays; let i=index"
               class="datepicker--cell datepicker--cell-day"
               [ngClass]="{ '-weekend-': airDay.weekend,
                            '-other-month-': airDay.other,
                            '-current-': airDay.current,
                            '-selected-':
                            airDate.getUTCFullYear() == airCalendar.year
                            && airDate.getUTCMonth() == airCalendar.month
                            && airDate.getUTCDate() == airDay.date
                            && !airDay.other,
                            '-disabled-': airDay.disabled }"
               (click)="setDate.emit(i)">{{airDay.date}}</div>
        </div>
      </div>

      <div *ngIf="airOptions.timepicker"
           timepicker
           [airOptions]="airOptions" [airCalendar]="airCalendar" (setDate)="setDate.emit(null)" class="datepicker--time -am-pm-"></div>
    </div>
  `
})
export class DatepickerComponent {
  @Input() airDate: Date;
  @Input() airOptions: AirOptions;
  @Input() airCalendar: AirCalendar;
  @Input() airLanguage: AirLanguage;

  @Output() setDate = new EventEmitter<number>();
  @Output() setMonth = new EventEmitter<number>();
  @Output() monthSelection = new EventEmitter<void>();
}
