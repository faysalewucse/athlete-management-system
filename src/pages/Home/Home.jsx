import { Banner } from "./Banner";
import AOS from "aos";
import "aos/dist/aos.css";
import Contact from "./Contact";
import Promo from "./Promo";
import Features from "./Features";
import About from "./About";
import { useRef } from "react";

AOS.init();
// TODO: Add Blog Sections
export const Home = () => {
  const scrollRef = useRef();

  const handleScroll = (elementRef) => {
    if (elementRef && elementRef.current) {
      const topOffset = elementRef.current.getBoundingClientRect().top;
      window.scrollTo({ top: window.scrollY + topOffset, behavior: "smooth" });
    }
  };

  return (
    <div className="overflow-hidden">
      <>
        <Banner scrollRef={scrollRef} handleScroll={handleScroll} />
        <Promo />
        <Features scrollRef={scrollRef} />
        <About scrollRef={scrollRef} handleScroll={handleScroll} />
      </>
    </div>
  );
};
