export class AirOptions {
    timepicker: boolean;
    format12h: boolean;
    fullDays: boolean;
    language: string;
    hourStep: number;
    minuteStep: number;
    datepicker:boolean;

    constructor () {
        this.timepicker = false;
        this.format12h = false;
        this.fullDays = false;
        this.language = 'en';
        this.hourStep = 1;
        this.minuteStep = 1;
        this.datepicker = true;
    }
}
