import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AirCalendar, AirOptions } from '../../classes';


@Component({
  selector: '[timepicker]',
  template: `
    <div class="datepicker--time-current">
            <span class="datepicker--time-current-hours"
            >{{('0' + (!airOptions.format12h ? airCalendar.hour : (airCalendar.hour <= 12 ? airCalendar.hour : airCalendar.hour - 12))).slice(-2)}}</span>
      <span class="datepicker--time-current-colon">:</span>
      <span class="datepicker--time-current-minutes">{{('0' + airCalendar.minute).slice(-2)}}</span>
      <span *ngIf="airOptions.format12h" class="datepicker--time-current-ampm">{{airCalendar.hour < 12 ? 'AM' : 'PM'}}</span>
    </div>

    <div class="datepicker--time-sliders">
      <div class="datepicker--time-row">
        <input type="range" name="hours" min="0" max="23" step="{{airOptions.hourStep}}" [(ngModel)]="airCalendar.hour" (change)="setDate.emit()">
      </div>

      <div class="datepicker--time-row">
        <input type="range" name="minutes" min="0" max="59" step="{{airOptions.minuteStep}}" [(ngModel)]="airCalendar.minute" (change)="setDate.emit()">
      </div>
    </div>
  `
})
export class TimepickerComponent {
  @Input() airOptions: AirOptions;
  @Input() airCalendar: AirCalendar;

  @Output() setDate = new EventEmitter<void>();
}
