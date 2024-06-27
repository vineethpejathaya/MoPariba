// mutations.js
import {gql} from '@apollo/client';

export const LOGIN_MUTATION = gql`
  mutation generateCustomerToken($email: String!, $password: String!) {
    generateCustomerToken(email: $email, password: $password) {
      token
    }
  }
`;

export const CREATE_CUSTOMER_MUTATION = gql`
  mutation CreateCustomer($input: CustomerInput!) {
    createCustomer(input: $input) {
      customer {
        firstname
        lastname
        email
        is_subscribed
      }
    }
  }
`;
