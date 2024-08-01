import {useQuery} from '@apollo/client';
import {useNavigation} from '@react-navigation/native';
import {Box, Button, Radio, ScrollView, Text, VStack} from 'native-base';
import {useState} from 'react';
import ModalButton from '../../../components/ModalButton';
import NavigationItem from '../../../components/NavigationItem';
import ScreenHeader from '../../../components/ScreenHeader';
import SpinnerComponent from '../../../components/SpinnerComponent';
import usePayment from '../../../hooks/UsePayment';
import {NavigationProp} from '../../../navigations/types';
import {
  GET_COUNTRIES,
  GET_CUSTOMER_ADDRESSES,
} from '../../../services/GGL-Queries/CustomerAddress/CustomerAddress.queries';
import {
  CustomerAddress,
  GetCountriesData,
  GetCustomerAddressesResponse,
} from '../../../services/GGL-Queries/CustomerAddress/CustomerAddress.type';

import AddressForm from '../../../components/AddressForm';
import AddressSelectionStyles from './AddressSelection.styles';
import AddressCard from './components/AddressCard';

function AddressSelection() {
  const navigate = useNavigation<NavigationProp>();
  const [selectedAddress, setSelectedAddress] = useState<number | null>(null);
  const [addresses, setAddresses] = useState<CustomerAddress[]>([]);
  const {isLoading, handleDeliverToAddress} = usePayment();
  const {loading, error, data} = useQuery<GetCustomerAddressesResponse>(
    GET_CUSTOMER_ADDRESSES,
    {
      onCompleted: res => {
        setAddresses(res?.customer?.addresses ?? []);
        setSelectedAddress(
          res?.customer?.addresses?.find(address => address.default_shipping)
            ?.id ?? null,
        );
      },
    },
  );
  const {loading: fetchingCountries, data: countries} =
    useQuery<GetCountriesData>(GET_COUNTRIES);

  const handleSelectAddress = (id: number) => {
    console.log(id, 'clicked');
    setSelectedAddress(id);
  };

  const handleSave = () => {};

  if (loading || isLoading || fetchingCountries)
    return <SpinnerComponent onlySpinner />;

  return (
    <>
      <ScreenHeader
        rightActions={[
          <Button
            variant={'unstyled'}
            _text={{fontWeight: 900, fontFamily: 'Poppins-Bold'}}
            onPress={() => navigate.goBack()}>
            CANCEL
          </Button>,
        ]}
      />
      <ScrollView>
        <VStack space={3} style={AddressSelectionStyles.mainContainer}>
          <Text style={AddressSelectionStyles.title}>
            Select a delivery address
          </Text>

          <Box style={AddressSelectionStyles.addressesContainer}>
            <Radio.Group
              name="addressGroup"
              value={selectedAddress?.toString() ?? undefined}
              onChange={nextValue => {
                handleSelectAddress(Number(nextValue));
              }}>
              {addresses.map((address: CustomerAddress) => (
                <AddressCard
                  key={address.id}
                  address={address}
                  isSelected={selectedAddress === address.id}
                  onDeliver={handleDeliverToAddress}
                />
              ))}
            </Radio.Group>
            <Box>
              <ModalButton
                anchor={({open}) => (
                  <NavigationItem label={'Add New Address'} onPress={open} />
                )}
                title="Add New Address"
                content={({close}) => (
                  <AddressForm
                    countries={countries?.countries ?? []}
                    close={close}
                    onSave={handleSave}
                  />
                )}
              />
            </Box>
          </Box>
        </VStack>
      </ScrollView>
    </>
  );
}
export default AddressSelection;
