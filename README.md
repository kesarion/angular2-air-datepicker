[![npm version](https://badge.fury.io/js/angular2-air-datepicker.svg)](https://badge.fury.io/js/angular2-air-datepicker)

# Angular2 Air Datepicker  
  
Lightweight, customizable, cross-browser Angular2 datepicker. Native implementation of [air-datepicker](https://github.com/t1m0n/air-datepicker).  
  
  
## Install  
```  
npm i angular2-air-datepicker -S  
```  
  
## Usage  
  
#### template:  
  
With an `options object` and `date object` from the component:  
```html  
<air-datepicker [airOptions]="options" [(airDate)]="date"></air-datepicker>  
```  
> Notice how we're doing two way binding on date  
  
Leverage the `(airChange)=""` event to do something when the date changes.  
```html  
<air-datepicker [airOptions]="options" (airChange)="dateChanged($event)"></air-datepicker>  
```  
> The default selected date is the current date unless you pass another date to `airDate`. You can get the new selected date by passing `$event` to your handler function.  
  
Input the options directly:  
```html  
<air-datepicker [airOptions]="{ timepicker: true, format12h: true }" [(airDate)]="date" (airChange)="dateChanged()"></air-datepicker>  
```  
> You can use `[(airDate)]` and `(airChange)` at the same time.  
  
  
#### component:  
  
```javascript  
import { Component } from '@angular/core';  
  
@Component({  
    selector: 'my-component',  
    templateUrl: './my.template.html'  
})  
export class MyComponent {  
    options: any = { timepicker: true, format12h: true };  
    date: Date = new Date;  
  
    dateChanged (date) {  
        console.log(date, this.date);  
    }  
}  
```  
  
#### module:  
  
```javascript  
import { NgModule } from "@angular/core";  
import { CommonModule } from '@angular/common';  
import { FormsModule } from '@angular/forms';

import { Angular2AirDatepickerModule } from 'angular2-air-datepicker';

import { MyComponent } from "./my.component";
  
@NgModule({  
    imports: [  
        CommonModule,
        FormsModule,
        Angular2AirDatepickerModule
    ],  
    declarations: [  
        MyComponent
    ]  
})  
export class HomeModule {}  
  
```  
> AirDatepicker requires CommonModule and FormsModule to be imported, either in your current module or your SharedModule  
  
  
### Options  
  
> * **timepicker**: boolean = 'false';  
>  
> Display the time picker (hour & minute).  
  
> * **format12h**: boolean = 'false';  
>  
> For timepicker, use 12 hour format.  
  
> * **language**: string = 'en';  
>  
> Choose a language for localization (day and month names).  
  
> * **hourStep**: number = 1;  
>  
> Number of hours the hour slider will jump at a time when moved.  
  
> * **minuteStep**: number = 1;  
>  
> Number of minutes the minute slider will jump at a time when moved.  
  
> * **enabledDateRanges**: DateRange[];  
>  
> An array of date ranges (objects with `start` and `end` Date properties), that defines which dates are selectable. This works as both a minDate/maxDate option as well as a selective date enabler/disabler. 
```javascript  
// Example:  
const now = Date.now();  
const days = 24 * 60 * 60 * 1000;  
  
const options = {  
 enabledDateRanges: [  
  { start: new Date(now - 3 * days), end: new Date(now + 2 * days) },  
  { start: new Date(now + 4 * days), end: new Date(now + 7 * days) }  
 ]  
};  
```  
> **Hint**: If you only need a minDate, just set one DateRange with the `end` at a very distant date. 
> **Note**: The `timepicker` option is currently not supported; set start/end days at the start/end of the respective days you wish to set as limits for optimal results. If there's any problem related to timezones, please create and document an issue it.  
  
  
## Notes  
  
#### Version 1.x:
 
 The library should now be compatible with Angular 6+. Starting with version 1.0 you should import the exported module instead of using the component directly.  
  
#### Differences from original:  

There are a few differences from the original and many features are not yet implemented. Pull requests are humbly encouraged and accepted. If there is enough support for a feature it will likely be done quicker; please create an issue for any request.    

- A Date Object is used as input/output; The developer is responsible for potentially displaying and formatting the selected date;  
- First day in week is Monday, always;  
- Default language is English;  
- The language options are heavily simplified (names only for days, minDays and months);  
  
#### To be implemented:  
  
- **input + tooltip version**; (currently there's only the div based datepicker) 
- **multiple date selection**;
  
Those would be the main features that need to be implemented further. There are many more features in the original, some of them don't apply here, others will be implemented based on interest or from pull requests.  
  
## Thanks  
  
A big thank you to [t1m0n/air-datepicker](https://github.com/t1m0n/air-datepicker) for making this possible with a fantastic datepicker design!
