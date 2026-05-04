import {IProduct} from './products';

export interface IPagnation {
  pageNumber: number
  pageSize: number
  totalCount: number
  data: IProduct[]
}
