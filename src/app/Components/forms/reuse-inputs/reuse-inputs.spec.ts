import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReuseInputs } from './reuse-inputs';

describe('ReuseInputs', () => {
  let component: ReuseInputs;
  let fixture: ComponentFixture<ReuseInputs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReuseInputs]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReuseInputs);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
