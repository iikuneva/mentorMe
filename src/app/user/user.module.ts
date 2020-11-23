import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import {UserRoutingModule} from './user-routing.module';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [ProfileComponent, LoginComponent, RegisterComponent],
  imports: [
    RouterModule,
    UserRoutingModule, SharedModule
  ]
})
export class UserModule { }
