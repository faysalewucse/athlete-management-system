import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { Container } from "../Container";
import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import Brand from "../Brand";
import { Button } from "antd";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import AvatarDropdown from "../AvatarDropdown";

export const Navbar = () => {
  // const { isDark, toggleDarkMode } = useTheme();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { currentUser, logout } = useAuth();
  const [isScrolling, setIsScrolling] = useState(false);
  const location = useLocation();
  console.log(location.pathname);

  const avatarItems = [
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
    { route: "/", pathName: "Home" },
    {
      route: "/dashboard",
      pathName: "Dashboard",
      condition: currentUser?.role === "approved" ? true : false,
    },
  ];

  return (
    <div
      className={`fixed top-0 left-0 right-0 p-5 z-10 ${
        isScrolling || location.pathname != "/"
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
            {navItems.map((item, index) => (
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "font-semibold text-purple-400"
                    : "hover:text-primary text-white"
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
              {currentUser ? (
                <AvatarDropdown currentUser={currentUser} items={avatarItems} />
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
              <AiOutlineMenu strokeWidth={0} className={`text-4xl`} />
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};
