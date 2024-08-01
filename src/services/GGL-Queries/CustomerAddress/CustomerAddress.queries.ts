import {gql} from '@apollo/client';

export const GET_COUNTRIES = gql`
  query GetCountries {
    countries {
      id
      full_name_english
      full_name_locale
      three_letter_abbreviation
      two_letter_abbreviation
      available_regions {
        id
        code
        name
      }
    }
  }
`;

export const GET_CUSTOMER_ADDRESSES = gql`
  query GetCustomerAddresses {
    customer {
      firstname
      lastname
      email
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

export const UPDATE_CUSTOMER_ADDRESS = gql`
  mutation UpdateCustomerAddress($id: Int!, $input: CustomerAddressInput!) {
    updateCustomerAddress(id: $id, input: $input) {
      id
      region {
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
`;

export const CREATE_CUSTOMER_ADDRESS = gql`
  mutation CreateCustomerAddress($input: CustomerAddressInput!) {
    createCustomerAddress(input: $input) {
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
`;

export const GET_REGIONS_BY_COUNTRY = gql`
  query GetRegionsByCountry($countryCode: String!) {
    country(code: $countryCode) {
      regions {
        id
        code
        name
      }
    }
  }
`;

export const DELETE_CUSTOMER_ADDRESS = gql`
  mutation DeleteCustomerAddress($id: Int!) {
    deleteCustomerAddress(id: $id)
  }
`;
