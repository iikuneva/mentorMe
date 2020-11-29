import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import { DataStorageService } from '../../shared/data-storage.service';
import IProfile from '../profile.model';
import {ILoggedUser} from '../auth/auth.model';
import { faMapMarkerAlt, faEnvelope, faLink } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  // user: ILoggedUser;
  profile: IProfile;
  faLocation = faMapMarkerAlt;
  faEmail = faEnvelope;
  faLink = faLink;
  isOwner = true;
  isCreatedProfile = false;
  isEditMode = true;
  // userProfileId: string = null;

  constructor(private dataStorageService: DataStorageService,  private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
    this.profile =this.dataStorageService.getUserProfile();
    this.isCreatedProfile = true;
      // this.dataStorageService.getLoggedUserProfileId().subscribe(id => this.userProfileId = id);
    });
  }

  // createProfile(): void {
  //   this.router.navigate(['/profile', 'create']);
  // }

  editProfile(): void {
    this.router.navigate(['/profile', this.profile.id, 'edit'], {queryParams:{edit: true}});
  }

}
