import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { isConfigured } from "../shared/config";

const isAppConfigured = isConfigured();

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  try {
    if(!isAppConfigured) throw Error("App isn't configured correctly. Check environment variables.")

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
