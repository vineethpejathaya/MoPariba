type Money = {
  value: number;
  currency: string;
};

export type Discount = {
  amount: Money;
  label: string;
};

export type AppliedTax = {
  amount: Money;
  label: string;
};

export type Prices = {
  grand_total: Money;
  subtotal_including_tax: Money;
  subtotal_excluding_tax: Money;
  discounts: Discount[];
  applied_taxes: AppliedTax[];
};
