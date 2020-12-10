import { Component, Input, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit, OnDestroy {
  
  hideError: boolean = false;

  @Input() message: string;
  
  constructor() { }

  ngOnInit(): void {
    
  }

  onClose(): void {
    this.hideError = true;
    console.log("from onCloseBtn " + this.hideError )

  }

 ngOnDestroy(): void {
    this.hideError = false;
    console.log("from destroy " + this.hideError )
  }


}
