import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {FormActionService} from '../../../../service/form-action.service';
import {Router} from '@angular/router';
import {TextField} from '../../../Components/text-field/text-field';
import {Button} from 'primeng/button';
import {ReuseInputs} from '../../../Components/forms/reuse-inputs/reuse-inputs';

@Component({
  selector: 'app-login-form',
  imports: [
    ReactiveFormsModule,
    Button,
    TextField,
    ReuseInputs,
  ],
  templateUrl: './login-form.html',
  styleUrl: './login-form.css',
})
export class LoginForm  {
  isSubmitting = false;
  form!: FormGroup;

    constructor(
      private fb: FormBuilder,
    ) {
      this.form = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
      });

      // this.loadingService.loading$.subscribe((isLoading) => {
      //   this.isSubmitting = isLoading;
      // });
    }

  //
  // submit() {
  //   this.formActionService.execute('create', 'login', this.form.value, undefined, (res) => {
  //     localStorage.setItem('tenant_id', res.tenant_id as string);
  //
  //   });
  // }



}

