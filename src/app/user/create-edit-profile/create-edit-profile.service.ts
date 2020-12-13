import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import IProfile from '../profile.model'
import { environment } from '../../../environments/environment';
import { DataStorageService } from '../../shared/data-storage.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CreateEditProfileService {
  id: string;
  profile: IProfile = null;
  errorMessage: string = '';

  constructor(private http: HttpClient, private dataStorageService: DataStorageService, private router: Router) { }

  createProfile(profile: IProfile): void {
    const profileBody = { ...profile, userEmail: this.dataStorageService.getUser().getValue().email }

    this.http.post<{ name: string }>(environment.dbUrl + 'profile.json', profileBody).subscribe(
      {
        next: (newProfile) => {
          this.profile = { ...profileBody, id: newProfile.name };
          this.dataStorageService.loggedUserProfile.next({ profileId: newProfile.name, role: profile.main.role });
          this.router.navigate([`/profile/${newProfile.name}`]);
        },
        error: (error) => { console.log(error) }
      }
    );
  }

  editProfile(id: string, editProfile: IProfile) {
    this.http.patch(environment.dbUrl + 'profile/' + id + '.json', editProfile).subscribe(
      {
        next: (data) => {
          this.router.navigate([`/profile/${id}`]);
        },
        error: (error) => { console.log(error) }
      }
    )
  }

}
