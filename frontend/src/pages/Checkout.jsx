import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

const Checkout = () => {
  const { cart, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [address, setAddress] = useState({
    fullName: "",
    addressLine: "",
    city: "",
    state: "",
    pincode: "",
    phone: "",
  });
  const [placing, setPlacing] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setError("");
    setPlacing(true);
    setProcessing(true);

    setTimeout(async () => {
      try {
        const items = cart.map((item) => ({
          product: item._id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image,
        }));

        await api.post("/users/orders", {
          items,
          totalAmount: cartTotal,
          shippingAddress: {
            addressLine: `${address.fullName}, ${address.addressLine}`,
            city: address.city,
            state: address.state,
            pincode: address.pincode,
          },
        });

        clearCart();
        setProcessing(false);
        setShowSuccess(true);

        setTimeout(() => {
          navigate("/account?order=success");
        }, 2200);
      } catch (err) {
        setError("Something went wrong placing your order.");
        setPlacing(false);
        setProcessing(false);
      }
    }, 1800);
  };

  return (
    <>
      {/* Success popup */}
      {showSuccess && (
        <div className="fixed inset-0 z-[100] bg-black/50 flex items-center justify-center px-4">
          <div className="bg-white rounded-3xl p-8 sm:p-10 max-w-sm w-full text-center">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-5">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="3">
                <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h2 className="font-display text-2xl font-700 text-clay-900 mb-2">Payment Successful!</h2>
            <p className="text-clay-600 text-sm">
              Your order has been placed. Redirecting you to your orders…
            </p>
          </div>
        </div>
      )}

      {cart.length === 0 ? (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h1 className="font-display text-3xl font-700 text-clay-900 mb-3">Nothing to checkout</h1>
          <p className="text-clay-600 mb-6">Your cart is empty.</p>
          <Link to="/shop" className="inline-block px-6 py-3 rounded-full bg-clay-800 text-clay-50 font-medium hover:bg-clay-700">
            Go to Shop
          </Link>
        </div>
      ) : (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <h1 className="font-display text-3xl sm:text-4xl font-700 text-clay-900 mb-8">Checkout</h1>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {/* Address form */}
            <div className="md:col-span-3">
              <div className="bg-white border border-clay-200 rounded-2xl p-6">
                <h2 className="font-display text-xl font-700 text-clay-900 mb-5">Shipping address</h2>
                <form onSubmit={handlePlaceOrder} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-clay-700 mb-1.5">Full name</label>
                    <input
                      name="fullName"
                      required
                      value={address.fullName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-clay-300 bg-white focus:outline-none focus:ring-2 focus:ring-clay-400"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-clay-700 mb-1.5">Phone number</label>
                    <input
                      name="phone"
                      type="tel"
                      required
                      value={address.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-clay-300 bg-white focus:outline-none focus:ring-2 focus:ring-clay-400"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-clay-700 mb-1.5">Address</label>
                    <input
                      name="addressLine"
                      required
                      placeholder="House no, street, area"
                      value={address.addressLine}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-clay-300 bg-white focus:outline-none focus:ring-2 focus:ring-clay-400"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-clay-700 mb-1.5">City</label>
                      <input
                        name="city"
                        required
                        value={address.city}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-clay-300 bg-white focus:outline-none focus:ring-2 focus:ring-clay-400"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-clay-700 mb-1.5">State</label>
                      <input
                        name="state"
                        required
                        value={address.state}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-clay-300 bg-white focus:outline-none focus:ring-2 focus:ring-clay-400"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-clay-700 mb-1.5">Pincode</label>
                    <input
                      name="pincode"
                      required
                      value={address.pincode}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-clay-300 bg-white focus:outline-none focus:ring-2 focus:ring-clay-400"
                    />
                  </div>

                  {error && <p className="text-sm text-red-600">{error}</p>}

                  <button
                    type="submit"
                    disabled={placing}
                    className="w-full py-3.5 rounded-full bg-clay-800 text-clay-50 font-medium hover:bg-clay-700 transition-colors disabled:opacity-60"
                  >
                    {processing ? "Processing payment…" : `Place order · ₹${cartTotal.toLocaleString("en-IN")}`}
                  </button>
                </form>
              </div>
            </div>

            {/* Order summary */}
            <div className="md:col-span-2">
              <div className="bg-clay-100 rounded-2xl p-6 sticky top-24">
                <h2 className="font-display text-xl font-700 text-clay-900 mb-5">Order summary</h2>
                <div className="space-y-3 mb-5">
                  {cart.map((item) => (
                    <div key={item._id} className="flex justify-between text-sm">
                      <span className="text-clay-700">{item.name} × {item.quantity}</span>
                      <span className="text-clay-800 font-medium">
                        ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-clay-300 pt-4 flex justify-between font-semibold text-clay-900">
                  <span>Total</span>
                  <span>₹{cartTotal.toLocaleString("en-IN")}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Checkout;