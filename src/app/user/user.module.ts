import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import {UserRoutingModule} from './user-routing.module';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TestCompComponent } from './profile/test-comp/test-comp.component';
import { CreateEditProfileComponent } from './create-edit-profile/create-edit-profile.component';


@NgModule({
  declarations: [
    ProfileComponent, 
    LoginComponent, 
    RegisterComponent, 
    TestCompComponent, 
    CreateEditProfileComponent],
  imports: [
    RouterModule,
    UserRoutingModule, 
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class UserModule { }
