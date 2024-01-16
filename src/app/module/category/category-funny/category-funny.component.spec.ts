import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryFunnyComponent } from './category-funny.component';

describe('CategoryFunnyComponent', () => {
  let component: CategoryFunnyComponent;
  let fixture: ComponentFixture<CategoryFunnyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryFunnyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CategoryFunnyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
