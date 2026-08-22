import {
  FiInstagram,
  FiMapPin,
  FiPhone,
  FiMail,
  FiArrowUpRight,
} from "react-icons/fi";

const Footer = () => {
  return (
    <footer className="bg-clay-800 text-clay-100 mt-24">

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="lg:col-span-1">
            <h3 className="font-display text-3xl font-700 text-clay-50 mb-4">
              Weftly
            </h3>

            <p className="text-sm text-clay-300 leading-relaxed max-w-xs">
              Handpicked rugs and carpets, woven with care and made to bring
              warmth, character, and comfort to your home.
            </p>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/weftly/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-6 text-sm text-clay-200 hover:text-white transition-colors group"
            >
              <span className="w-9 h-9 rounded-full border border-clay-600 flex items-center justify-center group-hover:bg-clay-700 transition">
                <FiInstagram size={17} />
              </span>

              <span>@weftly</span>

              <FiArrowUpRight
                size={15}
                className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition"
              />
            </a>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-xs font-semibold text-clay-50 mb-5 uppercase tracking-[0.18em]">
              Shop
            </h4>

            <ul className="space-y-3 text-sm text-clay-300">

              <li>
                <a
                  href="/shop"
                  className="hover:text-white transition-colors"
                >
                  All Rugs
                </a>
              </li>

              <li>
                <a
                  href="/shop"
                  className="hover:text-white transition-colors"
                >
                  Area Rugs
                </a>
              </li>

              <li>
                <a
                  href="/shop"
                  className="hover:text-white transition-colors"
                >
                  Runners
                </a>
              </li>

              <li>
                <a
                  href="/shop"
                  className="hover:text-white transition-colors"
                >
                  Carpets
                </a>
              </li>

              <li>
                <a
                  href="/shop"
                  className="hover:text-white transition-colors"
                >
                  New Arrivals
                </a>
              </li>

            </ul>
          </div>

          {/* Explore */}
          <div>
            <h4 className="text-xs font-semibold text-clay-50 mb-5 uppercase tracking-[0.18em]">
              Explore
            </h4>

            <ul className="space-y-3 text-sm text-clay-300">

              <li>
                <a
                  href="/"
                  className="hover:text-white transition-colors"
                >
                  Home
                </a>
              </li>

              <li>
                <a
                  href="/shop"
                  className="hover:text-white transition-colors"
                >
                  Shop
                </a>
              </li>

              <li>
                <a
                  href="/about"
                  className="hover:text-white transition-colors"
                >
                  About Us
                </a>
              </li>

              <li>
                <a
                  href="/contact"
                  className="hover:text-white transition-colors"
                >
                  Contact
                </a>
              </li>

            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-semibold text-clay-50 mb-5 uppercase tracking-[0.18em]">
              Contact
            </h4>

            <div className="space-y-4">

              {/* Email */}
              <a
                href="mailto: digitalenclave3@gmail.com"
                className="flex items-start gap-3 text-sm text-clay-300 hover:text-white transition-colors group"
              >
                <FiMail
                  size={18}
                  className="mt-0.5 shrink-0 text-clay-400 group-hover:text-clay-200"
                />

                <span>
                  digitalenclave3@gmail.com
                </span>
              </a>

              {/* Phone */}
              <a
                href="tel:+919837675160"
                className="flex items-start gap-3 text-sm text-clay-300 hover:text-white transition-colors group"
              >
                <FiPhone
                  size={18}
                  className="mt-0.5 shrink-0 text-clay-400 group-hover:text-clay-200"
                />

                <span>
                  +91 9837675160
                </span>
              </a>

              {/* Location */}
              <a
                href="https://www.google.com/maps/search/?api=1&query=Agra,Uttar+Pradesh"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 text-sm text-clay-300 hover:text-white transition-colors group"
              >
                <FiMapPin
                  size={18}
                  className="mt-0.5 shrink-0 text-clay-400 group-hover:text-clay-200"
                />

                <span>
                  Agra, Uttar Pradesh
                </span>
              </a>

            </div>
          </div>

        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-clay-700">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">

            <p className="text-xs text-clay-400 text-center sm:text-left">
              © {new Date().getFullYear()} Weftly. All rights reserved.
            </p>

            <p className="text-xs text-clay-500">
              Woven with care · Made for your space
            </p>

          </div>

        </div>
      </div>

    </footer>
  );
};

export default Footer;