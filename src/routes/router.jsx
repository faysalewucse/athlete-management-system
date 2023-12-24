import { createBrowserRouter } from "react-router-dom";
import { MainLayout } from "../Layout/MainLayout";
import { userRouter } from "./userRoute";
import { DashboardLayout } from "../Layout/DashboardLayout";
import { dashboardRouter } from "./dashboardRouter";
import Error404 from "../pages/Error404";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <Error404 />,
    children: userRouter,
  },
  {
    path: "dashboard",
    element: <DashboardLayout />,
    children: dashboardRouter,
    errorElement: <Error404 />,
  },
]);
