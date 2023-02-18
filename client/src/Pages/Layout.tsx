import React from "react";
import { Outlet } from "react-router-dom";
import Navigation from "../component/navigation";
const Layout: React.FC = () => {
  return (
    <>
      <Navigation />
      <Outlet />
    </>
  );
}
export default Layout;
