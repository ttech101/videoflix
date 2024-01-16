import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryNatureComponent } from './category-nature.component';

describe('CategoryNatureComponent', () => {
  let component: CategoryNatureComponent;
  let fixture: ComponentFixture<CategoryNatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryNatureComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CategoryNatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
