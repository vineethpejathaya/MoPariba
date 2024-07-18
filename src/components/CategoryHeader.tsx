import {Box, HStack, Image, Text, VStack} from 'native-base';
import {StyleSheet} from 'react-native';
import theme from '../themes/theme';

export const CategoryHeader = ({
  title,
  categoryImageUrl,
  productsCount,
}: {
  title: string;
  categoryImageUrl?: string;
  productsCount: number;
}) => {
  return (
    <>
      <HStack space={2}>
        <Box style={styles.container}>
          {categoryImageUrl ? (
            <>
              <Image
                source={{uri: `${categoryImageUrl}`}}
                style={{width: '80%', height: '80%'}}
                resizeMode="contain"
                alt={''}
              />
            </>
          ) : null}
        </Box>
        <VStack>
          <Text variant={'subheader1'}>{title}</Text>
          <Text variant={'body2'}>{productsCount} items</Text>
        </VStack>
      </HStack>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 40,
    width: 40,
    aspectRatio: 1,
    backgroundColor: theme.colors.gray[500],
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
