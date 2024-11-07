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

export const GENERATE_OTP_FOR_LOGIN = gql`
  mutation GenerateMobileLoginOtp($mobile_number: String!) {
    generateMobileLoginOtp(mobile_number: $mobile_number)
  }
`;

export const GENERATE_LOGIN_TOKEN_WITH_OTP = gql`
  mutation GenerateLoginTokenWithMobileOtp(
    $mobile_number: String!
    $login_otp: String!
  ) {
    generateLoginTokenWithMobileOtp(
      mobile_number: $mobile_number
      login_otp: $login_otp
    )
  }
`;
