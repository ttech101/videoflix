import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestPasswortComponent } from './rest-passwort.component';

describe('RestPasswortComponent', () => {
  let component: RestPasswortComponent;
  let fixture: ComponentFixture<RestPasswortComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RestPasswortComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RestPasswortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
