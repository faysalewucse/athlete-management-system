import aboutBg from "../../assets/about-bg.jpg";
import about from "../../assets/about.svg";
import { Container } from "../../components/Container";
import Button from "../../components/shared/Button";

const About = () => {
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
          <Button
            text={"Join Now"}
            style={
              "hover:bg-none hover:border-white border-2 border-transparent mt-8"
            }
          />
          <Button
            text={"View Details"}
            style={
              "border-2 hover:border-transparent hover:bg-primary bg-none mt-8 ml-4"
            }
          />
        </div>
        <div>
          <img width={1200} src={about} alt="" />
        </div>
      </Container>
    </div>
  );
};

export default About;
