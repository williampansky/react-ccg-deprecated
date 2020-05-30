import { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';

function useResponsive() {
  const [isClient, setIsClient] = useState(false);

  const isMobile = useMediaQuery({
    maxWidth: 767
  });

  const isTablet = useMediaQuery({
    minWidth: 758,
    maxWidth: 959
  });

  const isDesktop = useMediaQuery({
    minWidth: 960
  });

  useEffect(() => {
    if (typeof window !== 'undefined') setIsClient(true);
  }, []);

  return {
    isDesktop: isClient ? isDesktop : true,
    isTablet: isClient ? isTablet : false,
    isMobile: isClient ? isMobile : false
  };
}

export default useResponsive;
