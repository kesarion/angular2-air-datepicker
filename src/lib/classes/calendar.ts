import { AirOptions } from './options';

export class AirCalendar {
  daysInMonth: Array<number> = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];
  airOptions: AirOptions;
  airDays: Array<AirDay>;
  currentMonth: number;
  currentYear: number;
  year: number;
  month: number;
  date: number;
  hour: number;
  minute: number;

  constructor (date: Date = new Date, airOptions: AirOptions = new AirOptions) {
    const currentDate = new Date;
    this.currentMonth = currentDate.getMonth();
    this.currentYear = currentDate.getFullYear();
    this.airOptions = airOptions;
    this.year = date.getFullYear();
    this.month = date.getMonth();
    this.date = date.getDate();
    this.hour = date.getHours();
    this.minute = date.getMinutes();
    this.updateCalendar();
  }

  updateCalendar () {
    this.airDays = [];
    const daysInMonth = this.getDaysInMonth(this.month);
    const date = new Date;
    const firstDayOfMonth = ((new Date(this.year, this.month, 1)).getDay() || 7) - 1; // making 0 == monday
    const weekend = new AirWeekend;

    if (firstDayOfMonth/* is not monday (0) */) {
      const daysInLastMonth = this.getDaysInMonth(this.month - 1);
      const prevAirMonth = new AirMonth(this.month - 1, this.year);
      for (let dateNo = daysInLastMonth - firstDayOfMonth; dateNo < daysInLastMonth; dateNo++) {
        this.airDays.push(
          new AirDay(dateNo, weekend.progress(), this.airOptions.isDisabled(new Date(prevAirMonth.year, prevAirMonth.month, dateNo)), true)
        );
      }
    }

    for (let dateNo = 1; dateNo <= daysInMonth; dateNo++) {
      this.airDays.push(new AirDay(dateNo, weekend.progress(), this.airOptions.isDisabled(new Date(this.year, this.month, dateNo))));
    }

    if (this.date > daysInMonth) {
      this.date = daysInMonth; // select the maximum available this month instead
    }

    // set the current date if it's the current month & year
    if (date.getMonth() == this.month && date.getFullYear() == this.year) {
      this.airDays[firstDayOfMonth + date.getDate() - 1].current = true;
    }

    const daysSoFar = firstDayOfMonth + daysInMonth;
    const nextAirMonth = new AirMonth(this.month + 1, this.year);
    for (let dateNo = 1; dateNo <= (daysSoFar > 35 ? 42 : 35) - daysSoFar; dateNo++) {
      this.airDays.push(
        new AirDay(dateNo, weekend.progress(), this.airOptions.isDisabled(new Date(nextAirMonth.year, nextAirMonth.month, dateNo)), true)
      );
    }
  }

  selectDate (index: number) {
    this.date = this.airDays[index].date;

    // might be a day from the previous/next month
    if (index < 7 && this.date > 20) {
      this.setMonth(this.month - 1);
    } else if (index > 20 && this.date < 8) {
      this.setMonth(this.month + 1);
    }
  }

  setMonth (month: number) {
    const airMonth: AirMonth = new AirMonth(month, this.year);
    this.month = airMonth.month;
    this.year = airMonth.year;
    this.updateCalendar();
  }

  setYear (year: number) {
    this.year = year;
  }

  getDaysInMonth (month: number) {
    const airMonth: AirMonth = new AirMonth(month, this.year);
    if (airMonth.month == 1 && ((airMonth.year % 4 == 0) && (airMonth.year % 100 != 0)) || (airMonth.year % 400 == 0)) {
      return 29;
    }

    return this.daysInMonth[airMonth.month];
  }
}

// normalizes month/year
export class AirMonth {
  month: number;
  year: number;

  constructor (month, year) {
    if (month > 11) {
      year++;
      month = 0;
    } else if (month < 0) {
      year--;
      month = 11;
    }

    this.month = month;
    this.year = year;
  }
}

export class AirDay {
  date: number;
  weekend: boolean;
  other: boolean;
  current: boolean;
  disabled: boolean;

  constructor (date: number, weekend = false, disabled = false, other = false, current = false) {
    this.date = date;
    this.weekend = weekend;
    this.disabled = disabled;
    this.other = other;
    this.current = current;
  }
}

export class AirWeekend {
  day: number;

  constructor (day: number = 0) {
    this.day = day;
  }

  progress (): boolean {
    let weekend = false;

    if (this.day == 5 /* Saturday */) {
      weekend = true;
      ++this.day;
    } else if (this.day == 6 /* Sunday */) {
      weekend = true;
      this.day = 0; // it's a new week!
    } else {
      ++this.day;
    }

    return weekend;
  }
}
