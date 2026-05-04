import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';
import {NgOptimizedImage} from '@angular/common';
import {Cart} from '../cart/cart';

@Component({
  selector: 'app-navbar',
  imports: [
    RouterLink,
    NgOptimizedImage,
    Cart
  ],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {

  navItems = [
    { label: 'Home', url: '/home' },
    { label: 'Products', url: '/home/products' },
    { label: 'Contact', url: '/contact' },
  ];
}
