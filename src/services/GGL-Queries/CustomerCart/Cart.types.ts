export interface ProductImage {
  url: string;
  label: string | null;
}

export interface Product {
  name: string;
  sku: string;
  image: ProductImage | null;
}

export interface Money {
  value: number;
  currency: string;
}

export interface PriceRange {
  minimum_price: {
    final_price: Money;
  };
}

export interface ConfiguredVariant {
  sku: string;
  name: string;
  price_range: PriceRange;
}

export interface ConfigurableOption {
  option_label: string;
  value_label: string;
}

export interface CartItemPrices {
  row_total_including_tax: Money;
  total_item_discount: Money;
}

export interface CartItem {
  __typename: 'ConfigurableCartItem';
  id: string;
  uid: string;
  quantity: number;
  product: Product;
  prices: CartItemPrices;
  configured_variant?: ConfiguredVariant;
  configurable_options?: ConfigurableOption[];
}

export interface Prices {
  grand_total: {
    value: number;
    currency: string;
  };
  subtotal_excluding_tax: {
    value: number;
    currency: string;
  };
  discounts?: Array<{
    amount: {
      value: number;
      currency: string;
    };
  }>;
  applied_taxes?: Array<{
    amount: {
      value: number;
      currency: string;
    };
  }>;
}
export interface Cart {
  items: CartItem[];
  prices: Prices;
  total_quantity: number;
  applied_coupons?: Array<{
    code: string;
  }>;
  email: string;
  id: string;
  is_virtual: boolean;
}

export interface UpdateCartItemsResponse {
  updateCartItems: {
    cart: Cart;
  };
}

export type RemoveItemFromCartResponse = {
  removeItemFromCart: {
    cart: Cart;
  };
};

export type AddConfigurableProductsToCartResponse = {
  addConfigurableProductsToCart: {
    cart: Cart;
  };
};

export type GetCustomerCartResponse = {
  cart: Cart;
};
