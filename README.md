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
import { MyComponent } from "./my.component";
import { AirDatepicker } from 'angular2-air-datepicker';

@NgModule({
    imports: [
        CommonModule,
        FormsModule
    ],
    declarations: [
        MyComponent,
        AirDatepicker
    ]
})
export class HomeModule {}

```
> AirDatepicker requires CommonModule and FormsModule to be imported, either in your current module or your SharedModule


### Options

- **timepicker**: boolean = 'false';
 > Display the time picker (hour & minute);

- **format12h**: boolean = 'false';
> For timepicker, use 12 hour format;

- **language**: string = 'en';
> Choose a language for localization (day and month names);

- **hourStep**: number = 1;

- **minuteStep**: number = 1;


## Notes

There are a few differences from the original and many features are not yet implemented. Pull requests are humbly encouraged and accepted. If there is enough support for a feature it will likely be done quicker; please create an issue for any request.

#### Differences from original:

- A Date Object is used as input/output; The developer is responsible for potentially displaying and formatting the selected date;
- First day in week is Monday, always;
- Default language is English;
- The language options are heavily simplified (names only for days, minDays and months);

#### To be implemented:

- **input + tooltip version**; currently it's just the simple, div based datepicker;
- **month & year picking**;
- **multiple dates/ranges**;
- **limits**; a more advanced version than in the original is planned;

Those would be the main features that need to be implemented further. There are many more features in the original, some of them don't apply here, others will be implemented based on interest or from pull requests.

#### JS Bundle

There is no compiled bundle; this component is meant to be loaded and compiled along with other dependencies during the build process (using webpack, rollup or similar). In case of a test project without a build process, you can simply copy the component files and use them as any other custom component.

If a good enough case can be made for creating a bundle, please create an issue for it.


## Thanks

A big thank you to [t1m0n/air-datepicker](https://github.com/t1m0n/air-datepicker) for making this possible with a fantastic datepicker design!
