import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import BottomNavbar from '../components/BottomNavbar';
import Footer from '../components/Footer';
import BackButton from '../components/BackButton';
import { AuthContext } from '../AuthContext';

const API_URL = import.meta.env.VITE_HOST_URL_ENDPOINT || 'http://localhost:5000';

const Questions = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, answered, unanswered
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ title: '', content: '', tags: '' });
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetchQuestions();
  }, [filter]);

  const fetchQuestions = async () => {
    try {
      setLoading(true);
      let url = `${API_URL}/api/questions`;
      
      if (filter !== 'all') {
        url += `?isAnswered=${filter === 'answered'}`;
      }
      
      const response = await axios.get(url);
      setQuestions(response.data.data);
    } catch (error) {
      console.error('Error fetching questions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!user) {
      alert('Please login to ask a question');
      return;
    }
    
    try {
      const token = localStorage.getItem('token');
      const tagsArray = formData.tags
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag);
      
      await axios.post(
        `${API_URL}/api/questions`, 
        { 
          title: formData.title, 
          content: formData.content, 
          tags: tagsArray 
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      
      setFormData({ title: '', content: '', tags: '' });
      setShowForm(false);
      fetchQuestions();
    } catch (error) {
      console.error('Error submitting question:', error);
      alert('Failed to submit question. Please try again.');
    }
  };

  return (
    <>
      <BottomNavbar />
      
      <div className="container mx-auto px-4 pt-20 pb-8">
        <div className="mb-6">
          <BackButton className="mb-4" />
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Questions & Answers</h1>
            <button
              onClick={() => setShowForm(!showForm)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md"
            >
              {showForm ? 'Cancel' : 'Ask a Question'}
            </button>
          </div>
          
          {showForm && (
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
              <h2 className="text-xl font-semibold mb-4">Ask Your Question</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Title</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border rounded-md"
                    placeholder="What's your question?"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Details</label>
                  <textarea
                    name="content"
                    value={formData.content}
                    onChange={handleInputChange}
                    required
                    rows="4"
                    className="w-full px-3 py-2 border rounded-md"
                    placeholder="Provide more details about your question..."
                  ></textarea>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Tags (comma separated)</label>
                  <input
                    type="text"
                    name="tags"
                    value={formData.tags}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-md"
                    placeholder="astrology, career, relationship"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md"
                >
                  Submit Question
                </button>
              </form>
            </div>
          )}
          
          <div className="flex space-x-2 mb-6">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-md ${
                filter === 'all' 
                  ? 'bg-indigo-600 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              All Questions
            </button>
            <button
              onClick={() => setFilter('answered')}
              className={`px-4 py-2 rounded-md ${
                filter === 'answered' 
                  ? 'bg-indigo-600 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Answered
            </button>
            <button
              onClick={() => setFilter('unanswered')}
              className={`px-4 py-2 rounded-md ${
                filter === 'unanswered' 
                  ? 'bg-indigo-600 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Unanswered
            </button>
          </div>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        ) : questions.length > 0 ? (
          <div className="space-y-6">
            {questions.map((question) => (
              <div key={question._id} className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                <div className="p-6">
                  <div className="flex justify-between">
                    <h2 className="text-xl font-bold mb-2">
                      <Link to={`/questions/${question._id}`} className="hover:text-indigo-600">
                        {question.title}
                      </Link>
                    </h2>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      question.isAnswered 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {question.isAnswered ? 'Answered' : 'Awaiting Answer'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mb-2">
                    Asked by {question.user?.name || 'Anonymous'} • {new Date(question.createdAt).toLocaleDateString()}
                  </p>
                  <p className="text-gray-700 mb-4 line-clamp-2">{question.content}</p>
                  
                  {question.tags && question.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {question.tags.map((tag, index) => (
                        <span key={index} className="bg-gray-100 text-gray-600 px-2 py-1 text-xs rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  
                  <div className="flex justify-between items-center">
                    <Link 
                      to={`/questions/${question._id}`}
                      className="text-indigo-600 hover:text-indigo-800 font-medium"
                    >
                      {question.answers?.length > 0 
                        ? `View ${question.answers.length} ${question.answers.length === 1 ? 'answer' : 'answers'}`
                        : 'Be the first to answer'}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <p className="text-gray-500">No questions found.</p>
            <button
              onClick={() => setShowForm(true)}
              className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md"
            >
              Be the first to ask a question
            </button>
          </div>
        )}
      </div>
      
      <Footer />
    </>
  );
};

export default Questions;