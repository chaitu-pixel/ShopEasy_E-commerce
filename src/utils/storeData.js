"use client";

// ============================================================================
// ShopEasy Unified Data Layer & Real-World Mock Store
// ============================================================================

const STORAGE_KEYS = {
  PRODUCTS: "shopeasy_products",
  ORDERS: "shopeasy_orders",
  CUSTOMERS: "shopeasy_customers",
  AUTH_USER: "authUser",
  CART: "cart",
  WISHLIST: "wishlistItems",
  SETTINGS: "shopeasy_settings",
};

// Initial realistic product catalog with high quality images
export const INITIAL_PRODUCTS = [
  {
    id: 1,
    name: "Sony WH-1000XM5 Wireless Noise Cancelling Headphones",
    title: "Sony WH-1000XM5 Wireless Headphones",
    category: "Electronics",
    price: 24990,
    oldPrice: 29990,
    stock: 28,
    rating: 4.9,
    reviews: 142,
    status: "Active",
    sku: "ELEC-SNY-001",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80",
    description: "Industry-leading noise cancellation with dual processors, 8 microphones, and ultra-comfortable lightweight design. 30-hour battery life with quick charge.",
  },
  {
    id: 2,
    name: "Apple Watch Ultra 2 GPS + Cellular Titanium",
    title: "Apple Watch Ultra 2 Titanium",
    category: "Electronics",
    price: 79900,
    oldPrice: 89900,
    stock: 14,
    rating: 4.9,
    reviews: 98,
    status: "Active",
    sku: "ELEC-APL-002",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80",
    description: "Rugged and capable smartwatch designed for endurance athletes, outdoor adventurers, and water sports with precision dual-frequency GPS.",
  },
  {
    id: 3,
    name: "Nike Air Max 270 React Premium Sneakers",
    title: "Nike Air Max 270 React Sneakers",
    category: "Fashion",
    price: 7499,
    oldPrice: 9999,
    stock: 22,
    rating: 4.8,
    reviews: 215,
    status: "Active",
    sku: "FASH-NKE-003",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=80",
    description: "Nike's biggest heel Air unit yet delivers ultra-soft cushioning that feels as impossible as it looks. Breathable upper mesh with lightweight foam midsole.",
  },
  {
    id: 4,
    name: "Advanced Retinol & Peptides Restorative Skincare Kit",
    title: "Advanced Peptide Restorative Skincare Kit",
    category: "Beauty",
    price: 2499,
    oldPrice: 3499,
    stock: 8,
    rating: 4.7,
    reviews: 84,
    status: "Low Stock",
    sku: "BEAU-SKN-004",
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&auto=format&fit=crop&q=80",
    description: "Clinical grade 4-step restorative system designed to smooth fine lines, brighten tone, and deeply hydrate skin with botanical hyaluronic acid.",
  },
  {
    id: 5,
    name: "Minimalist Nordic Touch Dimming Desk Lamp",
    title: "Nordic Touch Dimming Desk Lamp",
    category: "Home",
    price: 1899,
    oldPrice: 2499,
    stock: 0,
    rating: 4.6,
    reviews: 62,
    status: "Out of Stock",
    sku: "HOME-LMP-005",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600&auto=format&fit=crop&q=80",
    description: "Architect-grade matte black finish desk lamp with touch dimming, 3 color temperatures, and high CRI eye-caring LED illumination.",
  },
  {
    id: 6,
    name: "FIFA Quality Pro Match Ball Series 2026",
    title: "FIFA Quality Pro Match Soccer Ball",
    category: "Sports",
    price: 1599,
    oldPrice: 2199,
    stock: 35,
    rating: 4.8,
    reviews: 110,
    status: "Active",
    sku: "SPRT-BAL-006",
    image: "https://images.unsplash.com/photo-1614632537423-1e6c2e7e0aab?w=600&auto=format&fit=crop&q=80",
    description: "Thermally bonded seamless surface for more predictable trajectory, better touch, and lower water uptake. Official match ball specification.",
  },
  {
    id: 7,
    name: "Organic Farm Fresh Gourmet Basket",
    title: "Organic Farm Fresh Gourmet Basket",
    category: "Groceries",
    price: 999,
    oldPrice: 1299,
    stock: 18,
    rating: 4.9,
    reviews: 146,
    status: "Active",
    sku: "GROC-BSK-007",
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&auto=format&fit=crop&q=80",
    description: "Hand-curated farm fresh certified organic produce, cold-pressed virgin olive oil, and artisan pantry essentials packed fresh daily.",
  },
  {
    id: 8,
    name: "Full Grain Leather Heritage Commuter Backpack",
    title: "Heritage Full Grain Leather Backpack",
    category: "Fashion",
    price: 4999,
    oldPrice: 6499,
    stock: 6,
    rating: 4.8,
    reviews: 77,
    status: "Low Stock",
    sku: "FASH-BAG-008",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&auto=format&fit=crop&q=80",
    description: "Handcrafted from full-grain Italian leather with dedicated 16-inch padded laptop compartment, waterproof zippers, and brass hardware.",
  },
];

