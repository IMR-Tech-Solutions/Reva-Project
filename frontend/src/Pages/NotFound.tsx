import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-6">
      <div className="text-center max-w-xl">
        {/* 404 */}
        <h1 className="text-7xl md:text-9xl font-bold text-primary mb-4">
          404
        </h1>

        {/* Heading */}
        <h2 className="text-2xl md:text-4xl font-semibold text-gray-800 mb-4">
          Page Not Found
        </h2>

        {/* Description */}
        <p className="text-gray-600 text-lg mb-8">
          Sorry, the page you are looking for does not exist or has been moved.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="px-6 py-3 bg-primary text-white rounded-lg shadow-md hover:scale-105 transition duration-300"
          >
            Go Home
          </Link>

          <button
            onClick={() => window.history.back()}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition duration-300"
          >
            Go Back
          </button>
        </div>

        {/* Bottom Text */}
        <p className="mt-8 text-sm text-gray-400">
          Error Code: 404
        </p>
      </div>
    </section>
  );
};

export default NotFound;