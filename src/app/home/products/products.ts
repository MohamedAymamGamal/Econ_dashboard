import {ChangeDetectorRef, Component, inject, OnInit, ViewChild} from '@angular/core';
import {ProductItems} from './product-items/product-items';
import {ProductService} from '../../../service/product-service';
import {ProductParam} from '../../../types/ProductParams';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ReuseButton} from '../../Components/reuse-button/reuse-button';
import {ICateogry} from '../../../types/Category';
import {InputText} from 'primeng/inputtext';
import {Select} from 'primeng/select';
import {Pagination} from '../../Components/pagination/pagination';
import {IProduct} from '../../../types/products';
import {Subject, takeUntil} from 'rxjs';

interface ElementRef {
}

@Component({
  selector: 'app-products',
  imports: [
    ProductItems,

    ReuseButton,
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

  // @ViewChild('search') SearchInput: ElementRef;
  // @ViewChild('SortSelected') selected: ElementRef
  private productService = inject(ProductService);

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
}
