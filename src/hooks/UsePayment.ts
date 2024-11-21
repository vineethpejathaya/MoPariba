import {useMutation} from '@apollo/client';
import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';
import RazorpayCheckout from 'react-native-razorpay';
import {NavigationProp} from '../navigations/types';

import {CREATE_CART_MUTATION} from '../services/GGL-Queries/CustomerCart/Cart.mutation';
import {ShippingAddress} from '../services/GGL-Queries/CustomerCart/interfaces/BillingAndShippingAddress.type';
import {
  PLACE_ORDER,
  PLACE_RAZORPAY_ORDER,
  SET_ADDRESSES,
  SET_PAYMENT_METHOD,
  SET_SHIPPING_METHOD,
} from '../services/GGL-Queries/PaymentProcess/PaymentProcess.queries';
import {
  PlaceOrderResponse,
  PlaceOrderVariables,
  PlaceRazorpayOrderResponse,
  PlaceRazorpayOrderVariables,
  SetPaymentMethodOnCartResponse,
  SetPaymentMethodOnCartVariables,
  SetShippingMethodsOnCartResponse,
  SetShippingMethodsOnCartVariables,
} from '../services/GGL-Queries/PaymentProcess/PaymentProcess.type';
import {createRazorpayOrder} from '../services/utils';
import {useCartStore} from './UseCartStore';
import {useCustomerStore} from './UseCustomerStore';
import useToast from './UseToast';
const RAZORPAY_KEY_ID = 'rzp_test_ufO7RgfnrHiSE3';
const RAZORPAY_KEY_SECRET = 'MVSyNa9sK49wYJlpnBr2COqp';

const getErrorMessage = (error: any): string => {
  if (error?.graphQLErrors?.length) {
    // Extract the first GraphQL error message
    return error.graphQLErrors[0]?.message ?? 'An unknown error occurred.';
  }
  if (error?.networkError) {
    // Handle network-related errors
    return (
      error.networkError.result?.errors?.[0]?.message ??
      'Network error occurred.'
    );
  }
  if (error?.message) {
    // Handle general errors
    return error.message;
  }
  return 'An unexpected error occurred. Please try again.';
};

