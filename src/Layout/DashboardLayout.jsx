import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Sidebar from "../pages/Dashboard/Sidebar/Sidebar";
import { Navbar } from "../pages/Dashboard/Navbar";
import { useState } from "react";

export const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="h-screen bg-gradient-to-tl from-indigo-100 from-10% via-[rgba(222,235,236,1)] via-55% to-primary/20">
      <div className="flex">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="flex-1">
          <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <Outlet />
        </div>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};
