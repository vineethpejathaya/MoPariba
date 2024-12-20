import {Box, Image} from 'native-base';
import Swiper from 'react-native-swiper';
import HomeScreenStyles from '../Home.styles';

function HomeBanner({banners}: {banners: any}) {
  return (
    <Box style={HomeScreenStyles.bannerContainer}>
      <Swiper autoplay={true} loop={true}>
        {banners.map((banner: any, index: number) => (
          <Box key={index} style={HomeScreenStyles.slide}>
            <Image
              source={banner}
              alt="banner"
              style={HomeScreenStyles.bannerImage}
            />
          </Box>
        ))}
      </Swiper>
    </Box>
  );
}

export default HomeBanner;
