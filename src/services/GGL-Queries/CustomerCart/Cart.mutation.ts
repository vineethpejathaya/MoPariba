import {gql} from '@apollo/client';

export const CREATE_CART_MUTATION = gql`
  mutation CreateCustomerCart {
    createEmptyCart
  }
`;

export const ADD_TO_CART = gql`
  mutation AddToCart($customerId: ID!, $productId: ID!, $quantity: Int!) {
    addToCart(
      customerId: $customerId
      productId: $productId
      quantity: $quantity
    ) {
      id
      items {
        id
        product {
          id
          name
          price
        }
        quantity
      }
    }
  }
`;

export const ADD_TO_CART_MUTATION = gql`
  mutation AddToCart(
    $cartId: String!
    $parentSku: String!
    $quantity: Int!
    $sku: String!
  ) {
    addConfigurableProductsToCart(
      input: {
        cart_id: $cartId
        cart_items: [
          {parent_sku: $parentSku, data: {quantity: $quantity, sku: $sku}}
        ]
      }
    ) {
      cart {
        applied_coupons {
          code
        }
        available_payment_methods {
          code
          is_deferred
          title
        }
        email
        id
        is_virtual
        billing_address {
          city
          company
          country {
            code
            label
          }
          firstname
          lastname
          postcode
          region {
            code
            label
            region_id
          }
          street
          telephone
          uid
          vat_id
        }
        items {
          __typename
          id
          uid
          quantity
          product {
            name
            sku
            image {
              url
              label
            }
            ... on ConfigurableProduct {
              variants {
                product {
                  uid
                  sku
                  name
                  image {
                    url
                    label
                  }
                }
              }
            }
          }
          prices {
            row_total_including_tax {
              value
              currency
            }
            total_item_discount {
              value
              currency
            }
          }
          ... on ConfigurableCartItem {
            configured_variant {
              sku
              name
              price_range {
                minimum_price {
                  final_price {
                    value
                    currency
                  }
                }
              }
            }
            configurable_options {
              option_label
              value_label
            }
          }
        }
        shipping_addresses {
          city
          company
          country {
            code
            label
          }
          firstname
          lastname
          postcode
          region {
            code
            label
            region_id
          }
          street
          telephone
          uid
          vat_id
          selected_shipping_method {
            carrier_code
            carrier_title
            method_code
            method_title
            amount {
              value
              currency
            }
            price_excl_tax {
              value
              currency
            }
            price_incl_tax {
              value
              currency
            }
          }
        }
        prices {
          grand_total {
            value
            currency
          }
          platform_fee {
            amount {
              value
              currency
            }
          }
          subtotal_including_tax {
            value
            currency
          }
          subtotal_excluding_tax {
            value
            currency
          }
          discounts {
            amount {
              value
              currency
            }
            label
          }
          applied_taxes {
            amount {
              value
              currency
            }
            label
          }
        }

        total_quantity
      }
    }
  }
`;

export const ADD_CONFIGURABLE_PRODUCTS_TO_CART = gql`
  mutation AddConfigurableProductsToCart(
    $cartId: String!
    $cartItems: [ConfigurableProductCartItemInput!]!
  ) {
    addConfigurableProductsToCart(
      input: {cart_id: $cartId, cart_items: $cartItems}
    ) {
      cart {
        applied_coupons {
          code
        }
        available_payment_methods {
          code
          is_deferred
          title
        }
        email
        id
        is_virtual
        billing_address {
          city
          company
          country {
            code
            label
          }
          firstname
          lastname
          postcode
          region {
            code
            label
            region_id
          }
          street
          telephone
          uid
          vat_id
        }
        items {
          __typename
          id
          uid
          quantity
          product {
            name
            sku
            image {
              url
              label
            }
            ... on ConfigurableProduct {
              variants {
                product {
                  uid
                  sku
                  name
                  image {
                    url
                    label
                  }
                }
              }
            }
          }
          prices {
            row_total_including_tax {
              value
              currency
            }
            total_item_discount {
              value
              currency
            }
          }
          ... on ConfigurableCartItem {
            configured_variant {
              sku
              name
              price_range {
                minimum_price {
                  final_price {
                    value
                    currency
                  }
                }
              }
            }
            configurable_options {
              option_label
              value_label
            }
          }
        }
        shipping_addresses {
          city
          company
          country {
            code
            label
          }
          firstname
          lastname
          postcode
          region {
            code
            label
            region_id
          }
          street
          telephone
          uid
          vat_id
          selected_shipping_method {
            carrier_code
            carrier_title
            method_code
            method_title
            amount {
              value
              currency
            }
            price_excl_tax {
              value
              currency
            }
            price_incl_tax {
              value
              currency
            }
          }
        }
        prices {
          grand_total {
            value
            currency
          }
          platform_fee {
            amount {
              value
              currency
            }
          }
          subtotal_including_tax {
            value
            currency
          }
          subtotal_excluding_tax {
            value
            currency
          }
          discounts {
            amount {
              value
              currency
            }
            label
          }
          applied_taxes {
            amount {
              value
              currency
            }
            label
          }
        }

        total_quantity
      }
    }
  }
`;

