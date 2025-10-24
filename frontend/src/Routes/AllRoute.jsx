import React, { useState, useContext } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "../components/Home";
import Awards from "../Pages/Awards";
import Services from "../Pages/Services";
// import About from "../Pages/About";
import Contact from "../components/Contact";
import Events from "../Pages/Events";
import AboutPage from "../Pages/AboutPage";
import Appointment from "../Pages/Appointment";
import Blogs from "../Pages/Blogs";
import BlogDetail from "../Pages/BlogDetail";
import PaymentSuccess from "../components/PaymentSuccess";
import AstroBirthChartReformation from "../Pages/FeaturedPageItems/AstroBirthChartReformation";
import AstroVastuConsultancy from "../Pages/FeaturedPageItems/AstroVastuConsultancy";
import LifeCoachAndSuccessGuru from "../Pages/FeaturedPageItems/LifeCoachAndSuccessGuru";
import Palmistry from "../Pages/FeaturedPageItems/Palmistry";
import Numerology from "../Pages/FeaturedPageItems/Numerology";
import FaceReading from "../Pages/FeaturedPageItems/FaceReading";
import Cart from "../Pages/cart";
import Products from "../Pages/Products";
import Login from "../Pages/Login";
import Signup from "../Pages/Signup";
import ForgotPassword from "../Pages/ForgotPassword";
import ResetPassword from "../Pages/ResetPassword";
import Horoscope from "../Pages/Horoscope";
import HoroscopeDetail from "../Pages/HoroscopeDetail";
import Questions from "../Pages/Questions";
import QuestionDetail from "../Pages/QuestionDetail";
import GuestCheckout from "../Pages/GuestCheckout";
import { AuthContext } from "../AuthContext";
import { CartContext } from "../CartContext";

// Protected route component
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  
  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }
  
  if (!user) {
    return <Navigate to="/login" />;
  }
  
  return children;
};

const AllRoute = () => {
  const { addToCart } = useContext(CartContext);
  
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<Products />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/guest-checkout" element={<GuestCheckout />} />
      <Route path="/awards" element={<Awards />} />
      <Route path="/services" element={<Services />} />
      <Route path="/paymentsuccess" element={<PaymentSuccess />} />
      <Route path="/about-page" element={<AboutPage />} />
      <Route path="/events" element={<Events />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/appointment" element={<Appointment />} />
      <Route path="/blogs" element={<Blogs />} />
      <Route path="/blogs/:id" element={<BlogDetail />} />
      
      {/* Horoscope Routes */}
      <Route path="/horoscope" element={<Horoscope />} />
      <Route path="/horoscope/:slug" element={<HoroscopeDetail />} />
      
      {/* Q&A Routes */}
      <Route path="/questions" element={<Questions />} />
      <Route path="/questions/:id" element={<QuestionDetail />} />
      
      {/* Authentication Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      {/* Featured Pages */}
      <Route
        path="/astro-birth-chart-reformation"
        element={<AstroBirthChartReformation />}
      />
      <Route
        path="/astro-vastu-consultancy"
        element={<AstroVastuConsultancy />}
      />
      <Route
        path="/life-coach-and-success-guru"
        element={<LifeCoachAndSuccessGuru />}
      />
      <Route path="/palmistry" element={<Palmistry />} />
      <Route path="/numerology" element={<Numerology />} />
      <Route path="/face-reading" element={<FaceReading />} />
    </Routes>
  );
};

export default AllRoute;
