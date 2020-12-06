import { Component,  OnInit, Renderer2 } from '@angular/core';
import { MentorshipService } from './mentorship.service';
import { DataStorageService } from '../../shared/data-storage.service';
import { Mentorship } from '../profile.model';

@Component({
  selector: 'app-mentorship',
  templateUrl: './mentorship.component.html',
  styleUrls: ['./mentorship.component.css']
})
export class MentorshipComponent implements OnInit {
  loggedUserProfile: { profileId: string, role: string };
  mentorshipProfiles: any;
  mentorshipId: string;
  disableButtons: boolean = false;

  constructor(public mentorshipService: MentorshipService, private dataStorageService: DataStorageService, private renderer: Renderer2) { }

  ngOnInit(): void {
    this.loggedUserProfile = this.dataStorageService.getLoggedUserProfile().getValue();
    if(this.loggedUserProfile?.profileId){
        this.mentorshipService.fetchMentorshipProfiles(this.loggedUserProfile.profileId).subscribe(
          profiles => this.mentorshipProfiles = profiles
            );
    }
  }

  onAccept(profile: any) {
    this.mentorshipService.acceptRejectMentorship(this.loggedUserProfile.profileId, true, profile);
    this.disableButtons = true;
  }
  onReject(profile: any) {
    this.mentorshipService.acceptRejectMentorship(this.loggedUserProfile.profileId, true, profile);
    this.disableButtons = true;
  }

  disableButton(profile: any): Mentorship {
    let obj: Mentorship;
    const mentorships: Mentorship[] = Object.values(profile.mentorship);
    for (let m of mentorships) {
      if (m.profileId === this.loggedUserProfile.profileId) {
        obj = m;
      }
    }
    return obj;
  }
  
}