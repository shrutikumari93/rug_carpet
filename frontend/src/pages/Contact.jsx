import { useState } from "react";

import { FiMail, FiPhone, FiMapPin, FiArrowRight } from "react-icons/fi";
import api from "../api/axios";


const Contact = () => {
  const [form, setForm] = useState({
  name: "",
  email: "",
  message: "",
});

const [sent, setSent] = useState(false);
const [sending, setSending] = useState(false);
const [error, setError] = useState("");
const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");
  setSending(true);
  try {
    await api.post("/contact", form);
    setSent(true);
  } catch (err) {
    setError(err.response?.data?.message || "Something went wrong. Please try again.");
  } finally {
    setSending(false);
  }
};

  return (
    <div className="bg-clay-50 min-h-[calc(100vh-80px)]">

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-8">
        <div className="max-w-3xl">
          <p className="text-sm uppercase tracking-[0.2em] text-clay-600 mb-3">
            Contact Weftly
          </p>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-ink leading-tight">
            Let’s find the perfect
            <span className="block text-clay-700">piece for your space.</span>
          </h1>

          <p className="mt-5 text-clay-600 max-w-xl text-base sm:text-lg leading-relaxed">
            Have a question about sizing, materials, custom orders, or bulk
            pricing? We’d love to hear from you.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

          {/* Left Contact Info */}
          <div className="lg:col-span-2">

            <div className="bg-clay-800 text-clay-50 rounded-3xl p-8 sm:p-10 h-full flex flex-col justify-between">

              <div>
                <p className="text-sm uppercase tracking-widest text-clay-300 mb-3">
                  We'd love to hear from you
                </p>

                <h2 className="font-display text-3xl sm:text-4xl leading-tight mb-5">
                  Questions?
                  <br />
                  Let's talk.
                </h2>

                <p className="text-clay-200 leading-relaxed">
                  Our team is here to help you choose the right rug, understand
                  our materials, or create something custom for your home.
                </p>
              </div>

              <a
  href="mailto: digitalenclave3@gmail.com"
  className="flex items-start gap-4 group"
>
  <div className="w-11 h-11 rounded-full bg-clay-700 flex items-center justify-center shrink-0">
    <FiMail size={18} />
  </div>

  <div>
    <p className="text-sm text-clay-300">Email</p>
    <p className="mt-1 group-hover:text-clay-300 transition-colors">
      digitalenclave3@gmail.com
    </p>
  </div>
</a>

                <a
  href="tel:+919837675160"
  className="flex items-start gap-4 group"
>
  <div className="w-11 h-11 rounded-full bg-clay-700 flex items-center justify-center shrink-0">
    <FiPhone size={18} />
  </div>

  <div>
    <p className="text-sm text-clay-300">Phone</p>
    <p className="mt-1 group-hover:text-clay-300 transition-colors">
      +91 9837675160
    </p>
  </div>
</a>
                <a
  href="https://www.google.com/maps/search/?api=1&query=Agra,Uttar+Pradesh"
  target="_blank"
  rel="noopener noreferrer"
  className="flex items-start gap-4 group"
>
  <div className="w-11 h-11 rounded-full bg-clay-700 flex items-center justify-center shrink-0">
    <FiMapPin size={18} />
  </div>

  <div>
    <p className="text-sm text-clay-300">Studio</p>
    <p className="mt-1 group-hover:text-clay-300 transition-colors">
      Agra, Uttar Pradesh
    </p>
  </div>
</a>

              <div className="mt-12 pt-6 border-t border-clay-700">
                <p className="text-sm text-clay-300">
                  Mon – Sat · 10:00 AM – 6:00 PM
                </p>
              </div>

            </div>
          </div>

          {/* Right Form */}
          <div className="lg:col-span-3">

            <div className="bg-white rounded-3xl border border-clay-200 p-7 sm:p-10 shadow-sm">

              {sent ? (
                <div className="min-h-[430px] flex flex-col items-center justify-center text-center">

                  <div className="w-16 h-16 rounded-full bg-clay-100 flex items-center justify-center mb-5">
                    <FiArrowRight
                      size={25}
                      className="text-clay-800 rotate-[-45deg]"
                    />
                  </div>

                  <h2 className="font-display text-3xl text-ink mb-3">
                    Message received.
                  </h2>

                  <p className="text-clay-600 max-w-sm">
                    Thanks for reaching out to Weftly. We'll get back to you
                    within one business day.
                  </p>

                </div>
              ) : (
                <>
                  <div className="mb-8">
                    <h2 className="font-display text-3xl text-ink">
                      Send us a message
                    </h2>

                    <p className="mt-2 text-clay-600">
                      Fill in the details below and we'll get back to you.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">

                    {/* Name */}
                    <div>
                      <label className="block text-sm font-medium text-clay-800 mb-2">
                        Your name
                      </label>

                      <input
                        required
                        type="text"
                        placeholder="Enter your name"
                        value={form.name}
                        onChange={(e) =>
                          setForm({ ...form, name: e.target.value })
                        }
                        className="w-full px-4 py-3.5 rounded-xl border border-clay-300 bg-clay-50 text-ink placeholder:text-clay-400 focus:outline-none focus:ring-2 focus:ring-clay-400 focus:border-transparent transition"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-sm font-medium text-clay-800 mb-2">
                        Email address
                      </label>

                      <input
                        required
                        type="email"
                        placeholder="you@example.com"
                        value={form.email}
                        onChange={(e) =>
                          setForm({ ...form, email: e.target.value })
                        }
                        className="w-full px-4 py-3.5 rounded-xl border border-clay-300 bg-clay-50 text-ink placeholder:text-clay-400 focus:outline-none focus:ring-2 focus:ring-clay-400 focus:border-transparent transition"
                      />
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-sm font-medium text-clay-800 mb-2">
                        How can we help?
                      </label>

                      <textarea
                        required
                        rows={6}
                        placeholder="Tell us about your question..."
                        value={form.message}
                        onChange={(e) =>
                          setForm({ ...form, message: e.target.value })
                        }
                        className="w-full px-4 py-3.5 rounded-xl border border-clay-300 bg-clay-50 text-ink placeholder:text-clay-400 resize-none focus:outline-none focus:ring-2 focus:ring-clay-400 focus:border-transparent transition"
                      />
                    </div>

                    {/* Button */}
                    {error && <p className="text-sm text-red-600">{error}</p>}

 <button
  type="submit"
  disabled={sending}
  className="group inline-flex items-center justify-center gap-3 px-7 py-3.5 rounded-full bg-clay-800 text-clay-50 font-medium hover:bg-clay-700 transition-all disabled:opacity-60"
>
  {sending ? "Sending…" : "Send message"}

  {!sending && (
    <FiArrowRight
      size={18}
      className="group-hover:translate-x-1 transition-transform"
    />
  )}
</button>

                  </form>
                </>
              )}

            </div>
          </div>

        </div>
      </section>

    </div>
  );
};

export default Contact;