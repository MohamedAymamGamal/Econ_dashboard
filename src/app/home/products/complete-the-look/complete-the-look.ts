import { ProductParam } from './../../../../types/ProductParams';
import { Component, OnInit } from '@angular/core';
import { Divider } from 'primeng/divider';
import { CategoryService } from '../../../../service/category-service';
import { ActivatedRoute } from '@angular/router';
import { ICateogry } from '../../../../types/Category';
import { CarouselModule } from 'primeng/carousel';
import { ProductService } from '../../../../service/product-service';
import { IProduct } from '../../../../types/products';
import { AsyncPipe, NgFor } from '@angular/common';

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
    private productService: ProductService,
  ) {}

  category: ICateogry | null = null;

  ngOnInit(): void {
    const categoryId = this.route.snapshot.params['id'];

    this.Category.getCategory(categoryId).subscribe({
      next: (data: ICateogry) => {
        this.category = data;
      },
    });

    this.productService.loadProducts({
      CategoryId: categoryId,
      Sort: '',
      search: '',
      pageNumber: 1,
      pageSize: 10,
    });
  }
}
