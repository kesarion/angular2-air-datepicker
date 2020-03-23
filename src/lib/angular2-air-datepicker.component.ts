import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';

import { AIR_LANGUAGES, AirCalendar, AirLanguage, AirOptions } from './classes';

@Component({
  selector: 'air-datepicker',
  template: `
    <div class="datepicker-inline">
      <ng-container [ngSwitch]="mode">
        <div *ngSwitchCase="'datepicker'"
             datepicker
             [airDate]="airDate"
             [airEndDate]="airEndDate"
             [airOptions]="airOptions"
             [airCalendar]="airCalendar"
             [airLanguage]="airLanguage"
             (setDate)="setDate($event)"
             (setMonth)="airCalendar.setMonth($event); airMonthSelect.emit($event);"
             (monthSelection)="mode = 'monthpicker'"
             class="datepicker"></div>

        <div *ngSwitchCase="'monthpicker'"
             monthpicker
             [airCalendar]="airCalendar"
             [airLanguage]="airLanguage"
             (setMonth)="airCalendar.setMonth($event); airMonthSelect.emit($event); mode = 'datepicker';"
             (setYear)="airCalendar.setYear($event); airYearSelect.emit($event);"
             (yearSelection)="mode = 'yearpicker'"
             class="datepicker"></div>

        <div *ngSwitchCase="'yearpicker'"
             yearpicker
             [airCalendar]="airCalendar"
             (setYear)="airCalendar.setYear($event); airYearSelect.emit($event); mode = 'monthpicker';"
             class="datepicker"></div>
      </ng-container>
    </div>
  `,
  styleUrls: ['./angular2-air-datepicker.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class Angular2AirDatepickerComponent implements OnInit {
  @Input() airOptions: AirOptions;
  @Input() airDate: Date;
  @Input() airEndDate: Date;

  @Output() airDateChange = new EventEmitter<Date>(); // for backward compatibility with v1
  @Output() airChange = new EventEmitter<Date>(); // the proper event emitter to use when listening for changes to the main date
  @Output() airEndChange = new EventEmitter<Date>();
  @Output() airMonthSelect = new EventEmitter<number>();
  @Output() airYearSelect = new EventEmitter<number>();

  airLanguage: AirLanguage;
  airCalendar: AirCalendar;
  mode = 'datepicker';

  ngOnInit () {
    this.airOptions = new AirOptions(this.airOptions || {} as AirOptions);
    this.airLanguage = AIR_LANGUAGES.get(this.airOptions.language);
    this.airCalendar = new AirCalendar(this.airDate, this.airOptions);
  }

  setDate (index?: number) {
    if (this.airCalendar.airDays[index]) {
      if (this.airCalendar.airDays[index].disabled) {
        return;
      }

      this.airCalendar.selectDate(index);
    }

    const date = new Date(Date.UTC(this.airCalendar.year, this.airCalendar.month, this.airCalendar.date, this.airCalendar.hour, this.airCalendar.minute));

    if (AirOptions.sameDate(date, this.airDate)) {
      this.airDate = this.airOptions.range && this.airEndDate ? this.airEndDate : null;
      this.airEndDate = null;
    } else if (AirOptions.sameDate(date, this.airEndDate)) {
      this.airEndDate = null;
    } else if (!this.airOptions.isDisabled(date)) {
      // Note: Need intermediate components to take over this flow when/if we get to multiple dates
      // (i.e. a component for each type of date selection: single, range, multi, etc.); lest it get out of hand...
      if (!this.airOptions.range || (!this.airDate && !this.airEndDate)) {
        this.airDate = date;
      } else {
        if (this.airDate) {
          if (date < this.airDate) {
            this.airEndDate = this.airDate;
            this.airDate = date;
          } else {
            if (this.airEndDate) {
              this.airEndDate = null;
              this.airDate = date;
            } else {
              this.airEndDate = date;
            }
          }
        } else /* airEndDate is truthy */ {
          if (this.airEndDate < date) {
            this.airDate = this.airEndDate;
            this.airEndDate = date;
          } else {
            this.airDate = date;
            this.airEndDate = null;
          }
        }
      }
    }

    this.airDateChange.emit(this.airDate); // for backward compatibility with v1
    this.airChange.emit(this.airDate);
    if (this.airOptions.range) {
      this.airEndChange.emit(this.airEndDate);
    }
  }
}