// Initial realistic customer database
export const INITIAL_CUSTOMERS = [
  {
    id: "CUS-1001",
    name: "Rahul Sharma",
    email: "rahul.sharma@gmail.com",
    phone: "+91 98201 44521",
    city: "Mumbai, Maharashtra",
    initials: "RS",
    orders: 8,
    spent: 58490,
    status: "Active",
    joined: "Jan 12, 2026",
    type: "Premium",
  },
  {
    id: "CUS-1002",
    name: "Priya Reddy",
    email: "priya.reddy@gmail.com",
    phone: "+91 98490 88210",
    city: "Hyderabad, Telangana",
    initials: "PR",
    orders: 6,
    spent: 42680,
    status: "Active",
    joined: "Feb 08, 2026",
    type: "Premium",
  },
  {
    id: "CUS-1003",
    name: "Arjun Kumar",
    email: "arjun.kumar@gmail.com",
    phone: "+91 97112 65430",
    city: "Bengaluru, Karnataka",
    initials: "AK",
    orders: 4,
    spent: 28750,
    status: "Active",
    joined: "Mar 19, 2026",
    type: "Regular",
  },
  {
    id: "CUS-1004",
    name: "Sneha Patel",
    email: "sneha.patel@gmail.com",
    phone: "+91 98980 12345",
    city: "Ahmedabad, Gujarat",
    initials: "SP",
    orders: 3,
    spent: 16490,
    status: "Active",
    joined: "Apr 02, 2026",
    type: "Regular",
  },
  {
    id: "CUS-1005",
    name: "Vikram Singh",
    email: "vikram.singh@gmail.com",
    phone: "+91 94140 76543",
    city: "Jaipur, Rajasthan",
    initials: "VS",
    orders: 2,
    spent: 9240,
    status: "Inactive",
    joined: "May 14, 2026",
    type: "Regular",
  },
  {
    id: "CUS-1006",
    name: "Ananya Rao",
    email: "ananya.rao@gmail.com",
    phone: "+91 98450 33441",
    city: "Chennai, Tamil Nadu",
    initials: "AR",
    orders: 11,
    spent: 84680,
    status: "Active",
    joined: "Jan 28, 2026",
    type: "VIP",
  },
];

