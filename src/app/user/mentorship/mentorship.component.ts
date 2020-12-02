import { Component, OnInit } from '@angular/core';
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

  constructor(public mentorshipService: MentorshipService, private dataStorageService: DataStorageService) { }

  ngOnInit(): void {
    this.profileId = this.dataStorageService.getLoggedUserProfileId().getValue();
    this.mentorshipProfiles = this.mentorshipService.fetchMentorshipProfiles(this.profileId);
  }

  // onSubmit(value) {
  //   this.mentorshipService.setValue(value);
  //   console.log(this.mentorshipService.getValue());
  // }

  onAccept() { }
  onReject() { }

}
