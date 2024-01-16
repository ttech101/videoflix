import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryNewMoviesComponent } from './category-new-movies.component';

describe('CategoryNewMoviesComponent', () => {
  let component: CategoryNewMoviesComponent;
  let fixture: ComponentFixture<CategoryNewMoviesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryNewMoviesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CategoryNewMoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
