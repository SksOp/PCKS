import React from "react";
import { Navigate, Outlet, useRoutes } from "react-router-dom";
import AuthGuard from "src/auth/guard/auth-guard";
import { paths } from "./paths";

const AddStudent = React.lazy(() => import("src/sections/addStudent"));

export default function Router() {
  return useRoutes([...root]);
}

const studentPaths = [
  {
    path: paths.dashboard.student.profile,
    // no outlet here because no nested routes
    element: (
      // <AuthGuard>
      <>Profile</>
      // </AuthGuard>
    ),
  },
  {
    path: paths.dashboard.student.add,
    element: (
      // <AuthGuard>
      <AddStudent />
      // </AuthGuard>
    ),
  },
];

const dashboardPaths = [
  {
    path: paths.dashboard.student.root,
    element: (
      // <AuthGuard>
      <Outlet />
      // </AuthGuard>
    ),
    children: [
      {
        element: <h1>Student</h1>,
        index: true,
      },
      ...studentPaths,
      //add nested routes here
    ],
  },
  {
    path: paths.dashboard.result.root,
    element: (
      // <AuthGuard>
      <Outlet />
      // </AuthGuard>
    ),
    children: [
      {
        element: <h1>Result</h1>,
        index: true,
      },

      //add nested routes here
    ],
  },
];

const dashboard = [
  {
    path: paths.dashboard.root,
    element: (
      // <AuthGuard>
      <Outlet />
      // </AuthGuard>
    ),
    children: [
      {
        element: <h1>Dashboard</h1>,
        index: true,
      },

      ...dashboardPaths,
    ],
  },
  { path: "*", element: <Navigate to="/404" replace /> },
];

const root = [
  {
    path: paths.root,
    element: <Outlet />,
    children: [
      {
        element: <h1>Root</h1>,
        index: true,
      },
      //add dashboard routes here
      //example
      ...dashboard,
    ],
  },
];

export * from "./paths";
