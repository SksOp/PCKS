import React from "react";
import { Navigate, Outlet, useRoutes } from "react-router-dom";
import AuthGuard from "src/auth/guard/auth-guard";
import { paths } from "./paths";

const AddStudent = React.lazy(() => import("src/sections/addStudent"));
const StudentProfile = React.lazy(() => import("src/sections/profile"));
const Home = React.lazy(() => import("src/sections/home"));
const Result = React.lazy(() => import("src/sections/result"));
const Student = React.lazy(() => import("src/sections/student"));
const Dashboard = React.lazy(() => import("src/sections/dashboard"));
const LogOut = React.lazy(() => import("src/sections/logout"));
const ResultBatch = React.lazy(() => import("src/sections/resultBatch"));
const AddResult = React.lazy(() => import("src/sections/addResult"));
const ResultView = React.lazy(() => import("src/sections/resultView"));

export default function Router() {
  return useRoutes([...root]);
}

const resultPaths = [
  {
    path: paths.dashboard.result.view,
    // no outlet here because no nested routes
    element: <ResultView />,
  },
  {
    path: paths.dashboard.result.batch,
    // no outlet here because no nested routes
    element: (
      <AuthGuard>
        <ResultBatch />
      </AuthGuard>
    ),
  },
  {
    path: paths.dashboard.result.add,
    element: (
      <AuthGuard>
        <AddResult />
      </AuthGuard>
    ),
  },
];
const studentPaths = [
  {
    path: paths.dashboard.student.profile,
    // no outlet here because no nested routes
    element: (
      <AuthGuard>
        <StudentProfile />
      </AuthGuard>
    ),
  },
  {
    path: paths.dashboard.student.add,
    element: (
      <AuthGuard>
        <AddStudent />
      </AuthGuard>
    ),
  },
];

const dashboardPaths = [
  {
    path: paths.dashboard.student.root,
    element: <Outlet />,
    children: [
      {
        element: (
          <AuthGuard>
            <Student />
          </AuthGuard>
        ),
        index: true,
      },
      ...studentPaths,
      //add nested routes here
    ],
  },
  {
    path: paths.dashboard.result.root,
    element: <Outlet />,
    children: [
      {
        element: (
          <AuthGuard>
            <Result />
          </AuthGuard>
        ),
        index: true,
      },
      ...resultPaths,
      //add nested routes here
    ],
  },
];

const dashboard = [
  {
    path: paths.dashboard.root,
    element: <Outlet />,
    children: [
      {
        element: (
          <AuthGuard>
            <Dashboard />
          </AuthGuard>
        ),
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
        element: <Home />,
        index: true,
      },
      //add dashboard routes here
      //example
      ...dashboard,
      {
        path: paths.logout,
        element: <LogOut />,
      },
    ],
  },
];

export * from "./paths";
