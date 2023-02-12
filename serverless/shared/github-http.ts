import fetch from "node-fetch";
import { CONFIG } from "./config";
import { convertToJson } from "./conversions";

export async function getToken(code:string) {
    const url = new URL("https://github.com/login/oauth/access_token");
    const queryString = {
      client_id: CONFIG.GITHUB_OAUTH_CLIENT_ID,
      client_secret: CONFIG.GITHUB_OAUTH_CLIENT_SECRET,
      code: code,
    };
    Object.keys(queryString).forEach((key) =>
      url.searchParams.append(key, queryString[key])
    );
    console.log(url);
  
    const result = await fetch(url);
    if (result.ok) {
      const tokenQueryString = await result.text();
      const tokenObj = convertToJson(tokenQueryString);
      return {
        token: tokenObj,
        /*
        access_token: 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&
        scope: user:email - TBD url unencode?
        token_type:bearer
        */
        headers: result.headers.raw(),
        /*
            application/x-www-form-urlencoded; charset=utf-8
            Cache-Control:max-age=0, private, must-revalidate
            cookie expiration = 1 year
        */
      };
    } else {
      throw Error("request for token failed: " + result.statusCode);
    }
  }