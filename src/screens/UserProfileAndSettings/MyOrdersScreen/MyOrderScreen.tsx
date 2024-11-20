import {useQuery} from '@apollo/client';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Box, HStack, Text, VStack} from 'native-base';
import React, {useState} from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {MyOrderIcon} from '../../../assets/icons/Icons';
import NoDataIllustration from '../../../components/NoDataIllustration';
import PressableContainer from '../../../components/Pressable/PressableContainer';
import ScreenHeader from '../../../components/ScreenHeader';
import SpinnerComponent from '../../../components/SpinnerComponent';
import {RootStackParamList} from '../../../navigations/types';
import {GET_CUSTOMER_ORDERS} from '../../../services/GGL-Queries/MyOrders/MyOrders.queries';
import {
  CustomerOrder,
  GetCustomerOrdersResponse,
} from '../../../services/GGL-Queries/MyOrders/interfaces/MyOrders.type';
import theme from '../../../themes/theme';
export type MyOrdersScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'MyOrdersScreen'
>;

export type MyOrdersScreenProps = {
  navigation: MyOrdersScreenNavigationProp;
};

function MyOrdersScreen({navigation}: MyOrdersScreenProps) {
  const [orders, setOrders] = useState<CustomerOrder[]>([]);
  const {loading, error, data, fetchMore} = useQuery<GetCustomerOrdersResponse>(
    GET_CUSTOMER_ORDERS,
    {
      variables: {
        currentPage: 1,
        pageSize: 6,
        scope: 'STORE',
      },
      onCompleted: res => {
        setOrders(res.customer.orders.items);
      },
    },
  );

  const loadMoreOrders = () => {
    const currentPage = data?.customer?.orders?.page_info?.current_page || 0;
    const totalPages = data?.customer?.orders?.page_info?.total_pages || 0;

    if (currentPage < totalPages) {
      fetchMore({
        variables: {
          currentPage: currentPage + 1,
        },
      });
    }
  };
  const handleOrderPress = (order: CustomerOrder) => {
    navigation.navigate('OrderSummaryScreen', {orderNumber: order.number});
  };

  const renderOrder = ({item}: {item: CustomerOrder}) => (
    <PressableContainer onPress={() => handleOrderPress(item)}>
      <UserOrder key={item.id} order={item} />
    </PressableContainer>
  );

  if (loading) {
    return <SpinnerComponent onlySpinner />;
  }

  return (
    <>
      <ScreenHeader title="My Orders" />
      {orders.length === 0 ? (
        <NoDataIllustration message="No past orders found" />
      ) : (
        <Box style={styles.mainContainer}>
          <FlatList
            data={orders}
            keyExtractor={item => item.id.toString()}
            renderItem={renderOrder}
            onEndReached={loadMoreOrders}
            onEndReachedThreshold={0.5}
            ItemSeparatorComponent={() => <Box height={4} />}
            ListFooterComponent={
              loading ? <SpinnerComponent onlySpinner /> : null
            }
          />
        </Box>
      )}
    </>
  );
}

export default MyOrdersScreen;

const UserOrder = React.memo(({order}: {order: CustomerOrder}) => {
  const totalQuantity = order?.items?.reduce(
    (acc, curr) => acc + curr.quantity_ordered,
    0,
  );

  return (
    <HStack style={styles.userOrderContainer} space={4}>
      <MyOrderIcon />
      <VStack space={2}>
        <Text style={styles.userName}>
          Order {'#'}
          {order.number}
        </Text>
        <Text style={styles.address}>Placed on {order.order_date}</Text>
        <HStack space={2} alignItems={'center'}>
          <HStack alignItems={'center'} space={1}>
            <Text style={styles.address}>Total Price:</Text>
            <Text style={styles.value}>₹ {order.total.grand_total.value}</Text>
          </HStack>
          <HStack alignItems={'center'} space={1}>
            <Text style={styles.address}>Items:</Text>
            <Text style={styles.value}>{totalQuantity}</Text>
          </HStack>
        </HStack>
      </VStack>
    </HStack>
  );
});

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 15,
  },

  userOrderContainer: {
    paddingHorizontal: 10,
    paddingVertical: 22,
    backgroundColor: theme.colors.white,
    alignItems: 'center',
  },

  orderCard: {
    paddingHorizontal: 10,
    paddingVertical: 25,
    backgroundColor: theme.colors.white,
  },
  orderItem: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  userName: {
    fontWeight: 700,
    fontSize: 15,
    fontFamily: 'Poppins-Bold',
    lineHeight: 22,
  },
  address: {
    fontSize: 10,
    fontFamily: 'Poppins-SemiBold',
    fontWeight: 400,
    lineHeight: 15,
    color: theme.colors.gray[700],
  },
  value: {
    fontSize: 10,
    fontFamily: 'Poppins-SemiBold',
    fontWeight: 400,
    lineHeight: 15,
  },
  phone: {
    fontSize: 10,
    fontFamily: 'Poppins-Bold',
    fontWeight: 700,
    lineHeight: 15,
  },
});
