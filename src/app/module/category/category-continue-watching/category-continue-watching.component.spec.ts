import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryContinueWatchingComponent } from './category-continue-watching.component';

describe('CategoryContinueWatchingComponent', () => {
  let component: CategoryContinueWatchingComponent;
  let fixture: ComponentFixture<CategoryContinueWatchingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryContinueWatchingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CategoryContinueWatchingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
