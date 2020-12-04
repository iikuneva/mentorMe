import { Component, OnInit } from '@angular/core';
import { DataStorageService } from '../../shared/data-storage.service';
import { IUser, ILoggedUser } from '../../user/auth/auth.model';
import {AuthService} from '../../user/auth/auth-service.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userProfileId: string;
  user: ILoggedUser;

  constructor(private authService: AuthService, private dataStorageService: DataStorageService) { }

  ngOnInit(): void {
    this.dataStorageService.getLoggedUserProfile().subscribe(id => id === null ? this.userProfileId = null : this.userProfileId = id.profileId);
    this.dataStorageService.getUser().subscribe(user=> this.user = user);
  }

  logout() {
    this.authService.logout();
  }

}
