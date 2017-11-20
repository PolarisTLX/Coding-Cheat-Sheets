import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePasswordReactiveComponent } from './change-password-reactive.component';

describe('ChangePasswordReactiveComponent', () => {
  let component: ChangePasswordReactiveComponent;
  let fixture: ComponentFixture<ChangePasswordReactiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangePasswordReactiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangePasswordReactiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
