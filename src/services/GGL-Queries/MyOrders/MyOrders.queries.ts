import {gql} from '@apollo/client';

export const GET_CUSTOMER_ORDERS = gql`
  query GetCustomerOrders(
    $filter: CustomerOrdersFilterInput
    $currentPage: Int = 1
    $pageSize: Int = 20
    $sort: CustomerOrderSortInput
    $scope: ScopeTypeEnum = STORE
  ) {
    customer {
      orders(
        filter: $filter
        currentPage: $currentPage
        pageSize: $pageSize
        sort: $sort
        scope: $scope
      ) {
        items {
          id
          number
          order_date
          status
          total {
            grand_total {
              value
              currency
            }
          }
          items {
            id
            product_name
            product_sku
            quantity_ordered
            product_sale_price {
              value
              currency
            }
          }
        }
        page_info {
          current_page
          total_pages
        }
        total_count
      }
    }
  }
`;

export const GET_CUSTOMER_ORDER_BY_NUMBER = gql`
  query GetCustomerOrderByNumber($orderNumber: String!) {
    customer {
      firstname
      lastname
      email
      orders(filter: {number: {eq: $orderNumber}}) {
        items {
          id
          number
          order_date
          status
          shipping_address {
            firstname
            lastname
            street
            city
            region
            postcode
            country_code
          }
          billing_address {
            firstname
            lastname
            street
            city
            region
            postcode
            country_code
          }
          payment_methods {
            name
            type
          }
          shipping_method
          items {
            product_name
            product_sku
            quantity_ordered
            product_sale_price {
              value
              currency
            }
          }
          total {
            subtotal {
              value
              currency
            }
            grand_total {
              value
              currency
            }
            platform_fee {
              value
              currency
            }
            total_shipping {
              value
              currency
            }
            total_tax {
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
        }
      }
    }
  }
`;
