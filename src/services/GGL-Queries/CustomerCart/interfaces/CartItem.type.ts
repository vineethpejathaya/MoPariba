export interface ProductImage {
  url: string;
  label: string | null;
}

export type ProductType = 'ConfigurableProduct' | 'SimpleProduct';
export interface Product {
  __typename: ProductType;
  name: string;
  sku: string;
  image: ProductImage;
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

export type cartItemType = 'ConfigurableCartItem' | 'SimpleCartItem';
export interface CartItem {
  __typename: cartItemType;
  id: string;
  uid: string;
  quantity: number;
  product: Product;
  prices: CartItemPrices;
  configured_variant?: ConfiguredVariant;
  configurable_options?: ConfigurableOption[];
}
