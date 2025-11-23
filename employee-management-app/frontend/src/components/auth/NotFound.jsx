import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 flex items-center justify-center px-4">
      <div className="text-center max-w-lg mx-auto p-8 bg-white rounded-2xl shadow-xl border border-gray-100">
        <h1 className="text-7xl font-extrabold text-gray-800 mb-4 tracking-tight">
          404
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-8">
          Oops! The page you’re looking for doesn’t exist.
        </p>
        <Link
          to="/"
          className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold shadow hover:bg-blue-700 hover:shadow-lg transition duration-300"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
