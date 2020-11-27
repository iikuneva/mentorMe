import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditProfileComponent } from './create-edit-profile.component';

describe('CreateEditProfileComponent', () => {
  let component: CreateEditProfileComponent;
  let fixture: ComponentFixture<CreateEditProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateEditProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEditProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
