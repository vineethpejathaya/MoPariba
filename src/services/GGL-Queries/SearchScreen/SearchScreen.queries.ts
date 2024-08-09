import {gql} from '@apollo/client';

export const SEARCH_PRODUCTS = gql`
  query SearchProducts(
    $search: String
    $filter: ProductAttributeFilterInput
    $pageSize: Int = 20
    $currentPage: Int = 1
    $sort: ProductAttributeSortInput
  ) {
    products(
      search: $search
      filter: $filter
      pageSize: $pageSize
      currentPage: $currentPage
      sort: $sort
    ) {
      items {
        uid
        name
        sku
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
`;
