import { Component, OnInit } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import IProfile from '../user/profile.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  profiles: IProfile[] = [];
  
  constructor(private dataStorageService: DataStorageService) { }

  ngOnInit(): void {
    this.profiles = this.dataStorageService.getAllProfiles();
  }

}
