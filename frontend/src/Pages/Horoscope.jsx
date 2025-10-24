import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import BottomNavbar from '../components/BottomNavbar';
import Footer from '../components/Footer';
import BackButton from '../components/BackButton';

const API_URL = import.meta.env.VITE_HOST_URL_ENDPOINT || 'http://localhost:5000';

const Horoscope = () => {
  const [horoscopes, setHoroscopes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSign, setSelectedSign] = useState('all');
  const [selectedPeriod, setSelectedPeriod] = useState('daily');

  const zodiacSigns = [
    { id: 'aries', name: 'Aries' },
    { id: 'taurus', name: 'Taurus' },
    { id: 'gemini', name: 'Gemini' },
    { id: 'cancer', name: 'Cancer' },
    { id: 'leo', name: 'Leo' },
    { id: 'virgo', name: 'Virgo' },
    { id: 'libra', name: 'Libra' },
    { id: 'scorpio', name: 'Scorpio' },
    { id: 'sagittarius', name: 'Sagittarius' },
    { id: 'capricorn', name: 'Capricorn' },
    { id: 'aquarius', name: 'Aquarius' },
    { id: 'pisces', name: 'Pisces' },
  ];

  useEffect(() => {
    const fetchHoroscopes = async () => {
      try {
        setLoading(true);
        let url = `${API_URL}/api/horoscopes?period=${selectedPeriod}`;
        
        if (selectedSign !== 'all') {
          url += `&zodiacSign=${selectedSign}`;
        }
        
        const response = await axios.get(url);
        setHoroscopes(response.data.data);
      } catch (error) {
        console.error('Error fetching horoscopes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHoroscopes();
  }, [selectedSign, selectedPeriod]);

  return (
    <>
      <BottomNavbar />
      
      <div className="container mx-auto px-4 pt-20 pb-8">
        <div className="mb-6">
          <BackButton className="mb-4" />
          <h1 className="text-3xl font-bold mb-4">Horoscope</h1>
          
          <div className="flex flex-wrap gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Period</label>
              <select 
                value={selectedPeriod} 
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="border rounded-md px-3 py-2"
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Zodiac Sign</label>
              <select 
                value={selectedSign} 
                onChange={(e) => setSelectedSign(e.target.value)}
                className="border rounded-md px-3 py-2"
              >
                <option value="all">All Signs</option>
                {zodiacSigns.map(sign => (
                  <option key={sign.id} value={sign.id}>{sign.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        ) : horoscopes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {horoscopes.map((horoscope) => (
              <div key={horoscope._id} className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                <div className="p-6">
                  <h2 className="text-xl font-bold mb-2">{horoscope.title}</h2>
                  <p className="text-sm text-gray-500 mb-2">
                    {new Date(horoscope.date).toLocaleDateString()} • {horoscope.zodiacSign.charAt(0).toUpperCase() + horoscope.zodiacSign.slice(1)}
                  </p>
                  <p className="text-gray-700 mb-4 line-clamp-3">{horoscope.content}</p>
                  <Link 
                    to={`/horoscope/${horoscope.slug}`}
                    className="text-indigo-600 hover:text-indigo-800 font-medium"
                  >
                    Read More →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <p className="text-gray-500">No horoscopes found for the selected criteria.</p>
          </div>
        )}
      </div>
      
      <Footer />
    </>
  );
};

export default Horoscope;