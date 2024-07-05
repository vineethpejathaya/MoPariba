import {Box, Image} from 'native-base';
import {useState} from 'react';
import {
  Dimensions,
  ImageSourcePropType,
  ImageStyle,
  ImageURISource,
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
  source?: ImageSourcePropType | ImageURISource | string;
  alt: string;
  imgWidth?: number;
  imgHeight?: number;
  styles?: StyleProp<ImageStyle>;
  backgroundColor?: string;
}) => {
  const [imageError, setImageError] = useState(false);
  const imageSource = typeof source === 'string' ? {uri: source} : source;
  const {width} = Dimensions.get('window');
  const imageWidth = imgWidth ? imgWidth : width * 0.9;
  const imageHeight = imgHeight ? imgHeight : imageWidth;

  return (
    <>
      {source && !imageError ? (
        <Image
          source={imageSource}
          alt={alt}
          style={[
            {width: imageWidth, height: imageHeight, resizeMode: 'contain'},
            styles,
          ]}
          onError={() => setImageError(true)}
        />
      ) : (
        <Box
          style={[
            {
              width: imageWidth,
              height: imageHeight,
            },
            styles,
            {
              backgroundColor: backgroundColor || theme.colors.gray[700],
            },
          ]}
        />
      )}
    </>
  );
};

export default ResponsiveImage;
