import {useMutation} from '@apollo/client';
import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';
import RazorpayCheckout from 'react-native-razorpay';
import {NavigationProp} from '../navigations/types';
import {CustomerAddress} from '../services/GGL-Queries/CustomerAddress/CustomerAddress.type';
import {CREATE_CART_MUTATION} from '../services/GGL-Queries/CustomerCart/Cart.queries';
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
import useToast from './UseToast';
const RAZORPAY_KEY_ID = 'rzp_test_ufO7RgfnrHiSE3';
const RAZORPAY_KEY_SECRET = 'MVSyNa9sK49wYJlpnBr2COqp';
const usePayment = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {cartId, setCart, cartItems, setCartId} = useCartStore();
  const {showErrorToast} = useToast();
  const total = cartItems?.reduce(
    (acc, curr) => curr?.prices?.row_total_including_tax?.value + acc,
    0,
  );
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

  const handlePayment = async (address: CustomerAddress) => {
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
          contact: address.telephone,
          name: `${address.firstname ?? ''} ${address.lastname ?? ''}`,
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

          await placeRazorpayOrder({
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
          const cart = await createCustomerCart();
          const newCartId = cart.data.createEmptyCart;
          setCartId(newCartId);
          setCart([]);

          navigate.navigate('OrderConfirm');
        })
        .catch((error: any) => {
          setIsLoading(false);
          showErrorToast(
            'Error in placing order',
            'Facing issue while placing your order please try after some time',
          );
        });
    } catch (error) {
      setIsLoading(false);
      showErrorToast(
        'Error in placing order',
        'Facing issue while placing your order please try after some time',
      );
    }
  };

  const handleDeliverToAddress = async (address: CustomerAddress) => {
    setIsLoading(true);
    try {
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

      await setPaymentAddresses({
        variables: {
          cartId: cartId,
          shippingAddresses: [{address: postBody}],
          billingAddress: {address: postBody},
        },
      });

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

      await handlePayment(postBody as unknown as CustomerAddress);
    } catch (err) {
      setIsLoading(false);
      showErrorToast(
        'Error in placing order',
        'Facing issue while placing your order please try after some time',
      );
    }
  };

  return {isLoading, handleDeliverToAddress};
};

export default usePayment;
