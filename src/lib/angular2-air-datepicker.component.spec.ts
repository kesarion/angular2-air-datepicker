import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Angular2AirDatepickerComponent } from './angular2-air-datepicker.component';

describe('Angular2AirDatepickerComponent', () => {
  let component: Angular2AirDatepickerComponent;
  let fixture: ComponentFixture<Angular2AirDatepickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Angular2AirDatepickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Angular2AirDatepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
