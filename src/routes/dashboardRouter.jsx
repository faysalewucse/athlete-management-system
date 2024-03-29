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
import Planner from "../pages/Dashboard/Planner";
import TripPlanner from "../pages/Dashboard/TripPlanner";
import Organizations from "../pages/Dashboard/Organizations";

import FormLib from "../pages/Dashboard/Form";
import FormLibrary from "../pages/Dashboard/FormLibrary";
import CustomForm from "../pages/Dashboard/CustomForm";
import Forms from "../pages/Dashboard/Forms";
import AssistantCoaches from "../pages/Dashboard/AssistantCoaches";

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
    path: "organizations",
    element: (
      <SuperAdminRoute>
        <Organizations />
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
    path: "assistant-coaches",
    element: (
      <CoachRoute>
        <AssistantCoaches />
      </CoachRoute>
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
    path: "form-library",
    element: (
      <ValidUserRoute>
        {/* <FormLib /> */}
        <FormLibrary />
      </ValidUserRoute>
    ),
  },
  {
    path: "form-library/custom-form",
    element: (
      <ValidUserRoute>
        <CustomForm />
      </ValidUserRoute>
    ),
  },
  {
    path: "forms",
    element: (
      <ValidUserRoute>
        <Forms />
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
  {
    path: "planners",
    element: (
      <ValidUserRoute>
        <Planner />
      </ValidUserRoute>
    ),
  },
  {
    path: "trip",
    element: (
      <ValidUserRoute>
        <TripPlanner />
      </ValidUserRoute>
    ),
  },
];