export const REMOVE_ITEM_FROM_CART = gql`
  mutation RemoveItemFromCart($cartId: String!, $cartItemId: Int!) {
    removeItemFromCart(input: {cart_id: $cartId, cart_item_id: $cartItemId}) {
      cart {
        applied_coupons {
          code
        }
        available_payment_methods {
          code
          is_deferred
          title
        }
        email
        id
        is_virtual
        billing_address {
          city
          company
          country {
            code
            label
          }
          firstname
          lastname
          postcode
          region {
            code
            label
            region_id
          }
          street
          telephone
          uid
          vat_id
        }
        items {
          __typename
          id
          uid
          quantity
          product {
            name
            sku
            image {
              url
              label
            }
            ... on ConfigurableProduct {
              variants {
                product {
                  uid
                  sku
                  name
                  image {
                    url
                    label
                  }
                }
              }
            }
          }
          prices {
            row_total_including_tax {
              value
              currency
            }
            total_item_discount {
              value
              currency
            }
          }
          ... on ConfigurableCartItem {
            configured_variant {
              sku
              name
              price_range {
                minimum_price {
                  final_price {
                    value
                    currency
                  }
                }
              }
            }
            configurable_options {
              option_label
              value_label
            }
          }
        }
        shipping_addresses {
          city
          company
          country {
            code
            label
          }
          firstname
          lastname
          postcode
          region {
            code
            label
            region_id
          }
          street
          telephone
          uid
          vat_id
          selected_shipping_method {
            carrier_code
            carrier_title
            method_code
            method_title
            amount {
              value
              currency
            }
            price_excl_tax {
              value
              currency
            }
            price_incl_tax {
              value
              currency
            }
          }
        }
        prices {
          grand_total {
            value
            currency
          }
          platform_fee {
            amount {
              value
              currency
            }
          }
          subtotal_including_tax {
            value
            currency
          }
          subtotal_excluding_tax {
            value
            currency
          }
          discounts {
            amount {
              value
              currency
            }
            label
          }
          applied_taxes {
            amount {
              value
              currency
            }
            label
          }
        }

        total_quantity
      }
    }
  }
`;

export const UPDATE_CART_ITEMS = gql`
  mutation UpdateCartItems(
    $cartId: String!
    $cartItems: [CartItemUpdateInput!]!
  ) {
    updateCartItems(input: {cart_id: $cartId, cart_items: $cartItems}) {
      cart {
        applied_coupons {
          code
        }
        available_payment_methods {
          code
          is_deferred
          title
        }
        email
        id
        is_virtual
        billing_address {
          city
          company
          country {
            code
            label
          }
          firstname
          lastname
          postcode
          region {
            code
            label
            region_id
          }
          street
          telephone
          uid
          vat_id
        }
        items {
          __typename
          id
          uid
          quantity
          product {
            name
            sku
            image {
              url
              label
            }
            ... on ConfigurableProduct {
              variants {
                product {
                  uid
                  sku
                  name
                  image {
                    url
                    label
                  }
                }
              }
            }
          }
          prices {
            row_total_including_tax {
              value
              currency
            }
            total_item_discount {
              value
              currency
            }
          }
          ... on ConfigurableCartItem {
            configured_variant {
              sku
              name
              price_range {
                minimum_price {
                  final_price {
                    value
                    currency
                  }
                }
              }
            }
            configurable_options {
              option_label
              value_label
            }
          }
        }
        shipping_addresses {
          city
          company
          country {
            code
            label
          }
          firstname
          lastname
          postcode
          region {
            code
            label
            region_id
          }
          street
          telephone
          uid
          vat_id
          selected_shipping_method {
            carrier_code
            carrier_title
            method_code
            method_title
            amount {
              value
              currency
            }
            price_excl_tax {
              value
              currency
            }
            price_incl_tax {
              value
              currency
            }
          }
        }
        prices {
          grand_total {
            value
            currency
          }
          platform_fee {
            amount {
              value
              currency
            }
          }
          subtotal_including_tax {
            value
            currency
          }
          subtotal_excluding_tax {
            value
            currency
          }
          discounts {
            amount {
              value
              currency
            }
            label
          }
          applied_taxes {
            amount {
              value
              currency
            }
            label
          }
        }

        total_quantity
      }
    }
  }
`;

