import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { TimepickerComponent } from './timepicker.component';
import { AirCalendar } from '../../classes';

describe('TimepickerComponent', () => {
  const date = new Date;
  const calendar = new AirCalendar(date);

  describe('Template', () => {
    let component: TimepickerComponent;
    let fixture: ComponentFixture<TimepickerComponent>;
    let delement: DebugElement;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ FormsModule ],
        declarations: [ TimepickerComponent, TimepickerComponent ]
      })
        .compileComponents();

      fixture = TestBed.createComponent(TimepickerComponent);
      component = fixture.componentInstance;
      delement = fixture.debugElement;

      component.airCalendar = calendar;
      component.airOptions = calendar.airOptions;

      fixture.detectChanges();
    });

    it('should properly display the time', () => {
      const timeDel = delement.query(By.css('.datepicker--time-current'));
      for (const h12 of [false, true]) {
        component.airOptions.format12h = h12;
        for (const hour of [0, 11, 12, 13, 23]) {
          component.airCalendar.hour = hour;
          for (const minute of [0, 30, 59]) {
            component.airCalendar.minute = minute;
            fixture.detectChanges();
            expect(timeDel.nativeElement.textContent).toEqual(formatTime(component.airCalendar));
          }
        }
      }
    });

    it('should properly report the set time', () => {
      let raisedSetDateEvent = false;
      const inputs = delement.queryAll(By.css('input'));
      const timeDel = delement.query(By.css('.datepicker--time-current'));
      component.setDate.subscribe(() => raisedSetDateEvent = true);

      for (const hour of [0, 11, 12, 13, 23]) {
        for (const minute of [0, 30, 59]) {
          setInput(inputs[0].nativeElement, hour);
          setInput(inputs[1].nativeElement, minute);
          fixture.detectChanges();
          expect(component.airCalendar.hour).toEqual(hour);
          expect(component.airCalendar.minute).toEqual(minute);
          expect(timeDel.nativeElement.textContent).toEqual(formatTime(component.airCalendar));
          expect(raisedSetDateEvent).toBeTruthy();
          raisedSetDateEvent = false;
        }
      }
    });
  });
});

function formatTime (calendar) {
  return `${formatHour(calendar.hour, calendar.airOptions.format12h)}:${formatMinute(calendar.minute)}${ampm(calendar.hour, calendar.airOptions.format12h)}`;
}

function formatHour (hour: number, h12: boolean) {
  return ('0' + (!h12 ? hour : (hour <= 12 ? hour : hour - 12))).slice(-2);
}

function formatMinute (minute) {
  return ('0' + minute).slice(-2);
}

function ampm (hour, h12) {
  if (h12) {
    return hour < 12 ? 'AM' : 'PM';
  }

  return '';
}

function setInput (input, value) {
  input.value = value;
  input.dispatchEvent(new Event('change'));
}
