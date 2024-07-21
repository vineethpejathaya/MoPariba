import {Button, HStack, Text} from 'native-base';
import {ReactNode} from 'react';
import {StyleSheet} from 'react-native';
import theme from '../themes/theme';

const TitleActions = ({
  title,
  btnText,
  onPress,
  titleIcon,
}: {
  title: string | ReactNode;
  btnText: string;
  onPress: () => void;
  titleIcon?: ReactNode;
}) => {
  return (
    <>
      <HStack style={style.container}>
        <HStack alignItems={'center'} space={2}>
          <Text variant={'subTitle2'} lineHeight={'md'} fontSize={'md'}>
            {title}
          </Text>
          {titleIcon}
        </HStack>

        <Button variant="ghost" onPress={onPress} _text={style.btnText}>
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
  btnText: {
    color: theme.colors.blue[500],
    fontSize: 14,
    fontWeight: 500,
  },
});
