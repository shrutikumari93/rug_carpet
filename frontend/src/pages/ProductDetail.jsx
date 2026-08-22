import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
 const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [activeImage, setActiveImage] = useState(0);
  const [wishlisted, setWishlisted] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    api.get(`/products/${id}`).then((res) => setProduct(res.data)).catch(() => {});
    if (user) {
      api.get("/users/wishlist").then((res) => {
        setWishlisted(res.data.some((p) => p._id === id));
      });
    }
  }, [id, user]);

  const toggleWishlist = async () => {
    if (!user) return navigate("/login");
    if (wishlisted) {
      await api.delete(`/users/wishlist/${id}`);
    } else {
      await api.post(`/users/wishlist/${id}`);
    }
    setWishlisted(!wishlisted);
  };

  const [qty, setQty] = useState(1);
const [addedMsg, setAddedMsg] = useState("");

const handleAddToCart = () => {
  addToCart(product, qty);
  setAddedMsg("Added to cart!");
  setTimeout(() => setAddedMsg(""), 2000);
};
  if (!product) return <div className="max-w-7xl mx-auto px-4 py-16 text-clay-600">Loading…</div>;

  const images = product.images?.length ? product.images : ["https://placehold.co/700x700/D6A679/2E190C?text=Rug"];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Images */}
        <div>
          <div className="aspect-square rounded-2xl overflow-hidden bg-clay-100 mb-4">
            <img src={images[activeImage]} alt={product.name} className="w-full h-full object-cover" />
          </div>
          {images.length > 1 && (
            <div className="flex gap-3">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`w-16 h-16 rounded-lg overflow-hidden border-2 ${
                    activeImage === i ? "border-clay-600" : "border-transparent"
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div>
          <p className="text-clay-500 uppercase tracking-widest text-xs font-medium mb-2">{product.type}</p>
          <h1 className="font-display text-3xl sm:text-4xl font-700 text-ink mb-3">{product.name}</h1>
          <p className="text-2xl font-semibold text-clay-800 mb-6">₹{product.price?.toLocaleString("en-IN")}</p>

          <p className="text-clay-700 mb-6 leading-relaxed">{product.description}</p>

          <dl className="grid grid-cols-2 gap-4 mb-8 text-sm">
            {product.size && (
              <div>
                <dt className="text-clay-500">Size</dt>
                <dd className="font-medium text-ink">{product.size}</dd>
              </div>
            )}
            {product.material && (
              <div>
                <dt className="text-clay-500">Material</dt>
                <dd className="font-medium text-ink">{product.material}</dd>
              </div>
            )}
            <div>
              <dt className="text-clay-500">Availability</dt>
              <dd className="font-medium text-ink">{product.stock > 0 ? "In stock" : "Out of stock"}</dd>
            </div>
          </dl>

          <div className="flex flex-col sm:flex-row gap-3">
           <div className="flex items-center gap-3 mb-3">
  <span className="text-sm text-clay-600">Quantity:</span>
  <div className="flex items-center border border-clay-300 rounded-full">
    <button
      onClick={() => setQty((q) => Math.max(1, q - 1))}
      className="w-9 h-9 flex items-center justify-center text-clay-700"
    >
      −
    </button>
    <span className="w-8 text-center">{qty}</span>
    <button
      onClick={() => setQty((q) => q + 1)}
      className="w-9 h-9 flex items-center justify-center text-clay-700"
    >
      +
    </button>
  </div>
</div>

<button
  onClick={handleAddToCart}
  disabled={product.stock <= 0}
  className="flex-1 px-6 py-3.5 rounded-full bg-clay-800 text-clay-50 font-medium hover:bg-clay-700 transition-colors disabled:opacity-50"
>
  Add to Cart
</button>
{addedMsg && <p className="text-sm text-green-600 mt-2">{addedMsg}</p>}
            <button
              onClick={toggleWishlist}
              className={`px-6 py-3.5 rounded-full font-medium border transition-colors ${
                wishlisted
                  ? "bg-clay-100 border-clay-400 text-clay-800"
                  : "border-clay-300 text-clay-700 hover:bg-clay-100"
              }`}
            >
              {wishlisted ? "In wishlist ✓" : "Add to wishlist"}
            </button>
          </div>

          {message && <p className="mt-4 text-sm text-clay-600">{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
