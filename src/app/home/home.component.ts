import { Component, OnInit } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { ILoggedUser, IUser } from '../user/auth/auth.model';
import IProfile from '../user/profile.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  profiles: IProfile[] = [];
  user: ILoggedUser = null;
  
  constructor(private dataStorageService: DataStorageService) { }

  ngOnInit(): void {
    this.profiles = this.dataStorageService.getAllProfiles();
    this.dataStorageService.getUser().subscribe(user=> this.user = user);
  }

}
