import { RatingSummaryDTO } from "./rating";

export interface IProduct {
  id: number;
  name: string;
  description: string;
  newprice: number;
  oldPrice: number;
  photos?: IPhoto[];

  categoryId: number;
  categoryName: string;
  averageStars: number;
  totalRatings: number;
  ratings: RatingSummaryDTO;
}

export interface IPhoto {
  imageName: string;
  productId: number;
}
