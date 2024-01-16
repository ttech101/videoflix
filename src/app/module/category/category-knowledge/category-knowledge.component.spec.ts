import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryKnowledgeComponent } from './category-knowledge.component';

describe('CategoryKnowledgeComponent', () => {
  let component: CategoryKnowledgeComponent;
  let fixture: ComponentFixture<CategoryKnowledgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryKnowledgeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CategoryKnowledgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
