import { Component, OnInit } from '@angular/core';
import { Data } from '@angular/router';
import { DataStorageService } from './shared/data-storage.service';
import { AuthService } from './user/auth/auth-service.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'mentorme';
  isLoading: boolean;
  constructor(private authService: AuthService, private dataStorageService: DataStorageService) { }

  ngOnInit(): void {
    this.dataStorageService.isLoading.subscribe(data => {
      this.isLoading = data
    });
    this.authService.autoLogin();
  }

}
