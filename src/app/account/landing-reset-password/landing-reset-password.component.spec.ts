import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingResetPasswordComponent } from './landing-reset-password.component';

describe('LandingResetPasswordComponent', () => {
  let component: LandingResetPasswordComponent;
  let fixture: ComponentFixture<LandingResetPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LandingResetPasswordComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LandingResetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
