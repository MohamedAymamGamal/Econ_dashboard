import { Component } from '@angular/core';
import {Button} from 'primeng/button';
import {FormsModule} from '@angular/forms';
import {InputOtp} from 'primeng/inputotp';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-email-verfication-form',
  imports: [
    Button,
    FormsModule,
    InputOtp,
    NgIf
  ],
  templateUrl: './email-verfication-form.html',
  styleUrl: './email-verfication-form.css',
})
export class EmailVerficationForm {
  value: any;
}
