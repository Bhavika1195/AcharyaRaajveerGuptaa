import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import TopNavbar from '../components/TopNavbar';
import BottomNavbar from '../components/BottomNavbar';
import Footer from '../components/Footer';
import BackButton from '../components/BackButton';
import { AuthContext } from '../AuthContext';

const API_URL = import.meta.env.VITE_HOST_URL_ENDPOINT || 'http://localhost:5000';

const QuestionDetail = () => {
  const { id } = useParams();
  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [answer, setAnswer] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetchQuestion();
  }, [id]);

  const fetchQuestion = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/api/questions/${id}`);
      setQuestion(response.data.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching question:', err);
      setError('Failed to load question. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitAnswer = async (e) => {
    e.preventDefault();
    
    if (!user) {
      alert('Please login to answer this question');
      return;
    }
    
    if (!answer.trim()) {
      alert('Please enter your answer');
      return;
    }
    
    try {
      setSubmitting(true);
      const token = localStorage.getItem('token');
      
      await axios.post(
        `${API_URL}/api/questions/${id}/answers`, 
        { content: answer },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      
      setAnswer('');
      fetchQuestion();
    } catch (error) {
      console.error('Error submitting answer:', error);
      alert('Failed to submit answer. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

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
          <BackButton to="/questions" className="mb-4" />
          <div className="text-center py-10">
            <p className="text-red-500">{error}</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (!question) {
    return (
      <>
        <div className="hidden md:block">
          <TopNavbar />
        </div>
        <div className="bg-black h-[70px]">
          <BottomNavbar />
        </div>
        <div className="container mx-auto px-4 py-8">
          <BackButton to="/questions" className="mb-4" />
          <div className="text-center py-10">
            <p className="text-gray-500">Question not found.</p>
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
        <BackButton to="/questions" className="mb-4" />
        
        <div className="max-w-3xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <div className="flex justify-between items-start mb-4">
              <h1 className="text-2xl font-bold">{question.title}</h1>
              <span className={`px-2 py-1 text-xs rounded-full ${
                question.isAnswered 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {question.isAnswered ? 'Answered' : 'Awaiting Answer'}
              </span>
            </div>
            
            <p className="text-sm text-gray-500 mb-4">
              Asked by {question.user?.name || 'Anonymous'} • {new Date(question.createdAt).toLocaleDateString()}
            </p>
            
            <div className="prose max-w-none mb-6">
              {question.content.split('\n').map((paragraph, index) => (
                <p key={index} className="mb-4">{paragraph}</p>
              ))}
            </div>
            
            {question.tags && question.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {question.tags.map((tag, index) => (
                  <span key={index} className="bg-gray-100 text-gray-600 px-2 py-1 text-xs rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
          
          <h2 className="text-xl font-bold mb-4">
            {question.answers && question.answers.length > 0 
              ? `${question.answers.length} ${question.answers.length === 1 ? 'Answer' : 'Answers'}`
              : 'No Answers Yet'}
          </h2>
          
          {question.answers && question.answers.length > 0 ? (
            <div className="space-y-6 mb-8">
              {question.answers.map((answer, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                  <p className="text-sm text-gray-500 mb-4">
                    Answered by {answer.user?.name || 'Anonymous'} • {new Date(answer.createdAt).toLocaleDateString()}
                  </p>
                  <div className="prose max-w-none">
                    {answer.content.split('\n').map((paragraph, idx) => (
                      <p key={idx} className="mb-4">{paragraph}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-gray-50 p-6 rounded-lg text-center mb-8">
              <p className="text-gray-500">Be the first to answer this question!</p>
            </div>
          )}
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Your Answer</h2>
            {user ? (
              <form onSubmit={handleSubmitAnswer}>
                <div className="mb-4">
                  <textarea
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    required
                    rows="6"
                    className="w-full px-3 py-2 border rounded-md"
                    placeholder="Write your answer here..."
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md"
                >
                  {submitting ? 'Submitting...' : 'Post Your Answer'}
                </button>
              </form>
            ) : (
              <div className="text-center py-4">
                <p className="text-gray-500 mb-2">You need to be logged in to answer questions.</p>
                <a href="/login" className="text-indigo-600 hover:text-indigo-800 font-medium">
                  Login to answer
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default QuestionDetail;