import { Injectable } from '@angular/core';
import { from, Observable, Subject } from 'rxjs';
import { map, mergeMap, switchMap, tap, toArray } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class MentorshipService {
// textValue = new Subject<string>();
mentorshipProfiles: any;

  constructor(private http: HttpClient) { }

  getMentorshipProfiles() {
    return this.mentorshipProfiles;
  }

  fetchMentorshipProfiles(profileId: string) {
    return this.http.get(environment.dbUrl + 'profile/' + profileId + '/mentorship.json').pipe(
      map(entries => {
        const data = [];
        Object.entries(entries).forEach(([key, obj]) => {
          data.push(obj['profileId'])
        });
        return data;
      }),
      mergeMap(data => from(data).pipe(
        mergeMap(id => this.http.get(environment.dbUrl + 'profile/' + id +'.json').pipe(
          map(data => Object.assign({id},data))
        )),
      )),
      toArray(),
      )
  }
}
