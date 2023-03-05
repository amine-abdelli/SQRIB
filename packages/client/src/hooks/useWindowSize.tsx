import { useEffect, useState } from 'react';

function useWindowSize() {
  const [windowSize, setWindowSize] = useState<{
    width: number | undefined,
    height: number | undefined
  }>({ width: undefined, height: undefined });

  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Empty array ensures that effect is only run on mount
  const { width = 0, height = 0 } = windowSize;
  return {
    width,
    height,
    isVerySmallScreen: width < 440,
    isSmallScreen: width < 576,
    isMediumScreen: width < 768,
    isLargeScreen: width < 992,
    isExtraLarge: width < 1200,
    isExtraExtraLarge: width < 1400,
  };
}

export { useWindowSize };
