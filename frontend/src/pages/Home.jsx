import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import ProductCard from "../components/ProductCard";
import bgimg from "../assets/bgimg.jpg";
import img from "../assets/img.webp";

const Home = () => {
  const [featured, setFeatured] = useState([]);
  const [categories, setCategories] = useState([]);
  const [wishlist, setWishlist] = useState([]);

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
    api.get("/products?featured=true").then((res) => setFeatured(res.data)).catch(() => {});
    api.get("/categories").then((res) => setCategories(res.data)).catch(() => {});
    fetchWishlist();
  }, []);

  return (
    <div>
      {/* Hero */}
      <section
  className="relative min-h-[calc(100vh-64px)] bg-cover bg-center bg-no-repeat overflow-hidden"
  style={{ backgroundImage: `url(${img})` }}
>
   
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-white/100 font-medium mb-3 uppercase tracking-widest text-xs">
              Handwoven, made to last
            </p>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-700 text-white leading-tight mb-6">
              Floors that feel like home.
            </h1>
            <p className="text-white text-base sm:text-lg max-w-md mb-8">
              Rugs and carpets sourced from skilled weavers — every piece chosen for texture,
              durability, and the way it changes a room.
            </p>
            <Link
              to="/shop"
              className="inline-block px-7 py-3.5 rounded-full bg-clay-800 text-clay-50 font-medium hover:bg-clay-700 transition-colors"
            >
              Browse the collection
            </Link>
          </div>
          <div className="relative aspect-square rounded-3xl overflow-hidden bg-clay-200">
            <img
              src={bgimg}
              alt="Featured rug"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Categories */}
      {categories.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="font-display text-2xl sm:text-3xl font-700 text-ink mb-8">Shop by category</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
            {categories.map((cat) => (
              <Link
                key={cat._id}
                to={`/shop?category=${cat._id}`}
                className="group relative aspect-square rounded-2xl overflow-hidden bg-clay-200"
              >
                <img
                  src={cat.image || "https://placehold.co/300x300/E6C6A8/4A2914?text=" + cat.name}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent flex items-end p-4">
                  <span className="text-clay-50 font-display font-600">{cat.name}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Featured products */}
      {featured.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-display text-2xl sm:text-3xl font-700 text-ink">Featured pieces</h2>
            <Link to="/shop" className="text-sm font-medium text-clay-600 hover:text-clay-800">
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {featured.map((p) => (
              <ProductCard key={p._id} product={p} wishlist={wishlist} onWishlistChange={fetchWishlist} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default Home;
