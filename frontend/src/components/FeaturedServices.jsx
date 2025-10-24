import React, { useState } from "react";
import Achievement from "./Achievement";
import FeaturedVideoEmbed from "./FeaturedVideoEmbed";
import About from "../Pages/About";
import Footer from "./Footer";
import "../App.css";
import feature1 from "../images/alldebdatta-images/feature1.jpg";
import feature2 from "../images/alldebdatta-images/feature2.jpg";
import feature3 from "../images/alldebdatta-images/feature3.jpg";
import feature4 from "../images/alldebdatta-images/feature4.jpg";
import feature5 from "../images/alldebdatta-images/feature5.jpg";
import feature6 from "../images/alldebdatta-images/feature6.jpg";
import ClientStories from "./ClientStories";
import { Link } from "react-router-dom";

const FeaturedServices = () => {
  const imageArray = [
    {
      image: feature1,
      navigatePath: "astro-birth-chart-reformation",
      HeadText: " Cosmic Birth Chart Reading",
      paragraph:
        " Unveil the celestial blueprint of your soul's journey through the stars and planets ",
    },
    {
      image: feature2,
      navigatePath: "astro-vastu-consultancy",
      HeadText: " Sacred Space Harmonization",
      paragraph:
        " Align your living space with cosmic energies for prosperity and spiritual growth ",
    },
    {
      image: feature3,
      navigatePath: "life-coach-and-success-guru",
      HeadText: " Spiritual Life Guidance",
      paragraph:
        " Transform your destiny through ancient wisdom and unlock your divine potential ",
    },
    {
      image: feature4,
      navigatePath: "palmistry",
      HeadText: " Mystical Palm Reading",
      paragraph:
        " Decode the sacred lines of your hands to reveal your soul's deepest secrets and future path ",
    },
    {
      image: feature5,
      navigatePath: "numerology",
      HeadText: " Sacred Number Divination",
      paragraph:
        " Unlock the mystical power of numbers to illuminate your life's purpose and destiny ",
    },
    {
      image: feature6,
      navigatePath: "face-reading",
      HeadText: " Ancient Face Divination",
      paragraph:
        " Read the cosmic map written upon your face to unveil hidden truths and future possibilities ",
    },
  ];

  const [isFlippedArray, setIsFlippedArray] = useState(Array(6).fill(false));

  const handleFlip = (index) => {
    const updatedArray = [...isFlippedArray];
    updatedArray[index] = !updatedArray[index];
    setIsFlippedArray(updatedArray);
  };

  return (
    <>
      <div className=" absolute mt-[1800px] md:mt-[1400px] lg:mt-[1300px] bg-white w-full">
        <About />
        <div>
          <h1 className="text-center text-2xl md:text-3xl lg:text-4xl m-3 font-philosopher mt-[800px] md:mt-[300px] lg:mt-[150px] mb-5">
             Mystical Services 
          </h1>
          <p className="text-center text-lg text-gray-600 mb-8">
             Unlock the secrets of the universe through ancient wisdom 
          </p>
        </div>

        <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 text-center w-[90%] m-auto">
          {isFlippedArray.map((isFlipped, index) => (
            <div
              key={index}
              className={`border px-3 py-3 ${isFlipped ? "flipped" : ""}`}
              onMouseEnter={() => handleFlip(index)}
              onMouseLeave={() => handleFlip(index)}
            >
              <div className={`flipper ${isFlipped ? "flipped" : ""}`}>
                <div className="front">
                  <img
                    src={imageArray[index].image}
                    alt=""
                    className="m-auto object-cover"
                  />
                </div>
                <div className="back">
                  <h3 className="text-center m-auto font-bold">
                    {imageArray[index].HeadText}
                  </h3>
                  <div className="w-[90%] m-auto">
                    <p className="text-[14px]">{imageArray[index].paragraph}</p>
                  </div>
                  <Link to={imageArray[index].navigatePath}>
                    <button className="text-white mt-2 bg-black hover:bg-transparent border border-black rounded-sm px-3 py-2 hover:border hover:border-black transition duration-700 ease-in-out hover:text-black">
                      Get Started Here
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div>
          <Achievement />
        </div>
        <div>
          <FeaturedVideoEmbed embedID="LK6oYTQ3-6M" />
        </div>
        <div className=" m-auto w-[50%] mb-4">
          <h1 className=" text-2xl text-center md:text-3xl lg:text-4xl m-3 font-philosopher">
            Client Stories
          </h1>
          <p className="text-center">
            Explore the inspiring success stories of individuals whose lives
            have been positively impacted by Achariya Debtauua guidance and
            expertise.
          </p>
        </div>
        <div>
          <ClientStories />
        </div>
        <div>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default FeaturedServices;
