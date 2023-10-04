import { AddClass } from "../pages/Dashboard/AddClass";
import { MyClasses } from "../pages/Dashboard/MyClasses";
import { Dashboard } from "../pages/Dashboard/Dashboard";
import { Payments } from "../pages/Dashboard/Payments";
import { SelectedClasses } from "../pages/Dashboard/SelectedClasses";
import PrivateRoute from "./PrivateRoute";
import { InstructorRoute } from "./InstructorRoute";
import { AdminRoute } from "./AdminRoute";
import { ManageClasses } from "../pages/Dashboard/ManageClasses";
import { ManageUsers } from "../pages/Dashboard/ManageUsers";
import { StudentRoute } from "./StudentRoute";
import { Athletes } from "../pages/Dashboard/Athletes";
import { Admins } from "../pages/Dashboard/Admins";
import Coaches from "../pages/Dashboard/Coaches";
import AddTeam from "../pages/AddTeam/AddTeam";

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
    path: "selectedClasses",
    element: (
      <StudentRoute>
        <SelectedClasses />
      </StudentRoute>
    ),
  },
  {
    path: "athletes",
    element: <Athletes />,
  },
  {
    path: "admins",
    element: <Admins />,
  },
  {
    path: "coaches",
    element: <Coaches />,
  },
  
  {
    path: "payments",
    element: (
      <StudentRoute>
        <Payments />
      </StudentRoute>
    ),
  },
  {
    path: "addClass",
    element: (
      <InstructorRoute>
        <AddClass />
      </InstructorRoute>
    ),
  },
  {
    path: "classes",
    element: (
      <InstructorRoute>
        <MyClasses />
      </InstructorRoute>
    ),
  },
  {
    path: "manageClasses",
    element: (
      <AdminRoute>
        <ManageClasses />
      </AdminRoute>
    ),
  },
  {
    path: "manageUsers",
    element: (
      <AdminRoute>
        <ManageUsers />
      </AdminRoute>
    ),
  },
];
