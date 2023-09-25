import brand from "/brand.png";

import { HiSquares2X2 } from "react-icons/hi2";
import { FaUsers } from "react-icons/fa";
import { BsFillChatDotsFill } from "react-icons/bs";
import { MdCalendarMonth } from "react-icons/md";
import { ImPieChart } from "react-icons/im";

const Sidebar = () => {
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
      icon: <ImPieChart />,
    },
    {
      key: 5,
      label: "Calender",
      icon: <MdCalendarMonth />,
    },
  ];

  return (
    <aside className="p-10 border-r border-primary border-opacity-50 sticky h-screen overscroll-y-auto">
      <img className="w-40 mx-auto mb-20" src={brand} alt="brand" />
      <div className="flex flex-col gap-5">
        {items.map((item) => (
          <div key={item.key}>
            <a
              className="flex items-center gap-4 text-xl font-medium text-primary hover:text-white hover:bg-primary transition-500 py-3 px-5 rounded-2xl"
              href={`/${item.label}`}
            >
              <i className="text-2xl">{item.icon}</i> {item.label}
            </a>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
