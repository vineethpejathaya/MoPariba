export interface LoginMutationResponse {
  generateCustomerToken: {
    token: string;
  };
}

export interface CreateCustomerMutationResponse {
  createCustomer: {
    customer: {
      firstname: string;
      lastname: string;
      email: string;
      is_subscribed: boolean;
    };
  };
}
