import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DataStorageService } from '../../shared/data-storage.service';
import IProfile from '../profile.model';
import { faMapMarkerAlt, faEnvelope, faLink } from '@fortawesome/free-solid-svg-icons';
import { ILoggedUser } from '../auth/auth.model';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profile: IProfile;
  faLocation = faMapMarkerAlt;
  faEmail = faEnvelope;
  faLink = faLink;
  loggedUser: ILoggedUser;
  loggedUserProfile: any;
  loggedUserRole: string = null;
  isOwner: boolean = false;
  isEditMode: boolean = true;
  idMentee: string = null;
  isAlreadyInMentorship: boolean = false;
  hasLoggedUserProfile: boolean = false;
  isLoading: boolean;

  constructor(private dataStorageService: DataStorageService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.dataStorageService.isLoading.subscribe(data => {
      this.isLoading = data
    });
    this.route.params.subscribe((params: Params) => {
      this.profile = this.dataStorageService.getUserProfile();
      this.dataStorageService.getUser().subscribe(user => this.loggedUser = user);

      this.loggedUserProfile = this.dataStorageService.getLoggedUserProfile().getValue();
      if (this.loggedUserProfile) {
        this.loggedUserRole = this.loggedUserProfile.role;
      }
      this.hasLoggedUserProfile = !!this.loggedUserProfile;

      if (this.profile.userEmail === this.loggedUser.email) {
        this.isOwner = true;
      }

      if (this.profile.mentorship) {
        this.isAlreadyInMentorship = !!Object.values(this.profile.mentorship).find((obj) => obj.profileId === this.dataStorageService.getLoggedUserProfile().getValue().profileId)
      }
    });
  }

  onEditProfile(): void {
    this.router.navigate(['/profile', this.profile.id, 'edit'], { queryParams: { edit: true } });
  }

  onMentorMe(event): void {
    const idMentor = this.profile.id;
    this.dataStorageService.getLoggedUserProfile().subscribe(id => this.idMentee = id.profileId);
    this.dataStorageService.addToMentorshipArray(this.idMentee, idMentor);
    event.target.disabled = true;
  }

}
