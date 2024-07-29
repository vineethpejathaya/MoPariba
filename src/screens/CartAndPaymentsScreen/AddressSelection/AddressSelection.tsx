import {useMutation, useQuery} from '@apollo/client';
import {RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET} from '@env';
import {useNavigation} from '@react-navigation/native';
import {Box, Button, Radio, ScrollView, Text, VStack} from 'native-base';
import {useState} from 'react';
import RazorpayCheckout from 'react-native-razorpay';
import ModalButton from '../../../components/ModalButton';
import NavigationItem from '../../../components/NavigationItem';
import ScreenHeader from '../../../components/ScreenHeader';
import SpinnerComponent from '../../../components/SpinnerComponent';
import UserAddress from '../../../components/UserAddress';
import {useCartStore} from '../../../hooks/UseCartStore';
import useToast from '../../../hooks/UseToast';
import {NavigationProp} from '../../../navigations/types';
import {GET_CUSTOMER_ADDRESSES} from '../../../services/GGL-Queries/CustomerAddress/CustomerAddress.queries';
import {
  CustomerAddress,
  GetCustomerAddressesResponse,
} from '../../../services/GGL-Queries/CustomerAddress/CustomerAddress.type';
import {
  PLACE_ORDER,
  PLACE_RAZORPAY_ORDER,
  SET_ADDRESSES,
  SET_PAYMENT_METHOD,
  SET_SHIPPING_METHOD,
} from '../../../services/GGL-Queries/PaymentProcess/PaymentProcess.queries';
import AddressForm from '../../UserProfileAndSettings/MyAddressScreen/components/AddressForm';
import AddressSelectionStyles from './AddressSelection.styles';

