import { Component, OnInit } from '@angular/core';

import { environment } from '../../../../environments/environment';
import { AuthService } from '../auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  loginHandler(formData) {
    const userForm = {
      email: formData.email,
      password: formData.password
    };
    // this.isLoading = true;
    this.authService.loginUser(userForm);
  }


}
