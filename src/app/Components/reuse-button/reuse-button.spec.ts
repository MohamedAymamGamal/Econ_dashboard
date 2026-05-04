import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReuseButton } from './reuse-button';

describe('ReuseButton', () => {
  let component: ReuseButton;
  let fixture: ComponentFixture<ReuseButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReuseButton]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReuseButton);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
