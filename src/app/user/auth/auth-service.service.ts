import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import ILoggedUser from './auth.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: ILoggedUser = null;

  constructor(private http: HttpClient) { }

  registerUser(user: { email: string, password: string }): void {
    const bodyUser = {
      ...user,
      returnSecureToken: true
    }
    this.http.post<ILoggedUser>(environment.registerURL + environment.apiKey, bodyUser).subscribe(newUser => {
      this.user = newUser;
    });
  }

  loginUser(user: { email: string, password: string }): void {
    const bodyUser = {
      ...user,
      returnSecureToken: true
    }
    this.http.post<ILoggedUser>(environment.loginURL + environment.apiKey, bodyUser).subscribe(newUser => {
      this.user = newUser;
    });
  }
}
