import { Toaster } from "react-hot-toast";
import { Navbar } from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";

export const Main = () => {
  return (
    <div className="h-screen overflow-auto font-sans bg-gradient-to-tl from-indigo-100 from-10% via-[rgba(222,235,236,1)] via-55% to-primary/20">
      <div className="flex">
        <div className="hidden md:block">
          <div className="w-[312px]"></div>
          <Sidebar />
        </div>
        <div className="flex-1">
          <Navbar />
          <Outlet />
        </div>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};
