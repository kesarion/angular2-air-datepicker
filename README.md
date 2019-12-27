[![npm version](https://badge.fury.io/js/angular2-air-datepicker.svg)](https://badge.fury.io/js/angular2-air-datepicker)
[![Build Status](https://travis-ci.org/kesarion/angular2-air-datepicker.svg?branch=master)](https://travis-ci.org/kesarion/angular2-air-datepicker)
[![codecov](https://codecov.io/gh/kesarion/angular2-air-datepicker/branch/master/graph/badge.svg)](https://codecov.io/gh/kesarion/angular2-air-datepicker)

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
> For the timepicker, switch to a 12 hour format (AM/PM).  
  
> * **language**: string = 'en';  
>  
> Choose a language for localization (day and month names).  
  
> * **hourStep**: number = 1;  
>  
> The number of hours the hour slider will move at a time when dragged.  
  
> * **minuteStep**: number = 1;  
>  
> The number of minutes the minute slider will move at a time when dragged.  
  
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
> **Note**: You'll usually want to set the `start` and `end` dates to the start and end of the day (00:00, 23:59), not doing so may result in unintended behaviors in non GMT timezones, unless you know what you're doing. The `timepicker` option is currently not supported.   
> **Hint**: If you only need a minDate, just set one DateRange with the `end` set to a very distant date. 
  
## Notes  

#### Build and Development

```text
git clone https://github.com/kesarion/angular2-air-datepicker
cd angular2-air-datepicker
npm install -g @angular/cli
npm install
ng build
ng serve angular2-air-datepicker-app
```

The library is the main project, you can build it with `ng build` and run the tests with `ng test` (requires chrome). The `angular2-air-datepicker-app` project is a test app you can use to test the library and any changes you might have made to it. You'll need to rebuild the library after any change or use `ng build --watch` in another terminal window or tab.
  
#### Version 1.x:
 
The library should now be compatible with Angular 6+. Starting with version 1.0, you should import the module instead of the component.  
  
#### Differences from the original:  

There are a few differences from the original and many features are not yet implemented. Pull requests are humbly encouraged and accepted. If there is enough support for a feature it will likely be done quicker; please create an issue for any request.    

- A Date Object is used as input/output; The developer is responsible for potentially displaying and formatting the selected date;  
- The first day of the week is always Monday;  
- The default language is English;
- The language options are heavily simplified (names only for days, minDays and months);  
  
#### To be implemented:  
  
- **input + tooltip version**; (only the div based datepicker is currently available) 
- **multiple date selection**;
- **range selection**;
  
Those are the main features that need to be implemented. There are more features available in the original, some of them don't apply here, others will be implemented based on interest or from pull requests.  
  
## Thanks  
  
A big thank you to [t1m0n/air-datepicker](https://github.com/t1m0n/air-datepicker) for making this possible with a fantastic datepicker design!
