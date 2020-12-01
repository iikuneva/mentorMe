import { Component, OnInit } from '@angular/core';
import { MentorshipService } from './mentorship.service';
import {map, catchError} from 'rxjs/operators'
import { of } from 'rxjs';

@Component({
  selector: 'app-mentorship',
  templateUrl: './mentorship.component.html',
  styleUrls: ['./mentorship.component.css']
})
export class MentorshipComponent implements OnInit {
  myValue: string;
  yourValue: string;
  constructor(public mentorshipService: MentorshipService) { }

  ngOnInit(): void {
     this.mentorshipService.getValue().pipe(catchError(error => {return of(error)}), map(nextValu => nextValu + ' transformed')).subscribe((nextValue) => {

       this.myValue = nextValue;

     }, 
     (err) => { this.myValue = 'error message' + err}
     )



     
     this.mentorshipService.getValue().subscribe((nextValue) => {
      if (!nextValue){
         this.yourValue = 'Hello'
       }else{
       this.yourValue = nextValue;
       }
     })

  }

  onSubmit(value) {
    this.mentorshipService.setValue(value);
    console.log(this.mentorshipService.getValue());
  }

}
