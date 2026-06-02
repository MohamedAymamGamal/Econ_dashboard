import { Component, inject, input, OnInit, signal } from '@angular/core';
import { DataViewModule } from 'primeng/dataview';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { IBasket, IBasketItem } from '../../../types/Basket';
import { BasketServices } from '../../../service/basket-services';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Divider } from 'primeng/divider';
import { Card } from 'primeng/card';
import { InputNumber } from 'primeng/inputnumber';
import { FormsModule } from '@angular/forms';
import { Toast } from '../../../service/toast';
import { RouterLink } from '@angular/router';
import { ImageUrlPipe } from '../../pipes/empty-profile-image-pipe-pipe';
import { IPhoto } from '../../../types/products';

@Component({
  selector: 'app-cart-page',
  imports: [
    ButtonModule,
    DataViewModule,
    TagModule,
    CommonModule,
    Divider,
    Card,
    InputNumber,
    FormsModule,
    RouterLink,
    ImageUrlPipe,
    NgOptimizedImage,
  ],
  templateUrl: './cart-page.html',
  styleUrl: './cart-page.css',
})
export class CartPage implements OnInit {
  private basketService = inject(BasketServices);
  private toast = inject(Toast);
  products = signal<IBasketItem[]>([]);

  ngOnInit(): void {
    const basketId = localStorage.getItem('basketId');
    if (basketId) {
      this.getItemsBasket(basketId);
    }
  }

  getItemsBasket(basketId: string) {
    this.basketService.getBasket(basketId);

    this.basketService.basket$.subscribe((basket) => {
      if (basket && basket.basketItems) {
        this.products.set(basket.basketItems);
      }
    });
  }
  calculateSubtotal() {
    return this.products().reduce((acc, item) => acc + item.price * (item.quantity || 1), 0);
  }
  RemoveBasket(item: IBasketItem) {
    this.basketService.removeItemFormBasket(item);
  }

  clearCart() {
    const basketId = localStorage.getItem('basketId');
    if (basketId) {
      this.products.set([]);
    }
  }
  getBasket(basket: IBasket) {
    console.log(basket);
  }
}
