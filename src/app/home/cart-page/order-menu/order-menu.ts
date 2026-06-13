import { Component, inject, signal } from '@angular/core';
import { Card } from "primeng/card";
import { Divider } from "primeng/divider";
import { IBasketItem } from '../../../../types/Basket';
import { Toast } from '../../../../service/toast';
import { BasketServices } from '../../../../service/basket-services';
import { DataView } from "primeng/dataview";
import { ProductGallery } from "../../../Components/product-gallery/product-gallery";
import { CommonModule } from '@angular/common';
import { ImageUrlPipe } from "../../../pipes/empty-profile-image-pipe-pipe";
import { environment } from '../../../../environments/environment.development';
import { NgOptimizedImage } from '@angular/common';
import { Button } from "primeng/button";
@Component({
  selector: 'app-order-menu',
  imports: [Divider, CommonModule, Button],
  templateUrl: './order-menu.html',
  styleUrl: './order-menu.css',
})
export class OrderMenu {

  environment = environment.ImageUrl;
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
  incrementItemQuantity(){
    this.basketService.incrementBasketItemQuantity(this.products()[0]);
  }
  decrmentItemQuantity(){
    this.basketService.DecrementBasketItemQuantity(this.products()[0]);
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

}
