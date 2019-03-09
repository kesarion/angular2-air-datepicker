## 1.2.4 (2019-03-09)

### Features
* Exposed **events for month and year selection**; they will return the respective month and year selected by the user and enable developers to take specific actions when these events take place.

### Bug Fixes
* The **last day of the previous month** will now show up.
* The **time sliders** will no longer slide out of their bounds.

## 1.2.0 (2019-01-15)

Comprehensive testing; added to Travis for automatic test/build/deployment.

Changed the project structure to allow testing and building; when developing, a new project may be generated to manually test and observe changes (note that currently, this library is the main project - in *src* - subject to change).

### Bug Fixes    

* **date selection/timezone bug**: At the end/beginning of a certain day/month/year, upon selection of a date (day), the next/previous date would be highlighted for certain timezones.
* **navigation**: Next/Previous navigation buttons should work correctly for all datepicker modes now.

## 1.1.3 (2018-08-21)

### Bug Fixes    

* **year navigation**: Next and previous year buttons should now work.
* **weekday mapping**: Days should now be mapped to their weekdays correctly.

## 1.1.0 (2018-08-13)

This version brings significant changes to the code and project structure.

### Features
* **month & year selection**: The month and year can now be selected as in the original library.
  
# 1.0.0 (2018-07-29)   
    
### Changes    
    
* **Compatibility with Angular 6+**: The library has undergone a future proofing effort. It should now work with Angular 6 and up. If there's an issue with some version of Angular, please provide the exact versions for angular and the library's required peer dependencies (see the package.json).  
* **Exporting a module**: Now exporting a module which in turn exports the component; the component name has also changed; the html tag remains the same. This is a `breaking change` and you should update your code accordingly. Also part of future proofing. 

## 0.2.2 (2017-08-02)    
    
### Bug Fixes    
    
* Fixed the **month offset** with Date.UTC 

## 0.2.0 (2017-07-14)    
    
### Bug Fixes    
    
* **UTC**: By default JavaScript converts new dates to the current timezone causing the received date to be different from the selected date. Dates set by the component will be set to UTC from now on, meaning the date you receive from the component will coincide with the selected date.
* **date background on hover**: Background now changes to a light grey on hover as in the vanilla datepicker. 
    
### Features    
    
* **options: { enabledDateRanges: [] }**: With the new `enabledDateRanges` option, you can specify which dates are selectable; this acts as both a minDate/maxDate option as well as a selective date enabler/disabler, bringing together multiple features in a simple, versatile option.

    
## 0.1.3 (2017-06-23)    
    
* **default options**: Supplied partial options are now extended with available default options.
    
## 0.1.2 (2017-02-18)    
    
### Bug Fixes    
    
* Fixed a **calendar month switching** bug when the date was greater than the days in the month.
    
### Feature    
    
* Added the **Italian** language.

# 0.1.0 (2016-11-10)

The project.
