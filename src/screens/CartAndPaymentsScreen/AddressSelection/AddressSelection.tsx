import {useNavigation} from '@react-navigation/native';
import {VStack} from 'native-base';
import {useState} from 'react';
import {Dimensions, FlatList} from 'react-native';
import SpinnerComponent from '../../../components/SpinnerComponent';
import {useCustomerStore} from '../../../hooks/UseCustomerStore';
import usePayment from '../../../hooks/UsePayment';
import {NavigationProp} from '../../../navigations/types';
import {CustomerAddress} from '../../../services/GGL-Queries/CustomerAddress/CustomerAddress.type';
import AddressCard from './components/AddressCard';

function AddressSelection({close}: {close: () => void}) {
  const navigation = useNavigation<NavigationProp>();
  const {customer, selectedAddress} = useCustomerStore();
  const [isLoading, setIsLoading] = useState(false);
  const {isAddressSelectionLoading, setCustomerPaymentAddress} = usePayment();

  const handleSelectAddress = async (address: CustomerAddress) => {
    setIsLoading(true);
    await setCustomerPaymentAddress(address);
    setIsLoading(false);
    close();
  };

  if (isLoading) {
    <SpinnerComponent onlySpinner />;
  }
  return (
    <>
      <VStack space={2} height={Dimensions.get('window').height * 0.4}>
        {/* <Pressable
          onPress={() =>
            navigation.navigate('GeoLocationScreen', {
              navigateTo: 'Cart',
            })
          }
          bg="white"
          p="3"
          mb="3"
          shadow={1}
          borderRadius="md"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center">
          <Text bold color="green.600">
            + Add Address
          </Text>
          <Icon
            name="chevron-right"
            size={25}
            color={theme.colors.gray[900]}
            style={{marginLeft: 'auto'}}
          />
        </Pressable> */}
        <FlatList
          data={customer?.addresses}
          keyExtractor={(item, idx) => idx.toString()}
          renderItem={({item}) => (
            <AddressCard
              address={item}
              isSelected={false}
              handleAddressSelect={() => handleSelectAddress(item)}
            />
          )}
        />
      </VStack>
    </>
  );
}
export default AddressSelection;
