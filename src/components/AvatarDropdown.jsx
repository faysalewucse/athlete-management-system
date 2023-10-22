import { Dropdown } from "antd";
import avatar from "/avatar.png";

const AvatarDropdown = ({ items, currentUser }) => {
  return (
    <Dropdown placement="bottomRight" menu={{ items }} trigger={["click"]}>
      <a onClick={(e) => e.preventDefault()}>
        <img
          className="border-2 border-primary rounded-full w-10 h-10 cursor-pointer"
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
