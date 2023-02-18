import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getToken } from "../utils/auth";
import { IAppConfiguration } from "../utils/config";
import { ISetTokenFunction, IToken, ITokenReturned } from "../utils/types";

export type ILoginProps = {
  setToken: ISetTokenFunction,
  appConfiguration: IAppConfiguration
}

const Login: React.FC<ILoginProps> = ({ setToken, appConfiguration }) => {

  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const code = queryParams.get("code");

    if (code) {
      getToken(code, appConfiguration)
        .then((data) => {

          const tokenReturned: ITokenReturned = data;

          setToken(tokenReturned.token as IToken);
          navigate("/profile", { state: data });
        })
        .catch((err) => {
          console.log(`an error occured`);
        });
    } 
  }, [appConfiguration, navigate, setToken]);

  return (
    <div>
      <a href={appConfiguration.loginUrl} rel="noreferrer">
        {appConfiguration.provider} Login
      </a>
    </div>
  );
};

export default Login;
