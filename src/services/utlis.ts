export function GetInitialLetterOfString(str: string) {
  if (str) {
    const strArr = str.split(' ');
    if (strArr.length == 0) return '';
    const result = strArr?.map(item => item[0]).join('');
    return result;
  }

  return '';
}

export const transformCartItemsToMap = (cartItemsArray: any) => {
  const productMap = new Map();

  cartItemsArray.forEach((item: any) => {
    const productSku = item.product.sku;
    if (!productMap.has(productSku)) {
      productMap.set(productSku, []);
    }
    productMap.get(productSku).push(item);
  });
  return productMap;
};

export const getVariantFromCart = (variant: any, productItems: any[]) => {
  const map = new Map();
  productItems.forEach((item: any) => {
    map.set(item?.configured_variant?.sku, item);
  });
  return map.get(variant?.product?.sku);
};
