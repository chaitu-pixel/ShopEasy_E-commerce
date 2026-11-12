
const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://dummyjson.com";

// DummyJSON prices are USD. Convert sample API prices to approximate INR for this demo.
const USD_TO_INR = 85;
const normalizeApiProduct = (product) => ({
  ...product,
  price: Math.round(Number(product.price || 0) * USD_TO_INR),
  oldPrice: Math.round(Number(product.price || 0) * USD_TO_INR * (1 + (Number(product.discountPercentage || 0) / 100))),
});

// Fetch the product catalogue from DummyJSON.
export async function getProducts() {
  const url = `${API_URL}/products?limit=194`;
  const options = { cache: "no-store" };
  let response;

  try {
    response = await fetch(url, options);
  } catch (error) {
    if (!(error instanceof TypeError)) {
      throw error;
    }

    await new Promise((resolve) => setTimeout(resolve, 300));
    response = await fetch(url, options);
  }

  if (!response.ok) {
    throw new Error(`Failed to fetch products: ${response.status}`);
  }

  const data = await response.json();

  return {
    products: Array.isArray(data.products) ? data.products.map(normalizeApiProduct) : [],
    total: data.total ?? 0,
  };
}

// Fetch one product by its ID.
export async function getProductById(id) {
  const response = await fetch(
    `${API_URL}/products/${encodeURIComponent(id)}`,
    { cache: "no-store" }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch product ${id}`);
  }

  const product = await response.json();
  return normalizeApiProduct(product);
}

// Search the API catalogue.
export async function searchProducts(query) {
  const response = await fetch(
    `${API_URL}/products/search?q=${encodeURIComponent(query)}`,
    { cache: "no-store" }
  );

  if (!response.ok) {
    throw new Error("Failed to search products");
  }

  const data = await response.json();

  return {
    products: Array.isArray(data.products) ? data.products.map(normalizeApiProduct) : [],
    total: data.total ?? 0,
  };
}

// Fetch products from a category.
export async function getProductsByCategory(category) {
  const response = await fetch(
    `${API_URL}/products/category/${encodeURIComponent(category)}`,
    { cache: "no-store" }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch category: ${category}`);
  }

  const data = await response.json();

  return {
    products: Array.isArray(data.products) ? data.products.map(normalizeApiProduct) : [],
    total: data.total ?? 0,
  };
}
