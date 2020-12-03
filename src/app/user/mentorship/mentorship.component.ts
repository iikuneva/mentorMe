import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
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
  // @ViewChild('btnAccept') btnAccept: ElementRef;
  // @ViewChild('btnReject') btnReject: ElementRef;

  constructor(public mentorshipService: MentorshipService, private dataStorageService: DataStorageService, private renderer: Renderer2) { }

  ngOnInit(): void {
    this.loggedUserProfile = this.dataStorageService.getLoggedUserProfile().getValue();
    if (this.loggedUserProfile.profileId) {
      this.mentorshipService.fetchMentorshipProfiles(this.loggedUserProfile.profileId).subscribe(
        profiles => {
          this.mentorshipProfiles = profiles;
        }
      );
    }
  }

  onAccept(profile: any, event: any) {
    this.mentorshipService.acceptRejectMentorship(this.loggedUserProfile.profileId, true, profile);
    // event.target.disabled = true;
    // let find = Object.values(profile.mentorship).find((obj: any) => obj.profileId === this.profileId)
    // console.log(find)
    // console.log(profile)
  }
  onReject(profile: any, event: any) {
    this.mentorshipService.acceptRejectMentorship(this.loggedUserProfile.profileId, true, profile);
    event.target.disabled = true;
  }

  disableButton(profile: any): Mentorship {
    let obj: Mentorship;
    const mentorships: Mentorship[] = Object.values(profile.mentorship);
    for (let m of mentorships) {
      if (m.profileId === this.loggedUserProfile.profileId) {
        obj = m;
      }
    }
    return obj
  }

  // this.renderer.setAttribute(this.btnAccept.nativeElement, "disabled", "true");
  // this.renderer.setAttribute(this.btnReject.nativeElement, "disabled", "true");
}