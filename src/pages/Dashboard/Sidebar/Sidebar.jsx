import { HiSquares2X2 } from "react-icons/hi2";
import { FaChalkboardTeacher, FaUsers } from "react-icons/fa";
import { MdClose, MdEvent } from "react-icons/md";
import { RiAdminLine, RiParentLine } from "react-icons/ri";
import { PiMicrosoftTeamsLogoFill } from "react-icons/pi";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import Brand from "../../../components/Brand";
import { CgMiniPlayer } from "react-icons/cg";
import { BiChat } from "react-icons/bi";

const Sidebar = ({ sidebarOpen, setSidebarOpen, sideRef }) => {
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
        label: "Parents",
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
      {
        key: 3,
        label: "Coaches",
        route: "coaches",
        icon: <FaChalkboardTeacher />,
      },
      {
        key: 4,
        label: "Parents",
        route: "parents",
        icon: <RiParentLine />,
      },
      {
        key: 5,
        label: "Teams",
        route: "teams",
        icon: <PiMicrosoftTeamsLogoFill />,
      },
      {
        key: 6,
        label: "Events",
        route: "events",
        icon: <MdEvent />,
      },
      {
        key: 7,
        label: "Chatting",
        route: "chatting",
        icon: <BiChat />,
      },
    ],
    coach: [
      {
        key: 1,
        label: "Athletes",
        route: "athletes",
        icon: <FaUsers />,
      },
      {
        key: 4,
        label: "Parents",
        route: "parents",
        icon: <RiParentLine />,
      },
      {
        key: 5,
        label: "Teams",
        route: "teams",
        icon: <PiMicrosoftTeamsLogoFill />,
      },
      {
        key: 6,
        label: "Events",
        route: "events",
        icon: <MdEvent />,
      },
    ],
    athlete: [
      {
        key: 1,
        label: "Teams",
        route: "teams",
        icon: <PiMicrosoftTeamsLogoFill />,
      },
      {
        key: 2,
        label: "Events",
        route: "events",
        icon: <MdEvent />,
      },
    ],
  };

  let items = [...sidebarItems["general"]];

  if (currentUser?.status !== "pending" && sidebarItems[currentUser?.role]) {
    items = [...items, ...sidebarItems[currentUser?.role]];
  }

  const currentPath = useLocation();

  return (
    <aside
      ref={sideRef}
      className={`md:block ${
        sidebarOpen ? "absolute bg-white z-50" : "hidden"
      } bg-white shadow-[0_3px_20px_0px_rgba(0,0,0,0.12)]  border-primary/25 border-opacity-50 min-h-screen overscroll-auto `}
    >
      <div className="border-b px-3 lg:px-10 md:px-5 py-5 bg-[rgba(31,32,84,1)]">
        <Brand white />
      </div>
      <div
        onClick={() => setSidebarOpen(false)}
        className="absolute bg-dark text-white p-2 rounded-r text-2xl -right-10 top-0 md:hidden"
      >
        <MdClose />
      </div>
      <div className="mt-10 flex flex-col gap-5 px-3 lg:px-10 md:px-5 pb-10">
        {items?.map((item) => (
          <div key={item.key}>
            <Link
              className={`flex items-center gap-4 p-3 text-lg font-medium hover:bg-primary transition-300 rounded-xl hover:text-white text-primary ${
                currentPath.pathname.endsWith(item.route)
                  ? "bg-gradient text-white"
                  : ""
              }`}
              to={item.route}
              onClick={() => setSidebarOpen(false)}
            >
              {item.icon} {item.label}
            </Link>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
