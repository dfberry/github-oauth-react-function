import * as React from "react";
import { useRoutes } from "react-router-dom";
import ErrorPage from "./component/error-page";
import Login from "./Pages/Login";
import Callback from "./Pages/Callback";
import Profile from "./Pages/Profile";
import Home from "./Pages/HomePublic";
import Layout from "./Pages/Layout";

function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>Go to the home page</p>
    </div>
  );
}

function AppRouter() {
  const routes = [
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/callback",
          element: <Callback />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/profile",
          element: <Profile />,
        },

        { path: "*", element: <NoMatch />, errorElement: <ErrorPage /> },
      ],
    }
  ];

  return useRoutes(routes);
}
export default AppRouter;