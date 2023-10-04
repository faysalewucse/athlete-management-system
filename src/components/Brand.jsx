import { RxStopwatch } from "react-icons/rx";
import { Link } from "react-router-dom";

const Brand = () => {
  return (
    <Link
      to="/"
      className="flex gap-1 items-center text-transparent bg-clip-text bg-gradient-to-r to-primary from-secondary font-bold text-4xl"
    >
      <RxStopwatch strokeWidth={0.5} className={"text-[40px] text-secondary"} />
      <span
        style={{ fontFamily: "Luckiest Guy" }}
        className="mt-2 tracking-widest"
      >
        VERTIME
      </span>
    </Link>
  );
};

export default Brand;
