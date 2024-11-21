import {useMutation} from '@apollo/client';
import {
  AddIcon,
  Badge,
  Box,
  FlatList,
  IconButton,
  Menu,
  Pressable,
} from 'native-base';
import React, {useMemo} from 'react';
import {StyleSheet} from 'react-native';
import {AddressIcon, MoreActions} from '../../../assets/icons/Icons';
import Accordion from '../../../components/Accordion';
import AddressForm from '../../../components/AddressForm';
import LinearProgress from '../../../components/LinearProgress';
import NoDataIllustration from '../../../components/NoDataIllustration';
import ScreenHeader from '../../../components/ScreenHeader';
import UserAddress from '../../../components/UserAddress';
import {useCustomerStore} from '../../../hooks/UseCustomerStore';
import {DELETE_CUSTOMER_ADDRESS} from '../../../services/GGL-Queries/CustomerAddress/CustomerAddress.queries';
import {CustomerAddress} from '../../../services/GGL-Queries/CustomerAddress/CustomerAddress.type';
import theme from '../../../themes/theme';
import {MyAddressScreenProps} from './MyAddress.type';

function MyAddressScreen({navigation}: MyAddressScreenProps) {
  const {customer, deleteAddress: deleteAdd} = useCustomerStore();

  const addresses = customer?.addresses || [];
  const [deleteAddress, {loading: deleting}] = useMutation(
    DELETE_CUSTOMER_ADDRESS,
  );

  const handleDelete = (id: number) => {
    deleteAddress({
      variables: {id},
      onCompleted: () => deleteAdd(id),
      onError: error => console.error('Error deleting address:', error),
    });
  };

  const renderAddressItem = ({item}: {item: CustomerAddress}) => {
    const {id, default_billing} = item;

    return (
      <Accordion
        key={id}
        summary={<UserAddress address={item} />}
        content={<AddressForm address={item} />}
        startIcon={
          <Box style={styles.addressIconContainer}>
            <AddressIcon />
          </Box>
        }
        leftAction={
          default_billing && (
            <Badge style={styles.default} _text={styles.defaultText}>
              DEFAULT
            </Badge>
          )
        }
        rightAction={
          <Menu
            trigger={triggerProps => (
              <Pressable
                accessibilityLabel="More options menu"
                {...triggerProps}>
                <MoreActions />
              </Pressable>
            )}>
            <Menu.Item onPress={() => handleDelete(id)}>
              Delete Address
            </Menu.Item>
          </Menu>
        }
      />
    );
  };

  const addressList = useMemo(
    () => (
      <FlatList
        data={addresses}
        renderItem={renderAddressItem}
        keyExtractor={(item: CustomerAddress) => item.id.toString()}
        ItemSeparatorComponent={() => <Box height={4} />}
        contentContainerStyle={styles.listContent}
      />
    ),
    [addresses],
  );

  return (
    <>
      <ScreenHeader
        title="My Address"
        rightActions={[
          <IconButton
            key="addBtn"
            onPress={() =>
              navigation.navigate('GeoLocationScreen', {
                navigateTo: 'MyAddress',
              })
            }
            style={styles.addBtn}
            icon={<AddIcon size={3} color={theme.colors.black} />}
          />,
        ]}
      />
      {deleting && <LinearProgress />}
      {addresses.length === 0 ? (
        <NoDataIllustration message="No Address found" />
      ) : (
        <Box style={styles.mainContainer}>{addressList}</Box>
      )}
    </>
  );
}

export default React.memo(MyAddressScreen);

const styles = StyleSheet.create({
  addressIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.primary[100],
  },
  mainContainer: {
    flex: 1,
    padding: 15,
  },
  listContent: {
    paddingBottom: 20,
  },
  addBtn: {
    width: 25,
    height: 25,
    borderRadius: 20,
    borderWidth: 2,
  },
  default: {
    backgroundColor: theme.colors.primary[100],
  },
  defaultText: {
    fontSize: 10,
    color: theme.colors.primary[900],
  },
});
