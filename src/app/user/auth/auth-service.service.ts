import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {tap} from 'rxjs/operators'
import {ILoggedUser, IUser} from './auth.model';
import { environment } from '../../../environments/environment';
import {Router} from '@angular/router';
import {DataStorageService} from '../../shared/data-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router, private dataStorageService: DataStorageService ) { }

  registerUser(user: IUser): void {
    const bodyUser = {
      ...user,
      returnSecureToken: true
    }
    this.http.post<ILoggedUser>(environment.registerURL + environment.apiKey, bodyUser).subscribe(newUser => {
      this.dataStorageService.setUser(newUser)
      this.router.navigate(['/home']);
    });
  }

  loginUser(user: IUser): void {
    const bodyUser = {
      ...user,
      returnSecureToken: true
    }
    this.http.post<ILoggedUser>(environment.loginURL + environment.apiKey, bodyUser).pipe(
      tap(data => this.dataStorageService.setLoggedUserProfile(data.email))
    ).subscribe(newUser => {
      this.dataStorageService.setUser(newUser)

      this.router.navigate(['/home']);
    });
    
  }

  // saveUserEmail(userEmail) {
  //   sessionStorage.setItem('user', user)
  // }

  // getUserEmail() {
  //   return sessionStorage.getItem('user')
  // }

  logout() {
    // sessionStorage.removeItem('email');
    this.dataStorageService.setUser(null);
    this.router.navigate(["/home"])
  }

}
