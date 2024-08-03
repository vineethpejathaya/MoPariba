// interface GetCustomerOrdersVariables {
//   filter?: CustomerOrdersFilterInput;
//   currentPage?: number;
//   pageSize?: number;
//   sort?: CustomerOrderSortInput;
//   scope?: ScopeTypeEnum;
// }

export interface GetCustomerOrdersResponse {
  customer: {
    orders: {
      items: CustomerOrder[];
      page_info: {
        current_page: number;
        total_pages: number;
      };
      total_count: number;
    };
  };
}

export interface CustomerOrder {
  id: string;
  number: string;
  order_date: string;
  status: string;
  shipping_method: string;
  total: {
    grand_total: {
      value: number;
      currency: string;
    };
  };
  items: OrderItem[];
}

export interface OrderItem {
  id: string;
  product_name: string;
  product_sku: string;
  quantity_ordered: number;
  product_sale_price: {
    value: number;
    currency: string;
  };
}
