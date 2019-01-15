import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { MonthpickerComponent } from './monthpicker.component';
import { AIR_LANGUAGES, AirCalendar } from '../../classes';
import { click } from '../../testing/click';

describe('MonthpickerComponent', () => {
  const year = 1000;
  const defaultLanguage = AIR_LANGUAGES.get('en');
  const currentMonth = 5;

  describe('Template', () => {
    let component: MonthpickerComponent;
    let fixture: ComponentFixture<MonthpickerComponent>;
    let delement: DebugElement;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [ MonthpickerComponent ]
      })
        .compileComponents();

      fixture = TestBed.createComponent(MonthpickerComponent);
      component = fixture.componentInstance;
      delement = fixture.debugElement;
      component.airLanguage = defaultLanguage;
      component.airCalendar = { year: year, currentYear: year, currentMonth: currentMonth } as AirCalendar;

      fixture.detectChanges();
    });

    it('should display the year', () => {
      const datepickerTitle = delement.query(By.css('.datepicker--nav-title'));
      expect(datepickerTitle.nativeElement.textContent).toEqual(`${year}`);
    });

    it('should display the months of the year in the selected language', () => {
      for (const language of AIR_LANGUAGES.values()) {
        component.airLanguage = language;

        fixture.detectChanges();

        const datepickerCells = delement.queryAll(By.css('.datepicker--cell'));
        expect(language.months.length).toEqual(12);
        expect(datepickerCells.map(v => v.nativeElement.textContent)).toEqual(language.months);
      }
    });

    it('should raise the setYear event with the next year when the next button is clicked', () => {
      let nextYear: number;
      const nextButton = delement.queryAll(By.css('.datepicker--nav-action'))[1];
      component.setYear.subscribe(y => nextYear = y);

      click(nextButton);

      expect(nextYear).toEqual(year + 1);
    });

    it('should raise the setYear event with the previous year when the previous button is clicked', () => {
      let previousYear: number;
      const previousButton = delement.queryAll(By.css('.datepicker--nav-action'))[0];
      component.setYear.subscribe(y => previousYear = y);

      click(previousButton);

      expect(previousYear).toEqual(year - 1);
    });

    it('should raise the yearSelection event when the year is clicked', () => {
      let clicked = false;
      const yearButton = delement.query(By.css('.datepicker--nav-title'));
      component.yearSelection.subscribe(() => clicked = true);

      click(yearButton);

      expect(clicked).toBeTruthy();
    });

    it('should allow any displayed month to be selected', () => {
      let selectedMonth: number;
      const datepickerCells = delement.queryAll(By.css('.datepicker--cell'));
      component.setMonth.subscribe(y => selectedMonth = y);

      for (const monthCell of datepickerCells) {
        click(monthCell);

        expect(monthCell.nativeElement.textContent).toEqual(defaultLanguage.months[selectedMonth]);
      }
    });

    it('should apply the proper classes to the datepicker cells', () => {
      const datepickerCells = delement.queryAll(By.css('.datepicker--cell'));

      // we already set the year to be the same, so there's no need to check that
      datepickerCells.forEach((monthCell, i) => expect(monthCell.classes['-current-']).toEqual(i == currentMonth));
    });
  });
});
