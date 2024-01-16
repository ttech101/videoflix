import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryYourMoviesComponent } from './category-your-movies.component';

describe('CategoryYourMoviesComponent', () => {
  let component: CategoryYourMoviesComponent;
  let fixture: ComponentFixture<CategoryYourMoviesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryYourMoviesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CategoryYourMoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
