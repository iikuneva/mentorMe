import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { FormArray } from '@angular/forms';
import {CreateEditProfileService} from './create-edit-profile.service';

@Component({
  selector: 'app-create-edit-profile',
  templateUrl: './create-edit-profile.component.html',
  styleUrls: ['./create-edit-profile.component.css']
})
export class CreateEditProfileComponent implements OnInit {
  profileForm: FormGroup;
  selectedOption: string;
  isCreateMode: false;
  profileId: string;

  constructor(private fb: FormBuilder, private createEditProfileService: CreateEditProfileService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    // this.route.queryParams.subscribe(params => this.isRegisterMode = params.register);
    this.profileForm = this.fb.group({
      main: this.fb.group({
        name: ['', Validators.required],
        image: ['', Validators.required],
        role: ['', Validators.required],
        position: ['', Validators.required],
        slogan: ['', Validators.required],
        status: ['', Validators.required]
      }),
      contact: this.fb.group({
        email: ['', Validators.required],
        city: ['', Validators.required],
        links: ['', Validators.required]
      }),
      description: this.fb.group({
        about: ['', Validators.required],
        techSkills: ['', Validators.required],
        softSkills: ['', Validators.required],
        languages: ['', Validators.required],
        interests: ['', Validators.required],
      }),
      education: this.fb.array([
        this.fb.control('')
      ]),
      experience: this.fb.array([
        this.fb.control('')
      ]),
      projects: this.fb.array([
        this.fb.control('')
      ]),
    });
  }

  get education() {
    return this.profileForm.get('education') as FormArray;
  }

  get experience() {
    return this.profileForm.get('experience') as FormArray;
  }

  get projects() {
    return this.profileForm.get('projects') as FormArray;
  }

  addEducation() {
    this.education.push(this.fb.control(''));
  }

  deleteEducation(index: number) {
    (<FormArray>this.profileForm.get('education')).removeAt(index);
  }

  addExperience() {
    this.experience.push(this.fb.control(''));
  }

  deleteExperience(index: number) {
    (<FormArray>this.profileForm.get('experience')).removeAt(index);
  }

  addProject() {
    this.projects.push(this.fb.control(''));
  }

  deleteProject(index: number) {
    (<FormArray>this.profileForm.get('project')).removeAt(index);
  }

  onSubmit(): void {
    // console.log(this.profileForm)
    this.createEditProfileService.createProfile(this.profileForm.value);
    this.router.navigate(['/profile']);
   }

  cancel(): void { }

}
