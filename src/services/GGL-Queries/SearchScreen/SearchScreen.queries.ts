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
        id
        name
        description
        price
        sku
        short_description
        category_uid
      }
      aggregations {
        attribute_code
        label
        options {
          value
          count
        }
      }
      page_info {
        currentPage
        totalPages
      }
      total_count
      suggestions {
        query
        suggestion
      }
    }
  }
`;
