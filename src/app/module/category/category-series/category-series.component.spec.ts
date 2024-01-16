import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorySeriesComponent } from './category-series.component';

describe('CategorySeriesComponent', () => {
  let component: CategorySeriesComponent;
  let fixture: ComponentFixture<CategorySeriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategorySeriesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CategorySeriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
