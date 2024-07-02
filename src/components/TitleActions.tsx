import {Button, HStack, Text} from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';

const TitleActions = ({
  title,
  btnText,
  onPress,
}: {
  title: string;
  btnText: string;
  onPress: () => void;
}) => {
  return (
    <>
      <HStack justifyContent="space-between" alignItems="center" mt={4}>
        <Text variant={'header2'}>{title}</Text>
        <Button
          variant="link"
          rightIcon={<Icon name="chevron-right" size={20} />}
          onPress={onPress}>
          {btnText}
        </Button>
      </HStack>
    </>
  );
};

export default TitleActions;
