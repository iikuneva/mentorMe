import { Injectable } from '@angular/core';
import { map, tap, mergeMap, toArray } from 'rxjs/operators';
import { Observable, BehaviorSubject, Subject, from, Subscription } from 'rxjs';
import IProfile from '../user/profile.model';
import { ILoggedUser } from '../user/auth/auth.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})

export class DataStorageService {
  user = new BehaviorSubject<ILoggedUser>(null);
  loggedUserProfile = new BehaviorSubject<{ profileId: string, role: string }>({ profileId: '', role: '' });
  userProfile: IProfile = null;
  profiles: IProfile[] = [];
  isLoading = new Subject<boolean>();
  mentorshipProfiles: any;

  constructor(private http: HttpClient) { }

  fetchAllProfiles(): Observable<IProfile[]> {
    this.isLoading.next(true);
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
      tap(data => {
        this.isLoading.next(false);
        this.profiles = data;
      })
    )
  }

  getAllProfiles(): IProfile[] {
    return this.profiles;
  }

  setUser(user: ILoggedUser) {
    this.user.next(user);
  }

  getUser() {
    return this.user;
  }

  setLoggedUserProfile(email: string): void {
    if (email) {
      this.http.get(environment.dbUrl + '/profile.json?orderBy="userEmail"&equalTo="' + email + '"').subscribe(
        data => {
          if (Object.keys(data).length !== 0) {
            const fetchedProfile: IProfile = data[Object.keys(data)[0]];
            this.loggedUserProfile.next({ profileId: Object.keys(data)[0], role: fetchedProfile.main.role });
          }
        }
      )
    } else {
      this.loggedUserProfile.next(null);
    }
  }

  getLoggedUserProfile() {
    return this.loggedUserProfile;
  }


  fetchProfileById(id: string): Observable<IProfile> {
    this.isLoading.next(true);
    return this.http.get<IProfile>(environment.dbUrl + 'profile/' + id + '.json').pipe(
      map(data => {
        return {
          ...data,
          id
        }
      }),
      tap(profile => {
        this.userProfile = profile;
        this.isLoading.next(false);
      }));
  }

  getUserProfile(): IProfile {
    return this.userProfile;
  }

  addToMentorshipArray(idMentee: string, idMentor: string) {
    this.http.post(environment.dbUrl + 'profile/' + idMentor + '/mentorship' + '.json', { profileId: idMentee }).subscribe()
    this.http.post(environment.dbUrl + 'profile/' + idMentee + '/mentorship' + '.json', { profileId: idMentor }).subscribe()
  }

  fetchMentorshipProfiles() {
    if(this.loggedUserProfile.getValue() === null){
      return;
    }
    const profileId = this.loggedUserProfile.getValue().profileId;
    this.isLoading.next(true);
    return this.http.get(environment.dbUrl + 'profile/' + profileId + '/mentorship.json').pipe(
      map(entries => {
        const data = [];
        if (entries) {
          Object.entries(entries).forEach(([key, obj]) => {
            data.push(Object.assign({ mentorshipId: key }, obj))
          });
        }
        return data;
      }),
      mergeMap(data => {
        if (data.length > 0) {
          return from(data).pipe(
            mergeMap(obj => this.http.get(environment.dbUrl + 'profile/' + obj.profileId + '.json').pipe(
              map(data => Object.assign({ profileId: obj.profileId, mentorshipId: obj.mentorshipId }, data))
            )),
          )
        }
        return data;
      }),
      toArray(),
      tap(data => this.isLoading.next(false)
      )
    ).subscribe(data => this.mentorshipProfiles = data)
  }

}
