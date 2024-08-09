import {
  BillingAddress,
  ShippingAddress,
} from './BillingAndShippingAddress.type';
import {CartItem} from './CartItem.type';
import {Prices} from './Prices.type';

export type SelectedPaymentMethod = {
  code: string;
  purchase_order_number?: string;
  title: string;
};

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
  billing_address: BillingAddress;
  selected_payment_method: SelectedPaymentMethod;
  shipping_addresses: ShippingAddress[];
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
