'use client';

import React, { useState } from 'react';

function Dropdown({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Trigger element (e.g., "My Account") */}
      </div>
      {isOpen && (
        <div className="absolute top-full left-0 bg-white rounded-md shadow-md">
          {children}
        </div>
      )}
    </div>
  );
}

export default Dropdown;
