export type AddressComponent = {
  long_name: string;
  short_name: string;
  types: string[];
};

export type OpeningHoursPeriod = {
  open_now: boolean;
  periods: {
    open: {day: number; time: string};
    close: {day: number; time: string};
  }[];
  weekday_text: string[];
};

export type Geometry = {
  location: {
    lat: number;
    lng: number;
  };
  viewport: {
    northeast: {lat: number; lng: number};
    southwest: {lat: number; lng: number};
  };
};

export type Photo = {
  height: number;
  html_attributions: string[];
  photo_reference: string;
  width: number;
};

export type Review = {
  author_name: string;
  author_url: string;
  language: string;
  original_language: string;
  profile_photo_url: string;
  rating: number;
  relative_time_description: string;
  text: string;
  time: number;
  translated: boolean;
};

export type PlusCode = {
  compound_code: string;
  global_code: string;
};

export type GooglePlaceResponse = {
  address_components: AddressComponent[];
  adr_address: string;
  business_status: string;
  current_opening_hours: OpeningHoursPeriod;
  formatted_address: string;
  formatted_phone_number: string;
  geometry: Geometry;
  icon: string;
  icon_background_color: string;
  icon_mask_base_uri: string;
  international_phone_number: string;
  name: string;
  opening_hours: OpeningHoursPeriod;
  photos: Photo[];
  place_id: string;
  plus_code: PlusCode;
  rating: number;
  reference: string;
  reviews: Review[];
  types: string[];
  url: string;
  user_ratings_total: number;
  utc_offset: number;
  vicinity: string;
  website: string;
  wheelchair_accessible_entrance: boolean;
};
