import banner from "../../assets/banner.png";
import { Container } from "../../components/Container";
import Button from "../../components/shared/Button";
import { motion } from "framer-motion";

export const Banner = () => {
  // const { isDark } = useTheme();
  //TODO3: set autoplat delay 2500
  return (
    <div className="lg:min-h-[80vh] p-5 flex items-center bg-white text-slate-700">
      <Container
        extraStyle={
          "md:flex flex-row md:flex-row-reverse items-center justify-between"
        }
      >
        <div className="md:w-1/2 p-10">
          <motion.img
            initial={{ x: "100vw" }}
            animate={{ x: 0 }}
            transition={{ delay: 0.2, duration: 0.1 }}
            src={banner}
            alt="banner_pic"
          />
        </div>
        <div className="md:w-1/2 text-center md:text-start">
          <h1 className="lg:text-6xl text-5xl text-gradient font-semibold leading-tight">
            Maximize Athletic Performance
          </h1>

          <motion.p
            initial={{ x: "-100vw" }}
            animate={{ x: 0 }}
            transition={{ delay: 0.2, duration: 0.1 }}
            className="md:w-3/4 md:text-justify text-center my-5"
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
    </div>
  );
};
