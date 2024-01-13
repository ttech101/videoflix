import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WatchlistbarComponent } from './watchlistbar.component';

describe('WatchlistbarComponent', () => {
  let component: WatchlistbarComponent;
  let fixture: ComponentFixture<WatchlistbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WatchlistbarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WatchlistbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
