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
        sku
        image {
          url
          label
        }
        is_daily_deal_product
        daily_deal_info {
          discount_type
          discount_type_label
          from_date
          to_date
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
              is_daily_deal_product
              daily_deal_info {
                discount_type
                discount_type_label
                from_date
                to_date
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

export const GET_PRODUCT_DETAILS = gql`
  query GetProductDetails($sku: String!, $pageSize: Int!, $currentPage: Int!) {
    products(
      filter: {sku: {eq: $sku}}
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
        is_daily_deal_product
        daily_deal_info {
          discount_type
          discount_type_label
          from_date
          to_date
        }
        sku
        only_x_left_in_stock
        rating_summary
        meta_description
        description {
          html
        }
        short_description {
          html
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
              is_daily_deal_product
              daily_deal_info {
                discount_type
                discount_type_label
                from_date
                to_date
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
        review_count
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
