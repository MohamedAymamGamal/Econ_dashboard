import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { API } from '../../../../service/api';
import { Toast } from '../../../../service/toast';
import { IProduct } from '../../../../types/products';
import { ProductService } from '../../../../service/product-service';
import { AsyncPipe, DecimalPipe } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { Button } from "primeng/button";
import { Skeleton } from "primeng/skeleton";
import { ProductGallery } from "../../../Components/product-gallery/product-gallery";
import { CategoryService } from '../../../../service/category-service';
import { FormsModule } from '@angular/forms';
import { RatingModule } from 'primeng/rating';
@Component({
  selector: 'app-product-page',
  imports: [Button, Skeleton, DecimalPipe, ProductGallery,FormsModule,RatingModule],
  templateUrl: './product-page.html',
  styleUrl: './product-page.css',
})
export class ProductPage implements OnInit {
  value: number = 5;
  products = signal<IProduct | null>(null);
  constructor(private  router: Router , private api: API, private route: ActivatedRoute,protected toast: Toast ,
    protected productService: ProductService,
    protected Category:CategoryService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));

      if (!id) return;


      this.api.show<IProduct>('products', id).subscribe({
        next: (data) => this.products.set(data),
      });
    });
  }



}
