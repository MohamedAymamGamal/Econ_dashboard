import {ChangeDetectorRef, Component, inject, OnInit, ViewChild} from '@angular/core';
import {ProductItems} from './product-items/product-items';
import {ProductService} from '../../../service/product-service';
import {ProductParam} from '../../../types/ProductParams';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ICateogry} from '../../../types/Category';
import {InputText} from 'primeng/inputtext';
import {Select} from 'primeng/select';
import {Pagination} from '../../Components/pagination/pagination';
import {IProduct} from '../../../types/products';
import {Subject, takeUntil} from 'rxjs';
import {CategoryService} from '../../../service/category-service';
import {RouterOutlet} from '@angular/router';

interface ElementRef {
}

@Component({
  selector: 'app-products',
  imports: [
    ProductItems,

    ReactiveFormsModule,
    InputText,
    Select,
    FormsModule,
    Pagination,
  ],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products implements OnInit{
  ProductParam: ProductParam = {
    pageNumber: 1,
    pageSize: 10,
    CategoryId: '',
    Sort: '',
    search: ''
  };
  categories: ICateogry[] = [];

  // @ViewChild('search') SearchInput: ElementRef;
  // @ViewChild('SortSelected') selected: ElementRef
  private productService = inject(ProductService);
  private categoryService = inject(CategoryService);

  form!: FormGroup;
  products: IProduct[] = [];
  totalRecords: number = 0;
  private destroy$ = new Subject<void>();
  private cdr = inject(ChangeDetectorRef);
  FormSearch(){
    this.form = new FormGroup({
      search: new FormControl(this.ProductParam.search)
    })
  }

  ngOnInit(): void {
    this.FormSearch();
    this.productService.total$
      .pipe(takeUntil(this.destroy$))
      .subscribe(total => {
        this.totalRecords = total
        this.cdr.detectChanges();

      });
    this.getProducts();
    this.loadCategories();
  }
  getProducts() {
    this.productService.loadProducts(this.ProductParam);
  }
  OnSearch(search: string) {
    this.ProductParam.search = search;
    this.getProducts();
  }



  SortingOption = [
    { label: 'Name', value: 'Name' },
    { label: 'Price: Low to High', value: 'PriceAce' },
    { label: 'Price: High to Low', value: 'PriceDce' },
  ];
  onSortChange(event: any) {
    this.ProductParam.Sort = event.value; // event.value will contain 'PriceAce', etc.
    this.ProductParam.pageNumber = 1; // Reset to page 1
    this.getProducts();
  }



  OnChangePage(event: any) {
    if (this.ProductParam.pageNumber != event) {
      this.ProductParam.pageNumber = event;
      this.getProducts();
    }
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe(data => {
      this.categories = data;
    });
  }

  onCategoryChange(event: any) {
    this.ProductParam.CategoryId = event.value || '';
    this.ProductParam.pageNumber = 1;
    this.getProducts();
  }

}