function AddressSelection() {
  const {showErrorToast} = useToast();
  const navigate = useNavigation<NavigationProp>();

  const {cartId, setCart} = useCartStore();
  const [isLoading, setIsLoading] = useState(false);
  const cartItems = useCartStore(s => s.cartItems);
  const [selectedAddress, setSelectedAddress] = useState<number | null>(null);
  const [addresses, setAddresses] = useState<CustomerAddress[]>([]);
  const {loading, error, data, refetch} =
    useQuery<GetCustomerAddressesResponse>(GET_CUSTOMER_ADDRESSES, {
      onCompleted: res => {
        setAddresses(res?.customer?.addresses);
        setSelectedAddress(
          res?.customer?.addresses?.find(address => address.default_shipping)
            ?.id ?? null,
        );
      },
    });

  const total = cartItems?.reduce(
    (acc, curr) => curr?.prices?.row_total_including_tax?.value + acc,
    0,
  );
  const [setPaymentAddresses] = useMutation(SET_ADDRESSES);
  const [setShippingMethod] = useMutation(SET_SHIPPING_METHOD);
  const [setPaymentMethod] = useMutation(SET_PAYMENT_METHOD);
  const [placeOrder, {data: orderPlacedData}] = useMutation(PLACE_ORDER);
  const [placeRazorpayOrder] = useMutation(PLACE_RAZORPAY_ORDER);
  const handleSelectAddress = (id: number) => {
    setSelectedAddress(id);
  };

  const createRazorpayOrder = async () => {
    try {
      const response = await fetch('https://api.razorpay.com/v1/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${btoa(
            `${RAZORPAY_KEY_ID}:${RAZORPAY_KEY_SECRET}`,
          )}`,
        },
        body: JSON.stringify({
          amount: total * 100,
          currency: 'INR',
          receipt: 'receipt#1',
          payment_capture: 1,
        }),
      });

      const data = await response.json();
      return data;
    } catch (error) {
      showErrorToast(
        'Error in placing order',
        'Facing issue while placing your order please try after some time ',
      );
    }
  };

  const handlePayment = async (address: any) => {
    try {
      const orderData = await createRazorpayOrder();

      const options = {
        description: 'Credits towards consultation',
        image: 'https://i.imgur.com/3g7nmJC.png',
        currency: 'INR',
        key: RAZORPAY_KEY_ID,
        amount: total * 100,
        name: 'Mo Pariba',
        prefill: {
          email: 'void@razorpay.com',
          contact: address.telephone,
          name: address.firstname ?? '' + address.lastName ?? '',
        },
        theme: {color: '#F37254'},
        order_id: orderData.id,
      };

      RazorpayCheckout.open(options)
        .then(async data => {
          const {razorpay_payment_id, razorpay_order_id, razorpay_signature} =
            data;
          console.log(
            razorpay_payment_id,
            razorpay_order_id,
            razorpay_signature,
            'razorpay_payment_id, razorpay_order_id, razorpay_signature',
          );
          if (
            !razorpay_payment_id ||
            !razorpay_order_id ||
            !razorpay_signature
          ) {
            console.error('Invalid Razorpay response', data);
            return;
          }

          const razorpayOrderResponse = await placeRazorpayOrder({
            variables: {
              order_id: orderData.id,
              referrer: 'https://dev.mopariba.com/checkout',
            },
          });

          await placeOrder({
            variables: {
              input: {
                cart_id: cartId,
              },
            },
          });
          setIsLoading(false);
          setCart([]);
          navigate.navigate('OrderConfirm');
        })
        .catch(error => {
          setIsLoading(false);
          showErrorToast(
            'Error in placing order',
            'Facing issue while placing your order please try after some time ',
          );
        });
    } catch (error) {
      setIsLoading(false);
      showErrorToast(
        'Error in placing order',
        'Facing issue while placing your order please try after some time ',
      );
    }
  };

  const handleDeliverToAddress = async (address: any) => {
    setIsLoading(true);
    try {
      const postBody = {
        firstname: address.firstname,
        lastname: address.lastname,
        company: 'Company Name',
        street: address.street,
        city: address.city,
        region: address.region.region_code,
        region_id: address.region.id,
        postcode: address.postcode,
        country_code: address?.country_code,
        telephone: address.telephone,
        save_in_address_book: false,
      };

      const {data} = await setPaymentAddresses({
        variables: {
          cartId: cartId,
          shippingAddresses: [
            {
              address: postBody,
            },
          ],
          billingAddress: {
            address: postBody,
          },
        },
      });

      await setShippingMethod({
        variables: {
          input: {
            cart_id: cartId,
            shipping_methods: [
              {
                carrier_code: 'flatrate',
                method_code: 'flatrate',
              },
            ],
          },
        },
      });

      await setPaymentMethod({
        variables: {
          input: {
            cart_id: cartId,
            payment_method: {
              code: 'razorpay',
            },
          },
        },
      });

      await handlePayment(postBody);
    } catch (err) {
      setIsLoading(false);
      showErrorToast(
        'Error in placing order',
        'Facing issue while placing your order please try after some time ',
      );
    }
  };

  if (loading || isLoading) {
    return <SpinnerComponent onlySpinner />;
  }
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
            {addresses.map(address => (
              <AddressCard
                key={address.id}
                address={address}
                isSelected={selectedAddress === address.id}
                onSelect={handleSelectAddress}
                onDeliver={handleDeliverToAddress}
              />
            ))}
            <Box>
              <ModalButton
                anchor={({open}) => (
                  <NavigationItem label={'Add New Address'} onPress={open} />
                )}
                title="Add New Address"
                content={({close}) => <AddressForm countries={[]} />}
              />
            </Box>
          </Box>
        </VStack>
      </ScrollView>
    </>
  );
}
export default AddressSelection;

const AddressCard = ({
  address,
  isSelected,
  onSelect,
  onDeliver,
}: {
  address: CustomerAddress;
  isSelected: boolean;
  onSelect: (id: number) => void;
  onDeliver: (address: CustomerAddress) => void;
}) => (
  <Box style={AddressSelectionStyles.addressCardContainer}>
    <Box style={isSelected ? AddressSelectionStyles.addressSelected : {}}>
      <Radio.Group
        name="addressGroup"
        value={isSelected ? address.id.toString() : undefined}
        onChange={() => onSelect(address.id)}>
        <Radio colorScheme="emerald" value={address.id.toString()}>
          <UserAddress address={address} />
        </Radio>
      </Radio.Group>
    </Box>
    {isSelected && (
      <>
        <Button
          style={AddressSelectionStyles.Btn}
          _text={AddressSelectionStyles.btnTxt}
          onPress={() => onDeliver(address)}>
          Deliver to this address
        </Button>
        <ModalButton
          anchor={({open}) => (
            <Button
              style={AddressSelectionStyles.secBtn}
              _text={AddressSelectionStyles.secBtnTxt}
              onPress={open}>
              Edit Address
            </Button>
          )}
          title="Add New Address"
          content={({close}) => (
            <AddressForm address={address} countries={[]} />
          )}
        />
      </>
    )}
  </Box>
);
