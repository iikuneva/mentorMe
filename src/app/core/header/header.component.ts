import { Component, OnInit } from '@angular/core';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import {AuthService} from '../../user/auth/auth-service.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userProfileId: string = null;

  constructor(private authService: AuthService, private dataStorageService: DataStorageService) { }

  ngOnInit(): void {
    this.dataStorageService.getLoggedUserProfileId().subscribe(id => this.userProfileId = id);
  }
  logout() {
    this.authService.logout();
  
  }

}
