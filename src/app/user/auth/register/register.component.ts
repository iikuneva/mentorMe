import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth-service.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, AfterViewInit {

  @ViewChild('f') form: NgForm;
  passMatch = false;

  constructor(private authService: AuthService) { }

  ngOnInit() { }

  ngAfterViewInit(): void {
    // this.form.valueChanges.subscribe(console.log)

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
  // ngSubmit(){}

  registerHandler() {
    const userForm = {
      email: this.form.value.email,
      password: this.form.value.pass.password
    };
    this.authService.registerUser(userForm);
  }
}
