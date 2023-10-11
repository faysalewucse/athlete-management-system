import avatar from "/avatar.png";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Container } from "../Container";
import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import Brand from "../Brand";
import { Button } from "antd";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";

export const Navbar = () => {
  // const { isDark, toggleDarkMode } = useTheme();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { currentUser, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const location = useLocation();
  console.log(location.pathname);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

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

  const dropdownItems = [
    { route: "/profile", pathName: "Profile" },
    {
      route: "/dashboard",
      pathName: "Dashboard",
      condition: currentUser?.role === "approved" ? true : false,
    },
    { route: "/", pathName: "Settings" },
  ];

  return (
    <div
      className={`fixed top-0 left-0 right-0 p-5 z-10 ${
        isScrolling ||
        location.pathname === "/login" ||
        location.pathname === "/register"
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
                <div className="relative inline-block">
                  <button
                    className="flex items-center justify-center rounded-full bg-gray-200 w-10 h-10 border-2 border-primary"
                    onClick={toggleDropdown}
                  >
                    <img
                      src={
                        currentUser?.photoURL ? currentUser?.photoURL : avatar
                      } // Replace with the path to your avatar image
                      alt="Avatar"
                      className={`w-9 h-9 rounded-full transition-transform object-cover ${
                        isOpen ? "scale-110" : "scale-100"
                      }`}
                    />
                  </button>

                  {/* Dropdown menu */}
                  <div
                    className={`${
                      isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95"
                    } transition-all duration-300 absolute right-0 mt-2 py-2 w-48 bg-white rounded-lg shadow-lg z-10 border border-gray-300`}
                  >
                    {/* Menu items */}
                    {dropdownItems.map((item, index) => (
                      <NavLink
                        to={item.path}
                        key={index}
                        className={`block px-4 py-2 hover:text-primary`}
                      >
                        {item.pathName}
                      </NavLink>
                    ))}

                    <NavLink
                      onClick={logout}
                      className={`block px-4 py-2 text-red-500 hover:text-red-600`}
                    >
                      Log Out
                    </NavLink>
                  </div>
                </div>
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
