import React from "react";

import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="px-10 bg-white absolute w-full mt-[-400px]">
      <div className="mt-10 pb-10">
        <h3 className="font-philosopher text-3xl text-black mb-8 text-center"> About the Cosmic Guide </h3>
        
        <h3 className="font-dancing text-2xl leading-9 text-gray-700 mb-8 text-center">Namaskar & Blessed Greetings!</h3>
        <div className="text-center">
          <p className="text-gray-700 leading-relaxed mb-4">
            Welcome to my cosmic realm! I am your spiritual guide through the mysteries of the universe, 
            a master practitioner in the ancient arts of astrology, crystal healing, numerology, and sacred geometry. 
            With over 21 years of divine experience, I've dedicated my existence to unveiling the cosmic secrets 
            that govern our destinies and illuminate the path to spiritual awakening.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Born under the mystical energies of Mumbai, Maharashtra, my soul has been attuned to the 
            spiritual vibrations of ancient India since birth. The sacred wisdom of our ancestors flows through 
            my being, connecting me to the eternal cosmic consciousness.
          </p>
          <p className="text-gray-700 leading-relaxed mb-6">
            From my earliest memories, the metaphysical realm called to me with an irresistible force. 
            The stars whispered their secrets, crystals revealed their healing powers, and numbers unveiled 
            their sacred meanings - all preparing me for this divine mission of guiding souls toward enlightenment.
          </p>
          <Link to={"/about-page"}>
            <button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white px-6 py-3 rounded-full font-semibold shadow-lg transform hover:scale-105 transition-all duration-300 border border-purple-400">
              Discover My Cosmic Journey
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;
