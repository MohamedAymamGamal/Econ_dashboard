import { IProduct } from './products';

export interface ICateogry {
  id: number;
  name: string;
  IProducts?: IProduct[];
}
