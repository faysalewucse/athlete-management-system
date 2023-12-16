import { HiSquares2X2 } from "react-icons/hi2";
import { FaChalkboardTeacher, FaUsers } from "react-icons/fa";
import { MdClose, MdEvent } from "react-icons/md";
import { RiAdminLine, RiOrganizationChart, RiParentLine } from "react-icons/ri";
import { PiMicrosoftTeamsLogoFill } from "react-icons/pi";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import Brand from "../../../components/Brand";
import { CgMiniPlayer } from "react-icons/cg";
import { BiChat, BiTask } from "react-icons/bi";

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
      {
        key: 5,
        label: "Teams",
        route: "teams",
        icon: <PiMicrosoftTeamsLogoFill />,
      },
      {
        key: 6,
        label: "Organizations",
        route: "organizations",
        icon: <RiOrganizationChart />,
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
        key: 9,
        label: "Sub Coaches",
        route: "sub-coaches",
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
        key: 8,
        label: "Planners",
        route: "planners",
        icon: <BiTask />,
      },
      // {
      //   key: 9,
      //   label: "Trip Planners",
      //   route: "trip",
      //   icon: <TbMap2 />,
      // },
      {
        key: 7,
        label: "Chatting",
        route: "chatting",
        icon: <BiChat />,
      },
    ],
    coach: [
      {
        key: 0,
        label: "Sub Coaches",
        route: "sub-coaches",
        icon: <FaChalkboardTeacher />,
      },
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
      {
        key: 8,
        label: "Planners",
        route: "planners",
        icon: <BiTask />,
      },
      // {
      //   key: 9,
      //   label: "Trip Planners",
      //   route: "trip",
      //   icon: <TbMap2 />,
      // },
      {
        key: 7,
        label: "Chatting",
        route: "chatting",
        icon: <BiChat />,
      },
    ],
    sub_coach: [
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
      {
        key: 8,
        label: "Planners",
        route: "planners",
        icon: <BiTask />,
      },
      // {
      //   key: 9,
      //   label: "Trip Planners",
      //   route: "trip",
      //   icon: <TbMap2 />,
      // },
      {
        key: 7,
        label: "Chatting",
        route: "chatting",
        icon: <BiChat />,
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
      {
        key: 8,
        label: "Planners",
        route: "planners",
        icon: <BiTask />,
      },
      // {
      //   key: 9,
      //   label: "Trip Planners",
      //   route: "trip",
      //   icon: <TbMap2 />,
      // },
      {
        key: 7,
        label: "Chatting",
        route: "chatting",
        icon: <BiChat />,
      },
    ],
    parents: [
      {
        key: 1,
        label: "Athletes",
        route: "athletes",
        icon: <FaUsers />,
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
      className={`md:block lg:w-72 md:w-52 ${
        sidebarOpen ? "fixed bg-white z-50" : "hidden"
      } bg-white shadow border-r border-primary/25 border-opacity-50 min-h-screen overscroll-auto `}
    >
      <div className="px-3 lg:px-10 md:px-5 py-5">
        <Brand dark />
      </div>
      <div
        onClick={() => setSidebarOpen(false)}
        className="absolute bg-dark text-white p-2 rounded-r text-2xl -right-10 top-0 md:hidden"
      >
        <MdClose />
      </div>
      <div className="mt-10 flex flex-col gap-2 px-3 lg:px-10 md:px-5 pb-10">
        {items?.map((item) => (
          <div key={item.key}>
            <Link
              className={`flex items-center gap-4 p-3 text-md font-medium hover:bg-primary transition-300 rounded-xl hover:text-white text-primary ${
                currentPath.pathname.split("/").pop() === item.route ||
                `/${currentPath.pathname.split("/").pop()}` === item.route
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
