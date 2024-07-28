export type ProductImage = {
  url: string;
  label: string;
};

export interface Money {
  value: number;
  currency: string;
}

export type Price = {
  discount: {
    amount_off: number;
    percent_off: number;
  };
  final_price: Money;
};

export type ConfigurableOptionValue = {
  uid: string;
  label: string;
};

export type ConfigurableOption = {
  attribute_code: string;
  values: ConfigurableOptionValue[];
};

export type ConfigurableVariant = {
  __typename: 'ConfigurableVariant';
  product: {
    uid: string;
    sku: string;
    name: string;
    image: ProductImage;
    price_range: {
      minimum_price: Price;
      maximum_price: Price;
    };
  };
};

export type Product = {
  __typename: 'ConfigurableProduct' | 'SimpleProduct';
  uid: string;
  name: string;
  image: ProductImage;
  sku: string;
  meta_description: string;
  description: {
    html: string;
  };
  short_description: {
    html: string;
  };
  price_range: {
    minimum_price: Price;
    maximum_price: Price;
  };
  configurable_options: ConfigurableOption[];
  variants: ConfigurableVariant[];
  review_count: number;
  url_key: string;
};

export type PageInfo = {
  current_page: number;
  page_size: number;
  total_pages: number;
};

export type ProductsData = {
  total_count: number;
  items: Product[];
  page_info: PageInfo;
};

export type GetProductsResponse = {
  products: ProductsData;
};
