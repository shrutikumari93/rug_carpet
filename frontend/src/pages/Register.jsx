import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", phone: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await register(form.name, form.email, form.password, form.phone);
      navigate("/account?onboarding=1");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <h1 className="font-display text-3xl font-700 text-ink mb-2">Create an account</h1>
      <p className="text-clay-600 mb-8">Save favorites, set your style interests, and track orders.</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-clay-700 mb-1.5">Full name</label>
          <input
            type="text"
            name="name"
            required
            value={form.name}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-clay-300 bg-white focus:outline-none focus:ring-2 focus:ring-clay-400"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-clay-700 mb-1.5">Email</label>
          <input
            type="email"
            name="email"
            required
            value={form.email}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-clay-300 bg-white focus:outline-none focus:ring-2 focus:ring-clay-400"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-clay-700 mb-1.5">Phone (optional)</label>
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-clay-300 bg-white focus:outline-none focus:ring-2 focus:ring-clay-400"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-clay-700 mb-1.5">Password</label>
          <input
            type="password"
            name="password"
            required
            minLength={6}
            value={form.password}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-clay-300 bg-white focus:outline-none focus:ring-2 focus:ring-clay-400"
          />
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3.5 rounded-full bg-clay-800 text-clay-50 font-medium hover:bg-clay-700 transition-colors disabled:opacity-60"
        >
          {loading ? "Creating account…" : "Sign up"}
        </button>
      </form>

      <p className="mt-6 text-sm text-clay-600 text-center">
        Already have an account?{" "}
        <Link to="/login" className="font-medium text-clay-800 underline">
          Log in
        </Link>
      </p>
    </div>
  );
};

export default Register;
