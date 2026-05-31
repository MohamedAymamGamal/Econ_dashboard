// export interface RatingParams {
//   pageNumber: number;
//   pageSize: number;
//   sort?: string;
// }

export interface RatingToReturnDTO {
  id: number;
  productId: number;
  stars: number;
  review: string;
  createdAt: string;
}

export interface RatingSummaryDTO {
  averageStars: number;
  totalRatings: number;
  ratings: RatingToReturnDTO[];
}

export interface CreateRatingDTO {
  stars: number;
  review: string;
}
