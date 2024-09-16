"use client";
import { useEffect, useState } from 'react';

const Layout = ({ children }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className='min-h-screen '>
      {/* Your layout structure, e.g. header, footer */}
      {children}
    </div>
  );
};

export default Layout;
