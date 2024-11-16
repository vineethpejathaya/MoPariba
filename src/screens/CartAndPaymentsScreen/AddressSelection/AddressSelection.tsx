import {useQuery} from '@apollo/client';
import {useNavigation} from '@react-navigation/native';
import {Box, Button, Radio, ScrollView, Text, VStack} from 'native-base';
import {useState} from 'react';
import NavigationItem from '../../../components/NavigationItem';
import ScreenHeader from '../../../components/ScreenHeader';
import SpinnerComponent from '../../../components/SpinnerComponent';
import usePayment from '../../../hooks/UsePayment';
import {NavigationProp} from '../../../navigations/types';
import {GET_CUSTOMER_ADDRESSES} from '../../../services/GGL-Queries/CustomerAddress/CustomerAddress.queries';
import {
  CustomerAddress,
  GetCustomerAddressesResponse,
} from '../../../services/GGL-Queries/CustomerAddress/CustomerAddress.type';

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

  const handleSelectAddress = (id: number) => {
    setSelectedAddress(id);
  };

  const handleSave = () => {};

  if (loading || isLoading) return <SpinnerComponent onlySpinner />;

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
              <NavigationItem
                label={'Add New Address'}
                onPress={() => navigate.navigate('GeoLocationScreen')}
              />
            </Box>
          </Box>
        </VStack>
      </ScrollView>
    </>
  );
}
export default AddressSelection;
