import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { CreateEditProfileComponent } from './create-edit-profile/create-edit-profile.component';

const routes: Routes = [
  {
    path: 'profile/:id',
    component: ProfileComponent
  },
  { path: 'profile/create', component: CreateEditProfileComponent },
  { path: 'profile/:id/edit', component: CreateEditProfileComponent },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class UserRoutingModule { }
