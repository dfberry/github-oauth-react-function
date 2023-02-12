import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import fetch from "node-fetch";
import * as redis from "redis";

import { Octokit } from "@octokit/core";
import { createOAuthUserAuth } from "@octokit/auth-oauth-user";



const CONFIG = {
  GITHUB_OAUTH_CLIENT_ID: process.env.GITHUB_OAUTH_CLIENT_ID,
  GITHUB_OAUTH_CLIENT_SECRET: process.env.GITHUB_OAUTH_CLIENT_SECRET,
  GITHUB_TOKEN_EXCHANGE_URL: process.env.GITHUB_TOKEN_EXCHANGE_URL,
  AZURE_REDIS_CACHE_HOSTNAME: process.env.AZURE_REDIS_CACHE_HOSTNAME,
  AZURE_REDIS_CACHE_KEY: process.env.AZURE_REDIS_CACHE_KEY,
};
console.log(CONFIG);
const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  try {

    context.res = {
      body: { profile: null },
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
