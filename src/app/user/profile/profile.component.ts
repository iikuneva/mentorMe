import { Component, OnInit } from '@angular/core';
import { DataStorageService } from '../../shared/data-storage.service';
import { IProfile } from '../../shared/interfaces/profile';
import { IUser } from '../../shared/interfaces/user';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: IUser;
  profile: IProfile;
  faLocation = faMapMarkerAlt;

  constructor(private dataStorageService: DataStorageService) {

  }

  ngOnInit(): void {
    this.user = this.dataStorageService.getUser();
    this.profile = this.dataStorageService.getProfile();
  }

}
