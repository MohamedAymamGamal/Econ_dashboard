import { Component } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { API } from '../../../service/api';
import { ProductService } from '../../../service/product-service';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from '../../../types/products';
import { CarouselModule } from 'primeng/carousel';
import { ProductGallery } from '../../Components/product-gallery/product-gallery';
import { Rating } from 'primeng/rating';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-arrivals',
  imports: [ CarouselModule, ProductGallery, Rating, FormsModule],
  templateUrl: './new-arrivals.html',
  styleUrl: './new-arrivals.css',
})
export class NewArrivals {
  private destroy$ = new Subject<void>();

  product: IProduct | null = null;
  relatedProducts: IProduct[] = [];

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private api: API,
  ) {}

  ngOnInit(): void {

    this.api.index<any>('products')
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        this.product = res.data ?? res;
        this.productService.loadProducts({
          Sort: 'RatingDesc',
          search: '',
          pageNumber: 1,
          pageSize: 10,
        });
      });

    this.productService.products$
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.relatedProducts = data;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
