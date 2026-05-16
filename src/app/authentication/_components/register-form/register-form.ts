import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Toast} from '../../../../service/toast';
import {ReuseInputs} from '../../../Components/forms/reuse-inputs/reuse-inputs';
import {SubmitButtonComponent} from '../../../Components/submit-button/submit-button';
import {confirmPassword} from '../../../validator/confirm-password';

@Component({
  selector: 'app-register-form',
  imports: [
    ReactiveFormsModule,
    ReuseInputs,
    SubmitButtonComponent
  ],
  templateUrl: './register-form.html',
  styleUrl: './register-form.css',
})
export class RegisterForm implements OnInit {
    form!: FormGroup;
    constructor(private fb: FormBuilder,private toaster:Toast) {
    }

  ngOnInit(): void {
        this.form = this.fb.group({
          username: ['', [Validators.required,Validators.minLength(3),Validators.maxLength(20)]],
          displayName: ['', [Validators.required,Validators.minLength(3),Validators.maxLength(20)]],
          email: ['', [Validators.required, Validators.email]],
          password: ['', [Validators.required, Validators.minLength(8)]],
          confirmPassword: [
            '',
            [Validators.required, Validators.minLength(8), confirmPassword],
          ],
        })
    }

}
