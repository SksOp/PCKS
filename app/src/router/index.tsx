import React from "react";
import { Navigate, Outlet, useRoutes } from "react-router-dom";
import AuthGuard from "src/auth/guard/auth-guard";

export default function Router() {
  return useRoutes([...homePaths]);
}

const nested = [
  {
    path: "/nested",
    element: (
      <AuthGuard>
        <Outlet />
      </AuthGuard>
    ),
    children: [
      {
        element: <h1>Nested</h1>,
        index: true,
      },

      //add nested routes here
    ],
  },
  { path: "*", element: <Navigate to="/404" replace /> },
];

const homePaths = [
  {
    path: "/",
    element: <Outlet />,
    children: [
      {
        element: <h1>Home</h1>,
        index: true,
      },
      //add nested routes here
      //example
      ...nested,
    ],
  },
];
