export class ProductParam {
  CategoryId?: string | number | void = '';
  Sort: string = '';
  search: string = '';
  MaxRating?: number = 5;
  MinRating?: number = 0;
  pageNumber: number = 1;
  pageSize: number = 3;
}
