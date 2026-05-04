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
}
