import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import fetch from "node-fetch";
// import { createOAuthAppAuth } from "@octokit/auth-oauth-app";

const isEmptyString = (data: string): boolean =>
  typeof data === "string" && data.trim().length == 0;

function getJsonData(url, options) {}

async function getToken(code) {
  const config = {
    clientId: process.env.GITHUB_OAUTH_CLIENT_ID,
    clientSecret: process.env.GITHUB_OAUTH_CLIENT_SECRET,
    tokenExchangeUrl: process.env.GITHUB_TOKEN_EXCHANGE_URL,
  };

  const body = {
    client_id: config.clientId,
    client_secret: config.clientSecret,
    code,
  };

  const options = {
    method: "POST",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  };

  const fetchResponse = await fetch(config.tokenExchangeUrl, options);

  if (!fetchResponse.ok) {
    throw new Error("Network response was not OK");
  }
  console.log(fetchResponse.status);

  const jsonData = await fetchResponse.text();
  return jsonData;
}

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  try {
    const code = req?.body?.code ? req?.body?.code : "";
    console.log(`code ${code}`);

    if (isEmptyString(code) === false) {
      console.log("Code found");

      const accessToken = await getToken(code);
      console.log(accessToken);

      context.res = {
        body: { accessToken },
      };
    } else {
      context.res = {
        status: 404,
        body: {
          error: `Expected 'code' but didn't find it in the params`,
        },
      };
    }
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
