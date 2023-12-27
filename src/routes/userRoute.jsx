import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";
import { Home } from "../pages/Home/Home";
import { Login } from "../pages/Login";
import { Register } from "../pages/Register";
import UserProfile from "../pages/UserProfile";

import { SocialRegister } from "../pages/SocialRegister";
import SocialAuthRoute from "./SocialAuthRoute";
import { ResetPassword } from "../pages/ResetPassword";

export const userRouter = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: (
      // <PublicRoute>
      <Login />
      // </PublicRoute>
    ),
  },
  {
    path: "/reset-password",
    element: (
      <PublicRoute>
        <ResetPassword />
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
    path: "/social-register",
    element: (
      <SocialAuthRoute>
        <SocialRegister />
      </SocialAuthRoute>
    ),
  },
  {
    path: "/profile/:userId",
    element: (
      <PrivateRoute>
        <UserProfile />
      </PrivateRoute>
    ),
  },
];
