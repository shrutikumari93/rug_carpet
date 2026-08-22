import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";

const ProductCard = ({ product, wishlist = [], onWishlistChange }) => {
  const { user } = useAuth();
  const isWishlisted = wishlist.includes(product._id);

  const toggleWishlist = async (e) => {
    e.preventDefault();
    if (!user) return;
    try {
      if (isWishlisted) {
        await api.delete(`/users/wishlist/${product._id}`);
      } else {
        await api.post(`/users/wishlist/${product._id}`);
      }
      onWishlistChange && onWishlistChange();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Link
      to={`/product/${product._id}`}
      className="group block bg-white rounded-2xl overflow-hidden border border-clay-200 hover:shadow-lg transition-shadow"
    >
      <div className="relative aspect-[4/5] bg-clay-100 overflow-hidden">
        <img
          src={product.images?.[0] || "https://placehold.co/400x500/E6C6A8/4A2914?text=Rug"}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {user && (
          <button
            onClick={toggleWishlist}
            className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 flex items-center justify-center shadow-sm"
            aria-label="Toggle wishlist"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill={isWishlisted ? "#A8632F" : "none"}
              stroke="#A8632F"
              strokeWidth="2"
            >
              <path d="M12 21s-6.7-4.35-9.3-8.1C1 10.1 1.5 6.4 4.6 4.9c2.2-1.1 4.6-.3 6 1.5l1.4 1.8 1.4-1.8c1.4-1.8 3.8-2.6 6-1.5 3.1 1.5 3.6 5.2 1.9 8-2.6 3.75-9.3 8.1-9.3 8.1z" />
            </svg>
          </button>
        )}
      </div>
      <div className="p-4">
        <p className="text-xs text-clay-500 uppercase tracking-wide mb-1">{product.type}</p>
        <h3 className="font-display font-600 text-ink text-base leading-snug mb-1">{product.name}</h3>
        <p className="text-sm text-clay-600 mb-2">{product.size}</p>
        <p className="font-semibold text-clay-800">₹{product.price?.toLocaleString("en-IN")}</p>
      </div>
    </Link>
  );
};

export default ProductCard;
