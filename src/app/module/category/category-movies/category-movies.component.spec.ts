import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryMoviesComponent } from './category-movies.component';

describe('CategoryMoviesComponent', () => {
  let component: CategoryMoviesComponent;
  let fixture: ComponentFixture<CategoryMoviesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryMoviesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CategoryMoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