// Initial realistic orders
export const INITIAL_ORDERS = [
  {
    id: "ORD-1048",
    customer: "Rahul Sharma",
    email: "rahul.sharma@gmail.com",
    phone: "+91 98201 44521",
    initials: "RS",
    address: "A-402, Skyline Towers, Andheri West, Mumbai, Maharashtra - 400053",
    product: "Sony WH-1000XM5 Wireless Headphones",
    items: [
      {
        id: 1,
        name: "Sony WH-1000XM5 Wireless Noise Cancelling Headphones",
        price: 24990,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&auto=format&fit=crop&q=80",
      },
    ],
    amount: 24990,
    payment: "Paid",
    paymentMethod: "UPI",
    status: "Delivered",
    date: "Oct 05, 2026",
    time: "14:32",
    timeline: [
      { status: "Order Placed", time: "Oct 05, 14:32", done: true },
      { status: "Processing & Packed", time: "Oct 05, 16:10", done: true },
      { status: "Shipped via BlueDart", time: "Oct 06, 09:40", done: true },
      { status: "Out for Delivery", time: "Oct 07, 08:30", done: true },
      { status: "Delivered", time: "Oct 07, 11:20", done: true },
    ],
  },
  {
    id: "ORD-1047",
    customer: "Priya Reddy",
    email: "priya.reddy@gmail.com",
    phone: "+91 98490 88210",
    initials: "PR",
    address: "Plot 88, Jubilee Hills Road No. 36, Hyderabad, Telangana - 500033",
    product: "Nike Air Max 270 React Sneakers",
    items: [
      {
        id: 3,
        name: "Nike Air Max 270 React Premium Sneakers",
        price: 7499,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&auto=format&fit=crop&q=80",
      },
      {
        id: 4,
        name: "Advanced Retinol & Peptides Restorative Skincare Kit",
        price: 2499,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=300&auto=format&fit=crop&q=80",
      },
    ],
    amount: 9998,
    payment: "Paid",
    paymentMethod: "Card",
    status: "Processing",
    date: "Oct 06, 2026",
    time: "11:15",
    timeline: [
      { status: "Order Placed", time: "Oct 06, 11:15", done: true },
      { status: "Payment Verified", time: "Oct 06, 11:16", done: true },
      { status: "Processing in Warehouse", time: "Oct 06, 14:00", done: true },
      { status: "Ready for Pickup", time: "Pending", done: false },
    ],
  },
  {
    id: "ORD-1046",
    customer: "Arjun Kumar",
    email: "arjun.kumar@gmail.com",
    phone: "+91 97112 65430",
    initials: "AK",
    address: "Flat 12B, Green Glen Layout, Bellandur, Bengaluru, Karnataka - 560103",
    product: "FIFA Quality Pro Match Ball Series 2026",
    items: [
      {
        id: 6,
        name: "FIFA Quality Pro Match Ball Series 2026",
        price: 1599,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1614632537423-1e6c2e7e0aab?w=300&auto=format&fit=crop&q=80",
      },
      {
        id: 8,
        name: "Full Grain Leather Heritage Commuter Backpack",
        price: 4999,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&auto=format&fit=crop&q=80",
      },
    ],
    amount: 6598,
    payment: "Paid",
    paymentMethod: "UPI",
    status: "Shipped",
    date: "Oct 06, 2026",
    time: "09:45",
    timeline: [
      { status: "Order Placed", time: "Oct 06, 09:45", done: true },
      { status: "Packed & Labelled", time: "Oct 06, 13:20", done: true },
      { status: "Shipped with Delhivery", time: "Oct 06, 18:30", done: true },
      { status: "In Transit", time: "Oct 07, 06:00", done: true },
    ],
  },
  {
    id: "ORD-1045",
    customer: "Sneha Patel",
    email: "sneha.patel@gmail.com",
    phone: "+91 98980 12345",
    initials: "SP",
    address: "34, Shivalik Villa, Bodakdev, SG Highway, Ahmedabad, Gujarat - 380054",
    product: "Organic Farm Fresh Gourmet Basket",
    items: [
      {
        id: 7,
        name: "Organic Farm Fresh Gourmet Basket",
        price: 999,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=300&auto=format&fit=crop&q=80",
      },
    ],
    amount: 1098,
    payment: "Pending",
    paymentMethod: "COD",
    status: "Pending",
    date: "Oct 07, 2026",
    time: "08:20",
    timeline: [
      { status: "Order Placed (COD)", time: "Oct 07, 08:20", done: true },
      { status: "Awaiting Confirmation Call", time: "Pending", done: false },
    ],
  },
  {
    id: "ORD-1044",
    customer: "Vikram Singh",
    email: "vikram.singh@gmail.com",
    phone: "+91 94140 76543",
    initials: "VS",
    address: "B-12, Vaishali Nagar, Jaipur, Rajasthan - 302021",
    product: "Minimalist Nordic Touch Dimming Desk Lamp",
    items: [
      {
        id: 5,
        name: "Minimalist Nordic Touch Dimming Desk Lamp",
        price: 1899,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=300&auto=format&fit=crop&q=80",
      },
    ],
    amount: 1899,
    payment: "Paid",
    paymentMethod: "Card",
    status: "Cancelled",
    date: "Oct 04, 2026",
    time: "17:12",
    timeline: [
      { status: "Order Placed", time: "Oct 04, 17:12", done: true },
      { status: "Customer Requested Cancellation", time: "Oct 04, 17:35", done: true },
      { status: "Refund Processed (₹1,899)", time: "Oct 05, 10:00", done: true },
    ],
  },
];

