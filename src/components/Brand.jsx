// import { BiSolidStopwatch } from "react-icons/bi";
import { Link } from "react-router-dom";
import brand from "/brandLogo.png";
import brandDark from "/brandLogoDark.png";

const Brand = ({ white = false, dark = false }) => {
  return (
    <Link
      to="/"
      className={`flex gap-1 items-center ${
        white
          ? "text-white"
          : "text-transparent bg-clip-text bg-gradient-to-r to-primary from-secondary"
      } text-4xl`}
    >
      {/* <BiSolidStopwatch
        strokeWidth={0.5}
        className={`text-[40px] ${white ? "text-white" : "text-secondary"}`}
      />
      <span className="font-bold mt-1">VERTIME</span> */}
      <img src={dark ? brandDark : brand} className="w-60" alt="logo_brand" />
    </Link>
  );
};

export default Brand;
