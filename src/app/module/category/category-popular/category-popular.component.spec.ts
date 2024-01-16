import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryPopularComponent } from './category-popular.component';

describe('CategoryPopularComponent', () => {
  let component: CategoryPopularComponent;
  let fixture: ComponentFixture<CategoryPopularComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryPopularComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CategoryPopularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
