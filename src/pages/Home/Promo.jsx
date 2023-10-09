import { Container } from "../../components/Container";
import image1 from "../../assets/card/running.png";

const Promo = () => {
  return (
    <div className="bg-white py-20">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
          <div className="flex flex-col justify-center items-center h-full shadow-[0_3px_20px_0px_rgba(0,0,0,0.12)] rounded-xl p-14 space-y-4 transition-300 hover:-translate-y-3">
            <img className="w-16" src={image1} alt="" />
            <h3 className="text-lg font-semibold">Seamless Collaboration</h3>
            <p className="text-gray-500">
              Enhance collaboration between coaches, athletes.
            </p>
          </div>
          <div className="flex flex-col justify-center items-center h-full shadow-[0_3px_20px_0px_rgba(0,0,0,0.12)] rounded-xl p-14 space-y-4 transition-300 hover:-translate-y-3">
            <img className="w-16" src={image1} alt="" />
            <h3 className="text-lg font-semibold">Seamless Collaboration</h3>
            <p className="text-gray-500">
              Enhance collaboration between coaches, athletes.
            </p>
          </div>
          <div className="flex flex-col justify-center items-center h-full shadow-[0_3px_20px_0px_rgba(0,0,0,0.12)] rounded-xl p-14 space-y-4 transition-300 hover:-translate-y-3">
            <img className="w-16" src={image1} alt="" />
            <h3 className="text-lg font-semibold">Seamless Collaboration</h3>
            <p className="text-gray-500">
              Enhance collaboration between coaches, athletes.
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Promo;
