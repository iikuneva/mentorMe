import { Component, OnInit } from '@angular/core';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { IBase } from 'src/app/shared/interfaces/base';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: IBase;
  constructor(private dataStorageService: DataStorageService) {

   }

  ngOnInit(): void {
    this.user = this.dataStorageService.getUser();
  }

}
