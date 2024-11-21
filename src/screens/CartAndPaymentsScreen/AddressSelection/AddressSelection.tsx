import {useNavigation} from '@react-navigation/native';
import {Pressable, Text, VStack} from 'native-base';
import {Dimensions, FlatList} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useCustomerStore} from '../../../hooks/UseCustomerStore';
import usePayment from '../../../hooks/UsePayment';
import {NavigationProp} from '../../../navigations/types';
import theme from '../../../themes/theme';
import AddressCard from './components/AddressCard';

function AddressSelection({close}: {close: () => void}) {
  const navigation = useNavigation<NavigationProp>();
  const {customer, selectedAddress} = useCustomerStore();

  const {isLoading, setCustomerPaymentAddress} = usePayment();

  const handleSelectAddress = async (address: any) => {
    const postBody = {
      firstname: address.firstname,
      lastname: address.lastname,
      company: 'Company Name',
      street: address.street,
      city: address.city,
      region: address.region.region_code,
      region_id: address.region.region_id,
      postcode: address.postcode,
      country_code: address?.country_code,
      telephone: address.telephone,
      save_in_address_book: false,
    };

    await setCustomerPaymentAddress(postBody);
  };

  return (
    <>
      <VStack space={2} height={Dimensions.get('window').height * 0.4}>
        <Pressable
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
        </Pressable>
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
