import {Box, Image, Text, VStack} from 'native-base';
import {
  Dimensions,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import {baseUrl} from '../constants/config';
import theme from '../themes/theme';

function CategoryItem({
  title,
  imageUrl,
  onPress,
  cardStyles,
}: {
  title: string;
  imageUrl: string;
  onPress: () => void;
  cardStyles?: StyleProp<ViewStyle>;
}) {
  return (
    <VStack style={[styles.card, cardStyles]}>
      <TouchableOpacity onPress={onPress}>
        <Box style={styles.imageContainer}>
          {imageUrl && (
            <Image
              source={{uri: `${baseUrl}/${imageUrl}`}}
              style={{width: '80%', height: '80%'}}
              alt={title}
              resizeMode="contain"
            />
          )}
        </Box>
      </TouchableOpacity>
      <Text variant={'body1'} textAlign={'center'}>
        {title}
      </Text>
    </VStack>
  );
}

export default CategoryItem;

const styles = StyleSheet.create({
  card: {
    width: Dimensions.get('window').width / 4,
    gap: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    height: 73,
    width: 73,
    aspectRatio: 1,
    backgroundColor: theme.colors.blue[100],
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
