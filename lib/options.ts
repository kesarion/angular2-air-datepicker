export class AirOptions {
    timepicker: boolean;
    format12h: boolean;
    fullDays: boolean;
    language: string;
    hourStep: number;
    minuteStep: number;

    constructor () {
        this.timepicker = false;
        this.format12h = false;
        this.fullDays = false;
        this.language = 'en';
        this.hourStep = 1;
        this.minuteStep = 1;
    }
}
