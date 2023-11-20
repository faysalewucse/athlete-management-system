import banner from "../../assets/banner.png";
import { Container } from "../../components/Container";
import Button from "../../components/shared/Button";
import { motion } from "framer-motion";
import background from "../../assets/background4-min.jpg";
import shape from "../../assets/hero-bg-shape-1.svg";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export const Banner = ({ scrollRef, handleScroll }) => {
  // const { isDark } = useTheme();
  //TODO3: set autoplat delay 2500

  const { currentUser } = useAuth();

  return (
    <div
      style={{ backgroundImage: `url(${background})` }}
      className="lg:min-h-[80vh] bg-img bg-center bg-no-repeat bg-cover relative w-full z-[1] bg-blend-multiply px-5 py-10 flex items-center text-slate-700"
    >
      <Container
        extraStyle={
          "md:flex flex-row md:flex-row-reverse items-center justify-between py-20 md:py-10 z-10"
        }
      >
        <div className="md:w-1/2 p-16 drop-shadow-md hidden md:block">
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
            Maximize Athletic Department Performance
          </h1>

          <motion.p
            initial={{ x: "-100vw" }}
            animate={{ x: 0 }}
            transition={{ delay: 0.2, duration: 0.1 }}
            className="md:w-3/4 md:text-justify text-gray-300 text-center my-5"
          >
            Overtime Athletic Management software is a comprehensive platform designed for athletic organizations, coaches, athletes, parents, and administrators. It streamlines athlete registration, team management, event scheduling, and communication while offering various user roles and functionalities for a seamless sports management experience.
          </motion.p>
          <div className="flex flex-col md:flex-row md:justify-start justify-center items-center gap-5">
            <Button
              onClickHandler={() => handleScroll(scrollRef)}
              text={"View Details"}
              style={"text-black dark:text-white"}
            />
            {!currentUser && (
              <Link
                to={"/register"}
                className="rounded cursor-pointer px-6 bg-gradient-to-r to-primary from-secondary py-2 font-semibold text-white hover:shadow-lg  transition-all duration-200"
              >
                Register Now
              </Link>
            )}
          </div>
        </div>
      </Container>
      <div className="absolute w-full -bottom-2 left-0">
        <img src={shape} alt="" />
      </div>
    </div>
  );
};
