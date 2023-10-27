import { BiSolidStopwatch } from "react-icons/bi";
import { Link } from "react-router-dom";

const Brand = ({ white = false }) => {
  return (
    <Link
      to="/"
      className={`flex gap-1 items-center ${
        white
          ? "text-white"
          : "text-transparent bg-clip-text bg-gradient-to-r to-primary from-secondary"
      } text-4xl`}
    >
      <BiSolidStopwatch
        strokeWidth={0.5}
        className={`text-[40px] ${white ? "text-white" : "text-secondary"}`}
      />
      <span className="font-bold mt-1">VERTIME</span>
    </Link>
  );
};

export default Brand;
