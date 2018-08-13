import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Angular2AirDatepickerComponent } from './angular2-air-datepicker.component';
import { components } from './components/index';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    Angular2AirDatepickerComponent,
    components
  ],
  exports: [
    Angular2AirDatepickerComponent
  ]
})
export class Angular2AirDatepickerModule {}
