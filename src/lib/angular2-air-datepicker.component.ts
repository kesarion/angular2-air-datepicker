import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { AirOptions, AirCalendar, AirLanguage, AIR_LANGUAGES } from './classes';

@Component({
  selector: 'air-datepicker',
  template: `
    <div class="datepicker-inline">
      <div class="datepicker"><i class="datepicker--pointer"></i>
        <nav class="datepicker--nav">
          <div class="datepicker--nav-action" (click)="airCalendar.previous()">
            <svg>
              <path d="M 17,12 l -5,5 l 5,5"></path>
            </svg>
          </div>

          <div class="datepicker--nav-title">{{airLanguage.months[airCalendar.month]}}, <i>{{airCalendar.year}}</i></div>

          <div class="datepicker--nav-action" (click)="airCalendar.next()">
            <svg>
              <path d="M 14,12 l 5,5 l -5,5"></path>
            </svg>
          </div>
        </nav>

        <div class="datepicker--content">
          <div class="datepicker--days datepicker--body active">
            <div class="datepicker--days-names">
              <div *ngFor="let day of [0,1,2,3,4,5,6]" class="datepicker--day-name" [class.-weekend-]="day == 5 || day == 6">
                {{airLanguage[airOptions.fullDays ? 'days' : 'daysMin'][day]}}
              </div>
            </div>

            <div class="datepicker--cells datepicker--cells-days">
              <div *ngFor="let airDay of airCalendar.airDays; let index=index"
                   class="datepicker--cell datepicker--cell-day"
                   [ngClass]="{
                            '-weekend-': airDay.weekend,
                            '-other-month-': airDay.other,
                            '-current-': airDay.current,
                            '-selected-': airDay.selected,
                            '-disabled-': airDay.disabled,
                            '-focus-': airDay.focused }"
                   (click)="setDate(index)"
                   (mouseover)="airDay.focused = true"
                   (mouseout)="airDay.focused = false">
                {{airDay.date}}
              </div>
            </div>
          </div>
        </div>

        <div *ngIf="airOptions.timepicker" class="datepicker--time -am-pm-">
          <div class="datepicker--time-current">
            <span class="datepicker--time-current-hours">
              {{('0' + (!airOptions.format12h ? airCalendar.hour : (airCalendar.hour <= 12 ? airCalendar.hour : airCalendar.hour - 12))).slice(-2)}}
            </span>
            <span class="datepicker--time-current-colon">:</span>
            <span class="datepicker--time-current-minutes">{{('0' + airCalendar.minute).slice(-2)}}</span>
            <span *ngIf="airOptions.format12h" class="datepicker--time-current-ampm">{{airCalendar.hour < 12 ? 'AM' : 'PM'}}</span>
          </div>

          <div class="datepicker--time-sliders">
            <div class="datepicker--time-row">
              <input type="range" name="hours" min="0" max="23" step="{{airOptions.hourStep}}" [(ngModel)]="airCalendar.hour" (change)="setTime()">
            </div>

            <div class="datepicker--time-row">
              <input type="range" name="minutes" min="0" max="59" step="{{airOptions.minuteStep}}" [(ngModel)]="airCalendar.minute" (change)="setTime()">
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./angular2-air-datepicker.component.scss']
})
export class Angular2AirDatepickerComponent implements OnInit {
  @Input() airOptions: AirOptions;
  @Input() airDate: Date;

  @Output() airChange = new EventEmitter<Date>();

  airLanguage: AirLanguage;
  airCalendar: AirCalendar;

  ngOnInit () {
    this.airOptions = new AirOptions(this.airOptions || {} as AirOptions);
    this.airLanguage = AIR_LANGUAGES.get(this.airOptions.language);
    this.airCalendar = new AirCalendar(this.airDate, this.airOptions);
  }

  setDate (index?: number) {
    if (this.airCalendar.airDays[index] && !this.airCalendar.airDays[index].disabled) {
      this.airCalendar.selectDate(index);
      this.setTime();
    }
  }

  setTime () {
    this.airDate.setTime(+ Date.UTC(this.airCalendar.year, this.airCalendar.month, this.airCalendar.date, this.airCalendar.hour, this.airCalendar.minute));
    this.airChange.emit(this.airDate);
  }
}
