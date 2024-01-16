import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryForYouComponent } from './category-for-you.component';

describe('CategoryForYouComponent', () => {
  let component: CategoryForYouComponent;
  let fixture: ComponentFixture<CategoryForYouComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryForYouComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CategoryForYouComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
