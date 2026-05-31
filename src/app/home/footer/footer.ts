import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Button } from "primeng/button";
import { ReuseInputs } from "../../Components/forms/reuse-inputs/reuse-inputs";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  imports: [Button,CommonModule],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {

  email: string = '';

  constructor(private router: Router) {}

  navigate(label: string) {
    const slug = label.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    this.router.navigate(['/home', slug]);
  }


  shopLinks = ['New Arrivals', 'Best Sellers', 'Sale', 'Gift Cards'];
  companyLinks = ['Sustainability', 'Shipping & Returns', 'Privacy Policy', 'Terms of Service'];
  socialIcons = ['public', 'share', 'thumb_up'];

}
