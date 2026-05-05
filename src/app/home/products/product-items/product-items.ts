import {ChangeDetectorRef, Component, inject, OnDestroy, OnInit} from '@angular/core';
import {ProductService} from '../../../../service/product-service';
import {ProductParam} from '../../../../types/ProductParams';
import {Toast} from '../../../../service/toast';
import {IProduct} from '../../../../types/products';
import {ICateogry} from '../../../../types/Category';
import {CategoryService} from '../../../../service/category-service';
import {Pagination} from '../../../Components/pagination/pagination';
import {Subject, takeUntil} from 'rxjs';
import {environment} from '../../../../environments/environment.development';
import {ImageUrlPipe} from '../../../pipes/empty-profile-image-pipe-pipe';
import {ProductGallery} from '../../../Components/product-gallery/product-gallery';
import {ReuseButton} from '../../../Components/reuse-button/reuse-button';
import {Button} from 'primeng/button';
import {DecimalPipe} from '@angular/common';
import {BasketServices} from '../../../../service/basket-services';





@Component({
  selector: 'app-product-items',
  imports: [
    ProductGallery,
    ReuseButton,
    DecimalPipe,


  ],
  templateUrl: './product-items.html',
  styleUrl: './product-items.css',
})
export class ProductItems implements OnInit ,OnDestroy {
  constructor(
    private shopService: ProductService,
    private toast: Toast,
    private categoryService: CategoryService,
    private basketService: BasketServices,
    private cdr: ChangeDetectorRef
  ) {}


  onImageError(event: Event): void {
    (event.target as HTMLImageElement).src = 'images/placeholder.png';
  }


  private destroy$ = new Subject<void>();
  products: IProduct[] = [];
  totalRecords: number = 0;

  setBasketValue(products:IProduct) {
    this.basketService.addItemToBasket(products);
  }
  ProductParam: ProductParam = {
    pageNumber: 1,
    pageSize: 10,
    CategoryId: '',
    Sort: '',
    search: ''
  };

  ngOnInit(): void {
    this.shopService.products$
      .pipe(takeUntil(this.destroy$))
      .subscribe(products => {this.products = products
        this.cdr.detectChanges();
      });

    this.shopService.total$
      .pipe(takeUntil(this.destroy$))
      .subscribe(total => {this.totalRecords = total
        this.cdr.detectChanges();

        });

    this.getProducts();

    const basketId = localStorage.getItem('basketId');
    if (basketId) {
      this.basketService.getBasket(basketId);
    }
  }

  getProducts() {
    this.shopService.loadProducts(this.ProductParam);
  }





  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  trackById(index: number, item: IProduct): number {
    return item.id || index;
  }


}
