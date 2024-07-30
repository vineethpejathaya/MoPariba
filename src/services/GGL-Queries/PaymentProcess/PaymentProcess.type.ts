export interface ShippingAddressInput {
  firstname: string;
  lastname: string;
  company?: string;
  street: string[];
  city: string;
  region: {
    code: string;
    label: string;
  };
  postcode: string;
  telephone: string;
  country: {
    code: string;
    label: string;
  };
}

export interface BillingAddressInput {
  firstname: string;
  lastname: string;
  company?: string;
  street: string[];
  city: string;
  region: {
    code: string;
    label: string;
  };
  postcode: string;
  telephone: string;
  country: {
    code: string;
    label: string;
  };
}

export interface SetAddressesOnCartVariables {
  cartId: string;
  shippingAddresses: ShippingAddressInput[];
  billingAddress: BillingAddressInput;
}

export interface SetAddressesOnCartResponse {
  setShippingAddressesOnCart: {
    cart: {
      shipping_addresses: Array<{
        firstname: string;
        lastname: string;
        company?: string;
        street: string[];
        city: string;
        region: {
          code: string;
          label: string;
        };
        postcode: string;
        telephone: string;
        country: {
          code: string;
          label: string;
        };
        available_shipping_methods: Array<{
          carrier_code: string;
          carrier_title: string;
          method_code: string;
          method_title: string;
        }>;
      }>;
    };
  };
  setBillingAddressOnCart: {
    cart: {
      billing_address: {
        firstname: string;
        lastname: string;
        company?: string;
        street: string[];
        city: string;
        region: {
          code: string;
          label: string;
        };
        postcode: string;
        telephone: string;
        country: {
          code: string;
          label: string;
        };
      };
    };
  };
}

export interface SetShippingMethodsOnCartInput {
  cart_id: string;
  shipping_methods: Array<{
    carrier_code: string;
    method_code: string;
  }>;
}

export interface SetShippingMethodsOnCartVariables {
  input: SetShippingMethodsOnCartInput;
}

export interface SetShippingMethodsOnCartResponse {
  setShippingMethodsOnCart: {
    cart: {
      shipping_addresses: Array<{
        selected_shipping_method: {
          carrier_code: string;
          method_code: string;
        };
      }>;
    };
  };
}

export interface SetPaymentMethodOnCartInput {
  cart_id: string;
  payment_method: {
    code: string;
  };
}

export interface SetPaymentMethodOnCartVariables {
  input: SetPaymentMethodOnCartInput;
}

export interface SetPaymentMethodOnCartResponse {
  setPaymentMethodOnCart: {
    cart: {
      selected_payment_method: {
        code: string;
      };
    };
  };
}

export interface PlaceOrderInput {
  cart_id: string;
}

export interface PlaceOrderVariables {
  input: PlaceOrderInput;
}

export interface PlaceOrderResponse {
  placeOrder: {
    order: {
      order_number: string;
    };
  };
}

export interface PlaceRazorpayOrderVariables {
  order_id: string;
  referrer: string;
}

export interface PlaceRazorpayOrderResponse {
  placeRazorpayOrder: {
    success: boolean;
    rzp_order_id: string;
    order_id: string;
    amount: number;
    currency: string;
    message: string;
  };
}
