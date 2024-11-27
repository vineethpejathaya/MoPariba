import {
  AddIcon,
  Button,
  Center,
  HStack,
  IconButton,
  MinusIcon,
  Spinner,
  Text,
} from 'native-base';
import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import useCartActions from '../hooks/UseCartActions';
import {useCartStore} from '../hooks/UseCartStore';
import theme from '../themes/theme';
import PressableText from './Pressable/PressableText';

const btnTypes = Object.freeze({
  regular: 'regular',
  custom: 'custom',
});

type ProductType = 'ConfigurableProduct' | 'SimpleProduct';
type AddType = 'simpleAdd' | 'variantAdd';

interface BaseQuantitySelectorProps {
  productSku: string;
  btnType: 'regular' | 'custom';
  productType: ProductType;
  addType?: AddType;
  variantSku?: string;
}

const QuantitySelector = ({
  productSku,
  variantSku = '',
  productType,
  addType = 'simpleAdd',
  btnType = btnTypes.regular,
}: BaseQuantitySelectorProps) => {
  const {findProductInCart} = useCartStore();
  const [isLoading, setLoading] = useState(false);
  const {addToCart, removeFromCart} = useCartActions();

  const productInCart = findProductInCart(productSku, variantSku);

  const handleAddToCart = async () => {
    setLoading(true);
    await addToCart(productSku, variantSku);
    setLoading(false);
  };

  const handleRemoveFromCart = async () => {
    setLoading(true);
    await removeFromCart(productSku, variantSku);
    setLoading(false);
  };

  if (isLoading) {
    return <Spinner color={theme.colors.primary[400]} />;
  }

  if (productInCart) {
    return (
      <>
        {btnType === btnTypes.regular ? (
          <NativeQuantityBtn
            removeItem={handleRemoveFromCart}
            addItem={handleAddToCart}
            quantity={productInCart.quantity}
          />
        ) : (
          <CustomQuantityBtn
            removeItem={handleRemoveFromCart}
            addItem={handleAddToCart}
            quantity={productInCart.quantity}
          />
        )}
      </>
    );
  }

  return (
    <ConfigurableButton
      onPress={handleAddToCart}
      productType={productType}
      addType={addType}
    />
  );
};

export default QuantitySelector;

interface QuantityBtnProps {
  removeItem: () => Promise<void>;
  addItem: () => Promise<void>;
  quantity: number;
}

const NativeQuantityBtn = ({
  removeItem,
  addItem,
  quantity,
}: QuantityBtnProps) => {
  return (
    <>
      <HStack style={styles.qtnContainer}>
        <>
          <IconButton
            icon={
              <FontAwesomeIcon
                name={'minus'}
                size={10}
                color={theme.colors.primary[400]}
              />
            }
            onPress={removeItem}
          />
          <Center>
            <Text style={styles.addPlainBtnText}>{quantity}</Text>
          </Center>
          <IconButton
            icon={
              <FontAwesomeIcon
                name={'plus'}
                size={10}
                color={theme.colors.primary[400]}
              />
            }
            onPress={addItem}
          />
        </>
      </HStack>
    </>
  );
};

const CustomQuantityBtn = ({
  removeItem,
  addItem,
  quantity,
}: QuantityBtnProps) => {
  return (
    <>
      <HStack alignItems="center" space={3}>
        <IconButton
          onPress={removeItem}
          style={[styles.customBth]}
          icon={<MinusIcon size={3} style={{color: 'black'}} />}
        />

        <Text variant={'subheader2'}>{quantity}</Text>

        <IconButton
          onPress={addItem}
          style={[styles.customBth, styles.addBtn]}
          icon={<AddIcon size={3} color={theme.colors.white} />}
        />
      </HStack>
    </>
  );
};

interface ConfigurableButtonProps {
  onPress: () => void;
  productType: 'ConfigurableProduct' | 'SimpleProduct';
  addType?: 'simpleAdd' | 'variantAdd';
}

const ConfigurableButton = ({
  onPress,
  productType,
  addType = 'variantAdd',
}: ConfigurableButtonProps) => {
  if (addType === 'variantAdd' && productType === 'ConfigurableProduct') {
    return (
      <PressableText
        onPress={onPress}
        text={'ADD'}
        styles={styles.addPlainBtnText}
      />
    );
  }

  return (
    <Button
      variant={'outline'}
      _text={{fontSize: 10, lineHeight: 10}}
      style={styles.btn}
      onPress={onPress}>
      Add
    </Button>
  );
};

const styles = StyleSheet.create({
  qtnContainer: {
    gap: 4,
    maxWidth: 100,
    alignItems: 'center',
    backgroundColor: theme.colors.white,
    borderColor: theme.colors.gray[300],
  },

  customBth: {
    width: 30,
    height: 30,
    borderRadius: 20,
    backgroundColor: theme.colors.gray[500],
  },

  addBtn: {
    backgroundColor: theme.colors.primary[400],
  },

  addPlainBtnText: {
    fontSize: 14,
    fontFamily: 'DMSans-Bold',
    fontWeight: 900,
    color: theme.colors.primary[400],
  },

  btn: {
    height: 35,
    width: 100,
    padding: 1,
    borderColor: theme.colors.gray[700],
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
  },
  // btnText: {
  //   fontSize: 14,
  //   lineHeight: 14,
  //   fontFamily: 'DMSans-Bold',
  //   color: theme.colors.primary[900],
  // },
});
