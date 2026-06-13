import {Component, computed, Input, input} from '@angular/core';
import {IPhoto, IProduct} from '../../../types/products';
import {GalleriaModule} from 'primeng/galleria';
import {ImageUrlPipe} from '../../pipes/empty-profile-image-pipe-pipe';
import { NgOptimizedImage } from '@angular/common';
@Component({
  selector: 'app-product-gallery',
  imports: [
    GalleriaModule,
    ImageUrlPipe,
    NgOptimizedImage
  ],
  templateUrl: './product-gallery.html',
  styleUrl: './product-gallery.css',
})
export class ProductGallery {
 @Input() autoPlay = false;
  @Input() singleMode = false;

  photos = input<IPhoto[] | undefined >();
  alt = input<string>('product image');



}
