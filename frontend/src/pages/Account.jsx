import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import ProductCard from "../components/ProductCard";

const ALL_TABS = ["Interests", "Wishlist", "Orders"];

const Account = () => {
  const { user } = useAuth();
const TABS = user?.role === "admin" ? ["Wishlist", "Orders"] : ALL_TABS;
const [activeTab, setActiveTab] = useState(TABS[0]);

  const [categories, setCategories] = useState([]);
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [savingInterests, setSavingInterests] = useState(false);
  const [savedMsg, setSavedMsg] = useState("");

  const [wishlist, setWishlist] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    api.get("/categories").then((res) => setCategories(res.data)).catch(() => {});
    api.get("/users/interests").then((res) => setSelectedInterests(res.data.interests || [])).catch(() => {});
    fetchWishlist();
    api.get("/users/orders").then((res) => setOrders(res.data)).catch(() => {});
  }, []);

  const fetchWishlist = () => {
    api.get("/users/wishlist").then((res) => setWishlist(res.data)).catch(() => {});
  };

  const toggleInterest = (catName) => {
    setSelectedInterests((prev) =>
      prev.includes(catName) ? prev.filter((c) => c !== catName) : [...prev, catName]
    );
  };

  const saveInterests = async () => {
    setSavingInterests(true);
    setSavedMsg("");
    try {
      await api.put("/users/interests", { interests: selectedInterests });
      setSavedMsg("Saved! We'll personalize your homepage based on this.");
    } catch (err) {
      setSavedMsg("Couldn't save right now, try again.");
    } finally {
      setSavingInterests(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="font-display text-3xl sm:text-4xl font-700 text-ink mb-1">My Account</h1>
      <p className="text-clay-600 mb-8">{user?.email}</p>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-clay-200 mb-8 overflow-x-auto">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 -mb-px transition-colors ${
              activeTab === tab
                ? "border-clay-800 text-clay-900"
                : "border-transparent text-clay-500 hover:text-clay-700"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Interests tab */}
      {activeTab === "Interests" && (
        <div>
          <p className="text-clay-600 mb-5">
            Pick the styles and categories you like — we'll use this to personalize what you see and notify
            you about new arrivals or offers.
          </p>
          <div className="flex flex-wrap gap-3 mb-6">
            {categories.map((cat) => {
              const active = selectedInterests.includes(cat.name);
              return (
                <button
                  key={cat._id}
                  onClick={() => toggleInterest(cat.name)}
                  className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                    active
                      ? "bg-clay-800 border-clay-800 text-clay-50"
                      : "bg-white border-clay-300 text-clay-700 hover:bg-clay-100"
                  }`}
                >
                  {cat.name}
                </button>
              );
            })}
            {categories.length === 0 && (
              <p className="text-sm text-clay-500">No categories yet — add some from the admin panel.</p>
            )}
          </div>
          <button
            onClick={saveInterests}
            disabled={savingInterests}
            className="px-6 py-3 rounded-full bg-clay-800 text-clay-50 font-medium hover:bg-clay-700 transition-colors disabled:opacity-60"
          >
            {savingInterests ? "Saving…" : "Save interests"}
          </button>
          {savedMsg && <p className="mt-3 text-sm text-clay-600">{savedMsg}</p>}
        </div>
      )}

      {/* Wishlist tab */}
      {activeTab === "Wishlist" && (
        <div>
          {wishlist.length === 0 ? (
            <p className="text-clay-600">
              Nothing here yet. <Link to="/shop" className="underline font-medium">Browse the shop</Link> and tap
              the heart icon on anything you love.
            </p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
              {wishlist.map((p) => (
                <ProductCard key={p._id} product={p} wishlist={wishlist.map((w) => w._id)} onWishlistChange={fetchWishlist} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Orders tab */}
      {activeTab === "Orders" && (
        <div className="space-y-4">
          {orders.length === 0 ? (
            <p className="text-clay-600">
              No orders yet. <Link to="/shop" className="underline font-medium">Start shopping</Link>.
            </p>
          ) : (
            orders.map((order) => (
              <div key={order._id} className="border border-clay-200 rounded-2xl p-5 bg-white">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <p className="text-sm text-clay-500">
                    Order #{order._id.slice(-6).toUpperCase()} · {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                  <span className="text-xs font-medium px-3 py-1 rounded-full bg-clay-100 text-clay-700 capitalize">
                    {order.status}
                  </span>
                </div>
                <div className="space-y-2 mb-3">
                  {order.items.map((item, i) => (
                    <div key={i} className="flex items-center justify-between text-sm">
                      <span className="text-ink">{item.name} × {item.quantity}</span>
                      <span className="text-clay-700">₹{item.price?.toLocaleString("en-IN")}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-clay-100 pt-3 flex justify-between font-semibold text-ink">
                  <span>Total</span>
                  <span>₹{order.totalAmount?.toLocaleString("en-IN")}</span>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Account;
