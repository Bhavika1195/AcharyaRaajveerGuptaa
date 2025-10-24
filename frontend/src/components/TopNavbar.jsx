import React from "react";

const TopNavbar = () => {
  return (
    <div 
      className="h-[50px] bg-gradient-to-r from-purple-900 to-indigo-900" 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        width: '100%'
      }}
    >
    </div>
  );
};

export default TopNavbar;
