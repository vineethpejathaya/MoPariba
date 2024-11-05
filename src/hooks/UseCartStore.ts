import {create} from 'zustand';
import {devtools} from 'zustand/middleware';
import {CustomerAddress} from '../services/GGL-Queries/CustomerAddress/CustomerAddress.type';
import {CartItem} from '../services/GGL-Queries/CustomerCart/interfaces/CartItem.type';

interface TransformedCartItem {
  cartItemId: string;
  productName: string;
  productSku: string;
  productTypename: string;
  quantity: number;
  variantSku: string | null;
  productImage: string;
  totalPrice: number;
  variantPrice: number | null;
}
interface CartState {
  cartItems: CartItem[];
  appliedCoupons: string[];
  cartId: string;
  adding: boolean;
  removing: boolean;
  updating: boolean;
  showLoading: boolean;
  transformedCartItems: TransformedCartItem[];
  addresses: CustomerAddress[];
  defaultAddress: CustomerAddress | null;
  productMap: Map<string, TransformedCartItem[]>;
  setCartId: (id: string) => void;
  setCart: (cart: CartItem[]) => void;
  setAppliedCoupons: (coupons: string[]) => void;
  setAddresses: (address: CustomerAddress[]) => void;
  setAdding: (status: boolean) => void;
  setRemoving: (status: boolean) => void;
  setUpdating: (status: boolean) => void;
  setShowLoading: (status: boolean) => void;
  addItem: (item: CartItem) => void;
  removeItem: (itemId: string) => void;
  clearCart: () => void;
  checkProductExists: (variantSku: string, productSku?: string) => boolean;
  findProductInCart: (
    productSku: string,
    variantSku: string,
  ) => CartItem | null;
  findByProductSku: (productSku: string) => TransformedCartItem[];
}

export const useCartStore = create<CartState>()(
  devtools((set, get) => ({
    cartItems: [],
    appliedCoupons: [],
    cartId: '',
    adding: false,
    removing: false,
    updating: false,
    showLoading: false,
    transformedCartItems: [],
    defaultAddress: null,
    productMap: new Map(),
    addresses: [],
    setCart: (cartItems: CartItem[]) => {
      const transformedData = transformCartItems(cartItems);
      const productMap = mapTransformedDataBySku(transformedData);
      set({
        cartItems,
        transformedCartItems: transformedData,
        productMap: productMap,
      });
    },
    setAddresses: (addresses: CustomerAddress[]) => {
      set({
        addresses: addresses,
        defaultAddress:
          addresses?.find(address => address.default_billing) ?? null,
      });
    },
    setCartId: (id: string) => set({cartId: id}),
    setAppliedCoupons: (coupons: string[]) => set({appliedCoupons: coupons}),
    setAdding: status => set({adding: status}),
    setRemoving: status => set({removing: status}),
    setUpdating: status => set({updating: status}),
    setShowLoading: status => set({showLoading: status}),
    addItem: (item: CartItem) =>
      set(state => ({cartItems: [...state.cartItems, item]}), false, 'addItem'),
    removeItem: (itemId: string) =>
      set(
        state => ({
          cartItems: state.cartItems.filter(item => item.id !== itemId),
        }),
        false,
        'removeItem',
      ),
    clearCart: () =>
      set({cartItems: [], transformedCartItems: []}, false, 'clearCart'),
    checkProductExists: (productSku: string) => {
      const productMap = get().productMap;
      return productMap.has(productSku);
    },
    findProductInCart: (productSku: string, variantSku?: string) => {
      const items = get().cartItems;
      if (variantSku) {
        return (
          items.find(
            item =>
              item.product.sku === productSku &&
              item.configured_variant?.sku === variantSku,
          ) || null
        );
      } else {
        return items.find(item => item.product.sku === productSku) || null;
      }
    },
    findByProductSku: (productSku: string) => {
      const productMap = get().productMap;
      return productMap.get(productSku) ?? [];
    },
  })),
);

const transformCartItems = (cartItems: CartItem[]) => {
  return cartItems.map(item => {
    const {id, product, quantity, configured_variant, prices} = item;

    const {
      name: productName,
      sku: productSku,
      __typename: productTypename,
      image,
    } = product;

    const variantSku = configured_variant?.sku || null;
    const variantPrice =
      configured_variant?.price_range?.minimum_price?.final_price.value || null;
    const totalPrice = prices.row_total_including_tax.value;

    return {
      cartItemId: id,
      productName,
      productSku,
      productTypename,
      quantity,
      variantSku,
      productImage: image.url,
      totalPrice,
      variantPrice,
    };
  });
};

const mapTransformedDataBySku = (
  transformedData: TransformedCartItem[],
): Map<string, TransformedCartItem[]> => {
  const productMap = new Map<string, TransformedCartItem[]>();

  transformedData.forEach(item => {
    const productSku = item.productSku;
    if (!productMap.has(productSku)) {
      productMap.set(productSku, []);
    }
    productMap.get(productSku)!.push(item);
  });

  return productMap;
};
