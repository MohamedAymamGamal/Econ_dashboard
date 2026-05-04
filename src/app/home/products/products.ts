import { Component } from '@angular/core';
import {ProductItems} from './product-items/product-items';

@Component({
  selector: 'app-products',
  imports: [
    ProductItems
  ],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products {


}
