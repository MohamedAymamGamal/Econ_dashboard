import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompleteTheLook } from './complete-the-look';

describe('CompleteTheLook', () => {
  let component: CompleteTheLook;
  let fixture: ComponentFixture<CompleteTheLook>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompleteTheLook]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompleteTheLook);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
