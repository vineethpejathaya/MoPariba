import {ImageSourcePropType} from 'react-native';

export interface Slide {
  key: string;
  title: string;
  description: string;
  image: ImageSourcePropType;
}

export const slides: Slide[] = [
  {
    key: '1',
    title: 'Buy Grocery',
    description:
      'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy',
    image: require('../assets/images/pngs/buy_grocery.png'),
  },
  {
    key: '2',
    title: 'Fast Delivery',
    description:
      'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy',
    image: require('../assets/images/pngs/fast_delivery.png'),
  },
  {
    key: '3',
    title: 'Enjoy Quality Vegitable',
    description:
      'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy',
    image: require('../assets/images/pngs/enjoy_quality.png'),
  },
];
