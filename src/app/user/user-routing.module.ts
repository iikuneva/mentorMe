import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { CreateEditProfileComponent } from './create-edit-profile/create-edit-profile.component';
import { ProfileResolverService } from './profile-resolver.service';
import { MentorshipComponent } from './mentorship/mentorship.component';

const routes: Routes = [
  { path: 'profile/create', pathMatch:'full', component: CreateEditProfileComponent },
  {
    path: 'profile/:id',
    component: ProfileComponent, 
    resolve: [ProfileResolverService]
  },
  
  { path: 'profile/:id/edit', component: CreateEditProfileComponent, resolve: [ProfileResolverService] },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'mentorship',
    component: MentorshipComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class UserRoutingModule { }
