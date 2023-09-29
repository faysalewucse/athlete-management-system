import { Navbar } from "../components/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";

export const MainLayout = () => {
  return (
    <div>
      <Navbar />
      <div className="min-h-[90vh] dark:bg-slate-900">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};
