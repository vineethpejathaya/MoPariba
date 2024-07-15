export interface CategoryItemInterface {
  uid: string;
  level: number;
  name: string;
  path: string;
  image: string;
  url_key: string;
  include_in_menu: boolean;
  sw_menu_icon_img: string;
  children_count: number;
  children: CategoryItemInterface[];
}

export interface Categories {
  total_count: number;
  items: CategoryItemInterface[];
  page_info: {
    current_page: number;
    page_size: number;
    total_pages: number;
  };
}
