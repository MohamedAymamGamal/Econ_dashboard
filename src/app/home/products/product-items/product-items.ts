import {Component, inject, OnDestroy, OnInit} from '@angular/core';
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





@Component({
  selector: 'app-product-items',
  imports: [
    Pagination,
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
    private categoryService: CategoryService
  ) {}

  imageUrl = environment.ImageUrl;

  onImageError(event: Event): void {
    (event.target as HTMLImageElement).src = 'images/placeholder.png';
  }


  private destroy$ = new Subject<void>();
  products: IProduct[] = [];
  totalRecords: number = 0;

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
      .subscribe(products => this.products = products);

    this.shopService.total$
      .pipe(takeUntil(this.destroy$))
      .subscribe(total => this.totalRecords = total);

    this.getProducts();
  }

  getProducts() {
    this.shopService.loadProducts(this.ProductParam);
  }

  OnChangePage(event: any) {
    if (this.ProductParam.pageNumber != event) {
      this.ProductParam.pageNumber = event;
      console.log(this.ProductParam);
      this.getProducts();
    }
  }

  OnSearch(search: string) {
    this.ProductParam.search = search;
    this.getProducts();
  }

  sortingByPrice(sort: Event) {
    this.ProductParam.Sort = (sort.target as HTMLSelectElement).value;
    this.getProducts();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  trackById(index: number, item: IProduct): number {
    return item.id || index;
  }
}
