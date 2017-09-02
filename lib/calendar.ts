import { AirOptions } from './options';

export class AirCalendar {
    daysInMonth: Array<number> = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];
    airOptions: AirOptions;
    airDays: Array<AirDay>;
    year: number;
    month: number;
    date: number;
    hour: number;
    minute: number;

    constructor (date: Date = new Date, airOptions: AirOptions = new AirOptions) {
        this.airOptions = airOptions;
        this.year = date.getFullYear();
        this.month = date.getMonth();
        this.date = date.getDate();
        this.hour = date.getHours();
        this.minute = date.getMinutes();
        this.updateCalendar(true)
    }

    next () {
        this.setMonth(this.month + 1);
        this.updateCalendar();
    }

    previous () {
        this.setMonth(this.month - 1);
        this.updateCalendar();
    }

    updateCalendar (selectDate = false) {
        this.airDays = [];
        let daysInMonth = this.getDaysInMonth(this.month);
        let date = new Date;
        let firstDayOfMonth = ((new Date(Date.parse(`${this.year}/${this.month + 1}/1`))).getDay() || 7) - 1; // making 0 == monday
        let weekend = new AirWeekend(firstDayOfMonth);

        if (firstDayOfMonth/* is not monday (0) */) {
            let daysInLastMonth = this.getDaysInMonth(this.month - 1);
            let airMonth = new AirMonth(this.month - 1, this.year);
            for (let date = daysInLastMonth - firstDayOfMonth + 1; date <= daysInLastMonth; date++) {
                this.airDays.push(new AirDay(date, weekend.progress(), this.airOptions.isDisabled(new Date(`${airMonth.year}/${airMonth.month + 1}/${date}`)), true));
            }
        }

        for (let date = 1; date <= daysInMonth; date++) {
            this.airDays.push(new AirDay(date, weekend.progress(), this.airOptions.isDisabled(new Date(`${this.year}/${this.month + 1}/${date}`))));
        }

        if (this.date > daysInMonth) {
            this.date = daysInMonth; // select the maximum available this month instead
        }

        // select the calendar date; usually at calendar initialisation; only if enabled
        if (selectDate) {
          let selectedDate = firstDayOfMonth + this.date - 1;
          this.airDays[selectedDate].selected = !this.airDays[selectedDate].disabled;
        }

        if (date.getMonth() == this.month) {
            // set the current date if it's the current month, regardless of year for now
            this.airDays[firstDayOfMonth + date.getDate() - 1].current = true;
        }

        let daysSoFar = firstDayOfMonth + daysInMonth;
        let airMonth = new AirMonth(this.month + 1, this.year);
        for (let date = 1; date <= (daysSoFar > 35 ? 42 : 35) - daysSoFar; date++) {
            this.airDays.push(new AirDay(date, weekend.progress(), this.airOptions.isDisabled(new Date(`${airMonth.year}/${airMonth.month + 1}/${date}`)), true));
        }
    }

    selectDate (index: number) {
        this.date = this.airDays[index].date;

        // might be a day from the previous/next month
        if (index < 7 && this.date > 20) {
            this.previous();
        } else if (index > 20 && this.date < 8) {
            this.next();
        } else {
            // no need to update the whole calendar here
            for (let day of this.airDays) {
                if (day.selected) {
                    day.selected = false;
                }
            }

            this.airDays[index].selected = true;
        }
    }

    setMonth (month) {
        let airMonth: AirMonth = new AirMonth(month, this.year);
        this.month = airMonth.month;
        this.year = airMonth.year;
    }

    getDaysInMonth (month) {
        let airMonth: AirMonth = new AirMonth(month, this.year);
        if(airMonth.month == 1 && ((airMonth.year % 4 == 0) && (airMonth.year % 100 != 0)) || (airMonth.year % 400 == 0)) {
            return 29;
        }

        return this.daysInMonth[airMonth.month];
    }
}

// normalizes month/year
class AirMonth {
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

class AirDay {
    date: number;
    weekend: boolean;
    other: boolean;
    current: boolean;
    selected: boolean;
    disabled: boolean

    constructor (date: number, weekend = false, disabled = false, other = false, current = false, selected = false) {
        this.date = date;
        this.weekend = weekend;
        this.disabled = disabled;
        this.other = other;
        this.current = current;
        this.selected = selected;
    }
}

class AirWeekend {
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
