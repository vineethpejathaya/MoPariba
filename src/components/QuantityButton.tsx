import {Box, Button, Center, HStack, Text} from 'native-base';
import React, {useState} from 'react';

const QuantityButton = ({quantity}: {quantity: number}) => {
  const [qnt, setQnt] = useState(quantity);

  const increaseQuantity = () => {
    setQnt(prevQuantity => prevQuantity + 1);
  };

  const decreaseQuantity = () => {
    if (qnt > 1) {
      setQnt(prevQuantity => prevQuantity - 1);
    }
  };

  return (
    <Box borderWidth={1} borderColor="gray.300" borderRadius="md">
      <HStack space={4} alignItems="center">
        <Button
          onPress={decreaseQuantity}
          variant="ghost"
          size={'sm'}
          style={{padding: 0}}>
          <Text fontSize="md" fontWeight={'bold'} color="green.500">
            -
          </Text>
        </Button>
        <Center>
          <Text fontSize="md" fontWeight={'bold'} color="green.500">
            {qnt}
          </Text>
        </Center>
        <Button
          size={'sm'}
          onPress={increaseQuantity}
          variant="ghost"
          style={{padding: 0}}>
          <Text fontSize="md" fontWeight={'bold'} color="green.500">
            +
          </Text>
        </Button>
      </HStack>
    </Box>
  );
};

export default QuantityButton;
