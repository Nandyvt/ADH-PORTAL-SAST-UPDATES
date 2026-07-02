import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = ({ buttonClick, setButtonClick }: any) => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    setButtonClick(false);
  }, [pathname]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [buttonClick]);

  return null;
};

export default ScrollToTop;
