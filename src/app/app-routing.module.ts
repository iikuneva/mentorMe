import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { HomeResolverService } from './home/home-resolver.service';
import { HomeComponent } from './home/home.component';
import {NotFoundComponent} from './not-found/not-found.component';

const routes: Routes = [
  {
    path: '', redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
    resolve: [HomeResolverService]
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
