import React from "react";
import { Link } from "react-router-dom";
import Logo from "../Logo";

function Footer() {
  return (
    // Premium White background with soft purple top border
    <section className="relative overflow-hidden py-12 bg-white border-t border-purple-100 mt-auto">
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="-m-6 flex flex-wrap">
          {/* Logo & Copyright Section */}
          <div className="w-full p-6 md:w-1/2 lg:w-5/12">
            <div className="flex h-full flex-col justify-between">
              <div className="mb-6 inline-flex items-center gap-3">
                <Logo width="60px" />
                {/* Header jaisa same gradient text logo */}
                <span className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600 tracking-tight">
                  BlogApp
                </span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">
                  &copy; {new Date().getFullYear()} BlogApp. Crafted with ❤️ for
                  creators.
                </p>
              </div>
            </div>
          </div>

          {/* Company Links */}
          <div className="w-full p-6 md:w-1/2 lg:w-2/12">
            <div className="h-full">
              <h3 className="tracking-wider mb-6 text-xs font-bold uppercase text-purple-600">
                Company
              </h3>
              <ul className="space-y-4">
                <li>
                  <Link
                    className="text-base font-medium text-gray-600 hover:text-purple-600 hover:translate-x-1 transition-all duration-300 inline-block"
                    to="/"
                  >
                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-base font-medium text-gray-600 hover:text-purple-600 hover:translate-x-1 transition-all duration-300 inline-block"
                    to="/"
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-base font-medium text-gray-600 hover:text-purple-600 hover:translate-x-1 transition-all duration-300 inline-block"
                    to="/"
                  >
                    Affiliate Program
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-base font-medium text-gray-600 hover:text-purple-600 hover:translate-x-1 transition-all duration-300 inline-block"
                    to="/"
                  >
                    Press Kit
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Support Links */}
          <div className="w-full p-6 md:w-1/2 lg:w-2/12">
            <div className="h-full">
              <h3 className="tracking-wider mb-6 text-xs font-bold uppercase text-purple-600">
                Support
              </h3>
              <ul className="space-y-4">
                <li>
                  <Link
                    className="text-base font-medium text-gray-600 hover:text-purple-600 hover:translate-x-1 transition-all duration-300 inline-block"
                    to="/"
                  >
                    Account
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-base font-medium text-gray-600 hover:text-purple-600 hover:translate-x-1 transition-all duration-300 inline-block"
                    to="/"
                  >
                    Help
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-base font-medium text-gray-600 hover:text-purple-600 hover:translate-x-1 transition-all duration-300 inline-block"
                    to="/"
                  >
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-base font-medium text-gray-600 hover:text-purple-600 hover:translate-x-1 transition-all duration-300 inline-block"
                    to="/"
                  >
                    Customer Support
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Legal Links */}
          <div className="w-full p-6 md:w-1/2 lg:w-3/12">
            <div className="h-full">
              <h3 className="tracking-wider mb-6 text-xs font-bold uppercase text-purple-600">
                Legals
              </h3>
              <ul className="space-y-4">
                <li>
                  <Link
                    className="text-base font-medium text-gray-600 hover:text-purple-600 hover:translate-x-1 transition-all duration-300 inline-block"
                    to="/"
                  >
                    Terms &amp; Conditions
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-base font-medium text-gray-600 hover:text-purple-600 hover:translate-x-1 transition-all duration-300 inline-block"
                    to="/"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-base font-medium text-gray-600 hover:text-purple-600 hover:translate-x-1 transition-all duration-300 inline-block"
                    to="/"
                  >
                    Licensing
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Footer;
