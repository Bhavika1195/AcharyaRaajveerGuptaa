import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCart";
import { CartContext } from "../CartContext";
import { AuthContext } from "../AuthContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import BottomNavbar from "../components/BottomNavbar";
import Footer from "../components/Footer";
import { crystalProducts } from "../crystalProducts";

function Products() {
  const [products, setProducts] = useState(crystalProducts);
  const [loading, setLoading] = useState(false);
  const { addToCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // Load crystal products directly instead of from API
  useEffect(() => {
    setProducts(crystalProducts);
  }, []);

  const handleBuyNow = async (product) => {
    if (!user) {
      // Allow guest checkout
      navigate("/guest-checkout", { state: { product } });
      return;
    }
    
    if (!product.price || isNaN(product.price)) {
      toast.error("This product does not have a valid price. Please contact support.");
      return;
    }
    
    try {
      // 1. Get Razorpay key
      const { data: { key } } = await axios.get("http://localhost:5000/api/getkey");

      // 2. Create order on backend (product-specific)
      const { data: { order } } = await axios.post(
        `http://localhost:5000/api/products/${product._id}/checkout`,
        { 
          amount: Number(product.price) * 100,
          email: user.email
        }
      );

      // 3. Open Razorpay payment window
      const options = {
        key,
        amount: order.amount,
        currency: "INR",
        name: `Buy: ${product.name}`,
        description: `You are purchasing ${product.name} for ₹${product.price}`,
        order_id: order.id,
        handler: function (response) {
          // Send payment verification to backend
          axios.post("http://localhost:5000/api/payment/verification", {
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature
          }).then(() => {
            toast.success(`Payment Successful! You paid ₹${product.price}`);
            navigate("/paymentsuccess");
          }).catch(() => {
            toast.error("Payment verification failed");
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

  return (
    <>
      <BottomNavbar />
      
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-black pt-20 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-white mb-4 font-philosopher">
              Sacred Crystals & Healing Stones
            </h1>
            <p className="text-xl text-purple-200 mb-2">
              Harness Ancient Energies for Modern Life
            </p>
            <p className="text-lg text-indigo-200">
              Each stone carries unique vibrations to enhance your spiritual journey
            </p>
          </div>
          
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-400"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.length > 0 ? (
                products.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    addToCart={addToCart}
                    showBuyNow={true}
                    onBuyNow={() => handleBuyNow(product)}
                  />
                ))
              ) : (
                <p className="text-purple-200 col-span-full text-center py-12">No crystals available.</p>
              )}
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </>
  );
}

export default Products;
