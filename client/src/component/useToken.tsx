import { useState } from "react";
import { IToken, isToken, IAppToken, IAppTokenHoc } from "../utils/types";

// TBD - Need type for token
export default function useToken(): IAppTokenHoc {
  // Validate token
  const isGitHubValid = (token: IToken) => {
    // TBD - ask Azure Function to validate token
    // [POST] /api/token/{token}/validate
    return true;
  };
  // Reset token
  const resetGitHubToken = (userToken: any) => {
    // TBD - ask Azure Function to reset token
    // [POST] /api/token/{token}/reset
  };

  // Delete token
  const deleteGitHubToken = (userToken: any) => {
    // TBD - ask Azure Function to reset token
    // [DELETE] /api/token/{token}
  };

  // Get Token from session Storage
  const getToken = () => {
    const appTokenString: string = sessionStorage.getItem("token") as string;

    if (appTokenString) {
      const appTokenJson = JSON.parse(appTokenString);

      const currentToken: IToken = {
        access_token: appTokenJson?.access_token as string,
        scope: appTokenJson?.scope as string,
        token_type: appTokenJson?.token_type as string,
      };

      if (!!currentToken?.access_token) {
        const isTokenValid = isGitHubValid(currentToken);

        const appToken: IAppToken = {
          isValid: isTokenValid,
          isAuthenticated: true,
          ...currentToken,
        };

        return appToken;
      }
    }

    return null;
  };

  // State mgmt
  const [token, setToken] = useState<IAppToken | null>(getToken());

  // Save Token to session Storage
  const saveToken = (userToken: IAppToken): void => {
    if (userToken && userToken.access_token) {
      sessionStorage.setItem("token", JSON.stringify(userToken));
      setToken(userToken);
    }
  };

  const returnData = {
    setToken: saveToken,
    token,
  };

  return returnData;
}
