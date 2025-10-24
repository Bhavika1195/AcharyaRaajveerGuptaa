import React, { useState, useEffect } from 'react';

import BottomNavbar from '../components/BottomNavbar';
import Footer from '../components/Footer';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Sample blog data - in a real app, this would come from an API
  const sampleBlogs = [
    {
      id: 1,
      title: 'Understanding Astrology: The Basics',
      excerpt: 'Learn about the fundamentals of astrology and how celestial bodies influence our lives.',
      image: 'https://via.placeholder.com/800x400?text=Astrology+Basics',
      date: '2023-05-15',
      author: 'Achariya Debdutta',
      category: 'Astrology'
    },
    {
      id: 2,
      title: 'The Power of Numerology in Daily Life',
      excerpt: 'Discover how numbers can reveal patterns and insights about your personality and life path.',
      image: 'https://via.placeholder.com/800x400?text=Numerology',
      date: '2023-06-22',
      author: 'Achariya Debdutta',
      category: 'Numerology'
    },
    {
      id: 3,
      title: 'Palmistry: Reading the Lines of Destiny',
      excerpt: 'Explore the ancient art of palm reading and what your hands can reveal about your future.',
      image: 'https://via.placeholder.com/800x400?text=Palmistry',
      date: '2023-07-10',
      author: 'Achariya Debdutta',
      category: 'Palmistry'
    },
    {
      id: 4,
      title: 'Vastu Tips for a Harmonious Home',
      excerpt: 'Simple Vastu adjustments that can bring balance and positive energy to your living space.',
      image: 'https://via.placeholder.com/800x400?text=Vastu+Tips',
      date: '2023-08-05',
      author: 'Achariya Debdutta',
      category: 'Vastu'
    },
    {
      id: 5,
      title: 'Monthly Horoscope: September 2023',
      excerpt: 'Detailed astrological predictions for all zodiac signs for the month of September.',
      image: 'https://via.placeholder.com/800x400?text=Monthly+Horoscope',
      date: '2023-09-01',
      author: 'Achariya Debdutta',
      category: 'Horoscope'
    },
    {
      id: 6,
      title: 'Face Reading: What Your Features Reveal',
      excerpt: 'The ancient art of physiognomy and what your facial features say about your character.',
      image: 'https://via.placeholder.com/800x400?text=Face+Reading',
      date: '2023-09-18',
      author: 'Achariya Debdutta',
      category: 'Face Reading'
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setBlogs(sampleBlogs);
      setLoading(false);
    }, 1000);
    
    // In a real app, you would fetch from an API:
    // const fetchBlogs = async () => {
    //   try {
    //     const response = await axios.get('https://your-api.com/blogs');
    //     setBlogs(response.data);
    //   } catch (error) {
    //     console.error('Error fetching blogs:', error);
    //   } finally {
    //     setLoading(false);
    //   }
    // };
    // fetchBlogs();
  }, []);

  const [activeCategory, setActiveCategory] = useState('All');
  const categories = ['All', 'Astrology', 'Numerology', 'Palmistry', 'Vastu', 'Horoscope', 'Face Reading'];

  const filteredBlogs = activeCategory === 'All' 
    ? blogs 
    : blogs.filter(blog => blog.category === activeCategory);

  return (
    <>
      <BottomNavbar />

      <div className="bg-gray-50 min-h-screen pt-20 pb-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-center mb-12">Our Blog</h1>
          
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center mb-8 gap-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  activeCategory === category
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredBlogs.map(blog => (
                <div key={blog.id} className="bg-white rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:transform hover:scale-105">
                  <img 
                    src={blog.image} 
                    alt={blog.title} 
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-indigo-600 bg-indigo-100">
                        {blog.category}
                      </span>
                      <span className="text-gray-500 text-sm">{blog.date}</span>
                    </div>
                    <h2 className="text-xl font-bold mb-2">{blog.title}</h2>
                    <p className="text-gray-600 mb-4">{blog.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500 text-sm">By {blog.author}</span>
                      <Link 
                        to={`/blogs/${blog.id}`} 
                        className="text-indigo-600 hover:text-indigo-800 font-medium"
                      >
                        Read More →
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {!loading && filteredBlogs.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-xl text-gray-600">No blogs found in this category.</h3>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Blogs;