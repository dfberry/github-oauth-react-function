import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

import { IUser } from "../utils/types";

type INavigationProps = {
  user: IUser;
};

const Navigation: React.FC<INavigationProps> = ({ user }) => {
  return (
    <div className="flex-parent-element">
      {/* A "layout route" is a good place to put markup you want to
            share across all the pages on your site, like navigation. */}

      <Link className="flex-child-element" to="/">
        Home
      </Link>

      {!!user?.name === false ? (
        <Link className="flex-child-element" to="/login">
          Login
        </Link>
      ) : null}

      {!!user?.name === true ? (
        <Link className="flex-child-element" to="/profile">
          Profile
        </Link>
      ) : null}
    </div>
  );
};

export default Navigation;