export const CLEAR_CUSTOMER_CART = gql`
  mutation ClearCustomerCart($cartUid: String!) {
    clearCustomerCart(cartUid: $cartUid) {
      status
    }
  }
`;

export const APPLY_COUPON_TO_CART = gql`
  mutation ApplyCouponToCart($cartId: String!, $couponCode: String!) {
    applyCouponToCart(input: {cart_id: $cartId, coupon_code: $couponCode}) {
      cart {
        applied_coupons {
          code
        }
        available_payment_methods {
          code
          is_deferred
          title
        }
        email
        id
        is_virtual
        billing_address {
          city
          company
          country {
            code
            label
          }
          firstname
          lastname
          postcode
          region {
            code
            label
            region_id
          }
          street
          telephone
          uid
          vat_id
        }
        items {
          __typename
          id
          uid
          quantity
          product {
            name
            sku
            image {
              url
              label
            }
            ... on ConfigurableProduct {
              variants {
                product {
                  uid
                  sku
                  name
                  image {
                    url
                    label
                  }
                }
              }
            }
          }
          prices {
            row_total_including_tax {
              value
              currency
            }
            total_item_discount {
              value
              currency
            }
          }
          ... on ConfigurableCartItem {
            configured_variant {
              sku
              name
              price_range {
                minimum_price {
                  final_price {
                    value
                    currency
                  }
                }
              }
            }
            configurable_options {
              option_label
              value_label
            }
          }
        }
        shipping_addresses {
          city
          company
          country {
            code
            label
          }
          firstname
          lastname
          postcode
          region {
            code
            label
            region_id
          }
          street
          telephone
          uid
          vat_id
          selected_shipping_method {
            carrier_code
            carrier_title
            method_code
            method_title
            amount {
              value
              currency
            }
            price_excl_tax {
              value
              currency
            }
            price_incl_tax {
              value
              currency
            }
          }
        }
        prices {
          grand_total {
            value
            currency
          }
          platform_fee {
            amount {
              value
              currency
            }
          }
          subtotal_including_tax {
            value
            currency
          }
          subtotal_excluding_tax {
            value
            currency
          }
          discounts {
            amount {
              value
              currency
            }
            label
          }
          applied_taxes {
            amount {
              value
              currency
            }
            label
          }
        }

        total_quantity
      }
    }
  }
`;

export const REMOVE_COUPON_FROM_CART = gql`
  mutation RemoveCouponFromCart($input: RemoveCouponFromCartInput!) {
    removeCouponFromCart(input: $input) {
      cart {
        applied_coupons {
          code
        }
        available_payment_methods {
          code
          is_deferred
          title
        }
        email
        id
        is_virtual
        billing_address {
          city
          company
          country {
            code
            label
          }
          firstname
          lastname
          postcode
          region {
            code
            label
            region_id
          }
          street
          telephone
          uid
          vat_id
        }
        items {
          __typename
          id
          uid
          quantity
          product {
            name
            sku
            image {
              url
              label
            }
            ... on ConfigurableProduct {
              variants {
                product {
                  uid
                  sku
                  name
                  image {
                    url
                    label
                  }
                }
              }
            }
          }
          prices {
            row_total_including_tax {
              value
              currency
            }
            total_item_discount {
              value
              currency
            }
          }
          ... on ConfigurableCartItem {
            configured_variant {
              sku
              name
              price_range {
                minimum_price {
                  final_price {
                    value
                    currency
                  }
                }
              }
            }
            configurable_options {
              option_label
              value_label
            }
          }
        }
        shipping_addresses {
          city
          company
          country {
            code
            label
          }
          firstname
          lastname
          postcode
          region {
            code
            label
            region_id
          }
          street
          telephone
          uid
          vat_id
          selected_shipping_method {
            carrier_code
            carrier_title
            method_code
            method_title
            amount {
              value
              currency
            }
            price_excl_tax {
              value
              currency
            }
            price_incl_tax {
              value
              currency
            }
          }
        }
        prices {
          grand_total {
            value
            currency
          }
          platform_fee {
            amount {
              value
              currency
            }
          }
          subtotal_including_tax {
            value
            currency
          }
          subtotal_excluding_tax {
            value
            currency
          }
          discounts {
            amount {
              value
              currency
            }
            label
          }
          applied_taxes {
            amount {
              value
              currency
            }
            label
          }
        }

        total_quantity
      }
    }
  }
`;
