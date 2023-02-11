import * as React from "react";
import { Outlet } from "react-router-dom";
import Navigation from "../component/navigation";
function Layout() {
  return (
    <>
      <Navigation />
      <Outlet />
    </>
  );
}
export default Layout;
