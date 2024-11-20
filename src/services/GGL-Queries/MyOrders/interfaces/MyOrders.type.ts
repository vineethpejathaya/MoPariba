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

// Get Order by order number

export interface GetCustomerOrderByNumberResponse {
  customer: {
    firstname: string;
    lastname: string;
    email: string;
    orders: {
      items: OrderListItem[];
    };
  };
}

export type OrderListItem = {
  id: string;
  number: string;
  order_date: string;
  status: string;
  shipping_address?: Address;
  billing_address?: Address;
  payment_methods: Array<PaymentMethod>;
  shipping_method?: string;
  items: Array<OrderItem>;
  total: OrderTotal;
};

export interface Address {
  firstname: string;
  lastname: string;
  street: string[];
  city: string;
  region: string;
  postcode: string;
  country_code: string;
}

export interface PaymentMethod {
  name: string;
  type: string;
}

export interface OrderTotal {
  subtotal: {
    value: number;
    currency: string;
  };
  grand_total: {
    value: number;
    currency: string;
  };
  platform_fee?: {
    value: number;
    currency: string;
  };
  total_shipping: {
    value: number;
    currency: string;
  };
  total_tax: {
    value: number;
    currency: string;
  };
  discounts?: Array<{
    amount: {
      value: number;
      currency: string;
    };
  }>;
}
