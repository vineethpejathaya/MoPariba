import {useQuery} from '@apollo/client';
import {
  AddIcon,
  Badge,
  Box,
  Collapse,
  HStack,
  IconButton,
  ScrollView,
  Text,
  VStack,
} from 'native-base';
import {useState} from 'react';
import {StyleSheet} from 'react-native';
import {AddressIcon, ExpandLess} from '../../../assets/icons/Icons';
import ModalButton from '../../../components/ModalButton';
import NoDataIllustration from '../../../components/NoDataIllustration';
import ScreenHeader from '../../../components/ScreenHeader';
import SpinnerComponent from '../../../components/SpinnerComponent';
import {
  GET_COUNTRIES,
  GET_CUSTOMER_ADDRESSES,
} from '../../../services/GGL-Queries/CustomerAddress/CustomerAddress.queries';
import {
  GetCountriesData,
  GetCustomerAddressesResponse,
} from '../../../services/GGL-Queries/CustomerAddress/CustomerAddress.type';
import theme from '../../../themes/theme';
import {MYAddressScreenProps} from './MyAddress.types';
import AddressForm from './components/AddressForm';

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
    return <SpinnerComponent onlySpinner />;
  }

  return (
    <>
      <ScreenHeader
        title={'My Address'}
        rightActions={[
          <ModalButton
            anchor={({open}) => (
              <IconButton
                onPress={open}
                style={styles.addBtn}
                icon={<AddIcon size={4} color={theme.colors.black} />}
              />
            )}
            content={({close}) => (
              <>
                <AddressForm
                  address={null}
                  countries={countryList}
                  formType="Add"
                />
              </>
            )}
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
                      <Box style={styles.addressIConContainer}>
                        <AddressIcon />
                      </Box>
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

const styles = StyleSheet.create({
  addressIConContainer: {
    width: 60,
    height: 60,
    borderRadius: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.primary[100],
  },
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
