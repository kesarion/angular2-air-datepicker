import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AirCalendar } from '../../classes';


@Component({
  selector: '[yearpicker]',
  template: `
    <nav class="datepicker--nav">
      <div class="datepicker--nav-action" (click)="previous()"><svg><path d="M 17,12 l -5,5 l 5,5"></path></svg></div>

      <div class="datepicker--nav-title">{{years[1]}} - {{years[years.length - 2]}}</div>

      <div class="datepicker--nav-action" (click)="next()"><svg><path d="M 14,12 l 5,5 l -5,5"></path></svg></div>
    </nav>

    <div class="datepicker--content">
      <div class="datepicker--cells datepicker--cells-years">
        <div *ngFor="let year of years; let i=index" (click)="setYear.emit(year)" class="datepicker--cell datepicker--cell-year"
             [ngClass]="{ '-current-': year == airCalendar.currentYear, '-other-decade-': i == 0 || i == years.length - 1 }">{{year}}</div>
      </div>
    </div>
  `
})
export class YearpickerComponent implements OnInit {
  @Input() airCalendar: AirCalendar;

  @Output() setYear = new EventEmitter<number>();

  years: number[] = [];

  ngOnInit () {
    const firstYear = this.airCalendar.year - 6;
    this.years = Array.from({ length: 12 }, (v, k) => firstYear + k);
  }

  next () {
    for (let i = 0; i < this.years.length; i++) {
      this.years[i] += 10;
    }
  }

  previous () {
    for (let i = 0; i < this.years.length; i++) {
      this.years[i] -= 10;
    }
  }
}
