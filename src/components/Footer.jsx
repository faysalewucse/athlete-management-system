import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import shape from "../assets/footer-top-shape.png";

export default function Footer() {
  const { currentUser, logout } = useAuth();
  // const { isDark } = useTheme();
  return (
    <footer className="relative bg-gradient-2 md:text-left text-center text-white">
      <div className=" flex flex-col md:flex-row justify-between max-w-7xl mx-auto pt-16 md:pt-24 z-10">
        {/* news letter */}
        <div className="md:pr-16 px-10 md:px-0 mb-5 md:mb-0">
          <h1 className="font-semibold text-2xl font-display mb-3">
            Newsletter
          </h1>
          <p className="text-gray-300 font-light tracking-wider mb-4">
            Subscribe for our latest & Articles. We Won’t Give <br /> You Spam
            Mails
          </p>
          <form className="relative">
            <input
              className="w-full border py-2 px-4 focus:outline-none text-primary dark:bg-white dark:placeholder-gray-400 bg-slate-900 placeholder-gray-200"
              type="text"
              placeholder="Email Address"
            />

            <input
              className=" absolute -top-[17px] right-1 bg-[#2F3483] hover:bg-primary transition-all duration-300 text-white py-[6px] px-6 mt-5 z-10"
              type="submit"
              value="Send"
            />
          </form>
        </div>
        {/* others */}
        <div className="grid grid-cols-2 md:grid-cols-2 justify-items-start gap-x-10 gap-y-3">
          <div className="mt-5 md:mt-0">
            <ul className="flex flex-col font-light underline text-gray-300">
              <Link className="hover:text-secondary" to="/">
                Home
              </Link>
              <Link className="hover:text-secondary" to="/">
                Dashboard
              </Link>
              <Link className="hover:text-secondary" to="/">
                Profile
              </Link>
              <Link className="hover:text-secondary" to="/">
                Blog
              </Link>
            </ul>
          </div>
          <div className="mt-5 md:mt-0">
            <ul className="flex flex-col font-light underline text-gray-300">
              <Link className="hover:text-secondary" to="/">
                Facebook
              </Link>
              <Link className="hover:text-secondary" to="/blog">
                Instagram
              </Link>
              <Link className="hover:text-secondary" to="/alltoys">
                Medium
              </Link>
              <Link className="hover:text-secondary" to="/alltoys">
                Twitter
              </Link>
            </ul>
          </div>

          <div className="mt-5 md:mt-0">
            <h1 className="md:mb-1">Contact</h1>

            <p className="text-gray-300 font-light">
              joseph@bartholomewdevelopment.com
            </p>
          </div>
        </div>
      </div>
      <hr className="border-t border-gray-500 mt-10" />
      <div className="flex flex-col md:flex-row justify-between  text-[14px] md:px-24 py-5 z-10">
        <h1 className="">
          &copy; 2023 <span className=" font-semibold underline">Overtime</span>
          . All Rights Reserved
        </h1>
        <h1 className="">
          Powered by <a className="underline font-semibold">ArtifConnect</a>
        </h1>
      </div>
      <div className="absolute -top-1 ">
        <img className="w-full" src={shape} alt="" />
      </div>
    </footer>
  );
}
