import { Navbar } from "../components/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";

export const Main = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
};
