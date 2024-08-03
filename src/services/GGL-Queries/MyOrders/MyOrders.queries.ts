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
          shipping_method
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
