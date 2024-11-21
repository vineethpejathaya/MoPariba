import {create} from 'zustand';
import {devtools} from 'zustand/middleware';
import {CustomerAddress} from '../services/GGL-Queries/CustomerAddress/CustomerAddress.type';

export interface Customer {
  firstname: string;
  lastname: string;
  email: string;
  gender?: number | null;
  addresses: CustomerAddress[];
  defaultAddress?: CustomerAddress | null;
}

interface CustomerState {
  customer: Customer | null;
  selectedAddress?: CustomerAddress | null;
  setCustomer: (customer: Omit<Customer, 'defaultAddress'> | null) => void;
  setAddresses: (addresses: CustomerAddress[]) => void;
  initializeCustomer: (customer: Omit<Customer, 'defaultAddress'>) => void;
  addOrUpdateAddress: (address: CustomerAddress) => void;
  deleteAddress: (addressId: number) => void;
  setSelectedAddress: (address: CustomerAddress | null) => void;
}

const useCustomerStore = create<CustomerState>()(
  devtools(set => ({
    customer: null,

    setCustomer: (customer: Omit<Customer, 'defaultAddress'> | null) => {
      set({
        customer: customer
          ? {
              ...customer,
              defaultAddress:
                customer.addresses?.find(address => address.default_billing) ??
                null,
            }
          : null,
      });
    },

    setAddresses: addresses => {
      set(state => ({
        customer: state.customer
          ? {
              ...state.customer,
              addresses,
              defaultAddress:
                addresses.length > 0
                  ? addresses.find(address => address.default_billing) ?? null
                  : null,
            }
          : null,
        selectedAddress:
          addresses.length > 0
            ? addresses.find(address => address.default_billing) ?? null
            : null,
      }));
    },

    addOrUpdateAddress: (address: CustomerAddress) => {
      set(state => {
        const currentAddresses = state?.customer?.addresses ?? [];
        const addressIndex = currentAddresses?.findIndex(
          a => a.id === address.id,
        );

        // If the address exists, update it; otherwise, add it to the list
        const updatedAddresses =
          addressIndex > -1
            ? currentAddresses?.map((a, index) =>
                index === addressIndex ? address : a,
              )
            : [...currentAddresses, address];

        // Determine the default address based on the updated list
        const defaultAddress =
          updatedAddresses?.find(a => a.default_billing) ?? null;

        return {
          customer: {
            ...state.customer,
            addresses: updatedAddresses,
            defaultAddress,
          },
          selectedAddress: defaultAddress,
        };
      });
    },

    deleteAddress: (addressId: number) => {
      set(state => {
        const currentAddresses = state?.customer?.addresses ?? [];
        // Remove the address by its ID
        const updatedAddresses = currentAddresses?.filter(
          address => address.id !== addressId,
        );

        // If the deleted address was the default address, we need to update the default address
        let defaultAddress = state?.customer?.defaultAddress;

        if (defaultAddress && defaultAddress.id === addressId) {
          // If the deleted address was the default, find a new default address (if any)
          defaultAddress =
            updatedAddresses?.find(a => a.default_billing) ?? null;
        }

        // Update the state with the new addresses and defaultAddress
        return {
          customer: {
            ...state.customer,
            addresses: updatedAddresses,
            defaultAddress, // Keep the defaultAddress as null or updated
          },
          selectedAddress: defaultAddress ?? null,
        };
      });
    },

    setSelectedAddress: (address: CustomerAddress | null) => {
      console.log(address, 'setAddress');
      set({
        selectedAddress: address,
      });
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
            customer?.addresses?.find(address => address.default_billing) ??
            null,
        },
        selectedAddress:
          customer?.addresses?.find(address => address.default_billing) ?? null,
      });
    },
  })),
);

export {useCustomerStore};
