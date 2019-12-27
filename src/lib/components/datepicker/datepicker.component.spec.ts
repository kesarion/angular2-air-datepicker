import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { DatepickerComponent } from './datepicker.component';
import { TimepickerComponent } from '../timepicker/timepicker.component';
import { AIR_LANGUAGES, AirCalendar, AirOptions } from '../../classes';
import { click } from '../../testing/click';

describe('DatepickerComponent', () => {
  describe('Template', () => {
    let component: DatepickerComponent;
    let fixture: ComponentFixture<DatepickerComponent>;
    let delement: DebugElement;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ FormsModule ],
        declarations: [ DatepickerComponent, TimepickerComponent ]
      })
        .compileComponents();

      fixture = TestBed.createComponent(DatepickerComponent);
      component = fixture.componentInstance;
      delement = fixture.debugElement;

      component.airDate = new Date();
      component.airCalendar = new AirCalendar(component.airDate);
      component.airOptions = component.airCalendar.airOptions;
      component.airLanguage = AIR_LANGUAGES.get(component.airCalendar.airOptions.language);

      fixture.detectChanges();
    });

    it('should display the month and year', () => {
      const datepickerTitle = delement.query(By.css('.datepicker--nav-title'));
      expect(datepickerTitle.nativeElement.textContent).toEqual(`${component.airLanguage.months[component.airCalendar.month]}, ${component.airCalendar.year}`);
    });

    it('should display the days of the week in every language/form', () => {
      for (const [key, language] of AIR_LANGUAGES) {
        component.airLanguage = language;

        for (const fullDays of [true, false]) {
          component.airOptions.fullDays = fullDays;

          fixture.detectChanges();

          const daysOfTheWeek = language[fullDays ? 'days' : 'daysMin'];
          const dayCells = delement.queryAll(By.css('.datepicker--day-name'));

          expect(dayCells.map(day => day.nativeElement.textContent)).toEqual(daysOfTheWeek);
          expect(dayCells.length).toEqual(7);
          expect(daysOfTheWeek.length).toEqual(7);
        }
      }
    });

    it('should display the dates/days in the calendar', () => {
      const datepickerCells = delement.queryAll(By.css('.datepicker--cell'));
      expect(datepickerCells.map(v => v.nativeElement.textContent)).toEqual(component.airCalendar.airDays.map(d => `${d.date}`));
    });

    it('should raise the setMonth event with the next date when the next button is clicked', () => {
      let nextMonth: number;
      const nextButton = delement.queryAll(By.css('.datepicker--nav-action'))[1];
      component.setMonth.subscribe(month => nextMonth = month);

      click(nextButton);

      expect(nextMonth).toEqual(component.airCalendar.month + 1);
    });

    it('should raise the setMonth event with the previous date when the previous button is clicked', () => {
      let previousMonth: number;
      const previousButton = delement.queryAll(By.css('.datepicker--nav-action'))[0];
      component.setMonth.subscribe(month => previousMonth = month);

      click(previousButton);

      expect(previousMonth).toEqual(component.airCalendar.month - 1);
    });

    it('should raise the monthSelection event when the date is clicked', () => {
      let clicked = false;
      const monthButton = delement.query(By.css('.datepicker--nav-title'));
      component.monthSelection.subscribe(() => clicked = true);

      click(monthButton);

      expect(clicked).toBeTruthy();
    });

    it('should allow any displayed date to be selected', () => {
      let selectedDate: number;
      const datepickerCells = delement.queryAll(By.css('.datepicker--cell'));
      component.setDate.subscribe(y => selectedDate = y);

      datepickerCells.forEach((dateCell, i) => {
        click(dateCell);

        expect(dateCell.nativeElement.textContent).toEqual(`${component.airCalendar.airDays[i].date}`);
      });
    });

    it('should apply the current and weekend classes to the right datepicker cells', () => {
      const datepickerCells = delement.queryAll(By.css('.datepicker--cell'));

      const dateIndex = datepickerCells.map(dateCell => dateCell.nativeElement.textContent)[component.airCalendar.date > 15 ? 'lastIndexOf' : 'indexOf'](`${component.airCalendar.date}`);
      expect(component.airCalendar.airDays[dateIndex].current).toBeTruthy();
      expect(datepickerCells[dateIndex].classes['-current-']).toBeTruthy();

      for (let i = 5; i < component.airCalendar.airDays.length; i += 7) {
        expect(component.airCalendar.airDays[i].weekend).toBeTruthy();
        expect(datepickerCells[i].classes['-weekend-']).toBeTruthy();
        expect(component.airCalendar.airDays[i + 1].weekend).toBeTruthy();
        expect(datepickerCells[i + 1].classes['-weekend-']).toBeTruthy();
      }
    });

    it('should apply the -disabled- class to the right datepicker cells', () => {
      const date = new Date('2000-12-15T23:59:59');
      component.airCalendar = new AirCalendar(date, new AirOptions({
        enabledDateRanges: [{ start: new Date('2000-12-14T00:00:00'), end: new Date('2000-12-16T23:59:59') }]
      } as AirOptions));

      fixture.detectChanges();

      const datepickerCells = delement.queryAll(By.css('.datepicker--cell'));
      const dateIndex = datepickerCells.map(dateCell => dateCell.nativeElement.textContent).indexOf(`${date.getDate()}`);
      expect(dateIndex).toBeGreaterThan(0);
      for (let i = 0; i < dateIndex - 1; i++) {
        expect(component.airCalendar.airDays[i].disabled).toBeTruthy();
        expect(datepickerCells[i].classes['-disabled-']).toBeTruthy();
      }
      for (let i = dateIndex - 1; i < dateIndex + 2; i++) {
        expect(component.airCalendar.airDays[i].disabled).toBeFalsy();
        expect(datepickerCells[i].classes['-disabled-']).toBeFalsy();
      }
      for (let i = dateIndex + 2; i < datepickerCells.length; i++) {
        expect(component.airCalendar.airDays[i].disabled).toBeTruthy();
        expect(datepickerCells[i].classes['-disabled-']).toBeTruthy();
      }
    });
  });
});
