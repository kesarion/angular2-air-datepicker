import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { Angular2AirDatepickerComponent } from './angular2-air-datepicker.component';
import { AIR_LANGUAGES, AirCalendar, AirLanguage, AirOptions } from './classes';
import { click } from './testing/click';
import { components } from './components';
import Spy = jasmine.Spy;

describe('Angular2AirDatepickerComponent', () => {
  let component: Angular2AirDatepickerComponent;

  describe('Class', () => {
    const now = Date.now();
    const days = 24 * 60 * 60 * 1000;

    describe('Basic', () => {
      beforeEach(() => {
        component = new Angular2AirDatepickerComponent;

        component.airDate = new Date;

        component.ngOnInit();
      });

      it('should properly initialize the component', () => {
        expect(component.airCalendar).toBeDefined();
        expect(component.airCalendar).toEqual(new AirCalendar(component.airDate));
        expect(component.airOptions).toBeDefined();
        expect(component.airOptions).toEqual(new AirOptions);
        expect(component.airLanguage).toBeDefined();
        expect(component.airLanguage).toEqual(AIR_LANGUAGES.get('en'));
      });
    });

    describe('Spies', () => {
      let airCalendarSelectDateSpy: Spy;
      let airChangeEmitSpy: Spy;

      beforeEach(() => {
        component = new Angular2AirDatepickerComponent;

        component.airDate = new Date;

        component.ngOnInit();

        airCalendarSelectDateSpy = spyOn(component.airCalendar, 'selectDate');
        airChangeEmitSpy = spyOn(component.airChange, 'emit');
      });

      it('should set the date', () => {
        component.setDate(15);

        expect(airCalendarSelectDateSpy).toHaveBeenCalledTimes(1);
        expect(airChangeEmitSpy).toHaveBeenCalledTimes(1);
        expect(airChangeEmitSpy).toHaveBeenCalledWith(component.airDate);
      });

      it('should set the time', () => {
        component.setDate();

        expect(airCalendarSelectDateSpy).not.toHaveBeenCalled();
        expect(airChangeEmitSpy).toHaveBeenCalledTimes(1);
        expect(airChangeEmitSpy).toHaveBeenCalledWith(component.airDate);
      });

      it('shouldn\'t set a disabled date', () => {
        component.airCalendar.airDays[15].disabled = true;

        component.setDate(15);

        expect(airCalendarSelectDateSpy).not.toHaveBeenCalled();
        expect(airChangeEmitSpy).not.toHaveBeenCalled();
      });

      it('shouldn\'t set a disabled time', () => {
        component.airOptions.enabledDateRanges = [{ start: new Date(now - 3 * days), end: new Date(now - 2 * days) }];

        component.setDate();

        expect(airCalendarSelectDateSpy).not.toHaveBeenCalled();
      });
    });
  });

  describe('Template', () => {
    let fixture: ComponentFixture<Angular2AirDatepickerComponent>;
    let delement: DebugElement;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ FormsModule ],
        declarations: [ Angular2AirDatepickerComponent, components ]
      })
        .compileComponents();

      fixture = TestBed.createComponent(Angular2AirDatepickerComponent);
      component = fixture.componentInstance;
      delement = fixture.debugElement;

      component.airDate = new Date;

      fixture.detectChanges();
    });

    it('should display the month and year, the year and the year range depending on the mode', () => {
      let datepickerTitle = delement.query(By.css('.datepicker--nav-title'));
      expect(datepickerTitle.nativeElement.textContent)
        .toEqual(`${component.airLanguage.months[component.airCalendar.month]}, ${component.airCalendar.year}`);

      component.mode = 'monthpicker';
      fixture.detectChanges();
      datepickerTitle = delement.query(By.css('.datepicker--nav-title'));
      expect(datepickerTitle.nativeElement.textContent)
        .toEqual(`${component.airCalendar.year}`);

      component.mode = 'yearpicker';
      fixture.detectChanges();
      datepickerTitle = delement.query(By.css('.datepicker--nav-title'));
      expect(datepickerTitle.nativeElement.textContent)
        .toEqual(`${component.airCalendar.year - 5} - ${component.airCalendar.year + 4}`);

      component.mode = 'datepicker';
      fixture.detectChanges();
      datepickerTitle = delement.query(By.css('.datepicker--nav-title'));
      expect(datepickerTitle.nativeElement.textContent)
        .toEqual(`${component.airLanguage.months[component.airCalendar.month]}, ${component.airCalendar.year}`);
    });

    it('should properly switch the mode when clicking the correct element', () => {
      let datepickerTitle = delement.query(By.css('.datepicker--nav-title'));
      expect(datepickerTitle.nativeElement.textContent)
        .toEqual(`${component.airLanguage.months[component.airCalendar.month]}, ${component.airCalendar.year}`);

      // going up
      click(datepickerTitle);
      fixture.detectChanges();
      datepickerTitle = delement.query(By.css('.datepicker--nav-title'));
      expect(datepickerTitle.nativeElement.textContent)
        .toEqual(`${component.airCalendar.year}`);

      click(datepickerTitle);
      fixture.detectChanges();
      datepickerTitle = delement.query(By.css('.datepicker--nav-title'));
      expect(datepickerTitle.nativeElement.textContent)
        .toEqual(`${component.airCalendar.year - 5} - ${component.airCalendar.year + 4}`);

      // should stay the same, this is the last stop
      click(datepickerTitle);
      fixture.detectChanges();
      datepickerTitle = delement.query(By.css('.datepicker--nav-title'));
      expect(datepickerTitle.nativeElement.textContent)
        .toEqual(`${component.airCalendar.year - 5} - ${component.airCalendar.year + 4}`);

      // going down
      let datepickerCell = delement.query(By.css('.datepicker--cell'));
      const selectedYear = datepickerCell.nativeElement.textContent;
      click(datepickerCell);
      fixture.detectChanges();
      expect(`${component.airCalendar.year}`).toEqual(selectedYear);
      datepickerTitle = delement.query(By.css('.datepicker--nav-title'));
      expect(datepickerTitle.nativeElement.textContent)
        .toEqual(`${component.airCalendar.year}`);

      datepickerCell = delement.query(By.css('.datepicker--cell'));
      click(datepickerCell);
      fixture.detectChanges();
      expect(`${component.airLanguage.months[component.airCalendar.month]}`).toEqual(datepickerCell.nativeElement.textContent);
      expect(`${component.airCalendar.year}`).toEqual(selectedYear); // just making sure it stayed the same
      datepickerTitle = delement.query(By.css('.datepicker--nav-title'));
      expect(datepickerTitle.nativeElement.textContent)
        .toEqual(`${component.airLanguage.months[component.airCalendar.month]}, ${component.airCalendar.year}`);
    });

    it('should properly select and change dates while cycling through the calendar', () => {
      const navButtons = delement.queryAll(By.css('.datepicker--nav-action'));
      const plusUltra = component.airCalendar.year + 2;
      while (component.airCalendar.year < plusUltra) {
        const thisYear = component.airCalendar.year;
        const thisMonth = component.airCalendar.month;
        const datepickerCells = delement.queryAll(By.css('.datepicker--cell'));

        for (const time of [[0, 0], [23, 59]]) {
          component.airCalendar.hour = time[0];
          component.airCalendar.minute = time[1];

          datepickerCells.forEach((dateCell, i) => {
            if (!dateCell.classes['-other-month-']) {
              click(dateCell);
              fixture.detectChanges();

              expect(dateCell.classes['-selected-']).toBeTruthy();
            }
          });
        }

        click(navButtons[1]);
        fixture.detectChanges();

        if (thisYear == component.airCalendar.year) {
          expect(component.airCalendar.month).toEqual(thisMonth + 1);
        } else {
          expect(component.airCalendar.year).toEqual(thisYear + 1);
          expect(component.airCalendar.month).toEqual(0);
        }
      }
    });

    it('should apply the -other-month- class to the right datepicker cells', () => {
      const navButtons = delement.queryAll(By.css('.datepicker--nav-action'));
      const date = new Date('2018-12-15T23:59:59');
      component.airCalendar = new AirCalendar(date);

      fixture.detectChanges();

      const datepickerCells = delement.queryAll(By.css('.datepicker--cell'));
      expect(datepickerCells.length).toEqual(42);

      for (let i = 0; i < 5; i++) {
        expect(component.airCalendar.airDays[i].other).toBeTruthy();
        expect(datepickerCells[i].classes['-other-month-']).toBeTruthy();

        click(datepickerCells[i]);
        expect(component.airCalendar.month).toEqual(10);
        click(navButtons[1]);
      }

      for (let i = 5; i < 36; i++) {
        expect(component.airCalendar.airDays[i].other).toBeFalsy();
        expect(datepickerCells[i].classes['-other-month-']).toBeFalsy();

        click(datepickerCells[i]);
        expect(component.airCalendar.month).toEqual(11);
      }

      for (let i = 36; i < 42; i++) {
        expect(component.airCalendar.airDays[i].other).toBeTruthy();
        expect(datepickerCells[i].classes['-other-month-']).toBeTruthy();

        click(datepickerCells[i]);
        expect(component.airCalendar.month).toEqual(0);
        click(navButtons[0]);
      }
    });

    // options.range tests here...
  });
});
