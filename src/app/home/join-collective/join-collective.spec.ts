import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinCollective } from './join-collective';

describe('JoinCollective', () => {
  let component: JoinCollective;
  let fixture: ComponentFixture<JoinCollective>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JoinCollective]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JoinCollective);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
