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
