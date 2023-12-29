import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { Container } from "../Container";
import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import Brand from "../Brand";
import { Button } from "antd";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import AvatarDropdown from "../AvatarDropdown";

export const Navbar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { currentUser, logout } = useAuth();
  const [isScrolling, setIsScrolling] = useState(false);
  const location = useLocation();

  const avatarItems = [
    {
      label: (
        <div className="bg-dark/5 py-2 pr-10 pl-2 rounded-md text-left">
          <p className="text-lg font-semibold">
            {currentUser?.firstName}{" "}
            <span className="capitalize">
              (
              {currentUser?.role === "sub_coach"
                ? "Assistant Coach"
                : currentUser?.role}
              )
            </span>
          </p>
          <p className="text-xs">{currentUser?.email}</p>
        </div>
      ),
      key: "0",
      render: true,
    },
    {
      label: <Link to={"/dashboard"}>Dashboard</Link>,
      key: "1",
      render: currentUser ? true : false,
    },
    {
      label: <Link to={"/"}>Home</Link>,
      key: "2",
      render: true,
    },
    {
      label: <Link to={`/profile/${currentUser?._id}`}>Profile</Link>,
      key: "3",
      render: true,
    },
    {
      type: "divider",
    },
    {
      label: <div onClick={logout}>Logout</div>,
      danger: true,
      key: "4",
      render: true,
    },
  ];

  // const toggleSidebar = () => {
  //   setIsSidebarOpen(!isSidebarOpen);
  // };

  const loginBtnHandler = () => {
    setOpen(false);
    navigate("/login");
  };

  // navbar scrolling
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolling(true);
      } else {
        setIsScrolling(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // for login and registration page
  // if () {
  //   setIsScrolling(true);
  // }

  const navItems = [
    { route: "/", pathName: "Home", render: true },
    {
      route: "/dashboard",
      pathName: "Dashboard",
      render: currentUser?.role ? true : false,
    },
  ];

  return (
    <div
      className={`fixed top-0 left-0 right-0 p-5 z-10 ${
        isScrolling || location.pathname !== "/"
          ? "bg-gradient-to-l from-[rgba(32,87,176,0.95)] from-0% via-[rgba(28,58,125,0.95)] via-40% to-[rgba(31,32,84,1)] to-100% py-5"
          : "bg-transparent"
      }`}
    >
      <Container>
        <div className="flex items-center justify-between">
          <Brand white={true} />
          <nav
            className={`flex flex-col md:flex-row md:static absolute ${
              open ? "top-0 h-screen justify-center" : "-top-96"
            } right-0 md:w-fit w-full gap-5 transition-all duration-300 md:h-0 md:gap-10 rounded-b-xl md:rounded-b-none p-5 text-base md:bg-none bg-gradient-to-l from-[rgba(32,87,176,0.95)] from-0% via-[rgba(28,58,125,0.95)] via-40% to-[rgba(31,32,84,1)] to-100% items-center z-20`}
          >
            {navItems
              .filter((item) => item.render)
              .map((item, index) => (
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "font-semibold text-purple-400"
                      : "hover:text-white transition-300 text-white"
                  }
                  to={item.route}
                  onClick={() => setOpen(false)}
                  key={index}
                >
                  {item.pathName}
                </NavLink>
              ))}
            <div className="flex items-center gap-8">
              {/* Dropdown Avatar */}
              {currentUser?.role ? (
                <AvatarDropdown
                  currentUser={currentUser}
                  items={avatarItems.filter((item) => item.render)}
                />
              ) : (
                <Button
                  onClick={loginBtnHandler}
                  type="primary"
                  className="bg-white text-secondary"
                >
                  Login
                </Button>
              )}
            </div>
          </nav>
          <div onClick={() => setOpen(!open)} className="md:hidden text-2xl">
            {open ? (
              <AiOutlineClose className="text-light absolute right-6 top-5 text-3xl z-20" />
            ) : (
              <AiOutlineMenu
                strokeWidth={0}
                className={`text-light text-4xl`}
              />
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};
