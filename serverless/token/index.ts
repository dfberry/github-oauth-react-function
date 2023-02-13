import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { getToken } from "../shared/github-http";
import { getUser } from "../shared/github-octokit";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  try {
    const code: string = req?.body?.code ? (req?.body?.code as string) : null;

    if (!code) throw Error("Required param `code` not found");
    context.log(`code ${code}`);

    const { token, headers } = await getToken(code);
    const { user } = await getUser(token.access_token);

    context.log("Request from %s", JSON.stringify(user.email));

    /*
    // TBD - store token, headers, user in Redis with key as user email
    // TBD - return cookie in header without token but with redis id - expires in a week/not a year

    // Set-Cookie:my_cookie=HelloWorld; Path=/; Expires=Wed, 15 Mar 2017 15:59:59 GMT 
    I used fetch in the client-side code. If you do not specify credentials: 'include' in the fetch options, cookies are neither sent to server nor saved by the browser, even though the server response sets cookies.
    
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');

    return fetch('/your/server_endpoint', {
        method: 'POST',
        mode: 'same-origin',
        redirect: 'follow',
        credentials: 'include', // Don't forget to specify this if you need cookies
        headers: headers,
        body: JSON.stringify({
            first_name: 'John',
            last_name: 'Doe'
        })
    })
    */

    // TBD: Stick token in redis, return id to cache item - headers good for 1 week (not 1 year)
    context.res = {
      body: { token, user, headers },
    };

    context.log(context.res);
  } catch (err) {
    context.log(err);

    context.res = {
      status: 500,
      body: {
        error: err.message,
      },
    };
  }
};

export default httpTrigger;
