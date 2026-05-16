import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormActionService } from '../../../../service/form-action.service';
import { Router } from '@angular/router';
import { TextField } from '../../../Components/text-field/text-field';
import { Button } from 'primeng/button';
import { ReuseInputs } from '../../../Components/forms/reuse-inputs/reuse-inputs';

import {SubmitButtonComponent} from '../../../Components/submit-button/submit-button';

@Component({
  selector: 'app-login-form',
  imports: [
    ReactiveFormsModule,

    ReuseInputs,

    SubmitButtonComponent,
  ],
  templateUrl: './login-form.html',
  styleUrl: './login-form.css',
})
export class LoginForm {
  private fb = inject(FormBuilder);
  private formActionService = inject(FormActionService);
  private router = inject(Router);

  isSubmitting = false;

  // FIX: Initialize immediately on declaration so the template never reads 'undefined'
  form: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],

  }

  );


  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;


  }
}
