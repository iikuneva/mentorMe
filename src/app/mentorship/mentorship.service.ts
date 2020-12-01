import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MentorshipService {
textValue = new Subject<string>();

  constructor() { }

  getValue() {
    return this.textValue;
  }

  setValue(value) {
    if (value.length > 5){
      this.textValue.error('Attension!')
    }else{
    this.textValue.next(value);
    }
  }
}
