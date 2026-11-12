"use client";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getAuthUser } from "@/utils/storeData";
import { getCartItems, getWishlistItems } from "@/utils/cartUtils";
const ShopContext = createContext(null);
export function ShopProvider({ children }) {
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [user, setUser] = useState(null);
  useEffect(() => {
    const sync = () => {
      const activeUser = getAuthUser();
      setUser(activeUser);
      if (activeUser?.role === "user") {
        setCartCount(getCartItems().reduce((sum, item) => sum + (Number(item.quantity) || 1), 0));
        setWishlistCount(getWishlistItems().length);
      } else { setCartCount(0); setWishlistCount(0); }
    };
    sync();
    const events = ["storage", "cart_changed", "wishlist_changed", "auth_changed", "shopeasy_sync"];
    events.forEach((event) => window.addEventListener(event, sync));
    return () => events.forEach((event) => window.removeEventListener(event, sync));
  }, []);
  const value = useMemo(() => ({ cartCount, wishlistCount, user }), [cartCount, wishlistCount, user]);
  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}
export function useShop() {
  const context = useContext(ShopContext);
  if (!context) throw new Error("useShop must be used inside ShopProvider");
  return context;
}
