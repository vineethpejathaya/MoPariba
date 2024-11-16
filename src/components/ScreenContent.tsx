import {useNavigation} from '@react-navigation/native';
import {Box, Button, HStack, Text, VStack} from 'native-base';
import {InterfaceBoxProps} from 'native-base/lib/typescript/components/primitives/Box';
import {ScrollView, StyleProp, StyleSheet, ViewStyle} from 'react-native';
import {bottomNavigatorHeight} from '../constants/config';
import {useCartStore} from '../hooks/UseCartStore';
import {NavigationProp} from '../navigations/types';

export type ScreenContentProps = {
  containerStyles?: StyleProp<ViewStyle>;
  showCart?: boolean;
} & InterfaceBoxProps;

function ScreenContent({
  containerStyles,
  showCart = false,
  ...rest
}: ScreenContentProps) {
  const navigation = useNavigation<NavigationProp>();
  const {cartItems, cartPrices} = useCartStore();
  const hasCartItems = cartItems?.length > 0;

  const defaultStyles: ViewStyle = {
    paddingHorizontal: 10,
    paddingTop: 5,
    flex: 1,
    paddingBottom: showCart && hasCartItems ? 60 : 0,
  };

  const combinedOverLayStyles = {
    bottom: showCart ? 0 : bottomNavigatorHeight,
  };

  const combinedStyles = StyleSheet.flatten([defaultStyles, containerStyles]);

  const handleGoToCart = () => {
    navigation?.navigate('Cart');
  };

  return (
    <>
      <Box style={combinedStyles}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Box {...rest}>{rest.children}</Box>
        </ScrollView>
      </Box>
      {hasCartItems && showCart && (
        <Box style={[styles.cartOverlay, combinedOverLayStyles]}>
          <HStack justifyContent="space-between" alignItems="center">
            <VStack>
              <Text style={styles.itemText}>
                {cartItems.length} {cartItems.length > 1 ? 'Items' : 'Item'} | ₹
                {cartPrices?.grand_total?.value || 0}
              </Text>
            </VStack>
            <Button
              height={10}
              style={styles.goToCartButton}
              onPress={handleGoToCart}>
              Go to cart
            </Button>
          </HStack>
        </Box>
      )}
    </>
  );
}

export default ScreenContent;

const styles = StyleSheet.create({
  cartOverlay: {
    position: 'absolute',
    bottom: bottomNavigatorHeight,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    padding: 10,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    elevation: 10,
  },
  itemText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  goToCartButton: {
    borderRadius: 8,
  },
});
