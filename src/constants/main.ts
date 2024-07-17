export interface PopularOffer {
  id: string;
  name: string;
  price: string;
  image: any;
  discount: string;
}
export const popularOffers: PopularOffer[] = [
  {
    id: '1',
    name: 'Veggie',
    price: '$70',
    image: null,
    discount: '20% Off On ....',
  },
  {
    id: '2',
    name: 'Grocery',
    price: '$50',
    image: null,
    discount: '30% Off On ....',
  },
];

export interface SuggestedStore {
  name: string;
  rating: number;
  image: any;
}

export const suggestedStores: SuggestedStore[] = [
  {
    name: 'Pansi Store',
    rating: 4.7,
    image: null,
  },
  {
    name: 'Store 2',
    rating: 4.3,
    image: null,
  },
  {
    name: 'Store 3',
    rating: 4.0,
    image: null,
  },
];

export const recentKeywords: string[] = [
  'Fruite',
  'Grocery',
  'Veggies',
  'Snacks',
];

export const banners = [
  require('../assets/images/pngs/banner.png'),
  require('../assets/images/pngs/banner.png'),
  require('../assets/images/pngs/banner.png'),
];

export interface ProductItemInterface {
  image: any;
  discount: number;
  price: number;
  originalPrice: number;
  title: string;
}

export const products: ProductItemInterface[] = [
  {
    image: require('../assets/images/pngs/product1.png'),
    discount: 52,
    price: 480,
    originalPrice: 630,
    title: 'Bell Pepper Nutella karmen lopu...',
  },
  {
    image: require('../assets/images/pngs/product2.png'),
    discount: 52,
    price: 480,
    originalPrice: 630,
    title: 'Bell Pepper Nutella karmen lopu...',
  },
];
