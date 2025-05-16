import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import LoadingScreen from '../../Vitals/Components/LoadingScreen'; // adjust the path if needed

export default function RouteTransition({ children }) {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Only trigger loading screen for non-Home and non-Fashop routes
    const isFullPageRoute = !location.pathname.startsWith('/Home') && !location.pathname.startsWith('/Fashop');

    if (isFullPageRoute) {
      setLoading(true);
      const timeout = setTimeout(() => setLoading(false), 500); // adjust duration here
      return () => clearTimeout(timeout);
    } else {
      setLoading(false);
    }
  }, [location]);

  return (
    <>
      {loading && <LoadingScreen />}
      {children}
    </>
  );
}