// Helper to safely dispatch custom browser events so UI reacts dynamically
export const triggerStoreEvent = (eventName, detail = {}) => {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(eventName, { detail }));
    window.dispatchEvent(new CustomEvent("shopeasy_sync", { detail }));
  }
};

// ============================================================================
// PRODUCTS SERVICE
// ============================================================================
export const getStoredProducts = () => {
  if (typeof window === "undefined") return INITIAL_PRODUCTS;
  try {
    const data = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
    if (!data) {
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(INITIAL_PRODUCTS));
      return INITIAL_PRODUCTS;
    }
    return JSON.parse(data);
  } catch (e) {
    return INITIAL_PRODUCTS;
  }
};

export const saveStoredProducts = (products) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
  triggerStoreEvent("products_changed", { products });
};

export const addStoredProduct = (productData) => {
  const products = getStoredProducts();
  const newId = products.length ? Math.max(...products.map((p) => Number(p.id) || 0)) + 1 : 1;
  const newProduct = {
    ...productData,
    id: newId,
    title: productData.name || productData.title,
    sku: productData.sku || `SKU-${Date.now().toString().slice(-5)}`,
    status: productData.status || "Active",
    rating: Number(productData.rating) || 4.5,
    reviews: Number(productData.reviews) || 0,
    price: Number(productData.price) || 0,
    stock: Number(productData.stock) || 0,
    createdAt: new Date().toISOString(),
  };
  const updated = [newProduct, ...products];
  saveStoredProducts(updated);
  return newProduct;
};

export const updateStoredProduct = (id, updates) => {
  const products = getStoredProducts();
  const updated = products.map((p) => {
    if (p.id === Number(id)) {
      return {
        ...p,
        ...updates,
        title: updates.name || updates.title || p.title,
        price: updates.price !== undefined ? Number(updates.price) : p.price,
        stock: updates.stock !== undefined ? Number(updates.stock) : p.stock,
        rating: updates.rating !== undefined ? Number(updates.rating) : p.rating,
      };
    }
    return p;
  });
  saveStoredProducts(updated);
  return updated.find((p) => p.id === Number(id));
};

export const deleteStoredProduct = (id) => {
  const products = getStoredProducts();
  const updated = products.filter((p) => p.id !== Number(id));
  saveStoredProducts(updated);
};

// ============================================================================
// ORDERS SERVICE
// ============================================================================
export const getStoredOrders = () => {
  if (typeof window === "undefined") return INITIAL_ORDERS;
  try {
    const data = localStorage.getItem(STORAGE_KEYS.ORDERS);
    if (!data) {
      localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(INITIAL_ORDERS));
      return INITIAL_ORDERS;
    }
    return JSON.parse(data);
  } catch (e) {
    return INITIAL_ORDERS;
  }
};

export const saveStoredOrders = (orders) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
  triggerStoreEvent("orders_changed", { orders });
};

export const createStoredOrder = ({ customer, email, phone, address, items, amount, paymentMethod, paymentDetails = "" }) => {
  const orders = getStoredOrders();
  const highestOrderNumber = orders.reduce((highest, order) => {
    const match = String(order.id || "").match(/ORD-(\d+)/i);
    return match ? Math.max(highest, Number(match[1])) : highest;
  }, 1048);
  const orderId = `#ORD-${highestOrderNumber + 1}`;
  const now = new Date();
  const formattedDate = now.toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" });
  const formattedTime = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  const initials = customer
    ? customer
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "CU";

  const newOrder = {
    id: orderId,
    customer: customer || "ShopEasy Customer",
    email: (email || "").trim().toLowerCase(),
    phone: phone || "",
    initials,
    address: address || "",
    product: items?.[0]?.name || "ShopEasy Products",
    items: items || [],
    amount: Number(amount) || 0,
    payment: paymentMethod === "cod" ? "Pending" : "Paid",
    paymentMethod: paymentMethod === "cod" ? "COD" : paymentMethod === "upi" ? "UPI" : "Card",
    paymentDetails: paymentDetails || "",
    status: "Processing",
    date: formattedDate,
    time: formattedTime,
    timeline: [
      { status: "Order Placed", time: `${formattedDate}, ${formattedTime}`, done: true },
      { status: "Payment Confirmed", time: `${formattedDate}, ${formattedTime}`, done: true },
      { status: "Processing in Warehouse", time: "In Progress", done: true },
      { status: "Dispatch & Tracking", time: "Pending", done: false },
    ],
  };

  const updatedOrders = [newOrder, ...orders];
  saveStoredOrders(updatedOrders);

  // Also update or add customer in customers list
  updateCustomerFromOrder(newOrder);

  return newOrder;
};

