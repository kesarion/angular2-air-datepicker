import { Component } from '@angular/core';

const now = Date.now();
const days = 24 * 60 * 60 * 1000;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  date: Date;
  endDate: Date;
  options: any = {
    language: 'en',
    timepicker: true,
    format12h: true,
    range: true,
    /*enabledDateRanges: [
      { start: new Date(now - 3 * days), end: new Date(now + 2 * days) },
      { start: new Date(now + 4 * days), end: new Date(now + 7 * days) }
    ]*/
  };

  dateChanged (date) {
    console.log(`Date change: ${date}; This Date: ${this.date}`);
  }

  endDateChanged (endDate) {
    console.log(`End Date change: ${endDate}`); // this.endDate won't be changing because the end date does not support two way binding (and neither should date...)
  }

  monthSelected (month) {
    console.log(month);
  }

  yearSelected (year) {
    console.log(year);
  }
}
