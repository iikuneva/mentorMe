import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { AuthService } from '../auth-service.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, AfterViewInit {

  @ViewChild('f') form: NgForm;
  passMatch = false;
  errorMessage: string;

  constructor(private authService: AuthService, private dataStorageService: DataStorageService, private router: Router) { }

  ngOnInit() { }

  ngAfterViewInit(): void {
    this.form.valueChanges.subscribe(f => {
      if (!f.pass) {
        this.passMatch = false;
      } else if (f.pass.password && f.pass.repeatPassword) {
        this.passMatch = f.pass.password === f.pass.repeatPassword
      } else {
        this.passMatch = false;
      }
    })

  }

  registerHandler() {
    const userForm = {
      email: this.form.value.email,
      password: this.form.value.pass.password
    };
    this.authService.registerUser(userForm).subscribe(
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
}
