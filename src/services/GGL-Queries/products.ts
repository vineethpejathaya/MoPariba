import {gql} from '@apollo/client';

export const GET_PRODUCTS_BY_CATEGORY_ID = gql`
  query GetProducts(
    $categoryUid: String!
    $pageSize: Int!
    $currentPage: Int!
  ) {
    products(
      filter: {category_uid: {eq: $categoryUid}}
      pageSize: $pageSize
      currentPage: $currentPage
    ) {
      total_count
      items {
        uid
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
        url_key
      }
      page_info {
        current_page
        page_size
        total_pages
      }
    }
  }
`;
