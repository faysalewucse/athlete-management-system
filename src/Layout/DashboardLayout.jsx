import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Sidebar from "../pages/Dashboard/Sidebar/Sidebar";
import { Navbar } from "../pages/Dashboard/Navbar";
import { useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";

export const DashboardLayout = () => {
  const { currentUser } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const sideRef = useRef(null);

  // TODO: outside click
  // useEffect(() => {
  //   const handleOutsideClick = (e) => {
  //     console.log(!sideRef.current.contains(e.target));
  //     if (!sideRef.current.contains(e.target)) {
  //       setSidebarOpen(false);
  //     }
  //   };

  //   if (sidebarOpen) {
  //     document.addEventListener("click", handleOutsideClick);
  //   }

  //   return () => {
  //     document.removeEventListener("click", handleOutsideClick);
  //   };
  // }, [sidebarOpen]);

  return (
    <div
      className={`h-screen overflow-auto bg-gradient-to-tl from-indigo-100 from-10% via-[rgba(222,235,236,1)] via-55% to-primary/20 relative `}
    >
      <div className="flex">
        <Sidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          sideRef={sideRef}
        />
        <div
          className={`flex-1 ${
            sidebarOpen ? "filter blur-sm bg-gray-300" : ""
          }`}
        >
          <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <Outlet />
        </div>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};
