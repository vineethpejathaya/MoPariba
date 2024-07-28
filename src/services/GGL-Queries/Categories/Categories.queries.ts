import gql from 'graphql-tag';

export const GET_CATEGORIES_BY_UID = gql`
  query GetCategories($categoryUid: String!) {
    categories(
      filters: {category_uid: {eq: $categoryUid}}
      pageSize: 10
      currentPage: 1
    ) {
      total_count
      items {
        uid
        level
        name
        path
        url_key
        include_in_menu
        sw_menu_icon_img
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

export const GET_CATEGORIES_LIST = gql`
  query GetCategories(
    $categoryUid: String
    $parentId: [String!]
    $pageSize: Int
    $currentPage: Int
  ) {
    categories(
      filters: {category_uid: {eq: $categoryUid}, parent_id: {in: $parentId}}
      pageSize: $pageSize
      currentPage: $currentPage
    ) {
      total_count
      items {
        uid
        level
        name
        path
        url_key
        include_in_menu
        children_count
        sw_menu_icon_img
        children {
          uid
          level
          name
          path
          url_key
          include_in_menu
          sw_menu_icon_img
          children_count
        }
      }
      page_info {
        current_page
        page_size
        total_pages
      }
    }
  }
`;
