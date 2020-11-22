import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import {UserRoutingModule} from './user-routing.module';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';


@NgModule({
  declarations: [ProfileComponent, LoginComponent, RegisterComponent],
  imports: [
    CommonModule,
    RouterModule,
    UserRoutingModule
  ]
})
export class UserModule { }
