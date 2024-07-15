import {useQuery} from '@apollo/client';
import {
  Box,
  Button,
  Divider,
  HStack,
  Image,
  ScrollView,
  Text,
  VStack,
} from 'native-base';
import {Dimensions, StyleSheet} from 'react-native';
import {DeleteIcon} from '../../assets/icons/Icons';
import QuantityButton from '../../components/QuantityButton';
import ScreenContent from '../../components/ScreenContent';
import ScreenHeader from '../../components/ScreenHeader';
import SpinnerComponent from '../../components/SpinnerComponent';
import {useCart} from '../../hooks/UseCart';
import {GET_CUSTOMER_CART} from '../../services/ggl-queries/cart';
import theme from '../../themes/theme';

function CartScreen() {
  const {cartId, cart, setCart} = useCart();
  const {loading, error, data} = useQuery(GET_CUSTOMER_CART, {
    variables: {cart_id: 'CQdEumTZhCBXYAqP6K3jpVOGy4r3kBPY'},
    onCompleted: (res: any) => {
      setCart(res?.cart?.items);
    },
  });
  console.log(cart, 'cart from cart screen');

  if (loading) {
    return <SpinnerComponent />;
  }
  return (
    <>
      <ScreenHeader
        leftActions={[<Text variant={'subheader1'}>My Cart</Text>]}
      />
      <ScreenContent style={{paddingBottom: 60}}>
        <VStack
          px={4}
          flex={1}
          space={2}
          height={'100%'}
          justifyContent={'space-between'}>
          <VStack>
            <HStack justifyContent={'space-between'} alignItems={'center'}>
              <Text variant={'subheader2'} fontSize={'lg'}>
                Review Items
              </Text>
              <Button
                variant={'unstyled'}
                _text={{color: 'black'}}
                rightIcon={<DeleteIcon />}>
                Clear cart
              </Button>
            </HStack>
            <Divider />
            <Box style={styles.container}>
              <ScrollView>
                <VStack space={4} mt={4}>
                  {cart?.length > 0 ? (
                    <>
                      {cart?.map((cartItem, index) => (
                        <CartItem key={index} cartItem={cartItem} />
                      ))}
                    </>
                  ) : null}
                </VStack>
              </ScrollView>
            </Box>
          </VStack>

          <Button variant={'solid'}>Proceed</Button>
        </VStack>
      </ScreenContent>
    </>
  );
}

export default CartScreen;

export const CartItem = ({cartItem}: {cartItem: any}) => {
  return (
    <>
      <HStack
        alignItems={'center'}
        justifyContent={'space-between'}
        width={'100%'}>
        <HStack alignItems={'center'} space={2}>
          <Box style={styles.imageContainer}>
            {cartItem?.product?.image?.url && (
              <Image
                source={{uri: `${cartItem?.product?.image?.url}`}}
                style={{width: '80%', height: '80%'}}
                resizeMode="contain"
                alt={cartItem?.product?.image?.label}
              />
            )}
          </Box>
          <VStack>
            <Text variant="body2" fontSize={'sm'}>
              {cartItem?.product?.name ?? '--'}
            </Text>
          </VStack>
        </HStack>
        <QuantityButton quantity={cartItem?.quantity} />

        <Text variant="body2" fontSize={'sm'}>
          ₹{cartItem?.prices?.price?.value ?? 0}
        </Text>
      </HStack>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get('window').height * 0.65,
    overflow: 'scroll',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  imageContainer: {
    height: 60,
    width: 60,
    aspectRatio: 1,
    backgroundColor: theme.colors.gray[500],
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    fontSize: 14,
    fontWeight: 700,
  },
  btn: {
    height: 40,
    width: 100,
  },
});
