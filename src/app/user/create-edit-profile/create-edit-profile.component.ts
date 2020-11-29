import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { FormArray } from '@angular/forms';
import { CreateEditProfileService } from './create-edit-profile.service';
import { mainModule } from 'process';
import { DataStorageService } from '../../shared/data-storage.service';
import IProfile from '../profile.model'

@Component({
  selector: 'app-create-edit-profile',
  templateUrl: './create-edit-profile.component.html',
  styleUrls: ['./create-edit-profile.component.css']
})
export class CreateEditProfileComponent implements OnInit {
  profileForm: FormGroup;
  selectedOptionRole: string;
  selectedOptionStatus: string;
  isEditMode = false;
  profileId: string;
  profiles: IProfile[];
  profile: IProfile;

  constructor(private fb: FormBuilder, private createEditProfileService: CreateEditProfileService, private route: ActivatedRoute, private router: Router, private dataStorageService: DataStorageService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => this.isEditMode = !!params.edit);

    if (this.isEditMode) {
      this.profileId = this.route.snapshot.params.id;
      this.profile = this.dataStorageService.getUserProfile();
      this.selectedOptionRole = this.profile.main.role;
      this.selectedOptionStatus = this.profile.main.status;
    }
    this.profileForm = this.fb.group({
      main: this.fb.group({
        name: [this.isEditMode? this.profile.main.name : null, Validators.required],
        image: [this.isEditMode? this.profile.main.image : null, Validators.required],
        role: [this.isEditMode? this.profile.main.role : null, Validators.required],
        position: [this.isEditMode? this.profile.main.position : null, Validators.required],
        slogan: [this.isEditMode? this.profile.main.slogan : null, Validators.required],
        status: [this.isEditMode? this.profile.main.status : null, Validators.required]
      }),
      contact: this.fb.group({
        email: [this.isEditMode? this.profile.contact.email : null, Validators.required],
        city: [this.isEditMode? this.profile.contact.city : null, Validators.required],
        links: [this.isEditMode? this.profile.contact.links : null, Validators.required]
      }),
      description: this.fb.group({
        about: [this.isEditMode? this.profile.description.about : null, Validators.required],
        techSkills: [this.isEditMode? this.profile.description.techSkills : null, Validators.required],
        softSkills: [this.isEditMode? this.profile.description.softSkills : null, Validators.required],
        languages: [this.isEditMode? this.profile.description.languages : null, Validators.required],
        interests: [this.isEditMode? this.profile.description.interests : null, Validators.required],
      }),
      userEmail: this.dataStorageService.getUser().email,
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

    // if (this.isEditMode) {
      // this.profiles = this.dataStorageService.getAllProfiles();
      // this.route.params.subscribe((params: Params) => {
      //   this.profile = this.dataStorageService.getProfileById(params.id);
      // this.profileSubscription = this.profile.subscribe((profile) => {
      // this.profile = this.dataStorageService.getProfileById(this.profileId);

      // this.profileId = this.route.snapshot.params.id;
      // this.profile = this.dataStorageService.getProfileById(this.profileId);
      // this.profileForm.setValue = ({
      //   main: {
      //     name: this.profile.main.name,
      //     image: this.profile.main.image,
      //     role: this.profile.main.role,
      //     position: this.profile.main.position,
      //     slogan: this.profile.main.slogan,
      //     status: this.profile.main.status
      //   },
      //   'contact': {
      //     'email': this.profile.contact.email,
      //     'city': this.profile.contact.city,
      //     'links': this.profile.contact.links,
      //   },
      //   'description': {
      //     'about': this.profile.description.about,
      //     'techSkills': this.profile.description.techSkills,
      //     'softSkills': this.profile.description.softSkills,
      //     'languages': this.profile.description.languages,
      //     'interests': this.profile.description.interests,
      //   },
      //   'education': this.profile.education,
      //   'experience': this.profile.experience,
      //   'projects': this.profile.projects,
      //   // this.profileId = profile.id;
      // })
    // }
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
    const profileData: IProfile = this.profileForm.value;
    if (this.isEditMode) {
      this.createEditProfileService.editProfile(this.profileId, profileData);
    } else {
      this.createEditProfileService.createProfile(profileData);
    }
    
  }

  cancel(): void { }

}
