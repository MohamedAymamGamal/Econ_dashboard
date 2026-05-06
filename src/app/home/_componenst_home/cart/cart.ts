import {Component, inject, OnInit} from '@angular/core';
import {BasketServices} from '../../../../service/basket-services';
import {IBasket} from '../../../../types/Basket';
import {map} from 'rxjs';
import { OverlayBadgeModule } from 'primeng/overlaybadge';
import {RouterLink} from '@angular/router';
@Component({
  selector: 'app-cart',
  imports: [
    OverlayBadgeModule,
    RouterLink
  ],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart implements OnInit {
  basketItemsCount: number = 0;

  ngOnInit(): void {
    const basketId = localStorage.getItem('basketId');
    if (basketId) {
      this.getItemsBasket(basketId);
    }

    this.basket.basket$.pipe(
      map((basket: IBasket | null) => basket?.basketItems?.length || 0)
    ).subscribe(count => {
      this.basketItemsCount = count;
    });
  };

  protected basket = inject(BasketServices)

  getItemsBasket(basketId:string){
    this.basket.getBasket(basketId);
  }

}
