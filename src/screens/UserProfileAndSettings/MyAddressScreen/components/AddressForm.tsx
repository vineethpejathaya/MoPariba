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
  Toast,
  VStack,
} from 'native-base';
import {useEffect, useState} from 'react';
import {
  CREATE_CUSTOMER_ADDRESS,
  GET_CUSTOMER_ADDRESSES,
  UPDATE_CUSTOMER_ADDRESS,
} from '../../../../services/GGL-Queries/CustomerAddress/CustomerAddress.queries';
import {
  UpdateCustomerAddressResponse,
  UpdateCustomerAddressVariables,
} from '../../../../services/GGL-Queries/CustomerAddress/CustomerAddress.type';

function AddressForm({
  address,
  countries,
  formType,
  close,
}: {
  address?: any;
  countries: any[];
  formType: 'Add' | 'Edit';
  close?: () => void;
}) {
  const [userAddress, setUserAddress] = useState({
    name: '',
    firstname: '',
    lastname: '',
    street: '',
    city: address?.city,
    postcode: '',
    country_code: '',
    default_billing: false,
    telephone: '',
    region_id: '',
  });

  useEffect(() => {
    setUserAddress({
      name: address?.firstname + address?.lastname ?? '',
      firstname: address?.firstname,
      lastname: address?.lastname,
      street: address?.street.join(','),
      city: address?.city,
      postcode: address?.postcode,
      country_code: address?.country_code,
      default_billing: address?.default_billing,
      telephone: address?.telephone,
      region_id: address?.region?.region_id,
    });
  }, [address]);

  const [updateCustomerAddress, {data, loading, error}] = useMutation<
    UpdateCustomerAddressResponse,
    UpdateCustomerAddressVariables
  >(UPDATE_CUSTOMER_ADDRESS, {
    refetchQueries: [{query: GET_CUSTOMER_ADDRESSES}],
    onCompleted: res => {
      Toast.show({
        title: 'Update Address',
        description: 'Address updated successfully',
      });
      close && close();
    },
  });

  const [
    createCustomerAddress,
    {data: addData, loading: addingData, error: errorAdding},
  ] = useMutation(CREATE_CUSTOMER_ADDRESS, {
    refetchQueries: [{query: GET_CUSTOMER_ADDRESSES}],
    onCompleted: res => {
      Toast.show({
        title: 'Add Address',
        description: 'Address added successfully',
      });
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
    if (formType == 'Add') {
      createCustomerAddress({
        variables: {
          input,
        },
      });
    } else {
      updateCustomerAddress({
        variables: {
          id: address.id,
          input: input,
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
            <FormControl>
              <Input
                height={38}
                size={'md'}
                value={userAddress.name}
                placeholder="Name"
                onChangeText={(value: any) => {
                  setUserAddress((prev: any) => ({
                    ...prev,
                    name: value,
                  }));
                }}
              />
            </FormControl>
            <FormControl>
              <Input
                height={38}
                size={'md'}
                value={userAddress.street}
                placeholder="Address"
                onChangeText={(value: any) =>
                  setUserAddress((prev: any) => ({
                    ...prev,
                    street: value,
                  }))
                }
              />
            </FormControl>
            <HStack space={2}>
              <FormControl flex={1}>
                <Input
                  height={38}
                  size={'md'}
                  value={userAddress.city}
                  placeholder="City"
                  onChangeText={(value: any) =>
                    setUserAddress((prev: any) => ({
                      ...prev,
                      city: value,
                    }))
                  }
                />
              </FormControl>
              <FormControl flex={1}>
                <Input
                  height={38}
                  size={'md'}
                  value={userAddress.postcode}
                  placeholder="Zip Code"
                  onChangeText={(value: any) =>
                    setUserAddress((prev: any) => ({
                      ...prev,
                      postcode: value,
                    }))
                  }
                />
              </FormControl>
            </HStack>

            <FormControl>
              <Select
                height={38}
                size={'md'}
                selectedValue={userAddress?.country_code}
                placeholder="Country"
                onValueChange={(itemValue: any) => {
                  setUserAddress((prev: any) => ({
                    ...prev,
                    country_code: itemValue,
                  }));
                }}>
                {countries?.map(country => (
                  <Select.Item
                    label={country?.full_name_english}
                    value={country?.id}
                  />
                ))}
              </Select>
            </FormControl>
            <FormControl>
              <Select
                height={38}
                size={'md'}
                selectedValue={userAddress?.region_id}
                placeholder="Region"
                onValueChange={(itemValue: any) => {
                  setUserAddress((prev: any) => ({
                    ...prev,
                    region_id: itemValue,
                  }));
                }}>
                {countries
                  ?.find(item => item?.id == userAddress?.country_code)
                  ?.available_regions?.map((region: any, index: number) => (
                    <Select.Item
                      key={index}
                      label={region?.name}
                      value={region?.id}
                    />
                  ))}
              </Select>
            </FormControl>
            <FormControl>
              <Input
                height={38}
                size={'md'}
                value={userAddress.telephone}
                placeholder="Phone number"
                onChangeText={(value: any) =>
                  setUserAddress((prev: any) => ({
                    ...prev,
                    telephone: value,
                  }))
                }
              />
            </FormControl>
            <HStack space={2} alignItems={'center'}>
              <Switch
                isChecked={userAddress.default_billing}
                onToggle={e =>
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
