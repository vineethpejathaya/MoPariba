import {useMutation, useQuery} from '@apollo/client';
import {
  AddIcon,
  Badge,
  Box,
  Collapse,
  Divider,
  FormControl,
  HStack,
  IconButton,
  Input,
  ScrollView,
  Select,
  Spinner,
  Switch,
  Text,
  VStack,
} from 'native-base';
import {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {AddressIcon, ExpandLess} from '../../../assets/icons/Icons';
import NoDataIllustration from '../../../components/NoDataIllustration';
import ScreenHeader from '../../../components/ScreenHeader';
import {
  GET_COUNTRIES,
  GET_CUSTOMER_ADDRESSES,
  UPDATE_CUSTOMER_ADDRESS,
} from '../../../services/GGL-Queries/CustomerAddress/CustomerAddress.queries';
import {
  GetCountriesData,
  GetCustomerAddressesResponse,
  UpdateCustomerAddressResponse,
  UpdateCustomerAddressVariables,
} from '../../../services/GGL-Queries/CustomerAddress/CustomerAddress.type';
import theme from '../../../themes/theme';
import {MYAddressScreenProps} from './MyAddress.types';

function MyAddressScreen({navigation}: MYAddressScreenProps) {
  const [addresses, setAddresses] = useState<any[]>([]);
  const [editingAddressId, setEditingAddressId] = useState<number | null>(null);
  const [countryList, setCountryList] = useState<any[]>([]);
  const {loading: fetchingCountries, data: countries} =
    useQuery<GetCountriesData>(GET_COUNTRIES, {
      onCompleted: res => {
        setCountryList(res.countries);
      },
    });
  const {loading, error, data, refetch} =
    useQuery<GetCustomerAddressesResponse>(GET_CUSTOMER_ADDRESSES, {
      onCompleted: res => {
        setAddresses(res?.customer?.addresses);
      },
    });

  const handleEdit = (id: number) => {
    setEditingAddressId(editingAddressId === id ? null : id);
  };

  if (loading || fetchingCountries) {
    return <Spinner />;
  }

  return (
    <>
      <ScreenHeader
        title={'My Address'}
        rightActions={[
          <IconButton
            onPress={() => {}}
            style={styles.addBtn}
            icon={<AddIcon size={4} color={theme.colors.black} />}
          />,
        ]}
      />
      {addresses?.length == 0 ? (
        <NoDataIllustration message={'No Address found'} />
      ) : (
        <Box style={styles.mainContainer}>
          <ScrollView>
            <VStack space={4}>
              {addresses?.map((address: any, index: number) => (
                <Box key={address.id} style={styles.addressCard}>
                  {address?.default_billing && (
                    <Badge style={styles.default} _text={styles.defaultText}>
                      DEFAULT
                    </Badge>
                  )}

                  <HStack style={styles.addressItem}>
                    <HStack space={2} alignItems="center">
                      <AddressIcon />
                      <UserAddress address={address} />
                    </HStack>
                    <IconButton
                      icon={<ExpandLess />}
                      onPress={() => handleEdit(address.id)}
                    />
                  </HStack>

                  <Collapse isOpen={editingAddressId === address.id}>
                    <AddressForm
                      address={address}
                      countries={countryList}
                      formType="Edit"
                    />
                  </Collapse>
                </Box>
              ))}
            </VStack>
          </ScrollView>
        </Box>
      )}
    </>
  );
}

export default MyAddressScreen;

const UserAddress = ({address}: {address: any}) => {
  return (
    <>
      <VStack>
        <Text variant={'title1'}>
          {address.firstname} {''}
          {address.lastname}
        </Text>
        <Text
          variant={'body1'}
          style={{color: theme.colors.gray[900], fontSize: 10}}>
          {address?.street?.join(',')}
        </Text>
        <Text
          variant={'body1'}
          style={{color: theme.colors.gray[900], fontSize: 10}}>
          {address.city},{address?.region?.region}, {address?.country_code},
          {address?.postcode}
        </Text>
        <Text variant={'title1'} fontSize={10}>
          {address.telephone}
        </Text>
      </VStack>
    </>
  );
};

const AddressForm = ({
  address,
  countries,
  formType,
}: {
  address?: any;
  countries: any[];
  formType: 'Add' | 'Edit';
}) => {
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
      name: address?.firstname + address?.lastname,
      firstname: address?.firstname,
      lastname: address?.lastname,
      street: address?.street.join(','),
      city: address?.city,
      postcode: address?.postcode,
      country_code: address?.country_code,
      default_billing: address?.default_billing,
      telephone: address?.telephone,
      region_id: '',
    });
  }, [address]);

  const [updateCustomerAddress, {data, loading, error}] = useMutation<
    UpdateCustomerAddressResponse,
    UpdateCustomerAddressVariables
  >(UPDATE_CUSTOMER_ADDRESS);

  const handleSubmit = () => {
    const nameArr = userAddress.name.split(' ');

    updateCustomerAddress({
      variables: {
        id: address.id,
        input: {
          region: {
            region_code: 'CA',
            region: 'California',
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
        },
      },
    });
  };
  return (
    <>
      <VStack space={2} p={4}>
        <Divider />
        <FormControl>
          <Input
            value={userAddress.firstname + ' ' + userAddress.lastname}
            placeholder="Name"
            onChange={(e: any) =>
              setUserAddress((prev: any) => ({
                ...prev,
                name: e.target.value,
              }))
            }
          />
        </FormControl>
        <FormControl>
          <Input
            value={userAddress.street}
            placeholder="Address"
            onChange={(e: any) =>
              setUserAddress((prev: any) => ({
                ...prev,
                address: e.target.value,
              }))
            }
          />
        </FormControl>
        <HStack space={2}>
          <FormControl flex={1}>
            <Input
              value={userAddress.city}
              placeholder="City"
              onChange={(e: any) =>
                setUserAddress((prev: any) => ({
                  ...prev,
                  city: e.target.value,
                }))
              }
            />
          </FormControl>
          <FormControl flex={1}>
            <Input
              value={userAddress.postcode}
              placeholder="Zip Code"
              onChange={(e: any) =>
                setUserAddress((prev: any) => ({
                  ...prev,
                  postcode: e.target.value,
                }))
              }
            />
          </FormControl>
        </HStack>

        <FormControl>
          <Select
            selectedValue={userAddress?.country_code}
            placeholder="Country"
            onValueChange={(itemValue: any) => {}}>
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
            value={userAddress.telephone}
            placeholder="Phone number"
            onChange={(e: any) =>
              setUserAddress((prev: any) => ({
                ...prev,
                telephone: e.target.value,
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
      </VStack>
    </>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: theme.colors.white,
    padding: 15,
  },
  addressCard: {
    paddingTop: 20,
  },
  addressItem: {
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  addBtn: {
    width: 30,
    height: 30,
    borderRadius: 20,
    borderWidth: 2,
  },
  default: {
    backgroundColor: theme.colors.primary[100],
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1,
  },
  defaultText: {
    fontSize: 10,
    color: theme.colors.primary[900],
  },
});
