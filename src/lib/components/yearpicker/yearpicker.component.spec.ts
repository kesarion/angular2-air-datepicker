import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { YearpickerComponent } from './yearpicker.component';
import { AirCalendar } from '../../classes';
import { click } from '../../testing/click';

describe('YearpickerComponent', () => {
  const year = 1000;
  const firstYear = year - 6;
  const nextFirstYear = firstYear + 10;
  const previousFirstYear = firstYear - 10;

  describe('Class', () => {
    let component: YearpickerComponent;

    beforeEach(() => {
      component = new YearpickerComponent;
      component.airCalendar = { year: year, currentYear: year } as AirCalendar;
      component.ngOnInit();
    });

    it('should properly initialize the component', () => {
      expect(component.years).toEqual(Array.from({ length: 12 }, (v, k) => firstYear + k));
    });

    it('should set the next set of years', () => {
      component.next();
      expect(component.years).toEqual(Array.from({ length: 12 }, (v, k) => nextFirstYear + k));
    });

    it('should set the previous set of years', () => {
      component.previous();
      expect(component.years).toEqual(Array.from({ length: 12 }, (v, k) => previousFirstYear + k));
    });
  });

  describe('Template', () => {
    let component: YearpickerComponent;
    let fixture: ComponentFixture<YearpickerComponent>;
    let delement: DebugElement;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [ YearpickerComponent ]
      })
        .compileComponents();

      fixture = TestBed.createComponent(YearpickerComponent);
      component = fixture.componentInstance;
      delement = fixture.debugElement;
      component.airCalendar = { year: year } as AirCalendar;

      fixture.detectChanges();
    });

    it('should display the decade range', () => {
      const datepickerTitle = delement.query(By.css('.datepicker--nav-title'));
      expect(datepickerTitle.nativeElement.textContent).toEqual(`${firstYear + 1} - ${firstYear + 10}`);
    });

    it('should display 12 years starting 6 years prior to the currently selected year', () => {
      const datepickerCells = delement.queryAll(By.css('.datepicker--cell'));
      expect(datepickerCells.map(v => v.nativeElement.textContent))
        .toEqual(Array.from({ length: 12 }, (v, k) => `${firstYear + k}`));
    });

    it('should display the next set of years after clicking the next button', () => {
      const nextButton = delement.queryAll(By.css('.datepicker--nav-action'))[1];

      click(nextButton);
      fixture.detectChanges();

      const datepickerCells = delement.queryAll(By.css('.datepicker--cell'));
      expect(datepickerCells.map(v => v.nativeElement.textContent))
        .toEqual(Array.from({ length: 12 }, (v, k) => `${nextFirstYear + k}`));
    });

    it('should display the previous set of years after clicking the previous button', () => {
      const previousButton = delement.queryAll(By.css('.datepicker--nav-action'))[0];

      click(previousButton);
      fixture.detectChanges();

      const datepickerCells = delement.queryAll(By.css('.datepicker--cell'));
      expect(datepickerCells.map(v => v.nativeElement.textContent))
        .toEqual(Array.from({ length: 12 }, (v, k) => `${previousFirstYear + k}`));
    });

    it('should allow any displayed year to be selected', () => {
      let selectedYear: number;
      const datepickerCells = delement.queryAll(By.css('.datepicker--cell'));
      component.setYear.subscribe(y => selectedYear = y);

      for (const yearCell of datepickerCells) {
        click(yearCell);

        expect(`${selectedYear}`).toEqual(yearCell.nativeElement.textContent);
      }
    });

    it('should apply the proper classes to the datepicker cells', () => {
      const datepickerCells = delement.queryAll(By.css('.datepicker--cell'));

      expect(datepickerCells[0].classes['-other-decade-']).toBeTruthy();
      expect(datepickerCells[datepickerCells.length - 1].classes['-other-decade-']).toBeTruthy();
      datepickerCells.forEach((yearCell, i) => expect(yearCell.classes['-current-']).toEqual(i == year));
    });
  });
});
