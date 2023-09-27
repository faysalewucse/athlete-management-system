import AddAthelete from "../pages/AddAthlete/AddAthlete";
import { Home } from "../pages/Home/Home";

export const userRouter = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/add-athlete",
    element: <AddAthelete />,
  },
];
