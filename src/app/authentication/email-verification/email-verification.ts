import { Component } from '@angular/core';
import {EmailVerficationForm} from '../_components/email-verfication-form/email-verfication-form';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-email-verification',
  imports: [
    EmailVerficationForm,
    NgOptimizedImage
  ],
  templateUrl: './email-verification.html',
  styleUrl: './email-verification.css',
})
export class EmailVerification {

}
