import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterPasswortComponent } from './enter-passwort.component';

describe('EnterPasswortComponent', () => {
  let component: EnterPasswortComponent;
  let fixture: ComponentFixture<EnterPasswortComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnterPasswortComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EnterPasswortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
