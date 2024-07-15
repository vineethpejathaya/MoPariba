import {Button, HStack, Text} from 'native-base';
import {ReactNode} from 'react';
import {StyleSheet} from 'react-native';
import theme from '../themes/theme';

const TitleActions = ({
  title,
  btnText,
  onPress,
}: {
  title: string | ReactNode;
  btnText: string;
  onPress: () => void;
}) => {
  return (
    <>
      <HStack style={style.container}>
        {typeof title === 'string' ? (
          <Text variant={'body2'} fontSize={'lg'}>
            {title}
          </Text>
        ) : (
          title
        )}
        <Button variant="ghost" onPress={onPress} _text={style.btn}>
          {btnText}
        </Button>
      </HStack>
    </>
  );
};

export default TitleActions;

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  btn: {
    color: theme.colors.blue[500],
    fontSize: 14,
  },
});
