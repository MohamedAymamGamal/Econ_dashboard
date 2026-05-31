import { Component, inject } from '@angular/core';
import { NgOptimizedImage } from "@angular/common";
import { Button } from "primeng/button";
import { Router } from '@angular/router';

@Component({
  selector: 'app-hero-section',
  imports: [NgOptimizedImage, Button],
  templateUrl: './hero-section.html',
  styleUrl: './hero-section.css',
})
export class HeroSection {


  protected route = inject(Router);

  toproductPage() {
    this.route.navigate(['/home/products']);
  }


}
