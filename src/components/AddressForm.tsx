import {useMutation} from '@apollo/client';
import {
  Button,
  Divider,
  FormControl,
  HStack,
  Input,
  ScrollView,
  Select,
  Switch,
  Text,
  VStack,
} from 'native-base';
import {useEffect, useState} from 'react';
import {
  CityMapIcon,
  LocationInputIcon,
  TelephoneIcon,
  UserNameIcon,
  ZipCodeIcon,
} from '../assets/icons/Icons';
import useToast from '../hooks/UseToast';
import {
  CREATE_CUSTOMER_ADDRESS,
  GET_CUSTOMER_ADDRESSES,
  UPDATE_CUSTOMER_ADDRESS,
} from '../services/GGL-Queries/CustomerAddress/CustomerAddress.queries';
import {
  Country,
  CountryRegion,
  CustomerAddress,
  UpdateCustomerAddressResponse,
  UpdateCustomerAddressVariables,
} from '../services/GGL-Queries/CustomerAddress/CustomerAddress.type';

export type AddressState = {
  name: string;
  firstname: string;
  lastname: string;
  street: string;
  city: string;
  postcode: string;
  country_code: string;
  default_billing: boolean;
  telephone: string;
  region_id: number | null;
};

function isCountry(option: Country | CountryRegion): option is Country {
  return (option as Country).full_name_english !== undefined;
}

function AddressForm({
  address,
  countries,
  close,
}: {
  address?: CustomerAddress;
  countries: Country[];
  close?: () => void;
}) {
  const {showSuccessToast} = useToast();
  const [userAddress, setUserAddress] = useState<AddressState>({
    name: '',
    firstname: '',
    lastname: '',
    street: '',
    city: '',
    postcode: '',
    country_code: '',
    default_billing: false,
    telephone: '',
    region_id: null,
  });

  useEffect(() => {
    setUserAddress({
      name: address?.firstname ?? '' + address?.lastname ?? '',
      firstname: address?.firstname ?? '',
      lastname: address?.lastname ?? '',
      street: address?.street.join(',') ?? '',
      city: address?.city ?? '',
      postcode: address?.postcode ?? '',
      country_code: address?.country_code ?? '',
      default_billing: address?.default_billing ?? false,
      telephone: address?.telephone ?? '',
      region_id: address?.region?.region_id ?? null,
    });
  }, [address]);

  const [updateCustomerAddress] = useMutation<
    UpdateCustomerAddressResponse,
    UpdateCustomerAddressVariables
  >(UPDATE_CUSTOMER_ADDRESS, {
    refetchQueries: [{query: GET_CUSTOMER_ADDRESSES}],
    onCompleted: res => {
      showSuccessToast('Update Address', 'Address updated successfully');
      close && close();
    },
  });

  const [createCustomerAddress] = useMutation(CREATE_CUSTOMER_ADDRESS, {
    refetchQueries: [{query: GET_CUSTOMER_ADDRESSES}],
    onCompleted: res => {
      showSuccessToast('Add Address', 'Address added successfully');
      close && close();
    },
  });

  const handleSubmit = () => {
    const nameArr = userAddress.name.split(' ');

    const region = countries
      ?.find(country => country.id == userAddress.country_code)
      ?.available_regions?.find(
        (region: any) => region.id == userAddress?.region_id,
      );

    if (!region) return;
    const input = {
      region: {
        region_id: region?.id,
        region_code: region.code,
        region: region.name,
      },
      country_code: userAddress.country_code,
      street: [userAddress.street],
      telephone: userAddress.telephone,
      postcode: userAddress.postcode,
      city: userAddress.city,
      firstname: nameArr[0],
      lastname: nameArr[1],
      default_shipping: userAddress.default_billing,
      default_billing: userAddress.default_billing,
    };
    if (address?.id) {
      updateCustomerAddress({
        variables: {
          id: address?.id,
          input: input,
        },
      });
    } else {
      createCustomerAddress({
        variables: {
          input,
        },
      });
    }
  };

  return (
    <>
      <VStack p={4} paddingBottom={5}>
        <ScrollView>
          <VStack space={2}>
            <Divider />
            {fieldConfig.map(field => {
              const isSelect = field.type === 'select';
              const options =
                field.options === 'countries'
                  ? countries
                  : countries?.find(
                      country => country.id === userAddress.country_code,
                    )?.available_regions || [];

              return (
                <FormControl key={field.name}>
                  {isSelect ? (
                    <Select
                      height={38}
                      size={'md'}
                      selectedValue={
                        (userAddress as any)[field.name]?.toString() ??
                        undefined
                      }
                      placeholder={field.placeholder}
                      onValueChange={(itemValue: any) => {
                        setUserAddress((prev: any) => ({
                          ...prev,
                          [field.name]: itemValue,
                        }));
                      }}>
                      {options.map((option, index) => (
                        <Select.Item
                          key={index}
                          label={
                            isCountry(option)
                              ? option.full_name_english
                              : option.name
                          }
                          value={option.id}
                        />
                      ))}
                    </Select>
                  ) : (
                    <Input
                      height={38}
                      size={'md'}
                      value={(userAddress as any)[field.name]}
                      placeholder={field.placeholder}
                      leftElement={field.icon}
                      onChangeText={(value: any) => {
                        setUserAddress((prev: any) => ({
                          ...prev,
                          [field.name]: value,
                        }));
                      }}
                    />
                  )}
                </FormControl>
              );
            })}
            <HStack space={2} alignItems={'center'}>
              <Switch
                isChecked={userAddress.default_billing}
                onToggle={() =>
                  setUserAddress((prev: any) => ({
                    ...prev,
                    default_billing: !prev.default_billing,
                  }))
                }
              />
              <Text>Make default</Text>
            </HStack>
            <Button onPress={handleSubmit}>Save Address</Button>
          </VStack>
        </ScrollView>
      </VStack>
    </>
  );
}

export default AddressForm;

const fieldConfig = [
  {
    name: 'name',
    type: 'text',
    placeholder: 'Name',
    icon: <UserNameIcon />,
  },
  {
    name: 'street',
    type: 'text',
    placeholder: 'Address',
    icon: <LocationInputIcon />,
  },
  {
    name: 'city',
    type: 'text',
    placeholder: 'City',
    icon: <CityMapIcon />,
  },
  {
    name: 'postcode',
    type: 'text',
    placeholder: 'Zip Code',
    icon: <ZipCodeIcon />,
  },
  {
    name: 'telephone',
    type: 'text',
    placeholder: 'Phone number',
    icon: <TelephoneIcon />,
  },
  {
    name: 'country_code',
    type: 'select',
    placeholder: 'Country',
    options: 'countries',
  },
  {
    name: 'region_id',
    type: 'select',
    placeholder: 'Region',
    options: 'regions',
  },
];
