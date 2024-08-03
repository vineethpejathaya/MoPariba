import {useApolloClient, useMutation} from '@apollo/client';
import {Box, Button, HStack, ScrollView, Text, VStack} from 'native-base';
import {useEffect, useState} from 'react';
import {
  CityMapIcon,
  GlobeIcon,
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
import SingleSelect from './Forms/SingleSelect';
import Switch from './Forms/Switch';
import TextField from './Forms/TextInput';

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
  onSave,
}: {
  address?: CustomerAddress;
  countries: Country[];
  close?: () => void;
  onSave?: () => void;
}) {
  const client = useApolloClient();
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
      name: address
        ? (address.firstname ? address.firstname + ' ' : '') +
          (address.lastname ?? '')
        : '',
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

  const [updateCustomerAddress, {loading: updatingAddress}] = useMutation<
    UpdateCustomerAddressResponse,
    UpdateCustomerAddressVariables
  >(UPDATE_CUSTOMER_ADDRESS, {
    onCompleted: res => {
      showSuccessToast('Update Address', 'Address updated successfully');
      close && close();
      onSave && onSave();
    },
    onError: err => {
      console.log(err, 'error');
    },
  });

  const [createCustomerAddress, {loading: creatingAddress}] = useMutation(
    CREATE_CUSTOMER_ADDRESS,
    {
      refetchQueries: [{query: GET_CUSTOMER_ADDRESSES}],
      onCompleted: res => {
        showSuccessToast('Add Address', 'Address added successfully');
        close && close();
        onSave && onSave();
      },
    },
  );

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
      <ScrollView>
        <VStack space={2} padding={3}>
          <TextField
            name={'name'}
            height={45}
            value={userAddress.name}
            placeholder={'Name'}
            leftElement={
              <Box style={{paddingLeft: 10}}>{fieldConfig['name']}</Box>
            }
            onChangeText={(value: any) => {
              setUserAddress((prev: any) => ({
                ...prev,
                name: value,
              }));
            }}
          />
          <TextField
            name={'street'}
            height={45}
            value={userAddress.street}
            placeholder={'Address'}
            leftElement={
              <Box style={{paddingLeft: 10}}>{fieldConfig['street']}</Box>
            }
            onChangeText={(value: any) => {
              setUserAddress((prev: any) => ({
                ...prev,
                street: value,
              }));
            }}
          />
          <HStack alignItems={'center'} space={2}>
            <Box style={{flex: 1}}>
              <TextField
                name={'city'}
                height={45}
                value={userAddress.city}
                placeholder={'City'}
                leftElement={
                  <Box style={{paddingLeft: 10}}>{fieldConfig['city']}</Box>
                }
                onChangeText={(value: any) => {
                  setUserAddress((prev: any) => ({
                    ...prev,
                    city: value,
                  }));
                }}
              />
            </Box>
            <Box style={{flex: 1}}>
              <TextField
                name={'postcode'}
                height={45}
                value={userAddress.postcode}
                placeholder={'Zip code'}
                leftElement={
                  <Box style={{paddingLeft: 10}}>{fieldConfig['postcode']}</Box>
                }
                onChangeText={(value: any) => {
                  setUserAddress((prev: any) => ({
                    ...prev,
                    postcode: value,
                  }));
                }}
              />
            </Box>
          </HStack>

          <SingleSelect
            label={'Country'}
            onValueChange={(itemValue: any) => {
              setUserAddress((prev: any) => ({
                ...prev,
                country_code: itemValue,
              }));
            }}
            leftElement={
              <Box style={{paddingLeft: 10}}>{fieldConfig['country']}</Box>
            }
            value={userAddress?.country_code}
            options={
              countries?.map(country => ({
                label: country.full_name_english,
                value: country.id,
              })) ?? []
            }
          />

          <SingleSelect
            label={'Region'}
            onValueChange={(itemValue: any) => {
              setUserAddress((prev: any) => ({
                ...prev,
                region_id: itemValue,
              }));
            }}
            value={userAddress?.region_id}
            options={
              countries
                ?.find(country => country.id == userAddress.country_code)
                ?.available_regions?.map(region => ({
                  label: region.name,
                  value: region.id,
                })) ?? []
            }
          />

          <TextField
            name={'telephone'}
            height={45}
            value={userAddress.telephone}
            placeholder={'Telephone'}
            leftElement={
              <Box style={{paddingLeft: 10}}>{fieldConfig['telephone']}</Box>
            }
            onChangeText={(value: any) => {
              setUserAddress((prev: any) => ({
                ...prev,
                telephone: value,
              }));
            }}
          />
          <HStack space={2} alignItems={'center'} mb={2}>
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
          <Button
            style={{height: 40}}
            _text={{textTransform: 'uppercase'}}
            isLoading={creatingAddress || updatingAddress}
            onPress={handleSubmit}>
            Save Address
          </Button>
        </VStack>
      </ScrollView>
    </>
  );
}

export default AddressForm;

const fieldConfig = {
  name: <UserNameIcon />,
  city: <CityMapIcon />,
  postcode: <ZipCodeIcon />,
  telephone: <TelephoneIcon />,
  street: <LocationInputIcon />,
  country: <GlobeIcon />,
};
