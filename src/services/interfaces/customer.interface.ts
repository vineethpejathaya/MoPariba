export interface Address {
  firstname: string;
  lastname: string;
  street: string[];
  city: string;
  region: {
    region_code: string;
    region: string;
  };
  postcode: string;
  country_code: string;
  telephone: string;
}

export interface Customer {
  firstname: string;
  lastname: string;
  suffix: string;
  email: string;
  addresses: Address[];
}
