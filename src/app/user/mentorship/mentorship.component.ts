import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { MentorshipService } from './mentorship.service';
import { DataStorageService } from '../../shared/data-storage.service';

@Component({
  selector: 'app-mentorship',
  templateUrl: './mentorship.component.html',
  styleUrls: ['./mentorship.component.css']
})
export class MentorshipComponent implements OnInit {
  profileId: string;
  mentorshipProfiles: any;
  mentorshipId: string;
  // @ViewChild('btnAccept') btnAccept: ElementRef;
  // @ViewChild('btnReject') btnReject: ElementRef;

  constructor(public mentorshipService: MentorshipService, private dataStorageService: DataStorageService, private renderer: Renderer2) { }

  ngOnInit(): void {
    this.profileId = this.dataStorageService.getLoggedUserProfileId().getValue();
    this.mentorshipProfiles = this.mentorshipService.fetchMentorshipProfiles(this.profileId);
  }

  onAccept(profile:any) {
   this.mentorshipService.acceptRejectMentorship(this.profileId, true, profile);

   }
  onReject() { }

  disableButton(profile): void{
    // this.renderer.setAttribute(this.btnAccept.nativeElement, "disabled", "true");
    // this.renderer.setAttribute(this.btnReject.nativeElement, "disabled", "true");
  }

}
