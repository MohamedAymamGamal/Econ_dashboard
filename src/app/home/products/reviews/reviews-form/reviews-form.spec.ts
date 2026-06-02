import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewsForm } from './reviews-form';

describe('ReviewsForm', () => {
  let component: ReviewsForm;
  let fixture: ComponentFixture<ReviewsForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReviewsForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewsForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
