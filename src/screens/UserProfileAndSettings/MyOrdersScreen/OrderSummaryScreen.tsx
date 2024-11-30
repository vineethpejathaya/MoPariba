import {useQuery} from '@apollo/client';
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {Box, Divider, HStack, Text, VStack} from 'native-base';
import {useMemo} from 'react';
import {Platform, StyleSheet, UIManager, View} from 'react-native';
import Card from '../../../components/Card';
import ExpandableDetailsCard from '../../../components/ExpandableDetailsCard';
import ScreenContent from '../../../components/ScreenContent';
import ScreenHeader from '../../../components/ScreenHeader';
import SpinnerComponent from '../../../components/SpinnerComponent';
import {RootStackParamList} from '../../../navigations/types';
import {GET_CUSTOMER_ORDER_BY_NUMBER} from '../../../services/GGL-Queries/MyOrders/MyOrders.queries';
import {
  Address,
  GetCustomerOrderByNumberResponse,
  OrderItem,
} from '../../../services/GGL-Queries/MyOrders/interfaces/MyOrders.type';

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

const renderIfExists = (value: any, render: () => JSX.Element) => {
  return value ? render() : null;
};

function OrderSummaryScreen({route, navigation}: OrderSummaryScreenProps) {
  const {orderNumber} = route.params;

  const {loading, data, error} = useQuery<GetCustomerOrderByNumberResponse>(
    GET_CUSTOMER_ORDER_BY_NUMBER,
    {
      variables: {orderNumber: orderNumber},
    },
  );

  const orderData = data?.customer?.orders?.items?.[0];
  const prices = orderData?.total;

  const statusColor = orderData?.status === 'Pending' ? 'black' : 'green.500';
  const totalDiscount = useMemo(() => {
    return (
      prices?.discounts?.reduce(
        (acc: number, curr: any) => acc + Number(curr?.amount?.value ?? 0),
        0,
      ) || 0
    );
  }, [prices?.discounts]);

  const grandTotal = prices?.grand_total?.value ?? 0;

  const orderPriceBreakDown = useMemo(() => {
    return [
      {label: 'Subtotal', value: prices?.subtotal?.value},
      {label: 'Shipping charges', value: prices?.total_shipping?.value},
      {label: 'Platform Fees', value: prices?.platform_fee?.value},
      {label: 'Applied Taxes', value: prices?.total_tax?.value},
      ...(totalDiscount > 0 ? [{label: 'Discount', value: totalDiscount}] : []),
    ];
  }, [prices]);

  if (loading) {
    return <SpinnerComponent onlySpinner />;
  }

  if (error) {
    return (
      <Box>
        <Text>Error fetching order details: {error.message}</Text>
      </Box>
    );
  }

  return (
    <>
      <ScreenHeader title={''} />
      <ScreenContent
        containerStyles={{
          paddingTop: 20,
          paddingHorizontal: 15,
          paddingBottom: 20,
        }}>
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
              <Text style={styles.value}>{orderData?.order_date}</Text>
            </HStack>
            <HStack alignItems={'center'}>
              <Text style={styles.subTitle}> Status : </Text>
              <Text style={[styles.deliveryStatus, {color: statusColor}]}>
                {orderData?.status}
              </Text>
            </HStack>
          </VStack>

          {/* Order items and price summary */}
          <VStack space={4}>
            <ExpandableDetailsCard title={'Your Order'} keepExpanded>
              {orderData?.items?.map((item: OrderItem, index: number) => (
                <HStack
                  key={index}
                  justifyContent="space-between"
                  alignItems="center">
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
                {orderPriceBreakDown?.map((item, index) => (
                  <LabelValuePair
                    key={index}
                    disableColon
                    containerStyles={{justifyContent: 'space-between'}}
                    labelStyle={{fontWeight: 'normal'}}
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
          {renderIfExists(orderData?.shipping_address, () => (
            <ExpandableDetailsCard title={'Shipping Details'}>
              <AddressComponent
                address={orderData?.shipping_address as Address}
              />
            </ExpandableDetailsCard>
          ))}

          {/* Billing Details */}
          {renderIfExists(orderData?.shipping_address, () => (
            <ExpandableDetailsCard title={'Billing Details'}>
              <AddressComponent
                address={orderData?.billing_address as Address}
              />
            </ExpandableDetailsCard>
          ))}

          {/* Payment Method */}
          {orderData?.payment_methods.length && (
            <Card>
              <Text fontSize="md" fontWeight="bold">
                Payment Method
              </Text>
              <Divider my={3} />
              {orderData?.payment_methods?.length > 0 ? (
                <VStack space={1}>
                  {/* <Text fontSize="sm">
                    {orderData?.payment_methods[0]?.name}
                  </Text> */}
                  <Text fontSize="sm" textTransform={'capitalize'}>
                    {orderData?.payment_methods[0]?.type}
                  </Text>
                </VStack>
              ) : (
                <Text fontSize="sm">Not Available</Text>
              )}
            </Card>
          )}
        </VStack>
      </ScreenContent>
    </>
  );
}

export default OrderSummaryScreen;

const AddressComponent = ({address}: {address: Address}) => {
  if (!address) return null;
  return (
    <>
      <VStack space={2}>
        <LabelValuePair
          label={'Name'}
          value={`${address?.firstname} ${address?.lastname}`}
        />
        <LabelValuePair
          label={'Address'}
          value={`${address?.street?.join(', ')}\n ${address?.city}, ${
            address?.region
          }`}
        />

        <LabelValuePair label={'Zipcode'} value={`${address?.postcode}`} />
      </VStack>
    </>
  );
};

export const LabelValuePair = ({
  label,
  value,
  labelStyle,
  valueStyle,
  containerStyles,
  disableColon = false,
}: {
  label: string;
  value: string | number;
  labelStyle?: object;
  valueStyle?: object;
  containerStyles?: object;
  disableColon?: boolean;
}) => {
  const defaultContainerStyles = {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  };
  const defaultLabelStyles = {
    fontSize: 12,
    fontWeight: 'bold',
    width: 60,
    textAlign: 'left',
  };
  const defaultValueStyles = {
    fontSize: 12,
    flex: 1,
    textAlign: 'left',
  };

  const combinedContainerStyles = StyleSheet.flatten([
    defaultContainerStyles,
    containerStyles,
  ]);
  const combinedLabelStyles = StyleSheet.flatten([
    defaultLabelStyles,
    labelStyle,
  ]);
  const combinedValueStyles = StyleSheet.flatten([
    defaultValueStyles,
    valueStyle,
  ]);

  return (
    <View style={combinedContainerStyles}>
      <Text style={combinedLabelStyles}>
        {label} {disableColon ? '' : ':'}
      </Text>
      <Text style={combinedValueStyles}>{value ?? '--'}</Text>
    </View>
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
