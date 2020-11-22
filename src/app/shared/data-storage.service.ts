import { Injectable } from '@angular/core';
import { IBase } from './interfaces/base';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  private user: IBase = {
    id: '1',
    email: 'nikolatesla1@abv.bg',
    name: 'Nikola Tesla',
    password: '123456',
    role: 'mentor',
    city: 'Sofia'
  }
  constructor() { }

  getUser(): IBase {
    return this.user;
  }

}
