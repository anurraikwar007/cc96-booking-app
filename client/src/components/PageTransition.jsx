import { useEffect } from "react";
import gsap from "gsap";

function PageTransition({ children }) {

  useEffect(() => {

    gsap.fromTo(
      ".page",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5 }
    );

  }, []);

  return (
    <div className="page">
      {children}
    </div>
  );
}

export default PageTransition;