import AddAthelete from "../pages/AddAthlete/AddAthlete";
import { Home } from "../pages/Home/Home";
import WelcomePage from "../pages/WelcomePage";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

export const userRouter = [
  {
    path: "/",
    element: (
      <PublicRoute>
        <WelcomePage />
      </PublicRoute>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Home />
      </PrivateRoute>
    ),
  },
  {
    path: "/add-athlete",
    element: <AddAthelete />,
  },
];