const usePayment = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {cartId, setCart, cartItems, cartPrices, setCartId} = useCartStore();
  const {setSelectedAddress, customer} = useCustomerStore();
  const {showErrorToast} = useToast();

  const total = Number(cartPrices?.grand_total?.value || 0);
  const navigate = useNavigation<NavigationProp>();

  const [setPaymentAddresses] = useMutation(SET_ADDRESSES);

  const [setShippingMethod] = useMutation<
    SetShippingMethodsOnCartResponse,
    SetShippingMethodsOnCartVariables
  >(SET_SHIPPING_METHOD);

  const [setPaymentMethod] = useMutation<
    SetPaymentMethodOnCartResponse,
    SetPaymentMethodOnCartVariables
  >(SET_PAYMENT_METHOD);

  const [placeOrder, {data: orderPlacedData}] = useMutation<
    PlaceOrderResponse,
    PlaceOrderVariables
  >(PLACE_ORDER);

  const [placeRazorpayOrder] = useMutation<
    PlaceRazorpayOrderResponse,
    PlaceRazorpayOrderVariables
  >(PLACE_RAZORPAY_ORDER);

  const [createCustomerCart] = useMutation(CREATE_CART_MUTATION);

  const setCustomerPaymentAddress = async (addressId: number) => {
    const address =
      customer?.addresses?.find(address => address.id == addressId) || null;

    console.log(address, 'address in selecte set');
    const postBody = {
      firstname: address?.firstname,
      lastname: address?.lastname,
      company: 'Company Name',
      street: address?.street,
      city: address?.city,
      region: address?.region.region_code,
      region_id: address?.region.region_id,
      postcode: address?.postcode,
      country_code: address?.country_code,
      telephone: address?.telephone,
      save_in_address_book: false,
    };

    const res = await setPaymentAddresses({
      variables: {
        cartId: cartId,
        shippingAddresses: [{address: postBody}],
        billingAddress: {address: postBody},
      },
      onCompleted: res => {
        setSelectedAddress(address);
      },
    });

    console.log(res, 'res');
  };

  const handlePayment = async (address: ShippingAddress | null) => {
    try {
      const orderData = await createRazorpayOrder(total, showErrorToast);

      const options = {
        description: 'Credits towards consultation',
        image: 'https://i.imgur.com/3g7nmJC.png',
        currency: 'INR',
        key: RAZORPAY_KEY_ID,
        amount: total * 100,
        name: 'Mo Pariba',
        prefill: {
          email: 'void@razorpay.com',
          contact: address?.telephone,
          name: `${address?.firstname ?? ''} ${address?.lastname ?? ''}`,
        },
        theme: {color: '#F37254'},
        order_id: orderData.id,
      };

      RazorpayCheckout.open(options)
        .then(async (data: any) => {
          const {razorpay_payment_id, razorpay_order_id, razorpay_signature} =
            data;
          if (
            !razorpay_payment_id ||
            !razorpay_order_id ||
            !razorpay_signature
          ) {
            console.error('Invalid Razorpay response', data);
            return;
          }

          const res = await placeRazorpayOrder({
            variables: {
              order_id: orderData.id,
              referrer: 'https://dev.mopariba.com/checkout',
            },
          });

          setIsLoading(false);
          const cart = await createCustomerCart();
          const newCartId = cart.data.createEmptyCart;

          setCart(null);
          setCartId(newCartId);

          navigate.navigate('OrderConfirm');
        })
        .catch((error: any) => {
          if (
            error?.error?.code === 'BAD_REQUEST_ERROR' &&
            error?.error?.reason === 'payment_error' &&
            error?.error?.source === 'customer'
          ) {
            console.log('User cancelled the payment.');
            showErrorToast(
              'Payment Cancelled',
              'You have cancelled the payment.',
            );
            setIsLoading(false);
            navigate.navigate('Cart');
            return;
          }

          setIsLoading(false);
          const errorMessage = getErrorMessage(error);
          showErrorToast('Payment Failed', errorMessage);
        });
    } catch (error) {
      console.log(error, 'error');
      setIsLoading(false);
      const errorMessage = getErrorMessage(error);
      showErrorToast('Payment Failed', errorMessage);
    }
  };

  const handleDeliverToAddress = async (
    shippingAddress: ShippingAddress | null,
  ) => {
    setIsLoading(true);
    try {
      // const postBody = {
      //   firstname: address.firstname,
      //   lastname: address.lastname,
      //   company: 'Company Name',
      //   street: address.street,
      //   city: address.city,
      //   region: address.region.region_code,
      //   region_id: address.region.region_id,
      //   postcode: address.postcode,
      //   country_code: address?.country_code,
      //   telephone: address.telephone,
      //   save_in_address_book: false,
      // };

      // const res = await setPaymentAddresses({
      //   variables: {
      //     cartId: cartId,
      //     shippingAddresses: [{address: postBody}],
      //     billingAddress: {address: postBody},
      //   },
      // });

      // console.log(res, 'res of setting shipping address');

      await setShippingMethod({
        variables: {
          input: {
            cart_id: cartId,
            shipping_methods: [
              {carrier_code: 'flatrate', method_code: 'flatrate'},
            ],
          },
        },
      });

      await setPaymentMethod({
        variables: {
          input: {
            cart_id: cartId,
            payment_method: {code: 'razorpay'},
          },
        },
      });

      const res = await placeOrder({
        variables: {
          input: {
            cart_id: cartId,
          },
        },
      });

      await handlePayment(shippingAddress);
    } catch (err) {
      console.log(err, 'err');
      setIsLoading(false);
      const errorMessage = getErrorMessage(err);
      showErrorToast('Payment Failed', errorMessage);
    }
  };

  return {isLoading, handleDeliverToAddress, setCustomerPaymentAddress};
};

export default usePayment;
