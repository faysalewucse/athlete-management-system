import avatar from "/avatar.png";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Dropdown, Modal } from "antd";

import { BiSolidBell } from "react-icons/bi";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";
import SearchField from "../../components/SearchField";
import { MdDashboard } from "react-icons/md";
import { useAuth } from "../../contexts/AuthContext";

export const Navbar = ({ setSidebarOpen }) => {
  // const [open, setOpen] = useState(false);
  const { currentUser, logout } = useAuth();
  // const [isOpen, setIsOpen] = useState(false);

  const items = [
    {
      label: <Link to={"/"}>Home</Link>,
      key: "1",
    },
    {
      label: <Link to={"/profile"}>Profile</Link>,
      key: "2",
    },
    {
      label: <a href="https://www.aliyun.com">2nd menu item</a>,
      key: "3",
    },
    {
      type: "divider",
    },
    {
      label: <div onClick={logout}>Logout</div>,
      danger: true,
      key: "4",
    },
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="z-10 sticky top-0">
      <div className="flex bg-transparent items-center md:justify-end justify-between p-5">
        <MdDashboard
          onClick={() => setSidebarOpen(true)}
          className="md:hidden text-4xl text-primary"
        />

        <div></div>
        {/* user info */}
        <div className="flex items-center gap-5">
          <HiMiniMagnifyingGlass
            onClick={showModal}
            size={20}
            className="text-primary cursor-pointer"
          />
          <Dropdown
            className="cursor-pointer"
            menu={{ items }}
            trigger={["click"]}
            placement="bottomRight"
          >
            <a onClick={(e) => e.preventDefault()}>
              <BiSolidBell className="text-3xl text-primary" />
            </a>
          </Dropdown>
          <Dropdown
            placement="bottomRight"
            menu={{ items }}
            trigger={["click"]}
          >
            <a onClick={(e) => e.preventDefault()}>
              <img
                className="border-2 border-primary rounded-full w-10 cursor-pointer"
                src={
                  currentUser
                    ? currentUser?.photoURL !== ""
                      ? currentUser?.photoURL
                      : avatar
                    : avatar
                }
                alt="avatar"
              />
            </a>
          </Dropdown>
        </div>
        <Modal
          title="Search"
          open={isModalOpen}
          onCancel={handleCancel}
          footer={null}
          maskClosable={false}
        >
          <SearchField size="large" />
        </Modal>
      </div>
    </div>
  );
};
