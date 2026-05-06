import {Component, inject, OnInit, signal} from '@angular/core';
import {DataViewModule} from 'primeng/dataview';
import {ButtonModule} from 'primeng/button';
import {TagModule} from 'primeng/tag';
import {IBasket, IBasketItem} from '../../../types/Basket';
import {BasketServices} from '../../../service/basket-services';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {Divider} from 'primeng/divider';
import {Card} from 'primeng/card';
import {InputNumber} from 'primeng/inputnumber';
import {FormsModule} from '@angular/forms';
import {ReuseButton} from '../../Components/reuse-button/reuse-button';
import {Toast} from '../../../service/toast';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-cart-page',
  imports: [ButtonModule, DataViewModule, TagModule, CommonModule, Divider, Card, InputNumber, FormsModule, ReuseButton, RouterLink],
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


  getItemsBasket(basketId:string){
    this.basketService.getBasket(basketId);

    this.basketService.basket$.subscribe(basket => {
      if (basket && basket.basketItems) {
        this.products.set(basket.basketItems);
      }
    });
  }
  calculateSubtotal() {
    return this.products().reduce((acc, item) => acc + (item.price * (item.quantity || 1)), 0);
  }

  removeAllBesketItems(){
    const items = localStorage.removeItem('basketId');
    this.toast.success('Basket items removed successfully','you removed' + this.products().length + 'items');

  }

}
