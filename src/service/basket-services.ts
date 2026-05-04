import {inject, Injectable} from '@angular/core';
import {environment} from '../environments/environment.development';
import {Basket, IBasket, IBasketItem} from '../types/Basket';
import {BehaviorSubject, findIndex, map} from 'rxjs';
import {API} from './api';
import {IProduct} from '../types/products';

@Injectable({
  providedIn: 'root',
})
export class BasketServices {
  private api = inject(API);
  apiUrl = environment.apiUrl;

  private basket = new BehaviorSubject<IBasket | null>(null);
  basket$ = this.basket.asObservable();

  getBasket(id:string){
    this.api.show(`${this.apiUrl}/basket`,id).pipe(
      map((res:any)=>{
        this.basket.next(res);
        return res;
      })
    )
  }

  setBasket(basket:IBasket){
    return this.api.store(`${this.apiUrl}/basket`,basket).subscribe({
      next: (res:any)=>{
        this.basket.next(res);
      },
      error: (err:any)=>{
        console.log(err);
      }
    })
  }

  getCurrentValue(){
    return this.basket.value;
  }

  addItemToBasket(product: IProduct,quantity: number=1){
      const itemToAdd:IBasketItem = <IBasketItem>this.mapProductToBasketItem(product, quantity);
      const basket = this.getCurrentValue() ?? this.CreatedBasket();
      basket.basketItems = this.AddOrUpdate(basket.basketItems,itemToAdd ,quantity);
  }

  private AddOrUpdate(basketItems: IBasketItem[],itemToAdd:IBasketItem, quantity: number):IBasketItem[] {
    const index = basketItems.findIndex(i => i.id == itemToAdd.id)
    if(index == -1){
      itemToAdd.quantity = quantity;
      basketItems.push(itemToAdd);
    }else {
      basketItems[index].quantity += quantity;
    }

    return basketItems;
  }

  private CreatedBasket():IBasket {
    const basket = new Basket();
    localStorage.setItem('basketId', basket.id);
    return basket;
  }

  private mapProductToBasketItem(product:IProduct, quantity: number):{

  } {
    return {
      id:product.id,
      category:product.categoryName,
      image:product.photos[0].imageName,
      name:product.name,
      price:product.newprice,
      quantity:quantity,
      description:product.description


    };
  }


}
