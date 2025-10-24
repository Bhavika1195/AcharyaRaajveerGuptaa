import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CartContext } from "../CartContext";
import { AuthContext } from "../AuthContext";
import { toast } from "react-toastify";
import { FaTrash, FaMinus, FaPlus } from "react-icons/fa";

import BottomNavbar from "../components/BottomNavbar";
import Footer from "../components/Footer";

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, getCartTotal } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const total = getCartTotal();

  const handleCheckout = async () => {
    if (!user) {
      toast.info("Please login to continue with checkout");
      navigate("/login");
      return;
    }
    
    if (!total || isNaN(total) || cart.length === 0) {
      toast.error("Your cart is empty or has invalid items");
      return;
    }
    
    try {
      // Client-only Razorpay flow (no backend)
      const key = import.meta.env.VITE_RAZORPAY_KEY || window.RAZORPAY_KEY || "rzp_test_RHvg8lHcc6xNXJ";

      const options = {
        key,
        amount: Number(total) * 100, // in paise
        currency: "INR",
        name: "Astro Achariya Rajveer Gupta",
        description: `Sacred Crystals Purchase - ${cart.length} item(s) for ₹${total}`,
        handler: function (response) {
          // Payment successful - send order confirmation emails
          const orderData = {
            order_id: response.razorpay_order_id || `ORDER_${Date.now()}`,
            total,
            items: cart.map(item => ({
              ...item,
              total_price: item.price * item.quantity
            })),
            customer_name: user.name || "Customer",
            customer_email: user.email || "",
            customer_phone: user.phone || "",
            razorpay_payment_id: response.razorpay_payment_id,
            payment_date: new Date().toLocaleDateString(),
            payment_time: new Date().toLocaleTimeString(),
          };
          
          // Send order email to admin only
          axios.post(`${import.meta.env.VITE_HOST_URL_ENDPOINT}/api/send-order-email`, orderData)
            .then(() => {
              toast.success(`Payment Successful! You paid ₹${total}. Order confirmation sent to admin.`);
              // Clear cart after successful payment
              cart.forEach(item => removeFromCart(item.id));
              navigate("/paymentsuccess");
            })
            .catch((emailErr) => {
              console.error('Order email send failed', emailErr);
              toast.success(`Payment Successful! You paid ₹${total}`);
              // Clear cart even if email fails
              cart.forEach(item => removeFromCart(item.id));
              navigate("/paymentsuccess");
            });
        },
        prefill: {
          name: user.name || "",
          email: user.email || "",
          contact: user.phone || ""
        },
        theme: {
          color: "#003CF0"
        }
      };

      const razor = new window.Razorpay(options);
      razor.open();
    } catch (err) {
      toast.error('Purchase failed. Please try again.');
      console.error(err);
    }
  };

  if (cart.length === 0) {
    return (
      <>
        <BottomNavbar />
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-900 via-indigo-900 to-black pt-20 pb-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8 bg-gradient-to-br from-purple-800/30 to-indigo-900/30 backdrop-blur-sm border border-purple-400/30 p-10 rounded-xl shadow-2xl text-center">
            <h2 className="text-3xl font-bold text-white mb-4">🛍️ Your Cosmic Cart is Empty</h2>
            <p className="text-purple-200 mt-2">Add some sacred crystals to your cart to continue your spiritual journey.</p>
            <button 
              onClick={() => navigate('/products')} 
              className="mt-6 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white px-8 py-3 rounded-full font-semibold shadow-lg transform hover:scale-105 transition-all duration-300 border border-purple-400"
            >
              🔮 Explore Sacred Crystals
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <BottomNavbar />
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-black pt-20 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-8 text-center">🛍️ Your Sacred Cart 🛍️</h1>
        
          <div className="bg-gradient-to-br from-purple-800/30 to-indigo-900/30 backdrop-blur-sm border border-purple-400/30 shadow-2xl overflow-hidden rounded-xl mb-8">
            <div className="px-4 py-5 sm:px-6 bg-gradient-to-r from-purple-700/50 to-indigo-800/50 border-b border-purple-400/30">
              <h3 className="text-lg leading-6 font-medium text-white">🔮 Sacred Items ({cart.length})</h3>
            </div>
          
            <ul className="divide-y divide-purple-400/20">
              {cart.map((item) => (
                <li key={item.id} className="px-4 py-4 sm:px-6 flex items-center justify-between">
                  <div className="flex items-center">
                    {item.image && (
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="h-16 w-16 object-cover rounded-md mr-4 border border-purple-400/30" 
                      />
                    )}
                    <div>
                      <h4 className="text-lg font-medium text-white">{item.name}</h4>
                      <p className="text-sm text-purple-200">{item.description}</p>
                      <p className="text-lg font-semibold text-yellow-400 mt-1">₹{item.price}</p>
                    </div>
                  </div>
                
                  <div className="flex items-center">
                    <div className="flex items-center border border-purple-400/30 rounded-md mr-4 bg-purple-800/20">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-2 py-1 text-purple-200 hover:bg-purple-700/30"
                      >
                        <FaMinus size={12} />
                      </button>
                      <span className="px-4 py-1 text-white">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-2 py-1 text-purple-200 hover:bg-purple-700/30"
                      >
                        <FaPlus size={12} />
                      </button>
                    </div>
                    
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-400 hover:text-red-300"
                    >
                      <FaTrash />
                    </button>
                  </div>
              </li>
            ))}
          </ul>
        </div>
        
          <div className="bg-gradient-to-br from-purple-800/30 to-indigo-900/30 backdrop-blur-sm border border-purple-400/30 shadow-2xl overflow-hidden rounded-xl mb-8">
            <div className="px-4 py-5 sm:px-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg leading-6 font-medium text-white"> Order Summary</h3>
                <span className="text-2xl font-bold text-yellow-400">₹{total}</span>
              </div>
              <div className="mt-4 pt-4 border-t border-purple-400/30">
                <button
                  onClick={handleCheckout}
                  className="w-full bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-500 hover:to-orange-500 text-white py-3 px-4 rounded-full font-semibold shadow-lg transform hover:scale-105 transition-all duration-300 border border-yellow-400"
                >
                  💳 Proceed to Cosmic Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
