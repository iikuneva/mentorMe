import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators'
import { ILoggedUser, IUser } from './auth.model';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { DataStorageService } from '../../shared/data-storage.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  errorMessage: string = '';

  constructor(private http: HttpClient, private router: Router, private dataStorageService: DataStorageService) { }

  registerUser(user: IUser): Observable<any> {
    const bodyUser = {
      ...user,
      returnSecureToken: true
    }
    return this.http.post<ILoggedUser>(environment.registerURL + environment.apiKey, bodyUser);
    // .subscribe(
    //   {
    //     next: (newUser) => {
    //       this.dataStorageService.setUser(newUser)
    //       this.router.navigate(['/home']);
    //     },
    //     error: (error) => {
    //       this.errorMessage = error.error.error.message;
    //     }
    //   }
    // );
  }

  loginUser(user: IUser): Observable<any> {
    const bodyUser = {
      ...user,
      returnSecureToken: true
    }
    return this.http.post<ILoggedUser>(environment.loginURL + environment.apiKey, bodyUser).pipe(
      tap(data => {
        sessionStorage.setItem('user', JSON.stringify(data));
        this.dataStorageService.setLoggedUserProfile(data.email)
      })
    )
    // .subscribe(
    //   {
    //     next: (newUser) => {
    //       this.dataStorageService.setUser(newUser)
    //       this.router.navigate(['/home']);
    //     },
    //     error: (error) => {
    //       this.errorMessage = error.error.error.message;
    //       console.log("from authservice --> " + error.error.error.message);
    //     }
    //   }
    // );

  }

  autoLogin(): void {
    if (sessionStorage.getItem('user')) {
      const user = JSON.parse(sessionStorage.getItem('user'));
      this.dataStorageService.setLoggedUserProfile(user.email);
      this.dataStorageService.setUser(user);
    }
  }


  logout() {
    sessionStorage.removeItem('user');
    this.dataStorageService.setUser(null);
    this.dataStorageService.setLoggedUserProfile(null);
    this.router.navigate(["/home"])
  }

}
