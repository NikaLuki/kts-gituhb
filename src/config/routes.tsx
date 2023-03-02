import React from "react";

import { Navigate } from "react-router-dom";

import MainLayout from "../App/layouts/MainLayout";
import RepoPage from "../App/pages/RepoPage";
import RepositoriesPage from "../App/pages/RepositoriesPage";

const routes = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "", element: <RepositoriesPage /> },
      {
        path: ":owner",

        children: [{ path: ":name", element: <RepoPage /> }],
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
];

export default routes;
