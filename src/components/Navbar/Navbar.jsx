import avatar from "/avatar.png";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Dropdown, Modal } from "antd";

import { BiSolidBell } from "react-icons/bi";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";
import SearchField from "../SearchField";

export const Navbar = () => {
  // const [open, setOpen] = useState(false);
  const currentUser = false;
  // const [isOpen, setIsOpen] = useState(false);

  const items = [
    {
      label: <Link to={"/profile"}>Profile</Link>,
      key: "0",
    },
    {
      label: <a href="https://www.aliyun.com">2nd menu item</a>,
      key: "1",
    },
    {
      type: "divider",
    },
    {
      label: <div>Logout</div>,
      danger: true,
      key: "3",
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
    <div className=" flex justify-end p-5 mx-5">
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
        <Dropdown placement="bottomRight" menu={{ items }} trigger={["click"]}>
          <a onClick={(e) => e.preventDefault()}>
            <img
              className="border-2 border-primary rounded-full w-10 cursor-pointer"
              src={currentUser ? currentUser?.photoURL : avatar}
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
  );
};
