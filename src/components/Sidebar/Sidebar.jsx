import { HiSquares2X2 } from "react-icons/hi2";
import { FaUsers } from "react-icons/fa";
import { BsFillChatDotsFill } from "react-icons/bs";
import { MdCalendarMonth } from "react-icons/md";
import { RiArrowLeftRightFill } from "react-icons/ri";
import { BiChart, BiSolidBarChartSquare } from "react-icons/bi";
import { RxStopwatch } from "react-icons/rx";
import { Link } from "react-router-dom";

const items = [
  {
    key: 1,
    label: "Dashboard",
    icon: <HiSquares2X2 />,
  },
  {
    key: 2,
    label: "Squad",
    icon: <FaUsers />,
  },
  {
    key: 3,
    label: "Messenger",
    icon: <BsFillChatDotsFill />,
  },
  {
    key: 4,
    label: "Statistic",
    icon: <BiSolidBarChartSquare />,
  },
  {
    key: 5,
    label: "Calender",
    icon: <MdCalendarMonth />,
  },
];

const Sidebar = () => {
  return (
    <aside className="border-r-2 border-primary/25 border-opacity-50 sticky h-screen overscroll-y-auto p-10">
      <h2 className="flex gap-1 mb-10 items-center text-primary text-4xl font-bold">
        <RxStopwatch className="text-5xl" />
        <span className="mt-1 tracking-widest">VERTIME</span>
      </h2>
      <div className="flex flex-col gap-5">
        {items.map((item) => (
          <div key={item.key}>
            <Link
              to={"/"}
              className="flex items-center gap-4 p-4 text-xl font-medium hover:bg-primary transition-300 rounded-xl hover:text-white text-primary"
            >
              {item.icon} {item.label}
            </Link>
          </div>
        ))}
        <div className="border-t-2 border-primary/25 border-opacity-50 mx-4"></div>
        <div className="flex flex-col gap-5">
          <Link
            to={"/"}
            className="flex items-center gap-4 p-4 text-xl font-medium hover:bg-primary transition-300 rounded-xl hover:text-white text-primary"
          >
            <RiArrowLeftRightFill />
            Transfer
          </Link>
          <Link
            to={"/"}
            className="flex items-center gap-4 p-4 text-xl font-medium hover:bg-primary transition-300 rounded-xl hover:text-white text-primary"
          >
            <BiChart />
            Youth academy
          </Link>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
