import {Component, inject, OnInit} from '@angular/core';
import {BasketServices} from '../../../../service/basket-services';
import {IBasket} from '../../../../types/Basket';
import {map} from 'rxjs';
import { OverlayBadgeModule } from 'primeng/overlaybadge';
import {RouterLink} from '@angular/router';
import {AsyncPipe} from '@angular/common';
@Component({
  selector: 'app-cart',
  imports: [
    OverlayBadgeModule,
    RouterLink,
    AsyncPipe
  ],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart implements OnInit {
  private basketService = inject(BasketServices);


  basketItems$ = this.basketService.basket$.pipe(
    map(basket => basket ? basket.basketItems : [])
  );

  basketItemsCount$ = this.basketService.basket$.pipe(
    map(basket => basket?.basketItems?.length || 0)
  );

  ngOnInit(): void {
    const basketId = localStorage.getItem('basketId');
    if (basketId) {
      this.basketService.getBasket(basketId);
    }
  }



}
