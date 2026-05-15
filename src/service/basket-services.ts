import {inject, Injectable} from '@angular/core';
import {Basket, IBasket, IBasketItem} from '../types/Basket';
import {BehaviorSubject, map} from 'rxjs';
import {API} from './api';
import {IProduct} from '../types/products';

@Injectable({
  providedIn: 'root',
})
export class BasketServices {
  private api = inject(API);
  private basket = new BehaviorSubject<IBasket | null>(null);
  basket$ = this.basket.asObservable();

  getBasket(id:string){
    this.api.show(`basket`,id).pipe(
      map((res:any)=>{
        this.basket.next(res);
        return res;
      })
    ).subscribe();
  }

  setBasket(basket:IBasket){
    return this.api.store(`basket`,basket).subscribe({
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

  addItemToBasket(product: IProduct, Quantity: number = 1) {
    const basket = this.getCurrentValue() ?? this.CreatedBasket();
    const itemToAdd = this.MapProductToBasketItem(product, Quantity);

    basket.basketItems = this.AddOrUpdate(basket.basketItems, itemToAdd, Quantity);

    // Call the API to persist the change in Redis
    return this.setBasket(basket);
  }

  private AddOrUpdate(
    basketItems: IBasketItem[],
    itemToAdd: IBasketItem,
    Quantity: number
  ): IBasketItem[] {
    const item = basketItems.find(i => i.id === itemToAdd.id);

    if (item) {
      itemToAdd.quantity = Quantity;
      item.quantity += Quantity;
    } else {
      itemToAdd.quantity = Quantity;
      basketItems.push(itemToAdd);
    }

    return basketItems;
  }

  private CreatedBasket():IBasket {
    const basket = new Basket();
    localStorage.setItem('basketId', basket.id);
    return basket;
  }

  private MapProductToBasketItem(
    product: IProduct,
    Quantity: number
  ): IBasketItem {
    return {
      name: product.name,
      id: product.id,
      quantity: Quantity,
      category: product.categoryName,
      image : product.photos[0].imageName,
      price: product.newprice,
      description: product.description
    };
  }

  incrementBasketItemQuantity(item:IBasketItem){
    const basket = this.getCurrentValue();
    if (!basket) {
      throw new Error('Basket is null. Cannot increment or decrement item quantity.');
    }
    const Items = basket.basketItems.findIndex(i => i.id === item.id);
    basket.basketItems[Items].quantity++;
    return this.setBasket(basket);
  }

  DecrementBasketItemQuantity(item:IBasketItem){
    const basket = this.getCurrentValue()

    if (!basket) {
      throw new Error('Basket is null. Cannot increment or decrement item quantity.');
    }
    const Items = basket.basketItems.findIndex(i => i.id === item.id);

    if(basket.basketItems[Items].quantity > 1){
      basket.basketItems[Items].quantity--;
    } else {
      return this.setBasket(basket);

    }
    return this.setBasket(basket);
  }

  removeItemFormBasket(item: IBasketItem) {
    const basket = this.getCurrentValue();
    if (!basket) {
      throw new Error('Basket is null. Cannot remove item.');
    }
    if (basket.basketItems.some((i) => i.id === item.id)) {
      basket.basketItems = basket.basketItems.filter((i) => i.id !== item.id);
      if (basket.basketItems.length > 0) {
        this.setBasket(basket);
      } else {
        this.deleteBasketItems(basket);
      }
    }
  }

  deleteBasketItems(basket:IBasket){
    this.api.destroy(`basket`,basket.id).pipe(
      map((res:any)=>{
        this.basket.next(res);
        localStorage.removeItem('basketId');
        return res;
      },),

    ).subscribe();
  }

}

