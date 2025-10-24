import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaBolt } from 'react-icons/fa';
import { toast } from 'react-toastify';

export default function ProductCard({ product, addToCart, showBuyNow, onBuyNow }) {
  const handleAddToCart = () => {
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };
  
  return (
    <div className="crystal-card bg-gradient-to-br from-purple-800 to-indigo-900 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-purple-600 hover:border-purple-400 cosmic-glow hover:scale-105">
      {/* Product Image */}
      <div className="h-48 bg-gradient-to-br from-purple-700 to-indigo-800 flex items-center justify-center p-2">
        {product.image ? (
          <img 
            src={product.image} 
            alt={product.name} 
            className="h-full w-full object-contain"
          />
        ) : (
          <div className="text-purple-200 text-center p-4">
            <div className="text-6xl mb-2">Crystal</div>
            <p className="text-sm">{product.name}</p>
          </div>
        )}
      </div>
      
      {/* Product Details */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-white mb-2 font-philosopher">{product.name}</h3>
        <p className="text-purple-200 text-sm mb-3 leading-relaxed">
          {product.description || 'Mystical properties await discovery'}
        </p>
        <div className="flex justify-between items-center mb-4">
          <p className="text-xl font-bold text-yellow-400">₹{product.price}</p>
          {product.originalPrice && (
            <p className="text-sm text-purple-300 line-through">₹{product.originalPrice}</p>
          )}
        </div>
        
        {/* Action Buttons */}
        <div className="flex space-x-2">
          <button 
            onClick={handleAddToCart}
            className="flex-1 bg-purple-600 hover:bg-purple-500 text-white py-2 px-4 rounded-md flex items-center justify-center transition-all duration-300 border border-purple-400 hover:border-purple-300 shadow-lg"
          >
            <FaShoppingCart className="mr-2" />
            Add to Cart
          </button>
          {showBuyNow && (
            <button 
              onClick={onBuyNow}
              className="flex-1 bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-500 hover:to-orange-500 text-white py-2 px-4 rounded-md flex items-center justify-center transition-all duration-300 border border-yellow-400 hover:border-yellow-300 shadow-lg"
            >
              <FaBolt className="mr-2" />
              Buy Now
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
