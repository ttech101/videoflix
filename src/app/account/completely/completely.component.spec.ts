import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletelyComponent } from './completely.component';

describe('CompletelyComponent', () => {
  let component: CompletelyComponent;
  let fixture: ComponentFixture<CompletelyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompletelyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompletelyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
