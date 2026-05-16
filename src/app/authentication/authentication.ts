import { Component } from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {NgOptimizedImage} from '@angular/common';
import {SubmitButtonComponent} from '../Components/submit-button/submit-button';

@Component({
  selector: 'app-authentication',
  imports: [
    RouterOutlet,
    NgOptimizedImage,
    RouterLink,
  ],
  templateUrl: './authentication.html',
  styleUrl: './authentication.css',
})
export class Authentication {

}
