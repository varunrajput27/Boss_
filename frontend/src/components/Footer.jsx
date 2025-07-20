import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white text-black px-6 md:px-16 py-14 border-t border-yellow-900">
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 text-sm">
        {/* Brand & Description */}
        <div>
          <Link
            to="/"
            className="text-3xl font-extrabold tracking-tight mb-4 inline-block text-yellow-900"
          >
            Boss Expert
          </Link>
          <p className="md:w-3/4 leading-relaxed mb-6 text-black/80">
            Thank you for shopping with <strong>Boss Expert</strong>! Follow us on social
            media, subscribe to our newsletter, and stay updated on trends,
            offers, and more. Your style journey starts here — let’s make it
            unforgettable!
          </p>

          {/* Social Media */}
          <div className="flex gap-5 text-yellow-500 text-xl">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="hover:text-yellow-900 transition"
            >
              📘
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="hover:text-yellow-900 transition"
            >
              🐦
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="hover:text-yellow-900 transition"
            >
              📸
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="hover:text-yellow-900 transition"
            >
              🔗
            </a>
          </div>
        </div>

        {/* Company Links */}
        <div>
          <p className="mb-5 text-xl font-semibold text-yellow-900">COMPANY</p>
          <ul className="flex flex-col gap-3 text-black/80">
            <li>
              <Link to="/" className="hover:text-yellow-500 transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-yellow-500 transition">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/delivery" className="hover:text-yellow-500 transition">
                Delivery
              </Link>
            </li>
            <li>
              <Link to="/privacy-policy" className="hover:text-yellow-500 transition">
                Privacy & Policy
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <p className="mb-5 text-xl font-semibold text-yellow-900">GET IN TOUCH</p>
          <ul className="flex flex-col gap-3 text-black/80">
            <li>📞 +91-558-669-447</li>
            <li>📧 contact.BossExpert@info.com</li>
            <li>🏢  Rajnagar Extension , UttarPradesh, India</li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="pt-10">
        <hr className="border-yellow-900" />
        <p className="pt-5 text-xs text-center text-black/50">
          © 2025 Boss Expert. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
