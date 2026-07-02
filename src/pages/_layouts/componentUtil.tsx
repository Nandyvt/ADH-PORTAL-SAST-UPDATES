import { useEffect, useState } from "react";

export const useWindowDimensionOnPageResize = () => {
  const [windowZoomWidth, setWindowZoomWidth] = useState<number>(
    window.innerWidth
  );
  const setWindowDimensions = () => {
    if (parseFloat((window.outerWidth / window.innerWidth).toFixed(2)) === 1) {
      // zoom is 100%
      setWindowZoomWidth(window.outerWidth);
    } else {
      setWindowZoomWidth(window.innerWidth);
    }
  };
  useEffect(() => {
    window.addEventListener("resize", setWindowDimensions);
    return () => {
      window.removeEventListener("resize", setWindowDimensions);
    };
  }, []);

  return windowZoomWidth; // returning state  you can use them by your component
};
