import { Component, Input, Output, OnInit } from '@angular/core';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  
  @Output() hideError = new Subject<boolean>();
  
  @Input() message: string;
  
  constructor() { }

  ngOnInit(): void {}

  onClose(): void {
    this.hideError.next(true);
  }

}
