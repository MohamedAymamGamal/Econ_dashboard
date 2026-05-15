import { Component } from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-authentication',
  imports: [
    RouterOutlet,
    NgOptimizedImage
  ],
  templateUrl: './authentication.html',
  styleUrl: './authentication.css',
})
export class Authentication {

}
