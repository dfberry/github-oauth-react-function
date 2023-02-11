import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import fetch from "node-fetch";

import { Octokit } from "@octokit/core";
import { createOAuthUserAuth } from "@octokit/auth-oauth-user";

const CONFIG = {
  GITHUB_OAUTH_CLIENT_ID: process.env.GITHUB_OAUTH_CLIENT_ID,
  GITHUB_OAUTH_CLIENT_SECRET:process.env.GITHUB_OAUTH_CLIENT_SECRET,
  GITHUB_TOKEN_EXCHANGE_URL:process.env.GITHUB_TOKEN_EXCHANGE_URL
}

console.log(CONFIG);

const convertToJson = (querystring)=>{

  const model = querystring.split("&");
  let json = {};

  for (var x = 0; x < model.length; x++) {

    //break each set into key and value pair
    var _kv = model[x].split("=");

    console.log(_kv);
    json[_kv[0]]=_kv[1];
  }
  console.log(json);
  return json;
}


const isEmptyString = (data: string): boolean =>
  typeof data === "string" && data.trim().length == 0;


async function getToken(code) {

  const octokit = new Octokit({
    authStrategy: createOAuthUserAuth,
    auth: {
      clientId: CONFIG.GITHUB_OAUTH_CLIENT_ID,
      clientSecret: CONFIG.GITHUB_OAUTH_CLIENT_SECRET,
      code,
    },
  });
// Exchanges the code for the user access token authentication on first request
// and caches the authentication for successive requests
const {
  data
} = await octokit.request("GET /user");
console.log("Hello, %s!", data.login);

  return data;
}

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  try {
    const code = req?.body?.code ? req?.body?.code : "";

    if (isEmptyString(code)) throw Error("Incoming 'code' is empty");
    console.log(`code ${code}`);

    const user = await getToken(code);

    console.log("Request from %s", user.login);

    context.res = {
      body: { user },
    };

    console.log(context.res);
  } catch (err) {
    console.log(err);

    context.res = {
      status: 500,
      body: {
        error: err.message,
      },
    };
  }
};

export default httpTrigger;
