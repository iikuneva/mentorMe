import {NgModule} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {
    path: 'profile',
    component: ProfileComponent
    // children: [
    //   {
    //     path: 'profile/:id',
    //     component: ProfileComponent,
    //   }
    // ]
  },
  {
      path: 'login',
      component: LoginComponent
  }
];

@NgModule({
imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
})

export class UserRoutingModule {}
