import {
  AddIcon,
  Center,
  HStack,
  IconButton,
  MinusIcon,
  Text,
} from 'native-base';
import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import theme from '../themes/theme';
import PressableText from './Pressable/PressableText';

interface QuantityComponentProps {
  quantity: number;
  refetch?: () => void;
  handleAdd?: () => void;
  handleRemove?: () => void;
  isNative?: boolean;
}

interface QuantityBtnProps {
  decreaseQuantity: () => void;
  increaseQuantity: () => void;
  quantity: number;
}
const QuantityButton = ({
  quantity,
  refetch,
  handleAdd,
  handleRemove,
  isNative = true,
}: QuantityComponentProps) => {
  const [qnt, setQnt] = useState(quantity);

  const increaseQuantity = () => {
    setQnt(prevQuantity => prevQuantity + 1);
    handleAdd && handleAdd();
  };

  const decreaseQuantity = () => {
    if (qnt > 1) {
      handleRemove && handleRemove();
      setQnt(prevQuantity => prevQuantity - 1);
    }
  };

  return isNative ? (
    <NativeQuantityBtn
      decreaseQuantity={decreaseQuantity}
      increaseQuantity={increaseQuantity}
      quantity={qnt}
    />
  ) : (
    <CustomQuantityBtn
      decreaseQuantity={decreaseQuantity}
      increaseQuantity={increaseQuantity}
      quantity={qnt}
    />
  );
};

export default QuantityButton;

const NativeQuantityBtn = ({
  decreaseQuantity,
  increaseQuantity,
  quantity,
}: QuantityBtnProps) => {
  return (
    <>
      <HStack
        space={4}
        alignItems="center"
        p={3}
        borderWidth={1}
        borderColor="gray.300"
        borderRadius="md">
        <PressableText
          text={'-'}
          styles={{color: theme.colors.primary[900]}}
          onPress={decreaseQuantity}
        />
        <Center>
          <Text fontSize="md" fontWeight={'bold'} color="green.500">
            {quantity}
          </Text>
        </Center>
        <PressableText
          text={'+'}
          styles={{color: theme.colors.primary[900]}}
          onPress={increaseQuantity}
        />
      </HStack>
    </>
  );
};

const CustomQuantityBtn = ({
  decreaseQuantity,
  increaseQuantity,
  quantity,
}: QuantityBtnProps) => {
  return (
    <>
      <HStack alignItems="center" space={3}>
        <IconButton
          onPress={decreaseQuantity}
          style={[styles.bth]}
          icon={<MinusIcon size={3} style={{color: 'black'}} />}
        />

        <Text variant={'subheader2'}>{quantity}</Text>

        <IconButton
          onPress={increaseQuantity}
          style={[styles.bth, styles.addBtn]}
          icon={<AddIcon size={3} color={theme.colors.white} />}
        />
      </HStack>
    </>
  );
};

const styles = StyleSheet.create({
  bth: {
    width: 30,
    height: 30,
    borderRadius: 20,
    backgroundColor: theme.colors.gray[500],
  },
  btnText: {
    color: theme.colors.black,
  },
  addBtn: {
    backgroundColor: theme.colors.primary[900],
  },
});
