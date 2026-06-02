import { RatingService } from './../../../../service/rating-service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Button } from 'primeng/button';
import { RatingModule } from 'primeng/rating';
import { Toast } from '../../../../service/toast';
import { formDialog } from '../../../../service/form-dialog';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ReviewsForm } from './reviews-form/reviews-form';
@Component({
  selector: 'app-reviews',
  imports: [Button, RatingModule],
  templateUrl: './reviews.html',
  styleUrl: './reviews.css',
})
export class Reviews implements OnInit {
  value: number | null = null;
  totalRatings: number | null = null;
  ref: DynamicDialogRef | undefined | null;
  constructor(
    private RatingService: RatingService,
    private route: ActivatedRoute,
    private toast: Toast,
    public dialogService: DialogService,
  ) {}

  ngOnInit(): void {
    this.loadRating(this.route.snapshot.params['id']);
  }

  addReview() {
    this.ref = this.dialogService.open(ReviewsForm, {
      header: 'Write a Review',
      dismissableMask: true,
      modal: true,
      data: {
        productId: Number(this.route.snapshot.params['id']),
      },
      closable: true,

      contentStyle: { overflow: 'visible', width: '600px' },
    });

    this.ref?.onClose.subscribe((res: any) => {
      if (res) {
        this.loadRating(this.route.snapshot.params['id']);
      }
    });
  }

  loadRating(id: number) {
    this.RatingService.getRatings(id).subscribe({
      next: (data) => {
        this.value = data.averageStars;
        this.totalRatings = data.totalRatings;
      },
    });
  }
}
