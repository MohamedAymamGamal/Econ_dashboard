import { Pipe, PipeTransform } from '@angular/core';
import {environment} from '../../environments/environment.development';

@Pipe({
  name: 'imageUrl',
  standalone: true
})
export class ImageUrlPipe implements PipeTransform {
  transform(photos: { imageName: string }[] | undefined): string {
    if (!photos || photos.length === 0)
      return 'assets/images/placeholder.png';
    return encodeURI(`${environment.ImageUrl}${photos[0].imageName}`);
  }
}
