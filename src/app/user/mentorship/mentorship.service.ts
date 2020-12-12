import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Mentorship } from '../profile.model';
import {DataStorageService} from '../../shared/data-storage.service';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MentorshipService {
  mentorshipProfiles: any = null;
  isLoading = new Subject<boolean>();

  constructor(private http: HttpClient, private dataStorageService: DataStorageService, private router: Router) { }

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
    this.http.patch(environment.dbUrl + 'profile/' + loggedProfileID + '/mentorship/' + lookedProfile.mentorshipId + '.json', { isAccepted: isAccepted }).pipe(
      tap(() => this.dataStorageService.fetchMentorshipProfiles())
    ).subscribe();
    this.http.patch(environment.dbUrl + 'profile/' + lookedProfile.profileId + '/mentorship/' + lookedProfileMentorshipID + '.json', { isAccepted: isAccepted }).subscribe()
  }

}
