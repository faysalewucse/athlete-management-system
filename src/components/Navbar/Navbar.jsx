import avatar from "/avatar.png";
import { Link, useNavigate } from "react-router-dom";
import { Container } from "../Container";
import { SlClose, SlMenu } from "react-icons/sl";
import { useState } from "react";
import { Dropdown } from "antd";
import { MdNotifications, MdSearch } from "react-icons/md";

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const currentUser = false;
  const [isOpen, setIsOpen] = useState(false);

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

  return (
    <div className="p-5 dark:bg-slate-950">
      <div className="flex items-center justify-between">
        <nav className={`flex items-center gap-5 justify-end w-full`}>
          <MdSearch className="text-primary text-3xl" />
          <Dropdown
            className="cursor-pointer"
            menu={{ items }}
            trigger={["click"]}
            placement="bottomRight"
          >
            <a onClick={(e) => e.preventDefault()}>
              <MdNotifications className="text-3xl text-primary" />
            </a>
          </Dropdown>
          <Dropdown menu={{ items }} trigger={["click"]}>
            <a onClick={(e) => e.preventDefault()}>
              <img
                className="w-8 cursor-pointer"
                src={currentUser ? currentUser?.photoURL : avatar}
                alt="avatar"
              />
            </a>
          </Dropdown>
        </nav>
        <div onClick={() => setOpen(!open)} className="md:hidden text-2xl">
          {open ? (
            <SlClose className="absolute right-6 top-9 text-3xl z-20" />
          ) : (
            <SlMenu className="text-black text-xl" />
          )}
        </div>
      </div>
    </div>
  );
};
