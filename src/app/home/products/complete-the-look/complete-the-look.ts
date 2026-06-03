import { ProductParam } from './../../../../types/ProductParams';
import { Component, OnInit, Pipe } from '@angular/core';
import { Divider } from 'primeng/divider';
import { CategoryService } from '../../../../service/category-service';
import { ActivatedRoute } from '@angular/router';
import { ICateogry } from '../../../../types/Category';
import { CarouselModule } from 'primeng/carousel';
import { ProductService } from '../../../../service/product-service';
import { IProduct } from '../../../../types/products';
@Component({
  selector: 'app-complete-the-look',
  imports: [Divider, CarouselModule],
  templateUrl: './complete-the-look.html',
  styleUrl: './complete-the-look.css',
})
export class CompleteTheLook implements OnInit {
  constructor(
    private Category: CategoryService,
    private route: ActivatedRoute,
    private product: ProductService,
  ) {}
  category: ICateogry | null = null;

  products: IProduct[] = [];
  productparams: ProductParam[] = [];
  ngOnInit(): void {
    this.getCategoryById(this.route.snapshot.params['id']);
    this.productparams = [
      {
        CategoryId: Number(this.route.snapshot.params['id']),
        Sort: '',
        search: '',
        pageNumber: 1,
        pageSize: 10,
      },
    ];
    this.getproducts();
  }

  getCategoryById(id: number) {
    this.Category.getCategory(id).subscribe({
      next: (data: ICateogry) => {
        this.category = data;
      },
    });
  }

  getproducts() {
    this.product.loadProducts(this.productparams[0]);
  }
}
