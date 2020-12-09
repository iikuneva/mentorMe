import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LoaderComponent } from './loader/loader.component';
import { NotificationComponent } from './notification/notification.component';



@NgModule({
  declarations: [LoaderComponent, NotificationComponent],
  imports: [
    CommonModule, FontAwesomeModule
  ],
  exports: [CommonModule, FontAwesomeModule, LoaderComponent, NotificationComponent]
})
export class SharedModule { }
