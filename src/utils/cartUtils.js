import { getAuthUser } from "./storeData";

const getUserKey = (type) => {
  if (typeof window === "undefined") return null;
  const user = getAuthUser();
  if (!user || user.role !== "user" || !user.email) return null;
  const email = user.email.trim().toLowerCase().replace(/[^a-z0-9]/g, "_");
  return `shopeasy_${type}_${email}`;
};

const readItems = (type) => {
  if (typeof window === "undefined") return [];
  const key = getUserKey(type);
  if (!key) return [];
  try {
    const value = JSON.parse(localStorage.getItem(key) || "[]");
    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
};

const writeItems = (type, items, eventName) => {
  if (typeof window === "undefined") return false;
  const key = getUserKey(type);
  if (!key) return false;
  const safeItems = Array.isArray(items) ? items : [];
  localStorage.setItem(key, JSON.stringify(safeItems));
  window.dispatchEvent(new CustomEvent(eventName, { detail: { items: safeItems } }));
  window.dispatchEvent(new CustomEvent("shopeasy_sync", { detail: { items: safeItems } }));
  return true;
};

export const getCartItems = () => readItems("cart");
export const saveCartItems = (items) => writeItems("cart", items, "cart_changed");
export const getWishlistItems = () => readItems("wishlist");
export const saveWishlistItems = (items) => writeItems("wishlist", items, "wishlist_changed");
