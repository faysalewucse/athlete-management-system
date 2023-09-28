import { Outlet } from "react-router-dom";
import Brand from "../components/Brand";

export const Main = () => {
  return (
    <div className="h-screen overflow-auto font-sans bg-gradient-to-tl from-indigo-100 from-10% via-[rgba(222,235,236,1)] via-55% to-primary/20">
      <Outlet />
    </div>
  );
};
