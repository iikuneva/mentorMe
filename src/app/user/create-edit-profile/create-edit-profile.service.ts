import { Injectable, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import IProfile from '../profile.model'
import { environment } from '../../../environments/environment';
import { AuthService } from '../auth/auth-service.service';
import { DataStorageService } from '../../shared/data-storage.service';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CreateEditProfileService  {
  id: string;
  profile: IProfile = null;

  constructor(private http: HttpClient, private dataStorageService: DataStorageService, private router: Router ) { }

  createProfile(profile: IProfile): void {
    const profileBody = { ...profile, userEmail: this.dataStorageService.getUser().getValue().email }

    this.http.post<{ name: string }>(environment.dbUrl + 'profile.json', profileBody).subscribe(newProfile => {
      this.profile = { ...profileBody, id: newProfile.name };
      this.router.navigate([`/profile/${newProfile.name}`]);
    });
  }

  editProfile(id: string, editProfile: IProfile) {
    this.http.put(environment.dbUrl + 'profile/' + id + '.json', editProfile).subscribe(data => {
      this.router.navigate([`/profile/${id}`]);
    })
  }

}
