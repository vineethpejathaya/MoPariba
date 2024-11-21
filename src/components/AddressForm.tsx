import {useMutation} from '@apollo/client';
import {useNavigation} from '@react-navigation/native';
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
import {countryObj, regionObj} from '../constants/FomConstants';
import {useCustomerStore} from '../hooks/UseCustomerStore';
import useToast from '../hooks/UseToast';
import {NavigationProp} from '../navigations/types';
import {AddressComponent} from '../screens/UserProfileAndSettings/MyAddressScreen/GeoLocation.interface';
import {
  CREATE_CUSTOMER_ADDRESS,
  GET_CUSTOMER_ADDRESSES,
  UPDATE_CUSTOMER_ADDRESS,
} from '../services/GGL-Queries/CustomerAddress/CustomerAddress.queries';
import {
  CustomerAddress,
  UpdateCustomerAddressResponse,
  UpdateCustomerAddressVariables,
} from '../services/GGL-Queries/CustomerAddress/CustomerAddress.type';
import {extractFullAddress} from '../services/utils/extractAddress';
import Switch from './Forms/Switch';
import TextField from './Forms/TextInput';

export type AddressState = {
  firstname: string;
  lastname: string;
  street: string;
  city: string;
  postcode: string;
  default_billing: boolean;
  telephone: string;
};

function AddressForm({
  address,
  close,
  onSave,
  addressComponent = [],
  navigateTo,
}: {
  address?: CustomerAddress;
  close?: () => void;
  onSave?: () => void;
  addressComponent?: AddressComponent[];
  navigateTo?: string;
}) {
  const navigation = useNavigation<NavigationProp>();
  const {showSuccessToast} = useToast();
  const {customer, addOrUpdateAddress} = useCustomerStore();
  const [userAddress, setUserAddress] = useState<AddressState>({
    firstname: '',
    lastname: '',
    street: '',
    city: '',
    postcode: '',
    default_billing: false,
    telephone: '',
  });

  useEffect(() => {
    if (addressComponent.length > 0) {
      const addressData = extractFullAddress(addressComponent);
      setUserAddress({
        firstname: '',
        lastname: '',
        street: addressData?.street ?? '',
        city: addressData?.city ?? '',
        postcode: addressData?.postal_code ?? '',
        default_billing: false,
        telephone: '',
      });
    } else {
      setUserAddress({
        firstname: address?.firstname ?? '',
        lastname: address?.lastname ?? '',
        street: address?.street.join(',') ?? '',
        city: address?.city ?? '',
        postcode: address?.postcode ?? '',
        default_billing: address?.default_billing ?? false,
        telephone: address?.telephone ?? '',
      });
    }
  }, [address]);

  const [updateCustomerAddress, {loading: updatingAddress}] = useMutation<
    UpdateCustomerAddressResponse,
    UpdateCustomerAddressVariables
  >(UPDATE_CUSTOMER_ADDRESS, {
    onCompleted: res => {
      const updatedAddress = res.updateCustomerAddress;
      addOrUpdateAddress(updatedAddress);
      showSuccessToast('Update Address', 'Address updated successfully');
      close && close();
      onSave && onSave();

      if (navigateTo) {
        navigation.navigate(navigateTo);
      }
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
        const newAddress = res.createCustomerAddress;
        addOrUpdateAddress(newAddress);
        showSuccessToast('Add Address', 'Address added successfully');
        close && close();
        onSave && onSave();
        if (navigateTo) {
          navigation.navigate(navigateTo);
        }
      },
    },
  );

  const handleSubmit = () => {
    const input = {
      region: regionObj.Odisha,
      country_code: countryObj.India.id,
      street: [userAddress.street],
      telephone: userAddress.telephone,
      postcode: userAddress.postcode,
      city: userAddress.city,
      firstname: userAddress.firstname,
      lastname: userAddress.lastname,
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
            name={'firstname'}
            height={45}
            value={userAddress.firstname}
            placeholder={'First Name'}
            leftElement={
              <Box style={{paddingLeft: 10}}>{fieldConfig['name']}</Box>
            }
            onChangeText={(value: any) => {
              setUserAddress((prev: any) => ({
                ...prev,
                firstname: value,
              }));
            }}
          />
          <TextField
            name={'lastname'}
            height={45}
            value={userAddress.lastname}
            placeholder={'Last Name'}
            leftElement={
              <Box style={{paddingLeft: 10}}>{fieldConfig['name']}</Box>
            }
            onChangeText={(value: any) => {
              setUserAddress((prev: any) => ({
                ...prev,
                lastname: value,
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
