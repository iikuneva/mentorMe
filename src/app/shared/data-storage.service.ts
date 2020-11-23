import { Injectable } from '@angular/core';
import { IProfile } from './interfaces/profile';
import { IUser } from './interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  private user: IUser = {
    id: '1',
    email: 'nikolatesla1@abv.bg',
    password: '123456',
  }

  private profile: IProfile = {
   ...this.user,
    name: 'Nikola Tesla',
    role: 'mentor',
    city: 'Sofia',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyuOxK3QU-kferuV90iFouS85JjjeYvGE5Fw&usqp=CAU',
    isOpen: true,
    links: 'github.com/iikuneva, fb/jdfdjfhdk',
    position: 'JavaScript developer',
    slogan: 'Be the first',
    education: 'Informatics, Sofia university',
    experience: 'Musala Soft',
    techSkills: 'JavaScript, Java, Angular',
    softSkills: 'talkative, team worker',
    projects: 'Google, LinkedIn',
    languages: 'spanish, english',
    interests: 'maths, skiing',
    about: 'I have a great teaching skills and I am experianced with Javascript. I want to share my knowledges with motivated people ',
    rating: 5,
    mentorship: ['Maria Kuri', 'Albert Ainshtain']
  }

  constructor() { }

  getUser(): IUser {
    return this.user;
  }

  getProfile(): IProfile {
    return this.profile;
  }

}
