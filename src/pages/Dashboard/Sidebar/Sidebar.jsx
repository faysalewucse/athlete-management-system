import { HiSquares2X2 } from "react-icons/hi2";
import { FaChalkboardTeacher, FaUsers } from "react-icons/fa";
import { BsFillChatDotsFill } from "react-icons/bs";
import { MdCalendarMonth, MdClose } from "react-icons/md";
import {
  RiAdminLine,
  RiArrowLeftRightFill,
  RiParentLine,
} from "react-icons/ri";
import { BiChart, BiSolidBarChartSquare } from "react-icons/bi";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import Brand from "../../../components/Brand";
import { CgMiniPlayer } from "react-icons/cg";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const { currentUser } = useAuth();

  const sidebarItems = {
    general: [
      {
        key: 0,
        label: "Dashboard",
        route: "/dashboard",
        icon: <HiSquares2X2 />,
      },
    ],
    sadmin: [
      {
        key: 1,
        label: "Admins",
        route: "admins",
        icon: <RiAdminLine />,
      },
      {
        key: 2,
        label: "Coaches",
        route: "coaches",
        icon: <FaChalkboardTeacher />,
      },
      {
        key: 3,
        label: "Athletes",
        route: "athletes",
        icon: <CgMiniPlayer />,
      },
      {
        key: 4,
        label: "Parennts",
        route: "parents",
        icon: <RiParentLine />,
      },
    ],

    admin: [
      {
        key: 2,
        label: "Athletes",
        route: "athletes",
        icon: <FaUsers />,
      },
    ],
  };

  let items = [...sidebarItems["general"]];

  if (sidebarItems[currentUser?.role]) {
    items = [...items, ...sidebarItems[currentUser?.role]];
  }

  const currentPath = useLocation();

  return (
    <aside
      className={`md:block hidden border-r-2 border-primary/25 border-opacity-50 h-screen overscroll-y-auto p-10`}
    >
      <Brand />
      <div
        onClick={() => setSidebarOpen(false)}
        className="absolute bg-dark text-white p-2 rounded-r text-2xl -right-10 top-0 md:hidden"
      >
        <MdClose />
      </div>
      <div className="mt-10 flex flex-col gap-5">
        {items?.map((item) => (
          <div key={item.key}>
            <Link
              className={`flex items-center gap-4 p-3 text-lg font-medium hover:bg-primary transition-300 rounded-xl hover:text-white text-primary ${
                currentPath.pathname === item.route
                  ? "bg-gradient text-white"
                  : ""
              }`}
              to={item.route}
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
