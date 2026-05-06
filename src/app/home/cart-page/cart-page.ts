import {Component, inject, OnInit, signal} from '@angular/core';
import {DataViewModule} from 'primeng/dataview';
import {ButtonModule} from 'primeng/button';
import {TagModule} from 'primeng/tag';
import {map} from 'rxjs';
import {IBasket, IBasketItem} from '../../../types/Basket';
import {BasketServices} from '../../../service/basket-services';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-cart-page',
  imports: [ButtonModule, DataViewModule, TagModule, NgClass],
  templateUrl: './cart-page.html',
  styleUrl: './cart-page.css',
})
export class CartPage implements OnInit {
  private basketService = inject(BasketServices);

  // Define the signal that the HTML template expects: products()
  products = signal<IBasketItem[]>([]);

  ngOnInit(): void {
    const basketId = localStorage.getItem('basketId');
    if (basketId) {
      this.fetchBasket(basketId);
    }
  }

  fetchBasket(basketId: string) {

  }

  // Helper for PrimeNG Tag severity
  getSeverity(product: any) {
    switch (product.inventoryStatus) {
      case 'INSTOCK': return 'success';
      case 'LOWSTOCK': return 'warn';
      case 'OUTOFSTOCK': return 'danger';
      default: return 'info';
    }
  }

}
