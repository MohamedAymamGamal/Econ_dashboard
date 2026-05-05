import {Component, inject} from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import {BasketServices} from '../../../../service/basket-services';

@Component({
  selector: 'app-cart',
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart {

  private basket = inject(BasketServices)



}
