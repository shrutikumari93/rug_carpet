import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../api/axios";
import ProductCard from "../components/ProductCard";

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({
    category: searchParams.get("category") || "",
    type: searchParams.get("type") || "",
    search: "",
  });

  const fetchWishlist = async () => {
    try {
      const userInfo = localStorage.getItem("userInfo");
      if (!userInfo) return;
      const { data } = await api.get("/users/wishlist");
      setWishlist(data.map((p) => p._id));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    api.get("/categories").then((res) => setCategories(res.data)).catch(() => {});
    fetchWishlist();
  }, []);

  useEffect(() => {
    setLoading(true);
    const params = {};
    if (filters.category) params.category = filters.category;
    if (filters.type) params.type = filters.type;
    if (filters.search) params.search = filters.search;

    api
      .get("/products", { params })
      .then((res) => setProducts(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [filters]);

  const updateFilter = (key, value) => {
    setFilters((f) => ({ ...f, [key]: value }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="font-display text-3xl sm:text-4xl font-700 text-ink mb-8">Shop rugs & carpets</h1>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters sidebar */}
        <aside className="md:w-64 flex-shrink-0">
          <div className="mb-6">
            <input
              type="text"
              placeholder="Search products..."
              value={filters.search}
              onChange={(e) => updateFilter("search", e.target.value)}
              className="w-full px-4 py-2.5 rounded-full border border-clay-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-clay-400"
            />
          </div>

          <div className="mb-6">
            <h3 className="text-sm font-semibold text-ink mb-3 uppercase tracking-wide">Type</h3>
            <div className="flex flex-wrap md:flex-col gap-2">
              {["", "rug", "carpet"].map((t) => (
                <button
                  key={t}
                  onClick={() => updateFilter("type", t)}
                  className={`text-left px-3 py-1.5 rounded-full md:rounded-lg text-sm ${
                    filters.type === t ? "bg-clay-800 text-clay-50" : "bg-clay-100 text-clay-700"
                  }`}
                >
                  {t === "" ? "All" : t === "rug" ? "Rugs" : "Carpets"}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-sm font-semibold text-ink mb-3 uppercase tracking-wide">Category</h3>
            <div className="flex flex-wrap md:flex-col gap-2">
              <button
                onClick={() => updateFilter("category", "")}
                className={`text-left px-3 py-1.5 rounded-full md:rounded-lg text-sm ${
                  filters.category === "" ? "bg-clay-800 text-clay-50" : "bg-clay-100 text-clay-700"
                }`}
              >
                All
              </button>
              {categories.map((cat) => (
                <button
                  key={cat._id}
                  onClick={() => updateFilter("category", cat._id)}
                  className={`text-left px-3 py-1.5 rounded-full md:rounded-lg text-sm ${
                    filters.category === cat._id ? "bg-clay-800 text-clay-50" : "bg-clay-100 text-clay-700"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Product grid */}
        <div className="flex-1">
          {loading ? (
            <p className="text-clay-600">Loading products…</p>
          ) : products.length === 0 ? (
            <p className="text-clay-600">No products found. Try a different filter.</p>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {products.map((p) => (
                <ProductCard key={p._id} product={p} wishlist={wishlist} onWishlistChange={fetchWishlist} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;
