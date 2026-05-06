import {inject, Injectable} from '@angular/core';
import {API} from './api';
import {ICateogry} from '../types/Category';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private api = inject(API);

  getCategories(): Observable<ICateogry[]> {
    return this.api.index<ICateogry[]>('categories');
  }
  getCategory(id: string): Observable<ICateogry> {
    return this.api.show<ICateogry>(`categories`,id);
  }

  createCategory(category: ICateogry): Observable<ICateogry> {
    return this.api.store<ICateogry, ICateogry>(`categories`, category);
  }

  deleteCategory(id: string): Observable<ICateogry> {
    return this.api.destroy<ICateogry, ICateogry>(`categories`, id);
  }

  updateCategory(id: string, category: ICateogry): Observable<ICateogry> {
    return this.api.update<ICateogry, ICateogry>(`categories`, id, category);
  }

}
