"use client";

import ProductCard from "./ProductCard";
import { getCartItems } from "@/utils/cartUtils";
import { useStoreSnapshot } from "@/hooks/useStoreSnapshot";

export default function StoredProducts() {
  const products = useStoreSnapshot(getCartItems, [], []);

  if (products.length === 0) {
    return null;
  }

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <h2 className="mb-6 text-2xl font-bold text-gray-900">
        Your Cart Products
      </h2>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product, index) => (
          <ProductCard
            key={product.id ?? index}
            product={product}
          />
        ))}
      </div>
    </section>
  );
}