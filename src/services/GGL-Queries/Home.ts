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
