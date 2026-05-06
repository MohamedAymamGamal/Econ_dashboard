import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';
import {NgOptimizedImage} from '@angular/common';
import {Cart} from '../cart/cart';
import {ButtonDirective} from 'primeng/button';
import {Avatar} from 'primeng/avatar';
import {Menu} from 'primeng/menu';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-navbar',
  imports: [
    RouterLink,
    NgOptimizedImage,
    Cart,
    ButtonDirective,
    Avatar,
    Menu
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

  items: MenuItem[] | undefined;

  ngOnInit() {
    this.items = [
      {
        label: 'My Profile',
        icon: 'pi pi-user',
        routerLink: '/profile'
      },
      {
        label: 'Settings',
        icon: 'pi pi-cog',
        routerLink: '/settings'
      },
      {
        separator: true
      },
      {
        label: 'Log Out',
        icon: 'pi pi-sign-out',
        command: () => { this.logout(); }
      }
    ];
  }

  logout() {
    console.log("User logged out");
  }
}
