"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  MapPin,
  CreditCard,
  ShieldCheck,
  LockKeyhole,
  Truck,
  CheckCircle2,
  ShoppingBag,
  ChevronRight,
  Package,
} from "lucide-react";
import toast from "react-hot-toast";
import { getCartItems, saveCartItems } from "@/utils/cartUtils";
import {
  createStoredOrder,
  getAuthUser,
  setAuthUser,
  updateCustomerAccount,
} from "@/utils/storeData";
import { useStoreSnapshot } from "@/hooks/useStoreSnapshot";

export default function CheckoutPage() {
  const router = useRouter();
  const user = useStoreSnapshot(getAuthUser, null, []);
  const cartItems = useStoreSnapshot(getCartItems, [], []);
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [upiApp, setUpiApp] = useState("google-pay");
  const [upiId, setUpiId] = useState("");
  const [cardDetails, setCardDetails] = useState({ name: "", number: "", expiry: "", cvv: "" });
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [createdOrder, setCreatedOrder] = useState(null);

  const userKey = JSON.stringify(user);
  const [editedShippingForm, setEditedShippingForm] = useState(null);
  const shippingDefaults = (() => {
    if (!user || user.role !== "user") {
      return {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
      };
    }

    const parts = (user.name || "").trim().split(/\\s+/);
    return {
      firstName: parts[0] || "",
      lastName: parts.slice(1).join(" "),
      email: user.email || "",
      phone: user.phone || "",
      address: user.address || "",
      city: user.city || "",
      state: user.state || "",
      pincode: user.pincode || "",
    };
  })();
  const shippingForm =
    editedShippingForm?.userKey === userKey
      ? editedShippingForm.values
      : shippingDefaults;
  const setShippingForm = (values) => {
    setEditedShippingForm({
      userKey,
      values,
    });
  };

  useEffect(() => {
    const currentUser = getAuthUser();
    if (!currentUser || currentUser.role !== "user") {
      toast.error("Please login as a customer before checkout.");
      router.replace("/login/customer?next=/checkout");
    }
  }, [router]);

  const subtotal = cartItems.reduce(
    (total, item) =>
      total + Number(item.price || 0) * Number(item.quantity || 1),
    0
  );

  const delivery = subtotal >= 999 ? 0 : 99;
  const total = subtotal + delivery;

  const handlePlaceOrder = () => {
    if (!cartItems.length) {
      toast.error("Your cart is empty. Add products before checkout.");
      router.push("/products");
      return;
    }
    if (!shippingForm.firstName.trim() || !shippingForm.email.trim() || !shippingForm.phone.trim() || !shippingForm.address.trim()) {
      toast.error("Please complete your delivery details.");
      return;
    }
    if (paymentMethod === "upi" && !upiId.trim()) {
      toast.error("Please enter your UPI ID to continue.");
      return;
    }
    if (paymentMethod === "card") {
      const digits = cardDetails.number.replace(/\s/g, "");
      if (!cardDetails.name.trim() || digits.length < 12 || !cardDetails.expiry.trim() || cardDetails.cvv.length < 3) {
        toast.error("Please enter valid card details.");
        return;
      }
    }
    setIsPlacingOrder(true);

    setTimeout(() => {
      const fullAddress = `${shippingForm.address}, ${shippingForm.city}, ${shippingForm.state} - ${shippingForm.pincode}`;
      const customerFullName = `${shippingForm.firstName} ${shippingForm.lastName}`;
      const activeUser = getAuthUser();
      const profileUpdates = {
        name: customerFullName,
        email: shippingForm.email,
        phone: shippingForm.phone,
        address: shippingForm.address,
        city: shippingForm.city,
        state: shippingForm.state,
        pincode: shippingForm.pincode,
      };
      if (activeUser) {
        setAuthUser({ ...activeUser, ...profileUpdates });
        updateCustomerAccount(activeUser.email, profileUpdates);
      }

      // Create and persist order in storeData
      const order = createStoredOrder({
        customer: customerFullName,
        email: shippingForm.email,
        phone: shippingForm.phone,
        address: fullAddress,
        items: cartItems,
        amount: total,
        paymentMethod,
        paymentDetails: paymentMethod === "upi" ? `${upiApp} · ${upiId}` : paymentMethod === "card" ? `Card ending ${cardDetails.number.replace(/\s/g, "").slice(-4)}` : "Cash on Delivery",
      });

      // Clear Cart
      saveCartItems([]);

      setCreatedOrder(order);
      setIsPlacingOrder(false);
      toast.success("Order confirmed successfully!");
    }, 1200);
  };

  return (
    <main className="min-h-screen bg-slate-50">
      {createdOrder ? (
        <section className="flex min-h-[75vh] items-center justify-center px-4 py-16">
          <div className="w-full max-w-xl rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-2xl sm:p-12 animate-in zoom-in-95 duration-200">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-emerald-100 text-emerald-600">
              <CheckCircle2 size={42} />
            </div>

            <p className="mt-6 text-xs font-black uppercase tracking-widest text-emerald-600">
              Order Placed Successfully
            </p>

            <h1 className="mt-2 text-2xl font-black text-slate-900 sm:text-3xl">
              Thank you for shopping with us!
            </h1>

            <p className="mx-auto mt-2 max-w-md text-xs sm:text-sm text-slate-500">
              Your order <span className="font-mono font-bold text-slate-900">{createdOrder.id}</span> is now processing. Our logistics team will dispatch it shortly.
            </p>

            {/* Order Summary Receipt Box */}
            <div className="mt-6 rounded-2xl bg-slate-50 p-5 text-left border border-slate-100 space-y-3 text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <span className="font-bold text-slate-700">Order Reference</span>
                <span className="font-mono font-black text-indigo-600">{createdOrder.id}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-500">Deliver to</span>
                <span className="font-semibold text-slate-800">{createdOrder.customer}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-500">Payment Option</span>
                <span className="font-semibold text-slate-800 uppercase">{createdOrder.paymentMethod} ({createdOrder.payment})</span>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-200">
                <span className="font-bold text-slate-700">Total Paid</span>
                <span className="text-base font-black text-slate-900">
                  ₹{createdOrder.amount.toLocaleString("en-IN")}
                </span>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/profile"
                className="flex flex-1 items-center justify-center rounded-xl bg-slate-900 py-3 text-xs font-bold text-white transition hover:bg-indigo-600"
              >
                Track in My Orders
              </Link>

              <Link
                href="/products"
                className="flex flex-1 items-center justify-center rounded-xl border border-slate-200 bg-white py-3 text-xs font-bold text-slate-700 transition hover:bg-slate-50"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </section>
      ) : (
        <>
          {/* Header */}
          <section className="border-b border-slate-200 bg-white">
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
              <Link
                href="/cart"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 transition hover:text-indigo-600"
              >
                <ArrowLeft size={15} />
                <span>Return to Cart</span>
              </Link>

              <div className="mt-3 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                    Checkout & Payment
                  </h1>
                  <p className="mt-1 text-xs text-slate-500">
                    Verify delivery address and select payment gateway to confirm order.
                  </p>
                </div>

                <div className="flex items-center gap-2 text-xs font-bold text-emerald-600">
                  <ShieldCheck size={16} />
                  <span>256-Bit SSL Encrypted Checkout</span>
                </div>
              </div>
            </div>
          </section>

          {/* Checkout Grid */}
          <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
              {/* Left Column: Shipping Address + Payment */}
              <div className="space-y-6">
                {/* Step 1: Shipping Address */}
                <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                      <MapPin size={18} />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-indigo-600">Step 1</p>
                      <h2 className="text-lg font-black text-slate-900">Delivery Address</h2>
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2 text-xs">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">First Name</label>
                      <input
                        type="text"
                        value={shippingForm.firstName}
                        onChange={(e) => setShippingForm({ ...shippingForm, firstName: e.target.value })}
                        className="w-full h-10.5 rounded-xl border border-slate-200 px-3.5 outline-none focus:border-indigo-500"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Last Name</label>
                      <input
                        type="text"
                        value={shippingForm.lastName}
                        onChange={(e) => setShippingForm({ ...shippingForm, lastName: e.target.value })}
                        className="w-full h-10.5 rounded-xl border border-slate-200 px-3.5 outline-none focus:border-indigo-500"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Email Address</label>
                      <input
                        type="email"
                        value={shippingForm.email}
                        onChange={(e) => setShippingForm({ ...shippingForm, email: e.target.value })}
                        className="w-full h-10.5 rounded-xl border border-slate-200 px-3.5 outline-none focus:border-indigo-500"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Phone Number</label>
                      <input
                        type="text"
                        value={shippingForm.phone}
                        onChange={(e) => setShippingForm({ ...shippingForm, phone: e.target.value })}
                        className="w-full h-10.5 rounded-xl border border-slate-200 px-3.5 outline-none focus:border-indigo-500"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block font-bold text-slate-700 mb-1">Street Address</label>
                      <input
                        type="text"
                        value={shippingForm.address}
                        onChange={(e) => setShippingForm({ ...shippingForm, address: e.target.value })}
                        className="w-full h-10.5 rounded-xl border border-slate-200 px-3.5 outline-none focus:border-indigo-500"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">City</label>
                      <input
                        type="text"
                        value={shippingForm.city}
                        onChange={(e) => setShippingForm({ ...shippingForm, city: e.target.value })}
                        className="w-full h-10.5 rounded-xl border border-slate-200 px-3.5 outline-none focus:border-indigo-500"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">PIN Code</label>
                      <input
                        type="text"
                        value={shippingForm.pincode}
                        onChange={(e) => setShippingForm({ ...shippingForm, pincode: e.target.value })}
                        className="w-full h-10.5 rounded-xl border border-slate-200 px-3.5 outline-none focus:border-indigo-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Step 2: Payment Method */}
                <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                      <CreditCard size={18} />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-violet-600">Step 2</p>
                      <h2 className="text-lg font-black text-slate-900">Payment Option</h2>
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-3">
                    <label
                      className={`flex cursor-pointer flex-col justify-between rounded-2xl border p-4 transition ${
                        paymentMethod === "upi"
                          ? "border-indigo-600 bg-indigo-50/40 shadow-xs"
                          : "border-slate-200 hover:bg-slate-50"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black text-slate-900">UPI Instant</span>
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="upi"
                          checked={paymentMethod === "upi"}
                          onChange={() => setPaymentMethod("upi")}
                          className="h-4 w-4 accent-indigo-600"
                        />
                      </div>
                      <p className="mt-2 text-[11px] text-slate-500">
                        GPay, PhonePe, Paytm
                      </p>
                    </label>

                    <label
                      className={`flex cursor-pointer flex-col justify-between rounded-2xl border p-4 transition ${
                        paymentMethod === "card"
                          ? "border-indigo-600 bg-indigo-50/40 shadow-xs"
                          : "border-slate-200 hover:bg-slate-50"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black text-slate-900">Card</span>
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="card"
                          checked={paymentMethod === "card"}
                          onChange={() => setPaymentMethod("card")}
                          className="h-4 w-4 accent-indigo-600"
                        />
                      </div>
                      <p className="mt-2 text-[11px] text-slate-500">
                        Visa, Mastercard, RuPay
                      </p>
                    </label>

                    <label
                      className={`flex cursor-pointer flex-col justify-between rounded-2xl border p-4 transition ${
                        paymentMethod === "cod"
                          ? "border-indigo-600 bg-indigo-50/40 shadow-xs"
                          : "border-slate-200 hover:bg-slate-50"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black text-slate-900">Pay on Delivery</span>
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="cod"
                          checked={paymentMethod === "cod"}
                          onChange={() => setPaymentMethod("cod")}
                          className="h-4 w-4 accent-indigo-600"
                        />
                      </div>
                      <p className="mt-2 text-[11px] text-slate-500">
                        Cash / UPI upon delivery
                      </p>
                    </label>
                  </div>

                  {paymentMethod === "upi" && (
                    <div className="rounded-2xl border border-violet-100 bg-violet-50/50 p-4 space-y-4">
                      <div>
                        <h3 className="text-sm font-extrabold text-slate-900">Choose your UPI app</h3>
                        <p className="mt-1 text-xs text-slate-500">Select an app and enter your UPI ID.</p>
                      </div>
                      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                        {[
                          ["google-pay", "Google Pay", "/upi/google-pay.webp"],
                          ["phonepe", "PhonePe", "/upi/phonepe.png"],
                          ["paytm", "Paytm", "/upi/paytm.jpeg"],
                          ["bhim", "BHIM", "/upi/bhim.png"],
                        ].map(([id, name, logo]) => (
                          <button key={id} type="button" onClick={() => setUpiApp(id)} className={`flex items-center gap-2 rounded-xl border bg-white p-3 text-left transition ${upiApp === id ? "border-violet-600 ring-2 ring-violet-100" : "border-slate-200 hover:border-violet-300"}`}>
                            <Image
                              src={logo}
                              alt=""
                              width={32}
                              height={32}
                              className="h-8 w-8 rounded-md object-contain"
                            />
                            <span className="text-xs font-bold text-slate-800">{name}</span>
                          </button>
                        ))}
                      </div>
                      <label className="block text-xs font-bold text-slate-700">UPI ID
                        <input value={upiId} onChange={(e) => setUpiId(e.target.value)} placeholder="yourname@upi" className="mt-2 h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm font-normal outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100" />
                      </label>
                    </div>
                  )}

                  {paymentMethod === "card" && (
                    <div className="rounded-2xl border border-violet-100 bg-violet-50/50 p-4 space-y-3">
                      <div><h3 className="text-sm font-extrabold text-slate-900">Card details</h3><p className="mt-1 text-xs text-slate-500">Enter your card information. Do not use real card details in this demo checkout.</p></div>
                      <label className="block text-xs font-bold text-slate-700">Cardholder name
                        <input value={cardDetails.name} onChange={(e) => setCardDetails({ ...cardDetails, name: e.target.value })} placeholder="Name on card" autoComplete="cc-name" className="mt-2 h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm font-normal outline-none focus:border-violet-500" />
                      </label>
                      <label className="block text-xs font-bold text-slate-700">Card number
                        <input value={cardDetails.number} onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value.replace(/[^0-9 ]/g, "").slice(0, 19) })} placeholder="1234 5678 9012 3456" inputMode="numeric" autoComplete="cc-number" className="mt-2 h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm font-normal outline-none focus:border-violet-500" />
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        <label className="block text-xs font-bold text-slate-700">Expiry date
                          <input value={cardDetails.expiry} onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value.slice(0, 5) })} placeholder="MM/YY" autoComplete="cc-exp" className="mt-2 h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm font-normal outline-none focus:border-violet-500" />
                        </label>
                        <label className="block text-xs font-bold text-slate-700">CVV
                          <input value={cardDetails.cvv} onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value.replace(/\D/g, "").slice(0, 4) })} placeholder="123" inputMode="numeric" autoComplete="cc-csc" type="password" className="mt-2 h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm font-normal outline-none focus:border-violet-500" />
                        </label>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column: Order Summary & Place Button */}
              <div>
                <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs sticky top-24 space-y-5">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <h2 className="text-base font-black text-slate-900">
                      Order Summary
                    </h2>
                    <span className="text-xs font-bold text-slate-400">
                      {cartItems.length} item(s)
                    </span>
                  </div>

                  {/* Items mini list */}
                  <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex items-center gap-3 text-xs">
                        <div className="h-10 w-10 shrink-0 rounded-lg bg-slate-100 p-1 border border-slate-100 overflow-hidden flex items-center justify-center">
                          {item.image ? (
                            <Image
                              src={item.image}
                              alt={item.name}
                              width={40}
                              height={40}
                              unoptimized
                              className="h-full w-full object-contain"
                            />
                          ) : (
                            <span>🛍️</span>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-slate-800 truncate">{item.name}</p>
                          <p className="text-[10px] text-slate-400">Qty: {item.quantity || 1}</p>
                        </div>
                        <span className="font-black text-slate-900 shrink-0">
                          ₹{(Number(item.price || 0) * Number(item.quantity || 1)).toLocaleString("en-IN")}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Calculations */}
                  <div className="border-t border-slate-100 pt-3 space-y-2 text-xs">
                    <div className="flex justify-between text-slate-500">
                      <span>Subtotal</span>
                      <span className="font-bold text-slate-800">
                        ₹{subtotal.toLocaleString("en-IN")}
                      </span>
                    </div>

                    <div className="flex justify-between text-slate-500">
                      <span>Delivery Shipping</span>
                      <span className="font-bold text-emerald-600">
                        {delivery === 0 ? "FREE" : `₹${delivery}`}
                      </span>
                    </div>

                    <div className="border-t border-dashed border-slate-200 pt-3 flex items-baseline justify-between">
                      <span className="text-sm font-black text-slate-900">Final Total</span>
                      <span className="text-xl font-black text-slate-900">
                        ₹{total.toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    disabled={isPlacingOrder}
                    onClick={handlePlaceOrder}
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-slate-900 py-3.5 text-xs font-black text-white hover:bg-indigo-600 transition shadow-lg shadow-slate-900/10 disabled:opacity-60"
                  >
                    {isPlacingOrder ? "Confirming Order..." : "Place Order & Pay"}
                    {!isPlacingOrder && <ChevronRight size={16} />}
                  </button>

                  <p className="text-[10px] text-center text-slate-400">
                    By placing your order, you agree to ShopEasy&apos;s conditions of use.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </main>
  );
}
