import {gql} from '@apollo/client';

export const GET_CUSTOMER_DETAILS = gql`
  query GetCustomerDetails {
    customer {
      date_of_birth
      email
      firstname
      middlename
      lastname
      gender
      is_subscribed
      prefix
      suffix
      taxvat
    }
  }
`;

export const UPDATE_CUSTOMER_DETAILS = gql`
  mutation UpdateCustomerDetails($input: CustomerUpdateInput!) {
    updateCustomerV2(input: $input) {
      customer {
        allow_remote_shopping_assistance
        date_of_birth
        firstname
        middlename
        lastname
        gender
        is_subscribed
        prefix
        suffix
        taxvat
        email
      }
    }
  }
`;
