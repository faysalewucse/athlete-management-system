import { Container } from "../../components/Container";
import Button from "../../components/shared/Button";

export default function Contact() {
  return (
    <div className="md:p-20 bg-gray-100 p-5 text-slate-800 text-center">
      <Container>
        <h1 className="text-4xl font-extrabold text-secondary2">
          Contact With Us
        </h1>
        <div className="max-w-4xl mx-auto mt-5 md:mt-20 flex flex-col md:flex-row gap-5 px-2 md:px-0">
          <form className="w-full">
            <input
              className="w-full p-5 border-0 bg-white rounded mb-5 focus:outline-secondary2"
              placeholder="Your Name"
              type="text"
            />
            <input
              className="w-full p-5 border-0 bg-white rounded mb-5 focus:outline-secondary2"
              placeholder="Your Email"
              type="text"
            />
            <input
              className="w-full p-5 border-0 bg-white rounded mb-5 focus:outline-secondary2"
              placeholder="Subject"
              type="text"
            />
            <textarea
              className="w-full p-5 border-0 bg-white rounded mb-5 focus:outline-secondary2"
              placeholder="Your Message"
              cols="30"
              rows="10"
            ></textarea>
            <Button style={"w-full"} type="submit" text={"Send Message"} />
          </form>
        </div>
      </Container>
    </div>
  );
}
