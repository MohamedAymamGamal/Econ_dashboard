import { inject, Injectable } from '@angular/core';
import { API } from './api';
import { IProduct } from '../types/products';
import { IPagnation } from '../types/Pagnation';
import { BehaviorSubject } from 'rxjs';
import { ProductParam } from '../types/ProductParams';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private api = inject(API);

  //products
  private productsSubject = new BehaviorSubject<IProduct[]>([]);
  products$ = this.productsSubject.asObservable();

  //pagination
  private totalSubject = new BehaviorSubject<number>(0);
  total$ = this.totalSubject.asObservable();

  //product by id
  private productByIdSubject = new BehaviorSubject<IProduct | null>(null);
  productById$ = this.productByIdSubject.asObservable();
  loadProducts(param: ProductParam) {
    this.api
      .index<IPagnation>('Products', {
        categoryId: param.CategoryId,
        sort: param.Sort,
        search: param.search,
        pageNumber: param.pageNumber,
        pageSize: param.pageSize,
        MaxRating: param.MaxRating,
        MinRating: param.MinRating,
      })
      .subscribe((res) => {
        this.productsSubject.next(res.data);
        this.totalSubject.next(res.totalCount);
      });
  }


  clearProduct() {
  this.productByIdSubject.next(null);
}
loadProdcutbyId(id: IProduct['id']) {
   this.api.show<{ data: IProduct }>('Products', id).subscribe((res) => {
    this.productByIdSubject.next(res.data);
  });
}
}
