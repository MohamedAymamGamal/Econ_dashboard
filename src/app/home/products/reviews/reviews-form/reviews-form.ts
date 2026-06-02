import { Component, Input } from '@angular/core';
import { formDialog } from '../../../../../service/form-dialog';
import { Toast } from '../../../../../service/toast';
import { RatingService } from '../../../../../service/rating-service';
import { ActivatedRoute } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CreateRatingDTO } from '../../../../../types/rating';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ReuseInputs } from '../../../../Components/forms/reuse-inputs/reuse-inputs';
import { RatingModule } from 'primeng/rating';
import { Button } from 'primeng/button';
@Component({
  selector: 'app-reviews-form',
  imports: [ReactiveFormsModule, ReuseInputs, FormsModule, RatingModule, Button],
  templateUrl: './reviews-form.html',
  styleUrl: './reviews-form.css',
  standalone: true,
})
export class ReviewsForm {
  value: number | null = null;
  totalRatings: number | null = null;

  review: string = '';
  rating: any[] = [];

  form!: FormGroup;
  @Input() productId!: number;
  constructor(
    private toast: Toast,
    private RatingService: RatingService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      review: ['', [Validators.maxLength(1000)]],
      stars: [null, [Validators.required, Validators.min(1), Validators.max(5)]],
    });
  }

  loadRating() {
    this.RatingService.getRatings(this.productId).subscribe({
      next: (data) => {
        this.value = data.averageStars;
        this.totalRatings = data.totalRatings;
      },
    });
  }
  addRating() {
    const productId = this.config.data.productId;

    const dto: CreateRatingDTO = {
      stars: this.form.get('stars')?.value,
      review: this.form.get('review')?.value,
    };

    this.RatingService.addRating(productId, dto).subscribe({
      next: () => {
        this.toast.success('Rating added successfully');
        this.ref.close(true);
        this.loadRating();
      },
      error: () => {
        this.toast.error('Failed to add rating');
      },
    });
  }
  handleSubmit(): void {
    this.ref.close(true);
  }
}
