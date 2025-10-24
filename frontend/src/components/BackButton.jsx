import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

const BackButton = ({ className, to }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (to) {
      navigate(to);
    } else {
      navigate(-1);
    }
  };

  return (
    <button
      onClick={handleBack}
      className={`flex items-center text-indigo-600 hover:text-indigo-800 transition-colors ${className || ''}`}
    >
      <FaArrowLeft className="mr-2" />
      <span>Back</span>
    </button>
  );
};

export default BackButton;