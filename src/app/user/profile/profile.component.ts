import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataStorageService } from '../../shared/data-storage.service';
import IProfile from '../profile.model';
import { faMapMarkerAlt, faEnvelope, faLink } from '@fortawesome/free-solid-svg-icons';
import { ILoggedUser } from '../auth/auth.model';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {
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
  userSubscription: Subscription;
  isOpen: boolean;

  constructor(private dataStorageService: DataStorageService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.dataStorageService.isLoading.subscribe(data => {
      this.isLoading = data
    });

    this.userSubscription = this.dataStorageService.getLoggedUserProfile().subscribe(user => {
      this.loggedUserProfile = user
    });


    this.profile = this.dataStorageService.getUserProfile();

    this.dataStorageService.getUser().subscribe(user => this.loggedUser = user);

    if (this.loggedUserProfile?.profileId) {
      this.hasLoggedUserProfile = true;
    } else {
      this.hasLoggedUserProfile = false;
    }


    if (this.loggedUserProfile?.role) {
      this.loggedUserRole = this.loggedUserProfile.role;
    }

    if (this.profile.userEmail === this.loggedUser.email) {
      this.isOwner = true;
    }

    if (this.profile.mentorship && this.hasLoggedUserProfile) {
      this.isAlreadyInMentorship = !!Object.values(this.profile.mentorship).find((obj) => obj.profileId === this.dataStorageService.getLoggedUserProfile().getValue().profileId)
    }

    if (this.profile.main.status === 'Currently Open for mentorship') {
      this.isOpen = true;
    }
  }

  onEditProfile(): void {
    this.router.navigate(['/profile', this.profile.id, 'edit'], { queryParams: { edit: true } });
  }

  onMentorMe(event): void {
    const idMentor = this.profile.id;
    this.dataStorageService.addToMentorshipArray(this.loggedUserProfile.profileId, idMentor);
    event.target.disabled = true;
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

}
