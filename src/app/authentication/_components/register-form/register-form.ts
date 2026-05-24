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
@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ReuseInputs,
    SubmitButtonComponent,
    Message,
    CommonModule,
    SelectModule,
    NgOptimizedImage,
  ],
  templateUrl: './register-form.html',
  styleUrl: './register-form.css',
})
export class RegisterForm implements OnInit {
  form!: FormGroup;
  countries = COUNTRY_PHONE_RULES;
  currentPlaceholder = 'Select a country first';

  constructor(
    private fb: FormBuilder,
    private toaster: Toast,
    private themeService: ThemeService,
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


  updatePlaceholder(countryCode: string) {
    const target = this.countries.find((c) => c.code === countryCode);
    this.currentPlaceholder = target ? target.placeholder : '';
  }
}
