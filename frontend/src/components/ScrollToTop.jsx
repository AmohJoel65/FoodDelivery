import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant" // "instant" or "auto" ensures immediate scroll to top on page transition
    });
  }, [pathname]);

  return null;
};

export default ScrollToTop;
