import { Component } from '@angular/core';
import {RegisterForm} from '../_components/register-form/register-form';
import {LoginForm} from '../_components/login-form/login-form';
import {NgOptimizedImage} from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [
    RegisterForm,
    NgOptimizedImage,
    RouterLink
  ],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {

}