export const updateStoredOrderStatus = (orderId, newStatus) => {
  const orders = getStoredOrders();
  const updated = orders.map((order) => {
    if (order.id === orderId) {
      const now = new Date();
      const timeStr = `${now.toLocaleDateString("en-US", { month: "short", day: "2-digit" })}, ${now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;

      const currentTimeline = Array.isArray(order.timeline) ? [...order.timeline] : [];
      currentTimeline.push({
        status: `Status updated to ${newStatus}`,
        time: timeStr,
        done: true,
      });

      return {
        ...order,
        status: newStatus,
        payment: newStatus === "Cancelled" ? "Refunded" : newStatus === "Delivered" ? "Paid" : order.payment,
        timeline: currentTimeline,
      };
    }
    return order;
  });

  saveStoredOrders(updated);
  return updated.find((o) => o.id === orderId);
};

export const deleteStoredOrder = (orderId) => {
  const orders = getStoredOrders();
  const updated = orders.filter((o) => o.id !== orderId);
  saveStoredOrders(updated);
};

// ============================================================================
// CUSTOMERS SERVICE
// ============================================================================
export const getStoredCustomers = () => {
  if (typeof window === "undefined") return INITIAL_CUSTOMERS;
  try {
    const data = localStorage.getItem(STORAGE_KEYS.CUSTOMERS);
    if (!data) {
      localStorage.setItem(STORAGE_KEYS.CUSTOMERS, JSON.stringify(INITIAL_CUSTOMERS));
      return INITIAL_CUSTOMERS;
    }
    return JSON.parse(data);
  } catch (e) {
    return INITIAL_CUSTOMERS;
  }
};

export const saveStoredCustomers = (customers) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEYS.CUSTOMERS, JSON.stringify(customers));
  triggerStoreEvent("customers_changed", { customers });
};

export const addStoredCustomer = (customerData) => {
  const customers = getStoredCustomers();
  const nextNum = 1001 + customers.length;
  const newCustomer = {
    id: `CUS-${nextNum}`,
    name: customerData.name || "New Customer",
    email: customerData.email,
    phone: customerData.phone || "+91 98000 00000",
    city: customerData.city || "India",
    initials: (customerData.name || "NC")
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2),
    orders: Number(customerData.orders) || 0,
    spent: Number(customerData.spent) || 0,
    status: customerData.status || "Active",
    joined: new Date().toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }),
    type: customerData.type || "Regular",
  };
  const updated = [newCustomer, ...customers];
  saveStoredCustomers(updated);
  return newCustomer;
};

export const updateStoredCustomer = (id, updates) => {
  const customers = getStoredCustomers();
  const updated = customers.map((c) => (c.id === id ? { ...c, ...updates } : c));
  saveStoredCustomers(updated);
  return updated.find((c) => c.id === id);
};

export const deleteStoredCustomer = (id) => {
  const customers = getStoredCustomers();
  const updated = customers.filter((c) => c.id !== id);
  saveStoredCustomers(updated);
};

const updateCustomerFromOrder = (order) => {
  const customers = getStoredCustomers();
  const existing = customers.find((c) => (c.email || "").toLowerCase() === (order.email || "").toLowerCase());
  if (existing) {
    const updated = customers.map((c) => {
      if ((c.email || "").toLowerCase() === (order.email || "").toLowerCase()) {
        const newOrders = (c.orders || 0) + 1;
        const newSpent = (c.spent || 0) + order.amount;
        return {
          ...c,
          phone: order.phone || c.phone,
          city: order.address?.split(",").slice(-2)[0]?.trim() || c.city,
          orders: newOrders,
          spent: newSpent,
          type: newSpent > 50000 ? "VIP" : newSpent > 25000 ? "Premium" : c.type,
        };
      }
      return c;
    });
    saveStoredCustomers(updated);
  } else {
    addStoredCustomer({
      name: order.customer,
      email: order.email,
      phone: order.phone,
      city: order.address.split(",").slice(-2)[0]?.trim() || "India",
      orders: 1,
      spent: order.amount,
      type: "Regular",
      status: "Active",
    });
  }
};

// Customer credentials are stored locally for this demo project only.
// For production, move authentication and password hashing to a backend.
export const registerCustomerAccount = ({ email, password, name, phone = "", city = "" }) => {
  if (typeof window === "undefined") return false;
  const key = "shopeasy_customer_accounts";
  const accounts = JSON.parse(localStorage.getItem(key) || "[]");
  const normalizedEmail = email.trim().toLowerCase();
  if (accounts.some((account) => account.email === normalizedEmail)) {
    throw new Error("An account with this email already exists.");
  }
  accounts.push({ email: normalizedEmail, password, name, phone, city });
  localStorage.setItem(key, JSON.stringify(accounts));
  return true;
};

export const updateCustomerAccount = (email, updates) => {
  if (typeof window === "undefined") return false;
  const key = "shopeasy_customer_accounts";
  try {
    const accounts = JSON.parse(localStorage.getItem(key) || "[]");
    const normalizedEmail = String(email || "").trim().toLowerCase();
    const index = accounts.findIndex((account) => account.email === normalizedEmail);
    if (index < 0) return false;
    accounts[index] = { ...accounts[index], ...updates, email: normalizedEmail };
    localStorage.setItem(key, JSON.stringify(accounts));
    return true;
  } catch { return false; }
};

export const authenticateCustomer = (email, password) => {
  if (typeof window === "undefined") return null;
  try {
    const accounts = JSON.parse(localStorage.getItem("shopeasy_customer_accounts") || "[]");
    return accounts.find((account) =>
      account.email === email.trim().toLowerCase() && account.password === password
    ) || null;
  } catch {
    return null;
  }
};

// ============================================================================
// AUTH & SESSION SERVICE
// ============================================================================
export const getAuthUser = () => {
  if (typeof window === "undefined") return null;
  try {
    const userStr = localStorage.getItem(STORAGE_KEYS.AUTH_USER);
    return userStr ? JSON.parse(userStr) : null;
  } catch {
    return null;
  }
};

export const setAuthUser = (user) => {
  if (typeof window === "undefined") return;
  if (!user) {
    localStorage.removeItem(STORAGE_KEYS.AUTH_USER);
  } else {
    localStorage.setItem(STORAGE_KEYS.AUTH_USER, JSON.stringify(user));
  }
  triggerStoreEvent("auth_changed", { user });
  if (typeof window !== "undefined") window.dispatchEvent(new CustomEvent("shopeasy_sync"));
};

export const logoutUser = () => {
  setAuthUser(null);
};

// ============================================================================
// STORE METRICS & ANALYTICS HELPER
// ============================================================================
export const getStoreAnalytics = () => {
  const products = getStoredProducts();
  const orders = getStoredOrders();
  const customers = getStoredCustomers();

  const totalSales = orders
    .filter((o) => o.status !== "Cancelled")
    .reduce((sum, o) => sum + (Number(o.amount) || 0), 0);

  const activeOrders = orders.filter((o) => ["Pending", "Processing", "Shipped"].includes(o.status)).length;
  const lowStockProducts = products.filter((p) => p.stock > 0 && p.stock <= 10).length;
  const outOfStockProducts = products.filter((p) => p.stock === 0).length;
  const deliveredOrders = orders.filter((o) => o.status === "Delivered").length;

  return {
    totalSales,
    totalOrders: orders.length,
    activeOrders,
    deliveredOrders,
    totalCustomers: customers.length,
    activeCustomers: customers.filter((c) => c.status === "Active").length,
    totalProducts: products.length,
    lowStockProducts,
    outOfStockProducts,
    avgOrderValue: orders.length ? Math.round(totalSales / orders.length) : 0,
  };
};

