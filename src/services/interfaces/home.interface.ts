import {Categories} from './category.interface';
import {Customer} from './customer.interface';

export interface GetHomeScreenDataResponse {
  categories: Categories;
  customer: Customer;
}
