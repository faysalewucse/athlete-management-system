import { RxStopwatch } from "react-icons/rx";
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
      <RxStopwatch
        strokeWidth={0.5}
        className={`text-[40px] ${white ? "text-white" : "text-secondary"}`}
      />
      <span style={{ fontFamily: "Luckiest Guy" }} className="tracking-widest">
        VERTIME
      </span>
    </Link>
  );
};

export default Brand;
