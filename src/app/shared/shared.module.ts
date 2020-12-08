import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LoaderComponent } from './loader/loader.component';



@NgModule({
  declarations: [LoaderComponent],
  imports: [
    CommonModule, FontAwesomeModule
  ],
  exports: [CommonModule, FontAwesomeModule, LoaderComponent]
})
export class SharedModule { }
