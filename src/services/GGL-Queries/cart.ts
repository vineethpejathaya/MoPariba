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
        items {
          id
          product {
            name
            sku
            options_container
          }
          quantity
          ... on ConfigurableCartItem {
            configurable_options {
              id
              option_label
              value_label
              value_id
            }
          }
        }
      }
    }
  }
`;

export const GET_CUSTOMER_CART = gql`
  query GetCart($cart_id: String!) {
    cart(cart_id: $cart_id) {
      applied_coupons {
        code
      }
      available_payment_methods {
        code
        title
      }

      email
      gift_message {
        from
        to
        message
      }
      id
      is_virtual
      items {
        errors {
          code
          message
        }
        uid
        prices {
          price {
            value
            currency
          }
          row_total {
            value
            currency
          }
          discounts {
            amount {
              value
              currency
            }
          }
        }
        product {
          id
          name
          sku
          url_key
          image {
            url
            label
          }
          ... on ConfigurableProduct {
            configurable_options {
              attribute_code
              values {
                uid
                label
              }
            }
            variants {
              product {
                uid
                sku
                name
                image {
                  url
                  label
                }
                price_range {
                  minimum_price {
                    discount {
                      amount_off
                      percent_off
                    }
                    final_price {
                      value
                      currency
                    }
                  }
                  maximum_price {
                    discount {
                      amount_off
                      percent_off
                    }
                    final_price {
                      value
                      currency
                    }
                  }
                }
              }
            }
          }
        }
        quantity
      }
      prices {
        grand_total {
          value
          currency
        }
        subtotal_including_tax {
          value
          currency
        }
        applied_taxes {
          amount {
            value
            currency
          }
        }
        discounts {
          amount {
            value
            currency
          }
        }
      }
      selected_payment_method {
        code
        title
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
        }
        street
        telephone
      }
      total_quantity
    }
  }
`;

// billing_address {
//   city
//   company
//   country {
//     code
//     label
//   }
//   firstname
//   lastname
//   postcode
//   region {
//     code
//     label
//   }
//   street
//   telephone
// }

export const ADD_CONFIGURABLE_PRODUCTS_TO_CART = gql`
  mutation AddConfigurableProductsToCart(
    $cartId: String!
    $cartItems: [ConfigurableProductCartItemInput!]!
  ) {
    addConfigurableProductsToCart(
      input: {cart_id: $cartId, cart_items: $cartItems}
    ) {
      cart {
        items {
          id
          product {
            name
            sku
            options_container
            quantity
            ... on ConfigurableCartItem {
              configurable_options {
                id
                option_label
                value_label
                value_id
              }
            }
          }
        }
      }
    }
  }
`;
