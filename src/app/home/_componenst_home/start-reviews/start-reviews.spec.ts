import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartReviews } from './start-reviews';

describe('StartReviews', () => {
  let component: StartReviews;
  let fixture: ComponentFixture<StartReviews>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StartReviews]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StartReviews);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
