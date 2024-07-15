import {Box, Center, HStack, Text} from 'native-base';
import React, {useState} from 'react';
import {TouchableOpacity} from 'react-native';

const QuantityButton = ({
  quantity,
  refetch,
  handleAdd,
}: {
  quantity: number;
  refetch?: () => void;
  handleAdd?: () => void;
}) => {
  const [qnt, setQnt] = useState(quantity);

  const increaseQuantity = () => {
    setQnt(prevQuantity => prevQuantity + 1);
    handleAdd && handleAdd();
  };

  const decreaseQuantity = () => {
    if (qnt > 1) {
      setQnt(prevQuantity => prevQuantity - 1);
    }
  };

  return (
    <Box borderWidth={1} borderColor="gray.300" borderRadius="md">
      <HStack space={4} alignItems="center" p={3}>
        <TouchableOpacity onPress={decreaseQuantity}>
          <Text fontSize="md" fontWeight={'bold'} color="green.500">
            -
          </Text>
        </TouchableOpacity>
        <Center>
          <Text fontSize="md" fontWeight={'bold'} color="green.500">
            {qnt}
          </Text>
        </Center>
        <TouchableOpacity onPress={increaseQuantity}>
          <Text fontSize="md" fontWeight={'bold'} color="green.500">
            +
          </Text>
        </TouchableOpacity>
      </HStack>
    </Box>
  );
};

export default QuantityButton;
