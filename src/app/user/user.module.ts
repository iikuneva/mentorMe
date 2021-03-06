import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import {UserRoutingModule} from './user-routing.module';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateEditProfileComponent } from './create-edit-profile/create-edit-profile.component';
import { MentorshipComponent } from './mentorship/mentorship.component';


@NgModule({
  declarations: [
    ProfileComponent, 
    LoginComponent, 
    RegisterComponent, 
    CreateEditProfileComponent, MentorshipComponent],
  imports: [
    RouterModule,
    UserRoutingModule, 
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class UserModule { }
