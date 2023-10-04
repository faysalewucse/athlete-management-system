import { MdAccessTime, MdCall, MdEmail, MdLocationOn } from "react-icons/md";
import { Container } from "../../components/Container";
import Button from "../../components/shared/Button";

export default function Contact() {
  return (
    <div className="md:p-20 bg-gray-100 p-5 text-slate-800 text-center">
      <Container>
        <h1 className="text-4xl font-extrabold text-secondary2">
          Contact With Us
        </h1>

        <div className="mt-5 md:mt-20 flex flex-col md:flex-row gap-5 px-2 md:px-0">
          <div className="w-full left-form grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-0">
            <div className="px-18 py-16 border-r-2 border-b-2 border-primary">
              <MdLocationOn className="text-5xl mx-auto" />
              <h1 className="font-bold text-2xl text-secondary2 my-2">
                Address
              </h1>
              <p className="mx-2">A108 Adam Street, New York, NY 535022</p>
            </div>
            <div className="px-18 py-16 border-b-2 border-primary">
              <MdCall className="text-5xl mx-auto" />
              <h1 className="font-bold text-2xl text-secondary2 my-2">
                Call Us
              </h1>
              <p>+88 01750 00 00 00</p>
              <p>+88 01750 00 00 00</p>
            </div>
            <div className="px-18 py-16 border-r-2 border-primary">
              <MdEmail className="text-5xl mx-auto" />
              <h1 className="font-bold text-2xl text-secondary2 my-2">
                Email Us
              </h1>
              <p>faysal.ewucse@gmail.com</p>
              <p>faysal65438@gmail.com</p>
            </div>
            <div className="px-18 py-16">
              <MdAccessTime className="text-5xl mx-auto" />
              <h1 className="font-bold text-2xl text-secondary2 my-2">
                Working Hours
              </h1>
              <p>Mon-Fri: 9AM to 5PM</p>
              <p>Sunday: 9AM to 1 PM</p>
            </div>
          </div>
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
