import { useState, useEffect } from 'react';

const useBreakpoint = () => {
  const [isBreakpoint, setIsBreakpoint] = useState<number | null>(null);

  const handleResize = () => {
    const windowWidth = window.innerWidth;

    setIsBreakpoint(
      windowWidth >= 1536 ? 1 : 
      windowWidth >= 1280 ? 2 : 
      windowWidth >= 1024 ? 3 : 
      windowWidth >= 744 ? 4 : 5
    ); 
  };

  useEffect(() => {
    // Check on initial render
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []); 

  return isBreakpoint;
}

export default useBreakpoint;
