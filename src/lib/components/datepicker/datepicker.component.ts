import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AirCalendar, AirLanguage, AirOptions, AirDay } from '../../classes';


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
                            '-disabled-': airDay.disabled,
                            '-selected-': !airDay.disabled && (isCalendarDate(airDate, airDay) || isCalendarDate(airEndDate, airDay) || isCalendarDate(airDateSim, airDay) || isCalendarDate(airEndDateSim, airDay)),
                            '-in-range-': airOptions.range && !airDay.disabled && isInRange(airDay),
                            '-range-from-': airOptions.range && !airDay.disabled && ((!airDateSim && isCalendarDate(airDate, airDay)) || isCalendarDate(airDateSim, airDay)),
                            '-range-to-': airOptions.range && !airDay.disabled && (isCalendarDate(airEndDate, airDay) || isCalendarDate(airEndDateSim, airDay)) }"
               (click)="setDate.emit(i)"
               (mouseenter)="airOptions.range ? simulate(airDay) : ''"
               (mouseleave)="airOptions.range ? resetSim() : ''">{{airDay.date}}</div>
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
  @Input() airEndDate: Date;
  @Input() airOptions: AirOptions;
  @Input() airCalendar: AirCalendar;
  @Input() airLanguage: AirLanguage;

  @Output() setDate = new EventEmitter<number>();
  @Output() setMonth = new EventEmitter<number>();
  @Output() monthSelection = new EventEmitter<void>();

  airDateSim: Date;
  airEndDateSim: Date;

  isInRange (day: AirDay) {
    if (this.airDate && this.airEndDate) {
      return this.airDate < new Date(Date.UTC(day.year, day.month, day.date)) &&
          new Date(Date.UTC(day.year, day.month, day.date, 23, 59, 59)) < this.airEndDate;
    }

    if (this.airDateSim && this.airEndDateSim) {
      return this.airDateSim < new Date(Date.UTC(day.year, day.month, day.date)) &&
          new Date(Date.UTC(day.year, day.month, day.date, 23, 59, 59)) < this.airEndDateSim;
    }

    return false;
  }

  isCalendarDate (date: Date, day: AirDay) {
    return date ? date.getUTCFullYear() == day.year && date.getUTCMonth() == day.month && date.getUTCDate() == day.date : false;
  }

  simulate (day: AirDay) {
    const date = new Date(Date.UTC(day.year, day.month, day.date, 0, 0));
    this.airDateSim = this.airDate;
    this.airEndDateSim = this.airEndDate;

    if (!this.airOptions.isDisabled(date) && ((this.airDate && !this.airEndDate) || (this.airEndDate && !this.airDate))) {
      if (this.airDate) {
        if (date < this.airDate) {
          this.airEndDateSim = this.airDate;
          this.airDateSim = date;
        } else {
          if (this.airEndDate) {
            this.airEndDateSim = null;
            this.airDateSim = date;
          } else {
            this.airEndDateSim = date;
          }
        }
      } else /* airEndDate is truthy */ {
        if (this.airEndDate < date) {
          this.airDateSim = this.airEndDate;
          this.airEndDateSim = date;
        } else {
          this.airDateSim = date;
          this.airEndDateSim = null;
        }
      }
    }
  }

  resetSim () {
    this.airDateSim = null;
    this.airEndDateSim = null;
  }
}
