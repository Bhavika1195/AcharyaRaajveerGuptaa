import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import TopNavbar from '../components/TopNavbar';
import BottomNavbar from '../components/BottomNavbar';
import Footer from '../components/Footer';
import { FaCalendarAlt, FaUser, FaTag, FaFacebookF, FaTwitter, FaLinkedinIn, FaWhatsapp } from 'react-icons/fa';

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedBlogs, setRelatedBlogs] = useState([]);

  // Sample blog data - in a real app, this would come from an API
  const sampleBlogs = [
    {
      id: 1,
      title: 'Understanding Astrology: The Basics',
      content: `
        <p>Astrology is an ancient practice that has been used for thousands of years to understand human behavior and predict future events. It is based on the belief that the positions and movements of celestial bodies, such as the sun, moon, and planets, have an influence on human affairs and natural phenomena.</p>
        
        <h2>The Zodiac Signs</h2>
        <p>The zodiac is divided into twelve signs, each associated with specific personality traits and characteristics:</p>
        <ul>
          <li><strong>Aries (March 21 - April 19):</strong> Energetic, adventurous, and confident</li>
          <li><strong>Taurus (April 20 - May 20):</strong> Reliable, practical, and patient</li>
          <li><strong>Gemini (May 21 - June 20):</strong> Adaptable, outgoing, and curious</li>
          <li><strong>Cancer (June 21 - July 22):</strong> Intuitive, emotional, and protective</li>
          <li><strong>Leo (July 23 - August 22):</strong> Creative, passionate, and generous</li>
          <li><strong>Virgo (August 23 - September 22):</strong> Analytical, practical, and diligent</li>
          <li><strong>Libra (September 23 - October 22):</strong> Diplomatic, fair-minded, and social</li>
          <li><strong>Scorpio (October 23 - November 21):</strong> Determined, brave, and loyal</li>
          <li><strong>Sagittarius (November 22 - December 21):</strong> Optimistic, independent, and philosophical</li>
          <li><strong>Capricorn (December 22 - January 19):</strong> Disciplined, responsible, and self-controlled</li>
          <li><strong>Aquarius (January 20 - February 18):</strong> Progressive, original, and humanitarian</li>
          <li><strong>Pisces (February 19 - March 20):</strong> Compassionate, artistic, and intuitive</li>
        </ul>
        
        <h2>The Planets and Their Influence</h2>
        <p>In astrology, each planet is associated with different aspects of life:</p>
        <ul>
          <li><strong>Sun:</strong> Identity, ego, and life purpose</li>
          <li><strong>Moon:</strong> Emotions, instincts, and unconscious mind</li>
          <li><strong>Mercury:</strong> Communication, intellect, and reasoning</li>
          <li><strong>Venus:</strong> Love, beauty, and values</li>
          <li><strong>Mars:</strong> Energy, action, and desire</li>
          <li><strong>Jupiter:</strong> Growth, expansion, and wisdom</li>
          <li><strong>Saturn:</strong> Discipline, responsibility, and limitations</li>
          <li><strong>Uranus:</strong> Innovation, rebellion, and sudden changes</li>
          <li><strong>Neptune:</strong> Dreams, intuition, and spirituality</li>
          <li><strong>Pluto:</strong> Transformation, power, and rebirth</li>
        </ul>
        
        <p>Understanding these basic elements of astrology can provide insights into your personality, relationships, and life path. While astrology should not be used as the sole basis for making important decisions, it can be a valuable tool for self-reflection and personal growth.</p>
      `,
      image: 'https://via.placeholder.com/1200x600?text=Astrology+Basics',
      date: '2023-05-15',
      author: 'Achariya Debdutta',
      category: 'Astrology',
      tags: ['astrology', 'zodiac', 'planets', 'horoscope']
    },
    {
      id: 2,
      title: 'The Power of Numerology in Daily Life',
      content: `
        <p>Numerology is the belief in the divine or mystical relationship between numbers and events. It is often associated with the paranormal, alongside astrology and similar divinatory arts.</p>
        
        <h2>The Basic Numbers</h2>
        <p>In numerology, each number from 1 to 9 has specific characteristics and influences:</p>
        <ul>
          <li><strong>Number 1:</strong> Leadership, independence, originality</li>
          <li><strong>Number 2:</strong> Cooperation, diplomacy, sensitivity</li>
          <li><strong>Number 3:</strong> Expression, creativity, sociability</li>
          <li><strong>Number 4:</strong> Stability, practicality, organization</li>
          <li><strong>Number 5:</strong> Freedom, adaptability, change</li>
          <li><strong>Number 6:</strong> Responsibility, care, harmony</li>
          <li><strong>Number 7:</strong> Analysis, understanding, knowledge</li>
          <li><strong>Number 8:</strong> Power, authority, material success</li>
          <li><strong>Number 9:</strong> Compassion, generosity, humanitarianism</li>
        </ul>
        
        <h2>Life Path Number</h2>
        <p>Your Life Path Number is one of the most important numbers in your numerology chart. It is calculated from your birth date and reveals your life purpose and the path you will take through life.</p>
        
        <p>To calculate your Life Path Number, add all the digits in your birth date and reduce to a single digit. For example, if you were born on June 15, 1990:</p>
        <ul>
          <li>June is the 6th month: 6</li>
          <li>Day: 15 = 1 + 5 = 6</li>
          <li>Year: 1990 = 1 + 9 + 9 + 0 = 19 = 1 + 9 = 10 = 1 + 0 = 1</li>
          <li>6 + 6 + 1 = 13 = 1 + 3 = 4</li>
        </ul>
        <p>So the Life Path Number would be 4.</p>
        
        <h2>Applying Numerology in Daily Life</h2>
        <p>Numerology can be applied to various aspects of life:</p>
        <ul>
          <li><strong>Personal relationships:</strong> Understanding compatibility based on Life Path Numbers</li>
          <li><strong>Career choices:</strong> Finding suitable professions based on your Expression Number</li>
          <li><strong>Decision making:</strong> Choosing auspicious dates for important events</li>
          <li><strong>Self-awareness:</strong> Gaining insights into your strengths, weaknesses, and life purpose</li>
        </ul>
        
        <p>By understanding the energetic vibrations of numbers, you can make more informed decisions and navigate life's challenges with greater awareness.</p>
      `,
      image: 'https://via.placeholder.com/1200x600?text=Numerology',
      date: '2023-06-22',
      author: 'Achariya Debdutta',
      category: 'Numerology',
      tags: ['numerology', 'life path', 'numbers', 'destiny']
    },
    // Additional blog entries would be here
  ];

  useEffect(() => {
    // Simulate API call to get blog by ID
    setTimeout(() => {
      const foundBlog = sampleBlogs.find(blog => blog.id === parseInt(id));
      setBlog(foundBlog);
      
      // Get related blogs (same category)
      if (foundBlog) {
        const related = sampleBlogs
          .filter(b => b.category === foundBlog.category && b.id !== foundBlog.id)
          .slice(0, 3);
        setRelatedBlogs(related);
      }
      
      setLoading(false);
    }, 1000);
    
    // In a real app, you would fetch from an API:
    // const fetchBlog = async () => {
    //   try {
    //     const response = await axios.get(`https://your-api.com/blogs/${id}`);
    //     setBlog(response.data);
    //     const relatedResponse = await axios.get(`https://your-api.com/blogs/related/${id}`);
    //     setRelatedBlogs(relatedResponse.data);
    //   } catch (error) {
    //     console.error('Error fetching blog:', error);
    //   } finally {
    //     setLoading(false);
    //   }
    // };
    // fetchBlog();
  }, [id]);

  if (loading) {
    return (
      <>
        <div className="hidden md:block">
          <TopNavbar />
        </div>
        <div className="bg-black h-[70px]">
          <BottomNavbar className="text-black" />
        </div>
        <div className="flex justify-center items-center h-screen bg-gray-50">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      </>
    );
  }

  if (!blog) {
    return (
      <>
        <div className="hidden md:block">
          <TopNavbar />
        </div>
        <div className="bg-black h-[70px]">
          <BottomNavbar className="text-black" />
        </div>
        <div className="flex justify-center items-center h-screen bg-gray-50">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800">Blog not found</h2>
            <p className="mt-2 text-gray-600">The blog you're looking for doesn't exist or has been removed.</p>
            <Link to="/blogs" className="mt-4 inline-block px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
              Back to Blogs
            </Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="hidden md:block">
        <TopNavbar />
      </div>
      <div className="bg-black h-[70px]">
        <BottomNavbar className="text-black" />
      </div>

      <div className="bg-gray-50 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="mb-10">
            <img 
              src={blog.image} 
              alt={blog.title} 
              className="w-full h-[400px] object-cover rounded-lg shadow-lg"
            />
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content */}
            <div className="lg:w-2/3">
              <h1 className="text-4xl font-bold mb-6">{blog.title}</h1>
              
              <div className="flex flex-wrap items-center text-gray-600 mb-8 gap-4">
                <div className="flex items-center">
                  <FaCalendarAlt className="mr-2" />
                  <span>{blog.date}</span>
                </div>
                <div className="flex items-center">
                  <FaUser className="mr-2" />
                  <span>{blog.author}</span>
                </div>
                <div className="flex items-center">
                  <FaTag className="mr-2" />
                  <span>{blog.category}</span>
                </div>
              </div>
              
              <div 
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />
              
              {/* Tags */}
              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-2">Tags:</h3>
                <div className="flex flex-wrap gap-2">
                  {blog.tags.map(tag => (
                    <span 
                      key={tag} 
                      className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-sm"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Share */}
              <div className="mt-8 border-t border-gray-200 pt-8">
                <h3 className="text-lg font-semibold mb-4">Share this article:</h3>
                <div className="flex gap-3">
                  <button className="p-2 bg-[#1877F2] text-white rounded-full">
                    <FaFacebookF />
                  </button>
                  <button className="p-2 bg-[#1DA1F2] text-white rounded-full">
                    <FaTwitter />
                  </button>
                  <button className="p-2 bg-[#0A66C2] text-white rounded-full">
                    <FaLinkedinIn />
                  </button>
                  <button className="p-2 bg-[#25D366] text-white rounded-full">
                    <FaWhatsapp />
                  </button>
                </div>
              </div>
            </div>
            
            {/* Sidebar */}
            <div className="lg:w-1/3">
              {/* Author Box */}
              <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                <h3 className="text-xl font-bold mb-4">About the Author</h3>
                <div className="flex items-center">
                  <img 
                    src="https://via.placeholder.com/100?text=Author" 
                    alt={blog.author}
                    className="w-16 h-16 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-semibold">{blog.author}</h4>
                    <p className="text-gray-600 text-sm">Astrologer & Spiritual Guide</p>
                  </div>
                </div>
                <p className="mt-4 text-gray-600">
                  Achariya Debdutta is a renowned astrologer with over 20 years of experience in astrology, 
                  numerology, and spiritual guidance.
                </p>
              </div>
              
              {/* Related Posts */}
              {relatedBlogs.length > 0 && (
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-bold mb-4">Related Articles</h3>
                  <div className="space-y-4">
                    {relatedBlogs.map(relatedBlog => (
                      <div key={relatedBlog.id} className="flex items-start">
                        <img 
                          src={relatedBlog.image} 
                          alt={relatedBlog.title}
                          className="w-20 h-20 object-cover rounded mr-3"
                        />
                        <div>
                          <h4 className="font-medium text-gray-900 hover:text-indigo-600">
                            <Link to={`/blogs/${relatedBlog.id}`}>{relatedBlog.title}</Link>
                          </h4>
                          <p className="text-sm text-gray-500">{relatedBlog.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default BlogDetail;