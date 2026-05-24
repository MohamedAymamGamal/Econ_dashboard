import { ChangeDetectorRef, Component, OnInit, OnDestroy } from '@angular/core';
import { Button } from 'primeng/button';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputOtp } from 'primeng/inputotp';
import { CommonModule } from '@angular/common';
import { API } from '../../../../service/api';
import { Router } from '@angular/router';
import { Toast } from '../../../../service/toast';

@Component({
  selector: 'app-email-verfication-form',
  standalone: true,
  imports: [
    Button,
    FormsModule,
    InputOtp,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './email-verfication-form.html',
  styleUrl: './email-verfication-form.css',
})
export class EmailVerficationForm implements OnInit, OnDestroy {
  protected count = 60 * 10;
  protected isSubmitting = false;
  private intervalId: any = null;

  public form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private api: API,
    private toast: Toast,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  public ngOnInit(): void {
    this.otpForm();
    this.startCounter();
  }



  public otpForm(): void {
    this.form = this.fb.group({
      Otpcode: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(4),
          Validators.pattern(/^\d+$/)
        ]
      ],
    });
  }

  public startCounter(): void {
    this.count = 60 * 10; // Reset counter value back to 10 mins on manual re-trigger
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }

    this.intervalId = setInterval(() => {
      this.count--;
      if (this.count <= 0) {
        this.count = 0;
        clearInterval(this.intervalId);
        this.intervalId = null;
      }
      this.cdr.markForCheck();
    }, 1000);
  }

  public resendOTP(): void {
    if (this.count > 0 || this.isSubmitting) return;

    this.api.index('account/active-account').subscribe({
      next: () => {
        this.toast.success('A new activation code has been issued.', 'Code Resent');
        this.startCounter();
      },
      error: (err) => {
        this.toast.error(err.error?.message || 'Failed to resend activation token.');
      }
    });
  }

  public submitOtp(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    const payload = { OtpCode: this.form.value.Otpcode };

    this.api.store('account/active-account', payload).subscribe({
      next: (res: any) => {
        this.toast.success(res.message || 'Account verification complete.', 'Account Activated');
        this.router.navigate(['/authentication/login']);
      },
      error: (err) => {
        this.toast.error(err.error?.message || 'Something went wrong');
        this.isSubmitting = false;
      }
    });
  }

  // Helper method for your template view formatting (e.g., 10:00)
  protected get formatTime(): string {
    const minutes = Math.floor(this.count / 60);
    const seconds = this.count % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }

    public ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
