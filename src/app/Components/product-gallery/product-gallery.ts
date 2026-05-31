import {Component, Input, input} from '@angular/core';
import {IPhoto, IProduct} from '../../../types/products';
import {GalleriaModule} from 'primeng/galleria';
import {ImageUrlPipe} from '../../pipes/empty-profile-image-pipe-pipe';

@Component({
  selector: 'app-product-gallery',
  imports: [
    GalleriaModule,
    ImageUrlPipe
  ],
  templateUrl: './product-gallery.html',
  styleUrl: './product-gallery.css',
})
export class ProductGallery {
  @Input() autoPlay = false;

  photos = input<IPhoto[]>();
  alt   = input<string>('product image');



}
