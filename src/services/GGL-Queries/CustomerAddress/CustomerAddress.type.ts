export interface GetCustomerAddressesResponse {
  customer: {
    id: string;
    firstname: string;
    lastname: string;
    email: string;
    addresses: Array<{
      id: string;
      region: {
        region_code: string;
        region: string;
      };
      country_code: string;
      street: string[];
      telephone: string;
      postcode: string;
      city: string;
      firstname: string;
      lastname: string;
      default_shipping: boolean;
      default_billing: boolean;
    }>;
  };
}

export interface Region {
  region_code: string;
  region: string;
}

export interface CustomerAddress {
  id: number;
  region: Region;
  country_code: string;
  street: string[];
  telephone: string;
  postcode: string;
  city: string;
  firstname: string;
  lastname: string;
  default_shipping: boolean;
  default_billing: boolean;
}

export interface UpdateCustomerAddressResponse {
  updateCustomerAddress: CustomerAddress;
}

export interface UpdateCustomerAddressVariables {
  id: number;
  input: {
    region: {
      region_code: string;
      region: string;
    };
    country_code: string;
    street: string[];
    telephone: string;
    postcode: string;
    city: string;
    firstname: string;
    lastname: string;
    default_shipping: boolean;
    default_billing: boolean;
  };
}

export interface CountryRegion {
  id: string;
  code: string;
  name: string;
}

export interface Country {
  id: string;
  full_name_english: string;
  full_name_locale: string;
  three_letter_abbreviation: string;
  two_letter_abbreviation: string;
  available_regions: CountryRegion[];
}

export interface GetCountriesData {
  countries: Country[];
}
