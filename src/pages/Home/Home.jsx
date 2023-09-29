import { Banner } from "./Banner";
import AOS from "aos";
import "aos/dist/aos.css";
import Contact from "./Contact";

AOS.init();
// TODO: Add Blog Sections
export const Home = () => {
  return (
    <div className="overflow-hidden">
      <>
        <Banner />
        <Contact />
      </>
    </div>
  );
};
