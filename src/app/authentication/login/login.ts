import { Component } from '@angular/core';
import { LoginForm } from '../_components/login-form/login-form';

@Component({
  selector: 'app-login',
  imports: [
    LoginForm


  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

}
