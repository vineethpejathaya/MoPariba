import {useMutation, useQuery} from '@apollo/client';
import {
  AddIcon,
  Badge,
  Box,
  IconButton,
  Menu,
  Pressable,
  ScrollView,
  VStack,
} from 'native-base';
import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {AddressIcon, MoreActions} from '../../../assets/icons/Icons';
import Accordion from '../../../components/Accordion';
import AddressForm from '../../../components/AddressForm';
import LinearProgress from '../../../components/LinearProgress';
import ModalButton from '../../../components/ModalButton';
import NoDataIllustration from '../../../components/NoDataIllustration';
import ScreenHeader from '../../../components/ScreenHeader';
import SpinnerComponent from '../../../components/SpinnerComponent';
import UserAddress from '../../../components/UserAddress';
import {
  DELETE_CUSTOMER_ADDRESS,
  GET_CUSTOMER_ADDRESSES,
} from '../../../services/GGL-Queries/CustomerAddress/CustomerAddress.queries';
import {
  CustomerAddress,
  GetCustomerAddressesResponse,
} from '../../../services/GGL-Queries/CustomerAddress/CustomerAddress.type';
import theme from '../../../themes/theme';
import {MyAddressScreenProps} from './MyAddress.type';

function MyAddressScreen({navigation}: MyAddressScreenProps) {
  const [addresses, setAddresses] = useState<CustomerAddress[]>([]);
  const [editingAddressId, setEditingAddressId] = useState<number | null>(null);

  const {loading, refetch} = useQuery<GetCustomerAddressesResponse>(
    GET_CUSTOMER_ADDRESSES,
    {
      onCompleted: res => {
        setAddresses(res?.customer?.addresses);
      },
    },
  );

  const [deleteAddress, {loading: deleting}] = useMutation(
    DELETE_CUSTOMER_ADDRESS,
    {
      onCompleted: res => {
        refetch();
      },
    },
  );

  const handleDelete = (id: number) => {
    deleteAddress({
      variables: {
        id,
      },
    });
  };

  if (loading) {
    return <SpinnerComponent onlySpinner />;
  }

  return (
    <>
      <ScreenHeader
        title={'My Address'}
        rightActions={[
          <ModalButton
            title={'Add new address'}
            anchor={({open}) => (
              <IconButton
                onPress={open}
                style={styles.addBtn}
                icon={<AddIcon size={3} color={theme.colors.black} />}
              />
            )}
            content={({close}) => (
              <>
                <AddressForm close={close} />
              </>
            )}
          />,
        ]}
      />
      {deleting && <LinearProgress />}
      {addresses?.length == 0 ? (
        <NoDataIllustration message={'No Address found'} />
      ) : (
        <Box style={styles.mainContainer}>
          <ScrollView>
            <VStack space={4}>
              {addresses?.map((address: CustomerAddress, index: number) => (
                <Accordion
                  key={index}
                  summary={<UserAddress address={address} />}
                  content={
                    <AddressForm address={address} onSave={() => refetch()} />
                  }
                  startIcon={
                    <Box style={styles.addressIConContainer}>
                      <AddressIcon />
                    </Box>
                  }
                  leftAction={
                    address?.default_billing && (
                      <Badge style={styles.default} _text={styles.defaultText}>
                        DEFAULT
                      </Badge>
                    )
                  }
                  rightAction={
                    <Menu
                      trigger={triggerProps => {
                        return (
                          <Pressable
                            accessibilityLabel="More options menu"
                            {...triggerProps}>
                            <MoreActions />
                          </Pressable>
                        );
                      }}>
                      <Menu.Item onPress={() => handleDelete(address.id)}>
                        Delete Address
                      </Menu.Item>
                    </Menu>
                  }
                />
              ))}
            </VStack>
          </ScrollView>
        </Box>
      )}
    </>
  );
}

export default MyAddressScreen;

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
    padding: 15,
  },
  addressCard: {
    paddingHorizontal: 10,
    paddingVertical: 25,
    backgroundColor: theme.colors.white,
  },
  addressItem: {
    alignItems: 'center',
    justifyContent: 'space-between',
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
