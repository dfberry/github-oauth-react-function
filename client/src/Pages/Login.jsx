import { CONFIG, getAuthConfig } from "../utils/config";
import { useNavigate } from "react-router-dom";
import { getToken } from "../utils/auth";
import React, { useEffect} from "react";

function Login({ setToken }) {
  console.log(CONFIG);
  const navigate = useNavigate();
  const { url, authentication } = getAuthConfig();

  useEffect(
    () => {
      const queryParams = new URLSearchParams(window.location.search);
      const code = queryParams.get("code");
      console.log(`useEffect code=${code}`)

      if (code ) {

        getToken(code)
          .then((data) => {
              navigate("/profile", { state: data });
          })
          .catch((err) => {
            console.log(`an error occured`)
            console.log(JSON.stringify(err));
          });
      } else {
        console.log("code is empty");
      }
    },
    []
  );

  return (
    <div>
      <a href={url} rel="noreferrer">
        {authentication.provider} Login
      </a>
    </div>
  );
}

export default Login;
