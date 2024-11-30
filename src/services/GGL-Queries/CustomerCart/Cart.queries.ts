import {gql} from '@apollo/client';

export const GET_CUSTOMER_CART = gql`
  query GetCart($cart_id: String!) {
    cart(cart_id: $cart_id) {
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
`;
