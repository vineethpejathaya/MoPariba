import {CustomerAddress} from '../CustomerAddress/CustomerAddress.type';

export interface GetHomeScreenDataResponse {
  categories: Categories;
  customer: Customer;
}

export interface CategoryItemInterface {
  uid: string;
  level: number;
  name: string;
  path: string;
  image: string;
  url_key: string;
  include_in_menu: boolean;
  sw_menu_icon_img: string;
  children_count: number;
  children: CategoryItemInterface[];
}

export interface Categories {
  total_count: number;
  items: CategoryItemInterface[];
  page_info: {
    current_page: number;
    page_size: number;
    total_pages: number;
  };
}

export interface Customer {
  firstname: string;
  lastname: string;
  suffix: string;
  email: string;
  addresses: CustomerAddress[];
}

export type DailyDealProduct = {
  name: string;
  image: string;
  sku: string;
  price: number;
  discount_type: number;
  discount_type_label: string;
  discount: number;
  final_price: number;
  you_saved: number;
  from_date: string;
  to_date: string;
};

export type GetDailyDealProductsQuery = {
  dailyDealProducts: DailyDealProduct[];
};
