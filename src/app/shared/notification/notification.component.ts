import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  
  hideError: boolean = false;

  @Input() message: string;
  
  constructor() { }

  ngOnInit(): void {}

  // onClose(): void {
  //   this.hideError = true;
  // }

}
