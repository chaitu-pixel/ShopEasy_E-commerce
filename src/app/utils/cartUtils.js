export const getCartItems = () => {
  if (typeof window === "undefined") {
    return [];
  }

  const storedCart = localStorage.getItem("cart");

  return storedCart ? JSON.parse(storedCart) : [];
};

export const saveCartItems = (cartItems) => {
  localStorage.setItem("cart", JSON.stringify(cartItems));
};