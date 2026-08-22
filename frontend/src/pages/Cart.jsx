import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!user) {
      navigate("/login");
      return;
    }
    navigate("/checkout");
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h1 className="font-display text-3xl font-700 text-clay-900 mb-3">Your cart is empty</h1>
        <p className="text-clay-600 mb-6">Browse the shop and add something you love.</p>
        <Link
          to="/shop"
          className="inline-block px-6 py-3 rounded-full bg-clay-800 text-clay-50 font-medium hover:bg-clay-700 transition-colors"
        >
          Go to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="font-display text-3xl sm:text-4xl font-700 text-clay-900 mb-8">Your Cart</h1>

      <div className="space-y-4 mb-8">
        {cart.map((item) => (
          <div
            key={item._id}
            className="flex flex-col sm:flex-row gap-4 bg-white border border-clay-200 rounded-2xl p-4"
          >
            <div className="w-full sm:w-28 h-28 rounded-xl overflow-hidden bg-clay-100 flex-shrink-0">
              <img
                src={item.image || "https://placehold.co/300x300/D9C39C/332210?text=Rug"}
                alt={item.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="font-display font-600 text-clay-900 text-lg">{item.name}</h3>
                <p className="text-clay-600 text-sm">₹{item.price?.toLocaleString("en-IN")} each</p>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center border border-clay-300 rounded-full">
                  <button
                    onClick={() => updateQuantity(item._id, item.quantity - 1)}
                    className="w-8 h-8 flex items-center justify-center text-clay-700"
                  >
                    −
                  </button>
                  <span className="w-8 text-center text-sm">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item._id, item.quantity + 1)}
                    className="w-8 h-8 flex items-center justify-center text-clay-700"
                  >
                    +
                  </button>
                </div>

                <p className="font-semibold text-clay-800 w-24 text-right">
                  ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                </p>

                <button
                  onClick={() => removeFromCart(item._id)}
                  className="text-red-500 text-sm hover:underline"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-clay-100 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <p className="text-sm text-clay-600">Total</p>
          <p className="font-display text-2xl font-700 text-clay-900">
            ₹{cartTotal.toLocaleString("en-IN")}
          </p>
        </div>
        <button
          onClick={handleCheckout}
          className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-clay-800 text-clay-50 font-medium hover:bg-clay-700 transition-colors"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;