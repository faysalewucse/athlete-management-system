import { Link } from "react-router-dom";
import { useState } from "react";
import { Modal } from "antd";
import { BiSolidBell } from "react-icons/bi";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";
import SearchField from "../../components/SearchField";
import { MdDashboard } from "react-icons/md";
import { useAuth } from "../../contexts/AuthContext";
import AvatarDropdown from "../../components/AvatarDropdown";
import toast from "react-hot-toast";

export const Navbar = ({ setSidebarOpen }) => {
  // const [open, setOpen] = useState(false);
  const { currentUser, logout } = useAuth();
  // const [isOpen, setIsOpen] = useState(false);

  const logoutHandler = () => {
    logout();
    toast.success("Logged out Successfully");
  };

  const avatarItems = [
    {
      label: (
        <div className="bg-dark/5 py-2 pr-10 pl-2 rounded-md text-left">
          <p className="text-lg font-semibold">
            {currentUser?.name}{" "}
            <span className="capitalize">({currentUser?.role})</span>
          </p>
          <p className="text-xs">{currentUser?.email}</p>
        </div>
      ),
      key: "0",
    },
    {
      label: <Link to={"/dashboard"}>Dashboard</Link>,
      key: "1",
    },
    {
      label: <Link to={"/"}>Home</Link>,
      key: "2",
    },
    {
      label: <Link to={"/profile"}>Profile</Link>,
      key: "3",
    },
    {
      type: "divider",
    },
    {
      label: <div onClick={logoutHandler}>Logout</div>,
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
      <div className="flex items-center justify-between p-2 md:p-5 ">
        <div className="flex items-center gap-3">
          <MdDashboard
            onClick={() => setSidebarOpen(true)}
            className="md:hidden text-4xl text-primary"
          />
          <div>
            {currentUser?.role === "admin" && (
              <p className="font-bold text-xl">{currentUser?.institute}</p>
            )}
          </div>
        </div>
        {/* user info */}
        <div className="flex items-center gap-5">
          <HiMiniMagnifyingGlass
            onClick={showModal}
            size={20}
            className="text-primary cursor-pointer"
          />

          <BiSolidBell className="text-3xl text-primary" />

          <AvatarDropdown currentUser={currentUser} items={avatarItems} />
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
