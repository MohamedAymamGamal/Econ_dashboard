import { Injectable } from '@angular/core';
import { API } from './api';
import { Observable } from 'rxjs';
import { CreateRatingDTO, RatingSummaryDTO, RatingToReturnDTO } from '../types/rating';

@Injectable({
  providedIn: 'root',
})
export class RatingService {

  constructor(private api: API) {}


  getRatings(productId: number): Observable<RatingSummaryDTO> {
    // Passed straight into index() because your API class strips null/undefined fields
    return this.api.index<RatingSummaryDTO>(`products/${productId}/ratings`);
  }


  addRating(productId: number, dto: CreateRatingDTO): Observable<RatingToReturnDTO> {
    return this.api.store<CreateRatingDTO, RatingToReturnDTO>(`products/${productId}/ratings`, dto);
  }

  updateRating(productId: number, ratingId: number, dto: CreateRatingDTO): Observable<RatingToReturnDTO> {
    return this.api.update<CreateRatingDTO, RatingToReturnDTO>(`products/${productId}/ratings`, ratingId, dto);
  }


  deleteRating(productId: number, ratingId: number): Observable<any> {
    return this.api.destroy<any, any>(`products/${productId}/ratings`, ratingId);
  }



}
