import { Injectable } from '@angular/core';
import { from, Observable, Subject } from 'rxjs';
import { map, mergeMap, switchMap, tap, toArray } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class MentorshipService {
mentorshipProfiles: any;

  constructor(private http: HttpClient) { }

  fetchMentorshipProfiles(profileId: string) {
    return this.http.get(environment.dbUrl + 'profile/' + profileId + '/mentorship.json').pipe(
      map(entries => {
        const data = [];
        Object.entries(entries).forEach(([key, obj]) => {
          // data.push(obj['profileId'])
          data.push(Object.assign({mentorshipId: key},obj))
        });
        return data;
      }),
      mergeMap(data => from(data).pipe(
        mergeMap(obj => this.http.get(environment.dbUrl + 'profile/' + obj.profileId +'.json').pipe(
          map(data => Object.assign({profileId:obj.profileId, mentorshipId:obj.mentorshipId},data))
        )),
      )),
      toArray()
      )
  }

  acceptRejectMentorship(loggedProfileID: string, isAccepted: boolean, lookedProfile: any) {
    let lookedProfileMentorshipID;
    Object.entries(lookedProfile.mentorship).forEach(([key,value]) =>{
      if(value.profileId === loggedProfileID){
        lookedProfileMentorshipID = key;
      }
    });
    this.http.patch(environment.dbUrl + 'profile/' + loggedProfileID + '/mentorship/' + lookedProfile.mentorshipId + '.json', { isAccepted: isAccepted }).subscribe()
    this.http.patch(environment.dbUrl + 'profile/' + lookedProfile.profileId + '/mentorship/' + lookedProfileMentorshipID + '.json', { isAccepted: isAccepted }).subscribe()
  }

}
