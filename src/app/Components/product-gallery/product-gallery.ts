import {Component, input} from '@angular/core';
import {IPhoto} from '../../../types/products';
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


  photos = input<IPhoto[]>();
  alt   = input<string>('product image');

  onImageError(event: Event): void {
    (event.target as HTMLImageElement).src = 'assets/images/placeholder.png';
  }
}
