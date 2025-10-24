import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import TopNavbar from '../components/TopNavbar';
import BottomNavbar from '../components/BottomNavbar';
import Footer from '../components/Footer';
import BackButton from '../components/BackButton';

const API_URL = import.meta.env.VITE_HOST_URL_ENDPOINT || 'http://localhost:5000';

const HoroscopeDetail = () => {
  const { slug } = useParams();
  const [horoscope, setHoroscope] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHoroscope = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}/api/horoscopes/${slug}`);
        setHoroscope(response.data.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching horoscope:', err);
        setError('Failed to load horoscope. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchHoroscope();
  }, [slug]);

  if (loading) {
    return (
      <>
        <div className="hidden md:block">
          <TopNavbar />
        </div>
        <div className="bg-black h-[70px]">
          <BottomNavbar />
        </div>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <div className="hidden md:block">
          <TopNavbar />
        </div>
        <div className="bg-black h-[70px]">
          <BottomNavbar />
        </div>
        <div className="container mx-auto px-4 py-8">
          <BackButton to="/horoscope" className="mb-4" />
          <div className="text-center py-10">
            <p className="text-red-500">{error}</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (!horoscope) {
    return (
      <>
        <div className="hidden md:block">
          <TopNavbar />
        </div>
        <div className="bg-black h-[70px]">
          <BottomNavbar />
        </div>
        <div className="container mx-auto px-4 py-8">
          <BackButton to="/horoscope" className="mb-4" />
          <div className="text-center py-10">
            <p className="text-gray-500">Horoscope not found.</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <div className="hidden md:block">
        <TopNavbar />
      </div>
      <div className="bg-black h-[70px]">
        <BottomNavbar />
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <BackButton to="/horoscope" className="mb-4" />
        
        <article className="max-w-3xl mx-auto">
          <header className="mb-6">
            <h1 className="text-3xl font-bold mb-2">{horoscope.title}</h1>
            <div className="flex items-center text-gray-500 text-sm mb-4">
              <span>{new Date(horoscope.date).toLocaleDateString()}</span>
              <span className="mx-2">•</span>
              <span className="capitalize">{horoscope.zodiacSign}</span>
              <span className="mx-2">•</span>
              <span className="capitalize">{horoscope.period}</span>
            </div>
          </header>
          
          <div className="prose max-w-none">
            {horoscope.content.split('\n').map((paragraph, index) => (
              <p key={index} className="mb-4">{paragraph}</p>
            ))}
          </div>
        </article>
      </div>
      
      <Footer />
    </>
  );
};

export default HoroscopeDetail;