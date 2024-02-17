export const getDiscountedPrice = (originalPrice, discountedPrice) => {
  const discount = originalPrice - discountedPrice;
  return ((discount / originalPrice) * 100).toFixed(2);
};
