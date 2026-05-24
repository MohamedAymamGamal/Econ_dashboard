import { Component } from '@angular/core';
import { ForgetPasswordForm } from "../_components/forget-password-form/forget-password-form";
import { NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  imports: [ForgetPasswordForm,NgOptimizedImage,RouterLink],
  templateUrl: './forget-password.html',
  styleUrl: './forget-password.css',
})
export class ForgetPassword {

}
