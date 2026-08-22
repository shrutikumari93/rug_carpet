import { useEffect, useState } from "react";
import api from "../api/axios";

const emptyForm = {
  name: "",
  description: "",
  price: "",
  category: "",
  type: "rug",
  material: "",
  size: "",
  colors: "",
  images: "",
  stock: "",
  featured: false,
};

const TABS = ["Products", "Customer Interests", "Orders"];

const Admin = () => {
  const [activeTab, setActiveTab] = useState("Products");

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const [customers, setCustomers] = useState([]);
  const [loadingCustomers, setLoadingCustomers] = useState(false);

  const [orders, setOrders] = useState([]);
const [loadingOrders, setLoadingOrders] = useState(false);

  const loadData = () => {
    api.get("/products").then((res) => setProducts(res.data)).catch(() => {});
    api.get("/categories").then((res) => setCategories(res.data)).catch(() => {});
  };

  const loadCustomerInterests = () => {
    setLoadingCustomers(true);
    api
      .get("/users/all-interests")
      .then((res) => setCustomers(res.data))
      .catch(() => {})
      .finally(() => setLoadingCustomers(false));
  };

  const loadOrders = () => {
  setLoadingOrders(true);
  api
    .get("/users/all-orders")
    .then((res) => setOrders(res.data))
    .catch(() => {})
    .finally(() => setLoadingOrders(false));
};

const updateOrderStatus = async (orderId, status) => {
  try {
    await api.put(`/users/orders/${orderId}/status`, { status });
    setOrders((prev) => prev.map((o) => (o._id === orderId ? { ...o, status } : o)));
  } catch (err) {
    console.error(err);
  }
};

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
  if (activeTab === "Customer Interests") {
    loadCustomerInterests();
  }
  if (activeTab === "Orders") {
    loadOrders();
  }
}, [activeTab]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  };

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
  };

  const startEdit = (product) => {
    setEditingId(product._id);
    setForm({
      name: product.name || "",
      description: product.description || "",
      price: product.price || "",
      category: product.category?._id || product.category || "",
      type: product.type || "rug",
      material: product.material || "",
      size: product.size || "",
      colors: (product.colors || []).join(", "),
      images: (product.images || []).join(", "),
      stock: product.stock ?? "",
      featured: !!product.featured,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");
    try {
      const payload = {
        ...form,
        price: Number(form.price),
        stock: Number(form.stock),
        colors: form.colors.split(",").map((c) => c.trim()).filter(Boolean),
        images: form.images.split(",").map((i) => i.trim()).filter(Boolean),
      };

      if (editingId) {
        await api.put(`/products/${editingId}`, payload);
        setMessage("Product updated.");
      } else {
        await api.post("/products", payload);
        setMessage("Product added.");
      }
      resetForm();
      loadData();
    } catch (err) {
      setMessage(err.response?.data?.message || "Something went wrong.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    try {
      await api.delete(`/products/${id}`);
      loadData();
      if (editingId === id) resetForm();
    } catch (err) {
      setMessage("Failed to delete.");
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="font-display italic text-4xl sm:text-5xl text-ink mb-6">Admin Dashboard</h1>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-loom-200 mb-8">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 -mb-px transition-colors ${
              activeTab === tab
                ? "border-ink text-ink"
                : "border-transparent text-loom-500 hover:text-loom-700"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* PRODUCTS TAB */}
      {activeTab === "Products" && (
        <>
          <form onSubmit={handleSubmit} className="bg-white border border-loom-200 rounded-sm p-6 mb-10">
            <h2 className="font-display italic text-2xl text-ink mb-5">
              {editingId ? "Edit product" : "Add a new product"}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-loom-700 mb-1.5">Name</label>
                <input
                  name="name"
                  required
                  value={form.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-sm border border-loom-300 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-loom-700 mb-1.5">Category</label>
                <select
                  name="category"
                  required
                  value={form.category}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-sm border border-loom-300 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">Select category</option>
                  {categories.map((c) => (
                    <option key={c._id} value={c._id}>{c.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-loom-700 mb-1.5">Description</label>
              <textarea
                name="description"
                required
                rows={3}
                value={form.description}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-sm border border-loom-300 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-loom-700 mb-1.5">Price (₹)</label>
                <input
                  type="number"
                  name="price"
                  required
                  value={form.price}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-sm border border-loom-300 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-loom-700 mb-1.5">Stock</label>
                <input
                  type="number"
                  name="stock"
                  required
                  value={form.stock}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-sm border border-loom-300 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-loom-700 mb-1.5">Type</label>
                <select
                  name="type"
                  value={form.type}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-sm border border-loom-300 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="rug">Rug</option>
                  <option value="carpet">Carpet</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-loom-700 mb-1.5">Size</label>
                <input
                  name="size"
                  placeholder="5x7 ft"
                  value={form.size}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-sm border border-loom-300 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-loom-700 mb-1.5">Material</label>
                <input
                  name="material"
                  placeholder="100% Wool"
                  value={form.material}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-sm border border-loom-300 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-loom-700 mb-1.5">Colors (comma separated)</label>
                <input
                  name="colors"
                  placeholder="Beige, Brown"
                  value={form.colors}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-sm border border-loom-300 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-loom-700 mb-1.5">Image URLs (comma separated)</label>
              <input
                name="images"
                placeholder="https://example.com/img1.jpg, https://example.com/img2.jpg"
                value={form.images}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-sm border border-loom-300 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <label className="flex items-center gap-2 mb-6 text-sm text-loom-700">
              <input type="checkbox" name="featured" checked={form.featured} onChange={handleChange} />
              Show on homepage as featured
            </label>

            <div className="flex flex-wrap gap-3 items-center">
              <button
                type="submit"
                disabled={saving}
                className="px-6 py-3 rounded-sm bg-ink text-loom-50 font-medium hover:bg-indigo-700 transition-colors disabled:opacity-60"
              >
                {saving ? "Saving…" : editingId ? "Update product" : "Add product"}
              </button>
              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-3 rounded-sm border border-loom-300 text-loom-700 font-medium hover:bg-loom-100"
                >
                  Cancel edit
                </button>
              )}
              {message && <p className="text-sm text-loom-600">{message}</p>}
            </div>
          </form>

          <h2 className="font-display italic text-2xl text-ink mb-4">All products ({products.length})</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-loom-200 bg-white">
              <thead>
                <tr className="bg-loom-100 text-left">
                  <th className="p-3 font-medium text-loom-700">Name</th>
                  <th className="p-3 font-medium text-loom-700">Category</th>
                  <th className="p-3 font-medium text-loom-700">Type</th>
                  <th className="p-3 font-medium text-loom-700">Price</th>
                  <th className="p-3 font-medium text-loom-700">Stock</th>
                  <th className="p-3 font-medium text-loom-700">Featured</th>
                  <th className="p-3 font-medium text-loom-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p._id} className="border-t border-loom-200">
                    <td className="p-3 text-ink">{p.name}</td>
                    <td className="p-3 text-loom-600">{p.category?.name || "—"}</td>
                    <td className="p-3 text-loom-600 capitalize">{p.type}</td>
                    <td className="p-3 text-loom-600">₹{p.price?.toLocaleString("en-IN")}</td>
                    <td className="p-3 text-loom-600">{p.stock}</td>
                    <td className="p-3 text-loom-600">{p.featured ? "Yes" : "No"}</td>
                    <td className="p-3">
                      <button onClick={() => startEdit(p)} className="text-indigo-600 hover:underline mr-3">
                        Edit
                      </button>
                      <button onClick={() => handleDelete(p._id)} className="text-madder-500 hover:underline">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
                {products.length === 0 && (
                  <tr>
                    <td colSpan={7} className="p-4 text-center text-loom-500">
                      No products yet. Add one above.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* CUSTOMER INTERESTS TAB */}
      {activeTab === "Customer Interests" && (
        <div>
          {loadingCustomers ? (
            <p className="text-loom-600">Loading…</p>
          ) : customers.length === 0 ? (
            <p className="text-loom-600">No customers have registered yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-loom-200 bg-white">
                <thead>
                  <tr className="bg-loom-100 text-left">
                    <th className="p-3 font-medium text-loom-700">Customer</th>
                    <th className="p-3 font-medium text-loom-700">Email</th>
                    <th className="p-3 font-medium text-loom-700">Interested Categories</th>
                    <th className="p-3 font-medium text-loom-700">Wishlisted Products</th>
                  </tr>
                </thead>
                <tbody>
                  {customers.map((c) => (
                    <tr key={c._id} className="border-t border-loom-200 align-top">
                      <td className="p-3 text-ink">{c.name}</td>
                      <td className="p-3 text-loom-600">{c.email}</td>
                      <td className="p-3 text-loom-600">
                        {c.interests && c.interests.length > 0 ? (
                          <div className="flex flex-wrap gap-1.5">
                            {c.interests.map((interest, i) => (
                              <span key={i} className="px-2 py-0.5 bg-indigo-100 text-indigo-700 rounded-sm text-xs">
                                {interest}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <span className="text-loom-400">None set</span>
                        )}
                      </td>
                      <td className="p-3 text-loom-600">
                        {c.wishlist && c.wishlist.length > 0 ? (
                          <div className="flex flex-wrap gap-1.5">
                            {c.wishlist.map((p) => (
                              <span key={p._id} className="px-2 py-0.5 bg-madder-500/10 text-madder-500 rounded-sm text-xs">
                                {p.name} (₹{p.price?.toLocaleString("en-IN")})
                              </span>
                            ))}
                          </div>
                        ) : (
                          <span className="text-loom-400">None</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
      {/* ORDERS TAB */}
{activeTab === "Orders" && (
  <div>
    {loadingOrders ? (
      <p className="text-loom-600">Loading…</p>
    ) : orders.length === 0 ? (
      <p className="text-loom-600">No orders yet.</p>
    ) : (
      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order._id} className="border border-loom-200 rounded-sm p-5 bg-white">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <div>
                <p className="text-sm font-medium text-ink">
                  Order #{order._id.slice(-6).toUpperCase()}
                </p>
                <p className="text-xs text-loom-500">
                  {order.user?.name} ({order.user?.email}) · {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>
              <select
                value={order.status}
                onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                className="text-xs font-medium px-3 py-1.5 rounded-sm border border-loom-300 bg-loom-50 capitalize"
              >
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
            <div className="space-y-1.5 mb-3">
              {order.items.map((item, i) => (
                <div key={i} className="flex justify-between text-sm">
                  <span className="text-ink">{item.name} × {item.quantity}</span>
                  <span className="text-loom-600">₹{item.price?.toLocaleString("en-IN")}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-loom-100 pt-3 flex justify-between font-semibold text-ink text-sm">
              <span>Total</span>
              <span>₹{order.totalAmount?.toLocaleString("en-IN")}</span>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
)}
    </div>
  );
};

export default Admin;