import { inject, Injectable } from '@angular/core';
import { API } from './api';
import { IProduct } from '../types/products';
import { IPagnation } from '../types/Pagnation';
import { BehaviorSubject } from 'rxjs';
import {ProductParam} from '../types/ProductParams';
import {HttpParams} from '@angular/common/http';



@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private api = inject(API);

  private productsSubject = new BehaviorSubject<IProduct[]>([]);
  products$ = this.productsSubject.asObservable();

  private totalSubject = new BehaviorSubject<number>(0);
  total$ = this.totalSubject.asObservable();

  loadProducts(param: ProductParam) {
    this.api.index<IPagnation>('Products', {
      categoryId:  param.CategoryId,
      sort:        param.Sort,
      search:      param.search,
      pageNumber:  param.pageNumber,
      pageSize:    param.pageSize,
    }).subscribe(res => {
      this.productsSubject.next(res.data);
      this.totalSubject.next(res.totalCount);
    });
  }
}
