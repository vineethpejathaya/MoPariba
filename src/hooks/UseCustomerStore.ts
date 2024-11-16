import {create} from 'zustand';
import {devtools} from 'zustand/middleware';
import {CustomerAddress} from '../services/GGL-Queries/CustomerAddress/CustomerAddress.type';

interface Customer {
  firstname: string;
  lastname: string;
  email: string;
  gender?: number | null;
  addresses: CustomerAddress[];
  defaultAddress?: CustomerAddress | null;
}

interface CustomerState {
  customer: Customer | null;
  setCustomer: (customer: Omit<Customer, 'defaultAddress'>) => void;
  setAddresses: (addresses: CustomerAddress[]) => void;
  initializeCustomer: (customer: Omit<Customer, 'defaultAddress'>) => void;
}

const useCustomerStore = create<CustomerState>()(
  devtools((set, get) => ({
    customer: null,

    setCustomer: customer => {
      set({
        customer: {
          ...customer,
        },
      });
    },

    setAddresses: addresses => {
      set(state => ({
        customer: {
          ...state.customer,
          addresses,
          defaultAddress:
            addresses.length > 0
              ? addresses?.find(address => address.default_billing) ?? null
              : null,
        } as Customer,
      }));
    },

    initializeCustomer: customer => {
      set({
        customer: {
          firstname: customer?.firstname,
          lastname: customer?.lastname,
          email: customer?.email,
          gender: customer?.gender,
          addresses: customer?.addresses ?? [],
          defaultAddress:
            customer.addresses.length > 0
              ? customer?.addresses?.find(address => address.default_billing) ??
                null
              : null,
        },
      });
    },
  })),
);

export {useCustomerStore};
