import React from 'react';

const NotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900 dark:text-white">404</h1>
        <p className="text-xl font-semibold text-gray-700 dark:text-gray-300 mt-4">Page Not Found</p>
        <p className="text-gray-500 dark:text-gray-400 mt-2">Sorry, the page you’re looking for doesn’t exist.</p>
        <a href="/" className="mt-6 inline-block px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
          Go to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
