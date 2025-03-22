import React from 'react';

const ShimmerCart = () => {
  return (
    <div className="shimmer-cart w-64 h-80 bg-gray-600 animate-pulse rounded-lg p-4 shadow-lg">
      <div className="shimmer-img bg-gray-700 h-40 mb-6 rounded"></div>
      <div className="shimmer-title bg-gray-700 h-8 mb-4 rounded"></div>
      <div className="shimmer-category bg-gray-700 h-6 rounded"></div>
    </div>
  );
};

export default ShimmerCart;
