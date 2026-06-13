import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Toast } from '../../../../service/toast';
import { ReuseInputs } from '../../../Components/forms/reuse-inputs/reuse-inputs';
import { SubmitButtonComponent } from '../../../Components/submit-button/submit-button';
import { confirmPassword } from '../../../validator/confirm-password';
import { ThemeService } from 'ngxsmk-tel-input';
import { Message } from 'primeng/message';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { SelectModule } from 'primeng/select';
import { COUNTRY_PHONE_RULES, nativePhoneValidator } from '../../../validator/nativePhoneValidator';
import { API } from '../../../../service/api';
import { Router } from '@angular/router';
import { ButtonModule } from "primeng/button";
@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ReuseInputs,
    Message,
    CommonModule,
    SelectModule,
    NgOptimizedImage,
    ButtonModule
],
  templateUrl: './register-form.html',
  styleUrl: './register-form.css',
})
export class RegisterForm implements OnInit {
  form!: FormGroup;
  countries = COUNTRY_PHONE_RULES;
  currentPlaceholder = 'Select a country first';
  isSubmitting = false
  constructor(
    private fb: FormBuilder,
    private toaster: Toast,
    private themeService: ThemeService,
    private api: API,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group(
      {
        username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
        displayName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
        email: ['', [Validators.required, Validators.email]],
        country: ['SA', [Validators.required]],
        phoneNumber: ['', [Validators.required, nativePhoneValidator('country')]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
      },
      {
        validators: confirmPassword,
      },
    );

    this.updatePlaceholder(this.form.get('country')?.value);

    this.form.get('country')?.valueChanges.subscribe((code) => {
      this.updatePlaceholder(code);
      this.form.get('phoneNumber')?.updateValueAndValidity();
    });


  }

 onSubmit(): void {
    this.form.markAllAsTouched();
    if (this.form.invalid) return;

    this.isSubmitting = true;
    this.api.store('account/register', this.form.value).subscribe({
      next: () => {
        sessionStorage.setItem('pendingVerificationEmail', this.form.value.email);
        this.router.navigate(['/authentication/email-verification']);
      },
      error: (err) => {
        this.toaster.error(err.error?.message || 'Registration failed.');
        this.isSubmitting = false;
      },
    });
  }



  updatePlaceholder(countryCode: string) {
    const target = this.countries.find((c) => c.code === countryCode);
    this.currentPlaceholder = target ? target.placeholder : '';
  }
}
