import React, { useState, useEffect } from 'react';
import slide1 from '../images/sliderImages/slide1.jpg';
import slide2 from '../images/sliderImages/slide2.jpg';
import slide3 from '../images/sliderImages/slide3.jpg';
import slide4 from '../images/sliderImages/slide4.jpg';

const AstrologySlider = () => {
  const slides = [
    {
      image: slide1,
      title: "Sacred Crystal Healing",
      description: "Harness the mystical powers of crystals for spiritual transformation"
    },
    {
      image: slide2,
      title: "Discover Your Cosmic Energy",
      description: "Unlock the secrets written in the stars through ancient astrology wisdom"
    },
    {
      image: slide3,
      title: "Numerology Insights",
      description: "Decode your life path through the sacred language of numbers"
    },
    {
      image: slide4,
      title: "Spiritual Awakening",
      description: "Embark on a journey of self-discovery and cosmic enlightenment"
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);



  return (
    <div className="relative w-full h-48 md:h-56 lg:h-64 overflow-hidden rounded-xl shadow-2xl border border-purple-400/30">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="relative w-full h-full">
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <h3 className="text-xl md:text-2xl font-bold mb-2 gradient-text">
                {slide.title}
              </h3>
              <p className="text-sm md:text-base text-purple-200">
                {slide.description}
              </p>
            </div>
          </div>
        </div>
      ))}
      
      {/* Slide indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? 'bg-yellow-400 scale-125'
                : 'bg-white/50 hover:bg-white/75'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default AstrologySlider;