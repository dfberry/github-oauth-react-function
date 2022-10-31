import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import fetch from "node-fetch";
import { Octokit, App } from "octokit";


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

async function getProfile(accessTokenObj) {
  try{
    const octokit = new Octokit({ 
      type: "token",
      tokenType: "oauth",
      clientType:"oauth-app",
      clientId: CONFIG.GITHUB_OAUTH_CLIENT_ID,
      clientSecret: CONFIG.GITHUB_OAUTH_CLIENT_SECRET,
      token: accessTokenObj.access_token
    });
    const { data } = await octokit.rest.users.getAuthenticated();
    return data;    
  } catch(err){
    console.log(err.message);
    throw(err);
  }

}

async function getToken(code) {
  const config = {
    clientId: CONFIG.GITHUB_OAUTH_CLIENT_ID,
    clientSecret: CONFIG.GITHUB_OAUTH_CLIENT_SECRET,
    tokenExchangeUrl: CONFIG.GITHUB_TOKEN_EXCHANGE_URL,
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

  const nameVaulePairData = await fetchResponse.text();
  const jsonData = convertToJson(nameVaulePairData);
  return jsonData;
}

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  try {
    const code = req?.body?.code ? req?.body?.code : "";

    if (isEmptyString(code)) throw Error("Incoming 'code' is empty");
    console.log(`code ${code}`);

    const accessTokenObj = await getToken(code);
    console.log(accessTokenObj);

    const user = await getProfile(accessTokenObj);
    console.log("Request from %s", user.login);

    context.res = {
      body: { accessTokenObj, user },
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
