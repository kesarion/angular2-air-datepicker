import { Component } from '@angular/core';

const now = Date.now();
const days = 24 * 60 * 60 * 1000;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  date: Date = new Date;
  options: any = {
    timepicker: true,
    format12h: true/*,
    enabledDateRanges: [
      { start: new Date(now - 3 * days), end: new Date(now + 2 * days) },
      { start: new Date(now + 4 * days), end: new Date(now + 7 * days) }
    ]*/
  };

  dateChanged (date) {
    console.log(date, this.date);
  }

  monthSelected (month) {
    console.log(month);
  }

  yearSelected (year) {
    console.log(year);
  }
}
