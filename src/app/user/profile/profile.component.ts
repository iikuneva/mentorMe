import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import { DataStorageService } from '../../shared/data-storage.service';
import { IProfile } from '../../shared/interfaces/profile';
import { IUser } from '../../shared/interfaces/user';
import { faMapMarkerAlt, faEnvelope, faLink } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: IUser;
  profile: IProfile;
  faLocation = faMapMarkerAlt;
  faEmail = faEnvelope;
  faLink = faLink;
  isOwner = true;

  testmessage: string;

  constructor(private dataStorageService: DataStorageService,  private route: ActivatedRoute,
    private router: Router) {

  }

  ngOnInit(): void {
    this.user = this.dataStorageService.getUser();
    this.profile = this.dataStorageService.getProfile();
  }

  getMessage(message: string) {
    this.testmessage = message
  }

  createProfile(): void {
    this.router.navigate([
      // this.profileId,
      '/profile',
      'create']);
  }

  editProfile(): void {
    this.router.navigate([
      '/profile',
      // this.profileId,
      'edit']);
  }

}
