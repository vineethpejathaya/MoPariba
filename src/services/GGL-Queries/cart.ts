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

      email

      id
      is_virtual
      items {
        uid
        quantity
        product {
          name
          sku
          image {
            url
            label
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
      prices {
        grand_total {
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
        }
        applied_taxes {
          amount {
            value
            currency
          }
        }
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
          uid
          quantity
          product {
            name
            sku
            image {
              url
              label
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
      }
    }
  }
`;
