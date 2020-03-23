export class AirOptions {
    timepicker?: boolean;
    format12h?: boolean;
    fullDays?: boolean;
    language?: string;
    hourStep?: number;
    minuteStep?: number;
    range?: boolean;
    enabledDateRanges?: DateRange[];

    constructor (options: AirOptions = {} as AirOptions) {
        this.timepicker = !!options.timepicker;
        this.format12h = !!options.format12h;
        this.fullDays = !!options.fullDays;
        this.language = options.language || 'en';
        this.hourStep = options.hourStep || 1;
        this.minuteStep = options.minuteStep || 1;
        this.range = !!options.range;
        this.enabledDateRanges = options.enabledDateRanges || [];
    }

    static sameDate (date1: Date, date2: Date) {
        return date1 && date2 &&
            date1.getUTCFullYear() == date2.getUTCFullYear() &&
            date1.getUTCMonth() == date2.getUTCMonth() &&
            date1.getUTCDate() == date2.getUTCDate();
    }

    isDisabled (date: Date) {
      for (const dateRange of this.enabledDateRanges) {
        if (date >= dateRange.start && date <= dateRange.end) {
          return false;
        }
      }

      return !!this.enabledDateRanges.length;
    }
}

export interface DateRange {
  start: Date;
  end: Date;
}
