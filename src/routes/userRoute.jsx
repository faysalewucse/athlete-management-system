import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";
import { Home } from "../pages/Home/Home";
import { Login } from "../pages/Login";
import { Register } from "../pages/Register";
import UserProfile from "../pages/UserProfile";

export const userRouter = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: (
      <PublicRoute>
        <Login />
      </PublicRoute>
    ),
  },
  {
    path: "/register",
    element: (
      <PublicRoute>
        <Register />
      </PublicRoute>
    ),
  },
  {
    path: "/profile",
    element: (
      <PrivateRoute>
        <UserProfile />
      </PrivateRoute>
    ),
  },
];
