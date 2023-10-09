import { Banner } from "./Banner";
import AOS from "aos";
import "aos/dist/aos.css";
import Contact from "./Contact";
import Promo from "./Promo";

AOS.init();
// TODO: Add Blog Sections
export const Home = () => {
  return (
    <div className="overflow-hidden">
      <>
        <Banner />
        <Promo />
        {/* <Contact /> */}
      </>
    </div>
  );
};
