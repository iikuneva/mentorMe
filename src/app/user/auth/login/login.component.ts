import { Component } from '@angular/core';
import { DataStorageService } from '../../../shared/data-storage.service';
import { AuthService } from '../auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  errorMessage: string;

  constructor(private authService: AuthService, private dataStorageService: DataStorageService, private router: Router) { }


  loginHandler(formData) {
    const userForm = {
      email: formData.email,
      password: formData.password
    };
    this.authService.loginUser(userForm).subscribe(
      {
        next: (newUser) => {
          this.dataStorageService.setUser(newUser)
          this.router.navigate(['/home']);
        },
        error: (error) => {
          this.errorMessage = error.error.error.message;
        }
      }
    );

  }

  clearError(): void {
    this.errorMessage = null;
  }
}
