import {Box, Image} from 'native-base';
import {
  Dimensions,
  ImageSourcePropType,
  ImageStyle,
  StyleProp,
} from 'react-native';
import theme from '../themes/theme';

const ResponsiveImage = ({
  source,
  alt,
  imgWidth,
  imgHeight,
  styles,
  backgroundColor,
}: {
  source: ImageSourcePropType;
  alt: string;
  imgWidth?: number;
  imgHeight?: number;
  styles?: StyleProp<ImageStyle>;
  backgroundColor?: string;
}) => {
  const {width} = Dimensions.get('window');
  const imageWidth = imgWidth ? imgWidth : width * 0.9;
  const imageHeight = imgHeight ? imgHeight : imageWidth;

  return (
    <>
      {source ? (
        <Image
          source={source}
          alt={alt}
          style={[
            {width: imageWidth, height: imageHeight, resizeMode: 'contain'},
            styles,
          ]}
        />
      ) : (
        <Box
          style={[
            {
              width: imageWidth,
              height: imageHeight,
              backgroundColor: backgroundColor || theme.colors.gray[700],
            },
            styles,
          ]}
        />
      )}
    </>
  );
};

export default ResponsiveImage;
