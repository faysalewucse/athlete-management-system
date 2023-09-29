import { ImFacebook2, ImWhatsapp, ImTwitter } from "react-icons/im";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Brand from "./Brand";

export default function Footer() {
  const { currentUser, logout } = useAuth();
  // const { isDark } = useTheme();
  return (
    <footer className="bg-white p-5 md:p-24 md:text-left text-center">
      <div className="md:flex gap-10 max-w-7xl mx-auto">
        <div className="basis-1/2 md:text-justify text-center">
          <Brand />
          <p className="text-secondary2 my-5">
            Our martial arts academy is not just a place to learn self-defense
            techniques; it&apos;s a sanctuary where you can unleash your
            potential, build unwavering confidence, and cultivate the values of
            discipline, respect, and perseverance
          </p>
          <div className="flex items-center justify-center md:justify-start text-2xl gap-3 cursor-pointer">
            <ImFacebook2 />
            <ImWhatsapp />
            <ImTwitter />
          </div>
        </div>
        <div className="basis-1/4 mt-5 md:mt-0">
          <h1 className="font-bold text-2xl font-display mb-2 md:mb-8">
            Usefull Link
          </h1>
          <ul className="flex flex-col gap-3">
            <Link className="hover:text-secondary" to="/">
              Home
            </Link>
            <Link className="hover:text-secondary" to="/blog">
              Blog
            </Link>
            <Link className="hover:text-secondary" to="/alltoys">
              Instructors
            </Link>
            {currentUser && (
              <Link className="hover:text-secondary" to="/mytoys">
                Dashboard
              </Link>
            )}
            {currentUser && (
              <Link className="hover:text-secondary" onClick={() => logout()}>
                Logout
              </Link>
            )}
          </ul>
        </div>
        <div className="basis-1/3 mt-5 md:mt-0">
          <h1 className="font-bold text-2xl font-display mb-8">Contact Now</h1>
          <p className="text-secondary">
            10 Shantinagar, Gulshan, Dhaka 1212, Bangladesh
          </p>
          <p className="mt-5">+880 175-1234567</p>
          <p className="text-secondary">+880 175-7654321</p>
          <p className="mt-5">faysal.ewucse@gmail.com</p>
          <p className="text-secondary">faysal65438@gmail.com</p>
        </div>
        <div className="grow mt-5 md:mt-0">
          <h1 className="font-bold text-2xl font-display mb-8">Subscribe</h1>
          <p className="my-5">
            Subscribe for our latest & Articles. We Won’t Give You Spam Mails
          </p>
          <form>
            <input
              className="w-full border-0 rounded py-2 px-4 focus:outline-none font-bold dark:bg-white dark:placeholder-gray-400 bg-slate-900 placeholder-gray-200"
              type="text"
              placeholder="Email Address"
            />

            <input
              className="bg-secondary hover:bg-primary transition-all duration-300 text-white py-2 px-6 rounded mt-5"
              type="submit"
              value="Send"
            />
          </form>
        </div>
      </div>
      <hr className="border border-gray-200 my-5" />
      <div className="flex justify-between">
        <h1 className="text-secondary">
          &copy; 2023{" "}
          <span className="dark:text-white text-black font-bold">
            Overtime.
          </span>{" "}
          All Rights Reserved
        </h1>
        <h1 className="text-secondary">
          Powered by <b className="dark:text-white text-black">ArtifConnect</b>
        </h1>
      </div>
    </footer>
  );
}
