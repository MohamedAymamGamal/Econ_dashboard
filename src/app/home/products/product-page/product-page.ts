import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { API } from '../../../../service/api';
import { Toast } from '../../../../service/toast';
import { IProduct } from '../../../../types/products';
import { ProductService } from '../../../../service/product-service';
import { AsyncPipe, DecimalPipe } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { Button } from 'primeng/button';
import { Skeleton } from 'primeng/skeleton';
import { ProductGallery } from '../../../Components/product-gallery/product-gallery';
import { CategoryService } from '../../../../service/category-service';
import { FormsModule } from '@angular/forms';
import { RatingModule } from 'primeng/rating';
import { RatingService } from '../../../../service/rating-service';
import { CreateRatingDTO } from '../../../../types/rating';
import { Reviews } from '../reviews/reviews';
import { CompleteTheLook } from '../complete-the-look/complete-the-look';
import { BasketServices } from '../../../../service/basket-services';
@Component({
  selector: 'app-product-page',
  imports: [
    Button,
    Skeleton,
    DecimalPipe,
    ProductGallery,
    FormsModule,
    RatingModule,
    Reviews,
    CompleteTheLook,
  ],
  templateUrl: './product-page.html',
  styleUrl: './product-page.css',
})
export class ProductPage implements OnInit {
  value: number | null = null;
  totalRatings: number | null = null;

  review: string = '';
  products = signal<IProduct | null>(null);
  constructor(
    private router: Router,
    private api: API,
    private route: ActivatedRoute,
    protected toast: Toast,
    protected productService: ProductService,
    protected Category: CategoryService,
    protected RatingService: RatingService,
    private basketService: BasketServices,
  ) {}

  setBasketValue(products: IProduct) {
    if (!products) return this.toast.error('Product not found');

    this.toast.success('Product added to basket', products.name);

    this.basketService.addItemToBasket(products);
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = Number(params.get('id'));

      if (!id) return;

      this.api.show<IProduct>('products', id).subscribe({
        next: (data) => this.products.set(data),
      });
    });

    this.loadRating(this.route.snapshot.params['id']);
  }

  loadRating(id: number) {
    this.RatingService.getRatings(id).subscribe({
      next: (data) => {
        this.value = data.averageStars;
        this.totalRatings = data.totalRatings;
      },
    });
  }

  addRating() {
    const productId = Number(this.route.snapshot.params['id']);

    const dto: CreateRatingDTO = {
      stars: this.value!,
      review: this.review,
    };

    this.RatingService.addRating(productId, dto).subscribe({
      next: () => {
        this.toast.success('Rating added successfully');
        this.loadRating(productId);
      },
      error: () => {
        this.toast.error('Failed to add rating');
      },
    });
  }
}
