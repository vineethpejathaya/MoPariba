import {Image} from 'native-base';
import {Dimensions, ImageSourcePropType} from 'react-native';

const ResponsiveImage = ({
  source,
  alt,
}: {
  source: ImageSourcePropType;
  alt: string;
}) => {
  const {width} = Dimensions.get('window');
  const imageWidth = width * 0.9;
  const imageHeight = imageWidth;

  return (
    <Image
      source={source}
      alt={alt}
      style={{width: imageWidth, height: imageHeight, resizeMode: 'contain'}}
    />
  );
};

export default ResponsiveImage;
