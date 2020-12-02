import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import IProfile from '../user/profile.model';
import { ILoggedUser } from '../user/auth/auth.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment'


@Injectable({
  providedIn: 'root'
})

export class DataStorageService {
  user: ILoggedUser = null;
  loggedUserProfileId = new BehaviorSubject<string>('');
  userProfile: IProfile = null;
  profiles: IProfile[] = [];

  constructor(private http: HttpClient) { }

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
      tap(data => this.profiles = data)
    )
  }

  setUser(user: ILoggedUser) {
    this.user = user;
  }

  getUser(): ILoggedUser {
    return this.user;
  }

  setLoggedUserProfile(email: string): void {
    if (email) {
      this.http.get(environment.dbUrl + '/profile.json?orderBy="userEmail"&equalTo="' + email + '"').subscribe(
        data => {
          this.loggedUserProfileId.next(Object.keys(data)[0]);
        }
      )
    } else {
      this.loggedUserProfileId.next(null);
    }
  }

  getLoggedUserProfileId() {
    return this.loggedUserProfileId;
  }

  getAllProfiles(): IProfile[] {
    return this.profiles;
  }

  fetchProfileById(id: string): Observable<IProfile> {
    return this.http.get<IProfile>(environment.dbUrl + 'profile/' + id + '.json').pipe(
      map(data => {
        return {
          ...data,
          id
        }
      }),
      tap(profile => this.userProfile = profile));
    // return this.profiles.find(p => p.id === id);
  }

  getUserProfile(): IProfile {
    return this.userProfile;
  }

  addToMentorshipArray(idMentee: string, idMentor: string) {
    this.http.post(environment.dbUrl + 'profile/' + idMentor + '/mentorship' + '.json', { profileId: idMentee }).subscribe()
    this.http.post(environment.dbUrl + 'profile/' + idMentee + '/mentorship' + '.json', { profileId: idMentor }).subscribe()
  }

  
}
