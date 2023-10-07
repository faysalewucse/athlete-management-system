import banner from "../../assets/banner.png";
import { Container } from "../../components/Container";
import Button from "../../components/shared/Button";
import { motion } from "framer-motion";
import background from "../../assets/background4-min.jpg";
import shape from "../../assets/hero-bg-shape-1.svg";

export const Banner = () => {
  // const { isDark } = useTheme();
  //TODO3: set autoplat delay 2500
  return (
    <div
      style={{ backgroundImage: `url(${background})` }}
      className="lg:min-h-[80vh] bg-img bg-center bg-no-repeat bg-cover relative w-full z-[1] bg-blend-multiply p-5 flex items-center text-slate-700"
    >
      <Container
        extraStyle={
          "md:flex flex-row md:flex-row-reverse items-center justify-between pt-10 z-10"
        }
      >
        <div className="md:w-1/2 p-16 drop-shadow-md">
          <motion.img
            initial={{ x: "100vw" }}
            animate={{ x: 0 }}
            transition={{ delay: 0.2, duration: 0.1 }}
            src={banner}
            alt="banner_pic"
          />
        </div>
        <div className="md:w-1/2 text-center md:text-start">
          <h1 className="lg:text-6xl text-4xl text-white font-semibold tracking-wide">
            Maximize Athletic Performance
          </h1>

          <motion.p
            initial={{ x: "-100vw" }}
            animate={{ x: 0 }}
            transition={{ delay: 0.2, duration: 0.1 }}
            className="md:w-3/4 md:text-justify text-gray-300 text-center my-5"
          >
            Our athlete management system empowers coaches and organizations to
            maximize athlete performance.
          </motion.p>
          <div className="flex md:justify-start justify-center items-center gap-5">
            <Button
              text={"View Details"}
              style={"text-black dark:text-white"}
            />
            <Button text={"Admit Today"} style={"text-black dark:text-white"} />
          </div>
        </div>
      </Container>
      <div className="absolute w-full -bottom-2 left-0">
        <img src={shape} alt="" />
      </div>
    </div>
  );
};
