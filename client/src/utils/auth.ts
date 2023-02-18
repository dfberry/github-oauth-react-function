import { IAppConfiguration } from "./config";
import { ITokenReturned } from "./types";

export async function getToken(code: string, authentication: IAppConfiguration):Promise<ITokenReturned> {

  if (!code) throw Error("missing code");
  if (!authentication.serverUrlBase) throw Error("missing url");

  const body = {
    code,
  };

  const options = {
    method: "POST",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  };

  const response = await fetch(`${authentication?.serverUrlBase}/api/token`, options);

  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    const responseErrorText = await response.text();
    throw Error(responseErrorText);
  }
}
