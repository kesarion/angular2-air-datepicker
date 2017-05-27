import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

import { AirOptions } from "./lib/options";
import { AirCalendar } from "./lib/calendar";
import { LANGUAGES, AirLanguage } from "./lib/languages";

@Component({
    selector: 'air-datepicker',
    templateUrl: './template.html',
    styleUrls: ['./style.css']
})
export class AirDatepicker implements OnInit {
    @Input() airOptions: AirOptions;
    @Input() airDate: Date;

    @Output() airChange = new EventEmitter<Date>();

    airLanguage: AirLanguage;
    airCalendar: AirCalendar;

    ngOnInit () {
        if (!this.airOptions) {
            this.airOptions = new AirOptions;
        }
        if(!this.airOptions.hasOwnProperty('datepicker')){
          this.airOptions['datepicker'] =true;
        }
        this.airLanguage = LANGUAGES.get(this.airOptions.language);
        this.airCalendar = new AirCalendar(this.airDate);
    }

    setDate (index?: number) {
        if (this.airCalendar.airDays[index]) {
            this.airCalendar.selectDate(index);
        }

        this.airDate.setTime(Date.parse(`${this.airCalendar.year}/${this.airCalendar.month + 1}/${this.airCalendar.date} ${this.airCalendar.hour}:${this.airCalendar.minute}`));

        this.airChange.emit(this.airDate);
    }
}
