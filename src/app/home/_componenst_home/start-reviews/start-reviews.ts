import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-start-reviews',
  imports: [],
  templateUrl: './start-reviews.html',
  styleUrl: './start-reviews.css',
})
export class StartReviews {
  @Input() value: number | null = null;

  @Input() idProduct: number | null = null;
}
