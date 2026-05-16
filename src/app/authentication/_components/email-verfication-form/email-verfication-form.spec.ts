import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailVerficationForm } from './email-verfication-form';

describe('EmailVerficationForm', () => {
  let component: EmailVerficationForm;
  let fixture: ComponentFixture<EmailVerficationForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmailVerficationForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmailVerficationForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
