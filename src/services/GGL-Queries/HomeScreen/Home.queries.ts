import gql from 'graphql-tag';

export const GET_CATEGORIES = gql`
  query GetCategories($parentId: [String!], $pageSize: Int, $currentPage: Int) {
    categories(
      filters: {parent_id: {in: $parentId}}
      pageSize: $pageSize
      currentPage: $currentPage
    ) {
      total_count
      items {
        uid
        level
        name
        path
        image
        url_key
        include_in_menu
        children_count
      }
      page_info {
        current_page
        page_size
        total_pages
      }
    }
  }
`;

export const GET_CUSTOMER_DETAILS = gql`
  query GetCustomerDetails {
    customer {
      firstname
      lastname
      suffix
      email
      date_of_birth
      gender
      addresses {
        id
        region {
          region_id
          region_code
          region
        }
        country_code
        street
        telephone
        postcode
        city
        firstname
        lastname
        default_shipping
        default_billing
      }
    }
  }
`;

export const GET_HOME_SCREEN_DATA = gql`
  query GetCombinedData(
    $parentId: [String!]
    $pageSize: Int
    $currentPage: Int
  ) {
    categories(
      filters: {parent_id: {in: $parentId}}
      pageSize: $pageSize
      currentPage: $currentPage
    ) {
      total_count
      items {
        uid
        level
        name
        path
        image
        url_key
        include_in_menu
        children_count
      }
      page_info {
        current_page
        page_size
        total_pages
      }
    }
    customer {
      firstname
      lastname
      suffix
      email
      gender
      date_of_birth
      addresses {
        firstname
        lastname
        street
        city
        region {
          region_code
          region
        }
        postcode
        country_code
        telephone
      }
    }
  }
`;

export const GET_DAILY_DEAL_PRODUCTS = gql`
  query GetDailyDealProducts {
    dailyDealProducts {
      name
      image
      sku
      price
      discount_type
      discount_type_label
      discount
      final_price
      you_saved
      from_date
      to_date
    }
  }
`;
