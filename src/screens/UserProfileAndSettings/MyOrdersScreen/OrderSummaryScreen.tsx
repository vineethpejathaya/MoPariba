import {useQuery} from '@apollo/client';
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {Box, Divider, HStack, Text, VStack} from 'native-base';
import {Platform, StyleSheet, UIManager} from 'react-native';
import ExpandableDetailsCard from '../../../components/ExpandableDetailsCard';
import ScreenContent from '../../../components/ScreenContent';
import ScreenHeader from '../../../components/ScreenHeader';
import SpinnerComponent from '../../../components/SpinnerComponent';
import {RootStackParamList} from '../../../navigations/types';
import {GET_CUSTOMER_ORDER_BY_NUMBER} from '../../../services/GGL-Queries/MyOrders/MyOrders.queries';

export type OrderSummaryScreenRouteProp = RouteProp<
  RootStackParamList,
  'OrderSummaryScreen'
>;

export type OrderSummaryScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'OrderSummaryScreen'
>;

export type OrderSummaryScreenProps = {
  route: OrderSummaryScreenRouteProp;
  navigation: OrderSummaryScreenNavigationProp;
};

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

function OrderSummaryScreen({route, navigation}: OrderSummaryScreenProps) {
  const {orderNumber} = route.params;

  const {loading, data} = useQuery(GET_CUSTOMER_ORDER_BY_NUMBER, {
    variables: {orderNumber: orderNumber},
  });

  const prices = data?.customer?.orders?.items[0]?.total;
  const order = data?.customer?.orders?.items[0];

  const statusColor = order?.status === 'Pending' ? 'black' : 'green.500';
  const appliedTaxes = prices?.total_tax?.value;
  const shippingCharges = prices?.total_shipping?.value;

  const subTotal = prices?.subtotal?.value;
  const totalDiscount =
    Array.isArray(prices?.discounts) && prices?.discounts?.length
      ? prices?.discounts.reduce(
          (acc: any, curr: any) => acc + Number(curr?.amount?.value ?? 0),
          0,
        )
      : 0;

  const platFormFees = prices?.platform_fee?.value;
  const grandTotal = prices?.grand_total?.value ?? 0;

  const orderPriceBreakDown = [
    {
      label: 'Subtotal',
      value: subTotal,
    },
    {
      label: 'Shipping charges',
      value: shippingCharges,
    },
    {
      label: 'Platform Fees',
      value: platFormFees,
    },

    {
      label: 'Applied Taxes',
      value: appliedTaxes,
    },
    ...(totalDiscount > 0
      ? [
          {
            label: 'Discount',
            value: totalDiscount,
          },
        ]
      : []),
  ];

  console.log(order?.payment_methods, 'data');

  if (loading) {
    return <SpinnerComponent onlySpinner />;
  }

  return (
    <>
      <ScreenHeader title={''} />
      <ScreenContent containerStyles={{paddingTop: 20, paddingHorizontal: 15}}>
        <VStack space={2}>
          <Text style={styles.title}>Order Summary</Text>

          {/* Order Details */}
          <VStack space={1} mt={5}>
            <HStack alignItems={'center'}>
              <Text style={styles.subTitle}> Order No : </Text>
              <Text style={styles.storeAddress}>{orderNumber}</Text>
            </HStack>
            <HStack alignItems={'center'}>
              <Text style={styles.subTitle}> Ordered on : </Text>
              <Text style={styles.value}>{order?.order_date}</Text>
            </HStack>
            <HStack alignItems={'center'}>
              <Text style={styles.subTitle}> Status : </Text>
              <Text style={styles.deliveryStatus}>{order?.status}</Text>
            </HStack>
          </VStack>

          {/* Order items and price summary */}
          <VStack space={4}>
            <ExpandableDetailsCard title={'Your Order'} keepExpanded>
              {data?.customer?.orders?.items?.[0]?.items?.map((item: any) => (
                <HStack justifyContent="space-between" alignItems="center">
                  <Text fontSize="sm">
                    {item?.product_name} {item?.product_sku}
                  </Text>
                  <Text fontSize="sm">
                    {item?.quantity_ordered ?? 0} X ₹{' '}
                    {item?.product_sale_price?.value}
                  </Text>
                </HStack>
              ))}

              <Divider my={3} />

              {/* Order Costs */}
              <VStack space={2}>
                {orderPriceBreakDown?.map(item => (
                  <PriceSummaryLabelValue
                    label={`${item?.label}`}
                    value={`₹ ${item?.value || 0}`}
                  />
                ))}
              </VStack>
              <Divider my={3} />

              <HStack justifyContent="space-between" alignItems="center">
                <Text fontSize="lg" fontWeight="bold">
                  Grand Total
                </Text>
                <Text fontSize="lg" fontWeight="bold">
                  ₹{grandTotal}
                </Text>
              </HStack>
            </ExpandableDetailsCard>
          </VStack>

          {/* Shipping Details */}
          <ExpandableDetailsCard title={'Shipping Details'}>
            <AddressComponent address={order?.shipping_address} />
          </ExpandableDetailsCard>

          {/* Billing Details */}
          <ExpandableDetailsCard title={'Billing Details'}>
            <AddressComponent address={order?.billing_address} />
          </ExpandableDetailsCard>

          {/* Payment Method */}
          <Box padding={4} bg="white" borderRadius="md" shadow={1}>
            <Text fontSize="md" fontWeight="bold">
              Payment Method
            </Text>
            <Divider my={3} />
            {order?.payment_methods.length > 0 ? (
              <VStack space={1}>
                <Text fontSize="sm">{order?.payment_methods[0]?.name}</Text>
                <Text fontSize="sm">{order?.payment_methods[0]?.type}</Text>
              </VStack>
            ) : (
              <Text fontSize="sm">Not Available</Text>
            )}
          </Box>
        </VStack>
      </ScreenContent>
    </>
  );
}

export default OrderSummaryScreen;

const AddressComponent = ({address}: {address: any}) => {
  return (
    <>
      <VStack space={2}>
        <AddressLAbelValue
          label={'Name'}
          value={`${address?.firstname} ${address?.lastname}`}
        />
        <AddressLAbelValue
          label={'Address'}
          value={`${address?.street?.join(', ')}\n ${address?.city}, ${
            address?.region
          }`}
        />
        <Text fontSize="sm"></Text>
        <AddressLAbelValue label={'Zipcode'} value={`${address?.postcode}`} />
      </VStack>
    </>
  );
};

const PriceSummaryLabelValue = ({
  label,
  value,
}: {
  label: string;
  value: string;
}) => {
  if (value == null || value === '') return null;

  return (
    <>
      <HStack justifyContent="space-between" mb="2">
        <Text variant={'body1'}>{label}</Text>
        <Text variant={'body1'}>{value}</Text>
      </HStack>
    </>
  );
};

const AddressLAbelValue = ({label, value}: {label: string; value: string}) => {
  if (value == null || value === '') return null;

  return (
    <>
      <HStack alignItems={'base-line'} mb="1" space={2}>
        <Text fontSize="sm" fontWeight={'bold'}>
          {label}:
        </Text>
        <Text fontSize="sm">{value}</Text>
      </HStack>
    </>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 15,
  },

  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  subTitle: {
    fontSize: 14,
  },
  storeAddress: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  value: {
    fontSize: 14,
  },
  deliveryStatus: {
    fontSize: 14,
    color: '#4caf50',
    fontWeight: 'bold',
  },
});
