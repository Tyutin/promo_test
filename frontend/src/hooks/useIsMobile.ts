import { useEffect, useState } from 'react';

export default function useIsMobile(): {isMobile: boolean} {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      const matches = window.matchMedia('(max-width: 767px)').matches;
      setIsMobile(matches);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return {isMobile}
}