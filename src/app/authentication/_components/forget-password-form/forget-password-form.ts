import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Button } from "primeng/button";
import { StepperModule } from "primeng/stepper";
import { API } from '../../../../service/api';
import { Toast } from '../../../../service/toast';
import { CommonModule } from '@angular/common';
import { ReuseInputs } from "../../../Components/forms/reuse-inputs/reuse-inputs";
import { confirmPassword } from '../../../validator/confirm-password';
@Component({
  selector: 'app-forget-password-form',
  imports: [Button, CommonModule, ReuseInputs,ReactiveFormsModule],
  templateUrl: './forget-password-form.html',
  styleUrl: './forget-password-form.css',
  standalone: true,
})
export class ForgetPasswordForm implements OnInit {
  value: number = 1;
  form!: FormGroup;
  isSubmitting = false;
  email: string = '';
  OtpCode: number = null!;
  Token: string = '';

  constructor(
    private fb: FormBuilder,
    private api: API,
    private router: Router,
    private toast: Toast
  ) {

  }

  ngOnInit() {
    this.formInit();
  }


  formInit() {
    if(this.value === 1){
      this.form = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
      });
    }else if(this.value === 2){
      this.form = this.fb.group({
        OtpCode: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]],
      });
    }else if(this.value === 3){
      this.form = this.fb.group({
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
        }, {
          validators: confirmPassword,
      });
    }
  }


  sendOTP() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.api.store('account/forget-password',
      { email: this.form.value.email }).subscribe({
      next: (res: any) => {
        this.toast.success(res.message, 'OTP Sent');

        this.email = this.form.value.email;
        this.value = 2;
        this.formInit();
      },
      error: (err) => {
        this.toast.error(err.error.message || 'Something went wrong');
      }
    });
  }


  verifyOTP() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.api.store('account/verify-otp',
      {  email: this.email,
         OtpCode: this.form.value.OtpCode
        }).subscribe({
      next: (res: any) => {
        this.Token = res.token;
        this.OtpCode = this.form.value.OtpCode;
        localStorage.setItem('reset_token', this.Token);
        this.value = 3;

        this.formInit();
        this.toast.success(res.message, 'OTP Verified');

      },
      error: (err) => {
        this.toast.error(err.error.message || 'Something went wrong');
      }
    })
  }

  resetPassword() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const storedToken = localStorage.getItem('reset_token');
    const token = storedToken || this.Token;

     const data = {
      email: this.email,
      password: this.form.value.password,
    };
    this.api.store('account/reset-password',
      { email: this.email, password: this.form.value.password, token: token }).subscribe({
      next: (res: any) => {
        this.toast.success(res.message, 'Password Reset Successful');
        localStorage.removeItem('reset_token');
        this.backToLogin();
      },
      error: (err) => {
        this.toast.error(err.error.message || 'Something went wrong');
      }
    })
  }

backToLogin() {
    this.router.navigateByUrl('/authentication/login');
  }

 nextStep() {
    if (this.value === 1) {
      this.sendOTP();
    } else if (this.value === 2) {
      this.verifyOTP();
    } else if (this.value === 3) {
      this.resetPassword();
    }
  }

}
