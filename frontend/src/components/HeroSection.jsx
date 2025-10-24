import React, { useEffect, useState } from "react";
import banner from "../images/banner.jpg";
import mbanner from "../images/mob-banner.jpg";
import banner1 from "../images/banner1.jpg";
import astroLogo from "../images/logo/astro achariya logo-01.png";
import BottomNavbar from "./BottomNavbar";
import TopNavbar from "./TopNavbar";
import FeaturedServices from "./FeaturedServices";
import AstrologySlider from "./AstrologySlider";
import { Link } from "react-router-dom";

const HeroSection = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 912);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const backgroundImage = isSmallScreen ? mbanner : banner1;

  return (
    <>
      <div className="relative">
        <div className="fixed w-full h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-black z-0">
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        </div>

        <BottomNavbar />
        <div className="flex justify-center items-start w-full absolute inset-0 z-5 pt-28">
          <div className="text-center p-4 w-full max-w-6xl">
            <div className="mb-3">
              <img 
                src={astroLogo} 
                alt="Astro Achariya Logo" 
                className="mx-auto mb-2 w-32 h-32 md:w-40 md:h-40 object-contain"
              />
              <div className="text-xl md:text-2xl text-white mb-2 font-light">
                 Astrology • Numerology • Vastu 
              </div>
            </div>
            
            <div className="mb-4">
              <AstrologySlider />
            </div>
            
            <div className="flex flex-col md:flex-row gap-3 justify-center mb-12">
              <Link to={"/products"}>
                <button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white px-6 py-3 rounded-full text-base font-semibold shadow-2xl transform hover:scale-105 transition-all duration-300 border border-purple-400">
                  Explore Sacred Crystals
                </button>
              </Link>
              <Link to={"/appointment"}>
                <button className="bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-500 hover:to-orange-500 text-white px-6 py-3 rounded-full text-base font-semibold shadow-2xl transform hover:scale-105 transition-all duration-300 border border-yellow-400">
                  Book Consultation
                </button>
              </Link>
            </div>
          </div>
        </div>
        {/* <About /> */}
        <FeaturedServices />
        {/* <Achievement /> */}
      </div>
    </>
  );
};

export default HeroSection;
