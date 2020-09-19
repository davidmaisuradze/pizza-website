export const getCartTotalPrice = (cart) => {
  if (cart) {
    return Object.keys(cart).reduce((sum, key) => {
      const itemsTotalPrice = cart[key].reduce((itemsSum, item) => itemsSum + item.price, 0);
      return sum + itemsTotalPrice;
    }, 0);
  } else {
    return 0;
  }
};
