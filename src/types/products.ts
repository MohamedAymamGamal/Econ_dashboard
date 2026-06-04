export interface IProduct {
  id: number;
  name: string;
  description: string;
  newprice: number;
  oldPrice: number;
  photos?: IPhoto[];
  categoryId: number;
  categoryName: string;
  rating?: number;
}

export interface IPhoto {
  imageName: string;
  productId: number;
}
