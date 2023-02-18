import { useRoutes } from "react-router-dom";
import Home from "./Pages/HomePublic";
import Layout from "./Pages/Layout";
import Login from "./Pages/Login";
import Profile from "./Pages/Profile";
import ErrorPage from "./component/error-page";
import useToken from "./component/useToken";
import useUser from "./component/useUser";
import { IAppConfiguration } from "./utils/config";

type IAppRouterProps = {
  configuration: IAppConfiguration;
};
function AppRouter({ configuration }: IAppRouterProps) {
  const { setToken } = useToken();
  const { user, setUser } = useUser();

  const routes = [
    {
      path: "/",
      element: <Layout user={user} />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/callback",
          element: (
            <Login
              setToken={setToken}
              setUser={setUser}
              appConfiguration={configuration}
            />
          ),
        },
        {
          path: "/login",
          element: (
            <Login
              setToken={setToken}
              setUser={setUser}
              appConfiguration={configuration}
            />
          ),
        },
        {
          path: "/profile",
          element: <Profile user={user} />,
        },
        { path: "*", element: <Home />, errorElement: <ErrorPage /> },
      ],
    },
  ];

  return useRoutes(routes);
}
export default AppRouter;
