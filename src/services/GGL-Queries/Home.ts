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
