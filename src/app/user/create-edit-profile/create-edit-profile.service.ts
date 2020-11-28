import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import IProfile from '../profile.model'
import { environment } from '../../../environments/environment';
import {AuthService} from '../auth/auth-service.service';
import {DataStorageService} from '../../shared/data-storage.service'

@Injectable({
  providedIn: 'root'
})
export class CreateEditProfileService {
  profile: IProfile = null;

  constructor(private http: HttpClient, private dataStorageService: DataStorageService) { }

  createProfile(profile: IProfile): void {
    const profileBody = {...profile, userEmail: this.dataStorageService.getUser().email}

    this.http.post<{name: string}> (environment.dbUrl + 'profile.json', profileBody).subscribe(newProfile => {
      this.profile = {...profileBody, id: newProfile.name};
    });
  }

  editProfile(){}

}
