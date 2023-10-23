import { Link } from "react-router-dom";
import aboutBg from "../../assets/about-bg.jpg";
import about from "../../assets/about.svg";
import { Container } from "../../components/Container";
import Button from "../../components/shared/Button";
import { useAuth } from "../../contexts/AuthContext";

const About = ({ scrollRef, handleScroll }) => {
  const { currentUser } = useAuth();
  return (
    <div
      style={{ backgroundImage: `url(${aboutBg})` }}
      className="bg-img bg-center bg-cover bg-no-repeat lg:min-h-[89vh] relative w-full text-white z-[1] flex mb-20"
    >
      <Container
        extraStyle={
          "flex flex-col md:flex-row gap-10 md:gap-0 items-center justify-between py-20 md:py-0"
        }
      >
        <div className="px-3 md:px-0 md:pr-10">
          <h1 className="text-2xl md:text-4xl font-medium mb-6">
            Passion-Driven Innovators in Athlete Management Technology
          </h1>
          <p className=" text-lg leading-7">
            We invite you to join us on this exciting journey to empower
            athletes and coaches worldwide. Together, we can redefine the
            standards of athlete management and help individuals and teams
            achieve greatness.
          </p>

          <Link
            to={!currentUser ? "/login" : "/"}
            className="inline-block rounded cursor-pointer px-6 bg-gradient-to-r to-primary from-secondary py-2 font-semibold text-white hover:shadow-lg  transition-all duration-200 hover:bg-none hover:border-white border-2 border-transparent mt-8"
          >
            Login
          </Link>
          <Link
            onClick={() => handleScroll(scrollRef)}
            className="inline-block rounded cursor-pointer px-6 py-2 font-semibold text-white hover:shadow-lg  transition-all duration-200 border-2 hover:border-transparent hover:bg-primary bg-none mt-8 ml-4"
          >
            More Info
          </Link>
        </div>
        <div>
          <img width={1200} src={about} alt="" />
        </div>
      </Container>
    </div>
  );
};

export default About;
