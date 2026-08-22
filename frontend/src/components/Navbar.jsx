import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

const NAV_LINKS = [
  { name: "Home", to: "/" },
  { name: "Shop", to: "/shop" },
  { name: "About", to: "/about" },
  { name: "Contact", to: "/contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    setOpen(false);
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 bg-clay-50/95 backdrop-blur border-b border-clay-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[68px]">
          <Link to="/" className="font-display text-2xl font-700 text-clay-800 tracking-tight">
            Weftly
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const active = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`relative px-3.5 py-2 text-sm font-medium rounded-full transition-colors ${
                    active ? "text-clay-800 bg-clay-100" : "text-clay-600 hover:text-clay-800 hover:bg-clay-100"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          <div className="hidden md:flex items-center gap-3">
  <Link to="/cart" className="relative p-2 text-clay-700 hover:bg-clay-100 rounded-full transition-colors">
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="9" cy="21" r="1" />
      <circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
    {cartCount > 0 && (
      <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center">
        {cartCount}
      </span>
    )}
  </Link>
  {user ? (
              <>
                {user.role === "admin" && (
                  <Link
                    to="/admin"
                    className="text-sm font-medium px-3.5 py-2 rounded-full text-red-600 hover:bg-red-50 transition-colors"
                  >
                    Admin
                  </Link>
                )}
                <Link
                  to="/account"
                  className="flex items-center gap-2 text-sm font-medium px-3.5 py-2 rounded-full text-clay-700 hover:bg-clay-100 transition-colors"
                >
                  <span className="w-7 h-7 rounded-full bg-clay-700 text-clay-50 flex items-center justify-center text-xs font-semibold">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                  {user.name.split(" ")[0]}
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-sm font-medium px-5 py-2.5 rounded-full bg-clay-800 text-clay-50 hover:bg-clay-700 transition-colors shadow-sm"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-sm font-medium px-3.5 py-2 rounded-full text-clay-700 hover:bg-clay-100">
                  Login
                </Link>
                <Link
                  to="/register"
                  className="text-sm font-medium px-5 py-2.5 rounded-full bg-clay-800 text-clay-50 hover:bg-clay-700 transition-colors shadow-sm"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-clay-800"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {open ? (
                <path d="M6 6l12 12M6 18L18 6" strokeLinecap="round" />
              ) : (
                <path d="M3 6h18M3 12h18M3 18h18" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile nav panel */}
      {open && (
        <div className="md:hidden border-t border-clay-200 bg-clay-50">
          <div className="px-4 py-4 flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
  <Link
    key={link.to}
    to={link.to}
    onClick={() => setOpen(false)}
    className="py-2.5 px-3 rounded-lg text-base font-medium text-clay-800 hover:bg-clay-100"
  >
    {link.name}
  </Link>
))}
<Link
  to="/cart"
  onClick={() => setOpen(false)}
  className="py-2.5 px-3 rounded-lg text-base font-medium text-clay-800 hover:bg-clay-100 flex items-center justify-between"
>
  Cart
  {cartCount > 0 && (
    <span className="w-5 h-5 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center">
      {cartCount}
    </span>
  )}
</Link>
<div className="border-t border-clay-200 mt-2 pt-3 flex flex-col gap-2">
              {user ? (
                <>
                  {user.role === "admin" && (
                    <Link to="/admin" onClick={() => setOpen(false)} className="py-2 px-3 text-base font-medium text-red-600">
                      Admin
                    </Link>
                  )}
                  <Link to="/account" onClick={() => setOpen(false)} className="py-2 px-3 text-base font-medium text-clay-800">
                    My Account
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-left py-2.5 px-4 rounded-full bg-clay-800 text-clay-50 font-medium"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setOpen(false)} className="py-2 px-3 text-base font-medium text-clay-800">
                    Login
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setOpen(false)}
                    className="py-2.5 px-4 rounded-full bg-clay-800 text-clay-50 font-medium text-center"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;