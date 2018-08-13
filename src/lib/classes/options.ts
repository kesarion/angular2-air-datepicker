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
        this.enabledDateRanges = this.UTCRanges(options.enabledDateRanges || []);
    }

    isDisabled (date: Date) {
      for (const dateRange of this.enabledDateRanges) {
        if (date >= dateRange.start && date <= dateRange.end) {
          return false;
        }
      }

      return !!this.enabledDateRanges.length;
    }

    UTCRanges (dateRanges: DateRange[]) {
      for (const dateRange of dateRanges) {
        dateRange.start.setTime(Date.UTC(
          dateRange.start.getFullYear(),
          dateRange.start.getMonth(),
          dateRange.start.getDate(),
          dateRange.start.getHours(),
          dateRange.start.getMinutes()
        ));

        dateRange.end.setTime(Date.UTC(
          dateRange.end.getFullYear(),
          dateRange.end.getMonth(),
          dateRange.end.getDate(),
          dateRange.end.getHours(),
          dateRange.end.getMinutes()
        ));
      }

      return dateRanges;
    }
}

export interface DateRange {
  start: Date;
  end: Date;
}
