import {Box, Image} from 'native-base';
import {useState} from 'react';
import {
  Dimensions,
  ImageSourcePropType,
  ImageStyle,
  ImageURISource,
  StyleProp,
  StyleSheet,
} from 'react-native';
import theme from '../themes/theme';

const ImageComponent = ({
  source,
  alt,
  width,
  height,
  styles,
  backgroundColor,
}: {
  source?: ImageSourcePropType | ImageURISource | string;
  alt: string;
  width?: number | string;
  height?: number | string;
  styles?: StyleProp<ImageStyle>;
  backgroundColor?: string;
}) => {
  const flattenedStyles = StyleSheet.flatten(styles) || {};
  const {
    width: widthFromStyle,
    height: heightFromStyle,
    ...rest
  } = flattenedStyles;
  const [imageError, setImageError] = useState(false);
  const imageSource = typeof source === 'string' ? {uri: source} : source;
  const {width: windowWidth} = Dimensions.get('window');

  const imageWidth =
    width ||
    (typeof widthFromStyle === 'number' ? widthFromStyle : windowWidth * 0.9);

  const imageHeight =
    height ||
    (typeof heightFromStyle === 'number' ? heightFromStyle : imageWidth);

  return (
    <>
      {source && !imageError ? (
        <Image
          source={imageSource}
          alt={alt}
          width={imageWidth}
          height={imageHeight}
          style={[{resizeMode: 'contain'}, rest]}
          onError={() => setImageError(true)}
          fallbackElement={
            <ImageFallBackElement
              width={imageWidth}
              height={imageHeight}
              backgroundColor={backgroundColor}
            />
          }
        />
      ) : (
        <ImageFallBackElement
          width={imageWidth}
          height={imageHeight}
          backgroundColor={backgroundColor}
        />
      )}
    </>
  );
};

export default ImageComponent;

const ImageFallBackElement = ({
  width,
  height,
  backgroundColor,
}: {
  width: number | string;
  height: number | string;
  backgroundColor?: string;
}) => {
  return (
    <>
      <Box
        width={width}
        height={height}
        style={{
          borderRadius: 10,
          backgroundColor: backgroundColor || theme.colors.gray[700],
        }}
      />
    </>
  );
};
