import { Injectable } from '@angular/core';
import { from, Observable, Subject } from 'rxjs';
import { map, mergeMap, switchMap, tap, toArray } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Mentorship } from '../profile.model';

@Injectable({
  providedIn: 'root'
})
export class MentorshipService {
  mentorshipProfiles: any = null;

  constructor(private http: HttpClient) { }

  fetchMentorshipProfiles(profileId: string) {
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
      toArray()
    )
  }

  acceptRejectMentorship(loggedProfileID: string, isAccepted: boolean, lookedProfile: any) {
    let lookedProfileMentorshipID;
    const keysArr: string[] = Object.keys(lookedProfile.mentorship);
    for (let key of keysArr) {
      let value: Mentorship = lookedProfile.mentorship[key];
      if (value.profileId === loggedProfileID) {
        lookedProfileMentorshipID = key;
        break;
      }
    }
    this.http.patch(environment.dbUrl + 'profile/' + loggedProfileID + '/mentorship/' + lookedProfile.mentorshipId + '.json', { isAccepted: isAccepted }).subscribe()
    this.http.patch(environment.dbUrl + 'profile/' + lookedProfile.profileId + '/mentorship/' + lookedProfileMentorshipID + '.json', { isAccepted: isAccepted }).subscribe()
  }

}
