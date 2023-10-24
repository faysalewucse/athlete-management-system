import { Dashboard } from "../pages/Dashboard/Dashboard";
import PrivateRoute from "./PrivateRoute";
import { AdminRoute } from "./AdminRoute";
import { Athletes } from "../pages/Dashboard/Athletes";
import { Admins } from "../pages/Dashboard/Admins";
import Coaches from "../pages/Dashboard/Coaches";
import Parents from "../pages/Dashboard/Parents";
import Teams from "../pages/Dashboard/Teams";
import { SuperAdminRoute } from "./SuperAdminRoute";
import { CoachRoute } from "./CoachRoute";
import Events from "../pages/Dashboard/Events";
import { ValidUserRoute } from "./ValidUserRoute";
import Chatting from "../pages/Dashboard/Chatting";
import { AthleteRoute } from "./AthleteRoute";

export const dashboardRouter = [
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
  },
  {
    path: "athletes",
    element: <Athletes />,
  },
  {
    path: "admins",
    element: (
      <SuperAdminRoute>
        <Admins />
      </SuperAdminRoute>
    ),
  },
  {
    path: "coaches",
    element: (
      <AdminRoute>
        <Coaches />
      </AdminRoute>
    ),
  },
  {
    path: "events",
    element: (
      <ValidUserRoute>
        <Events />
      </ValidUserRoute>
    ),
  },
  {
    path: "chatting",
    element: (
      <ValidUserRoute>
        <Chatting />
      </ValidUserRoute>
    ),
  },
  {
    path: "parents",
    element: (
      <CoachRoute>
        <Parents />
      </CoachRoute>
    ),
  },
  {
    path: "teams",
    element: (
      <AthleteRoute>
        <Teams />
      </AthleteRoute>
    ),
  },
];
