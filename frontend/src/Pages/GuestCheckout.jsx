import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import TopNavbar from '../components/TopNavbar';
import BottomNavbar from '../components/BottomNavbar';
import Footer from '../components/Footer';

const GuestCheckout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.product;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    pincode: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // 1. Get Razorpay key
      const { data: { key } } = await fetch('http://localhost:5000/api/getkey').then(res => res.json());

      // 2. Create order on backend
      const { data: { order } } = await fetch('http://localhost:5000/api/payment/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: Number(product.price) * 100,
          email: formData.email,
          customerData: formData,
          product: product
        })
      }).then(res => res.json());

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
          fetch('http://localhost:5000/api/payment/verification', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
              customerData: formData,
              product: product,
              adminEmail: 'bhavikasmart15@gmail.com'
            })
          }).then(() => {
            toast.success(`Payment Successful! Confirmation emails sent to you and admin.`);
            navigate('/paymentsuccess');
          }).catch(() => {
            toast.error('Payment verification failed');
          });
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone
        },
        theme: {
          color: "#7c3aed"
        }
      };
      
      const razor = new window.Razorpay(options);
      razor.open();
    } catch (err) {
      toast.error('Payment initialization failed. Please try again.');
      console.error(err);
    }
  };

  if (!product) {
    navigate('/products');
    return null;
  }

  return (
    <>
      <div className="hidden md:block">
        <TopNavbar />
      </div>
      <div className="bg-gradient-to-r from-purple-900 to-indigo-900 h-[70px]">
        <BottomNavbar />
      </div>
      
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-black py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-8 text-center">🛒 Guest Checkout</h1>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Product Details */}
            <div className="bg-gradient-to-br from-purple-800/30 to-indigo-900/30 backdrop-blur-sm border border-purple-400/30 rounded-xl p-6">
              <h2 className="text-2xl font-bold text-white mb-4">Order Summary</h2>
              <div className="flex items-center mb-4">
                {product.image && (
                  <img src={product.image} alt={product.name} className="w-20 h-20 object-cover rounded-md mr-4" />
                )}
                <div>
                  <h3 className="text-lg font-semibold text-white">{product.name}</h3>
                  <p className="text-purple-200 text-sm">{product.description}</p>
                  <p className="text-2xl font-bold text-yellow-400 mt-2">₹{product.price}</p>
                </div>
              </div>
            </div>

            {/* Checkout Form */}
            <div className="bg-gradient-to-br from-purple-800/30 to-indigo-900/30 backdrop-blur-sm border border-purple-400/30 rounded-xl p-6">
              <h2 className="text-2xl font-bold text-white mb-4">Shipping Details</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-purple-200 text-sm font-medium mb-2">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 bg-purple-800/20 border border-purple-400/30 rounded-md text-white placeholder-purple-300 focus:outline-none focus:border-purple-400"
                    placeholder="Enter your full name"
                  />
                </div>
                
                <div>
                  <label className="block text-purple-200 text-sm font-medium mb-2">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 bg-purple-800/20 border border-purple-400/30 rounded-md text-white placeholder-purple-300 focus:outline-none focus:border-purple-400"
                    placeholder="Enter your email"
                  />
                </div>
                
                <div>
                  <label className="block text-purple-200 text-sm font-medium mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 bg-purple-800/20 border border-purple-400/30 rounded-md text-white placeholder-purple-300 focus:outline-none focus:border-purple-400"
                    placeholder="Enter your phone number"
                  />
                </div>
                
                <div>
                  <label className="block text-purple-200 text-sm font-medium mb-2">Address *</label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    rows="3"
                    className="w-full px-3 py-2 bg-purple-800/20 border border-purple-400/30 rounded-md text-white placeholder-purple-300 focus:outline-none focus:border-purple-400"
                    placeholder="Enter your full address"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-purple-200 text-sm font-medium mb-2">City *</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 bg-purple-800/20 border border-purple-400/30 rounded-md text-white placeholder-purple-300 focus:outline-none focus:border-purple-400"
                      placeholder="City"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-purple-200 text-sm font-medium mb-2">Pincode *</label>
                    <input
                      type="text"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 bg-purple-800/20 border border-purple-400/30 rounded-md text-white placeholder-purple-300 focus:outline-none focus:border-purple-400"
                      placeholder="Pincode"
                    />
                  </div>
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-500 hover:to-orange-500 text-white py-3 px-4 rounded-full font-semibold shadow-lg transform hover:scale-105 transition-all duration-300 border border-yellow-400 mt-6"
                >
                  💳 Pay Now - ₹{product.price}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default GuestCheckout;