import {gql} from '@apollo/client';

export const SET_ADDRESSES = gql`
  mutation SetAddressesOnCart(
    $cartId: String!
    $shippingAddresses: [ShippingAddressInput!]!
    $billingAddress: BillingAddressInput!
  ) {
    setShippingAddressesOnCart(
      input: {cart_id: $cartId, shipping_addresses: $shippingAddresses}
    ) {
      cart {
        shipping_addresses {
          firstname
          lastname
          company
          street
          city
          region {
            code
            label
          }
          postcode
          telephone
          country {
            code
            label
          }
          available_shipping_methods {
            carrier_code
            carrier_title
            method_code
            method_title
          }
        }
      }
    }
    setBillingAddressOnCart(
      input: {cart_id: $cartId, billing_address: $billingAddress}
    ) {
      cart {
        billing_address {
          firstname
          lastname
          company
          street
          city
          region {
            code
            label
          }
          postcode
          telephone
          country {
            code
            label
          }
        }
      }
    }
  }
`;

export const SET_SHIPPING_METHOD = gql`
  mutation setShippingMethodsOnCart($input: SetShippingMethodsOnCartInput!) {
    setShippingMethodsOnCart(input: $input) {
      cart {
        shipping_addresses {
          selected_shipping_method {
            carrier_code
            method_code
          }
        }
      }
    }
  }
`;

export const SET_PAYMENT_METHOD = gql`
  mutation setPaymentMethodOnCart($input: SetPaymentMethodOnCartInput!) {
    setPaymentMethodOnCart(input: $input) {
      cart {
        selected_payment_method {
          code
        }
      }
    }
  }
`;

export const PLACE_ORDER = gql`
  mutation placeOrder($input: PlaceOrderInput!) {
    placeOrder(input: $input) {
      order {
        order_number
      }
    }
  }
`;

export const PLACE_RAZORPAY_ORDER = gql`
  mutation placeRazorpayOrder($order_id: String!, $referrer: String!) {
    placeRazorpayOrder(order_id: $order_id, referrer: $referrer) {
      success
      rzp_order_id
      order_id
      amount
      currency
      message
    }
  }
`;
