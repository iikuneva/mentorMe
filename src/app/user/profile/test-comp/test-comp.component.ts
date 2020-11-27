import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {Subject} from 'rxjs';
import { IProfile } from '../../../shared/interfaces/profile';

@Component({
  selector: 'app-test-comp',
  templateUrl: './test-comp.component.html',
  styleUrls: ['./test-comp.component.css']
})
export class TestCompComponent implements OnInit {

  @Input() title: string;

  @Output() message = new Subject<string>();
  constructor() {}

  ngOnInit(): void {
  }

  generateValue(): void {
    this.message.next(this.title);
  }

  emptyValue(){
    this.message.next('');
  }

}


