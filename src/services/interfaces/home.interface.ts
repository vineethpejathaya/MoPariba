import {Categories, CategoryItemInterface} from './category.interface';
import {Customer} from './customer.interface';

export interface GetHomeScreenDataResponse {
  categories: Categories;
  customer: Customer;
}

export interface HomeScreenState {
  categories: Categories | null;
  categoryItems: CategoryItemInterface[] | [];
  customer: Customer | null;
}
