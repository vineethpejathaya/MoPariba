export interface CategoryItem {
  uid: string;
  level: number;
  name: string;
  path: string;
  image: string;
  url_key: string;
  include_in_menu: boolean;
  sw_menu_icon_img: string;
  children_count: number;
}

export interface Categories {
  total_count: number;
  items: CategoryItem[];
  page_info: {
    current_page: number;
    page_size: number;
    total_pages: number;
  };
}
