import { Container } from "../../components/Container";
import image1 from "../../assets/card/running.png";
import image2 from "../../assets/card/running2.png";
import image3 from "../../assets/card/running3.png";
import Aos from "aos";
import "aos/dist/aos.css";
Aos.init();

const Promo = () => {
  return (
    <div className="bg-white py-20 overflow-hidden">
      <Container extraStyle={"flex flex-col justify-center items-center "}>
        <h1 className="text-center text-2xl md:text-4xl font-semibold ">
          Why You Choose Overtime?
        </h1>
        <p className=" text-center text-lg text-gray-500 mt-5">
          Experience the power of our athlete management application, designed
          to elevate performance, <br /> streamline communication, and achieve
          unparalleled results.
          <br />
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10 px-3 md:px-0">
          <div
            data-aos="fade-right"
            data-aos-duration="1000"
            className="flex flex-col justify-center items-center h-full shadow-[0_3px_20px_0px_rgba(0,0,0,0.12)] rounded-xl p-14 space-y-4 transition-300 hover:-translate-y-3"
          >
            <img className="w-16" src={image2} alt="" />
            <h3 className="text-lg font-semibold">Seamless Collaboration</h3>
            <p className="text-gray-500">
              Enhance collaboration between coaches, athletes.
            </p>
          </div>
          <div
            data-aos="fade-left"
            data-aos-duration="1000"
            className="flex flex-col justify-center items-center h-full shadow-[0_3px_20px_0px_rgba(0,0,0,0.12)] rounded-xl p-14 space-y-4 transition-300 hover:-translate-y-3"
          >
            <img className="w-16" src={image3} alt="" />
            <h3 className="text-lg font-semibold">Optimize Performance</h3>
            <p className="text-gray-500">
              Give your athletes the competitive edge they deserve.
            </p>
          </div>
          <div
            data-aos="fade-right"
            data-aos-duration="1000"
            className="flex flex-col justify-center items-center h-full shadow-[0_3px_20px_0px_rgba(0,0,0,0.12)] rounded-xl p-14 space-y-4 transition-300 hover:-translate-y-3"
          >
            <img className="w-16" src={image1} alt="" />
            <h3 className="text-lg font-semibold">Unlock Full Potential</h3>
            <p className="text-gray-500">
              Experience the power of our athlete management application.
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Promo;
