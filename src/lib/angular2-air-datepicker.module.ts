import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Angular2AirDatepickerComponent } from './angular2-air-datepicker.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    Angular2AirDatepickerComponent
  ],
  exports: [
    Angular2AirDatepickerComponent
  ]
})
export class Angular2AirDatepickerModule {}
