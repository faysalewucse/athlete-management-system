import { Dropdown } from "antd";
import avatar from "/avatar.png";

const AvatarDropdown = ({ items, currentUser }) => {
  return (
    <Dropdown placement="bottomRight" menu={{ items }} trigger={["click"]}>
      <a onClick={(e) => e.preventDefault()}>
        <img
          className="border-2 border-primary rounded-full md:w-10 md:h-10 w-6 h-6 cursor-pointer"
          src={
            currentUser
              ? currentUser?.photoURL
                ? currentUser?.photoURL
                : avatar
              : avatar
          }
          alt="avatar"
        />
      </a>
    </Dropdown>
  );
};

export default AvatarDropdown;
