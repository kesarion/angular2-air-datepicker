export class AirOptions {
    timepicker?: boolean;
    format12h?: boolean;
    fullDays?: boolean;
    language?: string;
    hourStep?: number;
    minuteStep?: number;
    enabledDateRanges?: DateRange[];

    constructor (options: AirOptions = {} as AirOptions) {
        this.timepicker = !!options.timepicker;
        this.format12h = !!options.format12h;
        this.fullDays = !!options.fullDays;
        this.language = options.language || 'en';
        this.hourStep = options.hourStep || 1;
        this.minuteStep = options.minuteStep || 1;
        this.enabledDateRanges = options.enabledDateRanges || [];
    }

    isDisabled (date: Date) {
      for (const dateRange of this.enabledDateRanges) {
        // console.log(date, dateRange, date >= dateRange.start, date <= dateRange.end, date >= dateRange.start && date <= dateRange.end);
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
