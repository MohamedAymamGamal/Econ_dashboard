import { Component } from '@angular/core';
import { LoginForm } from '../_components/login-form/login-form';
import {RouterLink} from '@angular/router';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [
    LoginForm,
    RouterLink,
    NgOptimizedImage


  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

}
