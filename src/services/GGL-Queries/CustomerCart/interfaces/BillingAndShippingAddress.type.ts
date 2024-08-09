type Money = {
  value: number;
  currency: string;
};

type Country = {
  code: string;
  label: string;
};

type Region = {
  code?: string;
  label?: string;
  region_id?: number;
};

export type SelectedShippingMethod = {
  carrier_code: string;
  carrier_title: string;
  method_code: string;
  method_title: string;
  amount: Money;
  price_excl_tax: Money;
  price_incl_tax: Money;
};

export type ShippingAddress = {
  city: string;
  company?: string;
  country: Country;
  firstname: string;
  lastname: string;
  postcode?: string;
  region?: Region;
  street: string[];
  telephone?: string;
  uid: string;
  vat_id?: string;
  selected_shipping_method: SelectedShippingMethod;
};

export type BillingAddress = {
  city: string;
  company?: string;
  country: Country;
  firstname: string;
  lastname: string;
  postcode?: string;
  region?: Region;
  street: string[];
  telephone?: string;
  uid: string;
  vat_id?: string;
};
