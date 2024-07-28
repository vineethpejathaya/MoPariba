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
      <HStack space={2} alignItems={'center'}>
        <Box style={styles.container}>
          {categoryImageUrl ? (
            <>
              <Image
                source={{uri: `${categoryImageUrl}`}}
                style={{width: '80%', height: '80%'}}
                resizeMode="contain"
                alt={title}
              />
            </>
          ) : null}
        </Box>
        <VStack>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.productCount}>{productsCount} items</Text>
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

  title: {
    fontFamily: 'DMSans-Bold',
    fontSize: 16,
    fontWeight: 700,
  },

  productCount: {
    fontSize: 12,
  },
});
