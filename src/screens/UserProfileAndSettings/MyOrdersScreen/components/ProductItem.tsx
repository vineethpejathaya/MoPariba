import {Box, HStack, Text, VStack} from 'native-base';
import {StyleSheet} from 'react-native';
import {
  CustomerOrder,
  OrderItem,
} from '../../../../services/GGL-Queries/MyOrders/MyOrders.type';

function ProductOrderedList({order}: {order: CustomerOrder}) {
  return (
    <>
      {order?.items?.map((product: OrderItem, index: number) => (
        <ProductItem product={product} />
      ))}
    </>
  );
}

export default ProductOrderedList;

function ProductItem({product}: {product: OrderItem}) {
  const price = product?.product_sale_price.value;
  return (
    <HStack style={styles.container} justifyContent="space-between">
      <VStack flex={1} alignItems="flex-start">
        <Text variant="body2" fontSize="sm">
          {product.product_name ?? '--'}
        </Text>
      </VStack>
      <VStack flex={1} alignItems="center">
        <Text variant="body2" fontSize="sm">
          ₹{price ?? 0}
        </Text>
      </VStack>
      <VStack flex={1} alignItems="flex-end">
        <Box>
          <Text variant="body2" fontSize="sm">
            X {product.quantity_ordered ?? 0}
          </Text>
        </Box>
      </VStack>
    </HStack>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});
