import { Injectable } from '@angular/core';
import {map, tap} from 'rxjs/operators';
import {Observable, Subject} from 'rxjs';
import IProfile from '../user/profile.model';
// import { IUser } from './interfaces/user';
import { ILoggedUser } from '../user/auth/auth.model';
import { AuthService } from '../user/auth/auth-service.service';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment'


@Injectable({
  providedIn: 'root'
})

export class DataStorageService {

  user: ILoggedUser = null;
  loggedUserProfileId = new Subject<string>();
  userProfile: IProfile = null;
  profiles: IProfile[] = [];

  constructor(private http: HttpClient ) { }

  fetchAllProfiles(): Observable<IProfile[]> {
    return this.http.get(environment.dbUrl + 'profile.json').pipe(
        map(entries => {
            const data = [];
            Object.keys(entries).forEach(k => {
                data.push({
                    ...entries[k],
                    id: k
                })
            });
            return data;
        }), 
        tap(data => this.profiles=data)
    )
}

  setUser(user: ILoggedUser) {
    this.user = user;
  }

  getUser(): ILoggedUser {
    return this.user;
  }

  setLoggedUserProfile(email: string): void {
    const user = this.profiles.find(p => p.userEmail === email);
    this.loggedUserProfileId.next(user.id);
  }

  getLoggedUserProfileId() {
    return this.loggedUserProfileId;
  }

  getAllProfiles(): IProfile[] {
    return this.profiles;
  }

  getProfileById(id: string): IProfile {
    return this.profiles.find(p => p.id === id);
  }

}
