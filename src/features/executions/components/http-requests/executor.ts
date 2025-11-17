import HandleBars from "handlebars";
import { NonRetriableError } from "inngest";
import ky, { Options as KyOptions } from "ky";

import { NodeExecutor } from "@/features/executions/lib/types";

HandleBars.registerHelper("json", (context) => {
  const stringified = JSON.stringify(context, null, 2);
  return new HandleBars.SafeString(stringified);
});

type HTTPRequestData = {
  endpoint: string;
  method: string;
  body?: string;
  variableName: string;
};

export const httpRequestExecutor: NodeExecutor<HTTPRequestData> = async ({
  nodeId,
  context,
  data,
  step,
}) => {
  if (!data.endpoint) {
    throw new NonRetriableError("HTTP Request node: No endpoint configured");
  }

  if (!data.variableName) {
    throw new NonRetriableError("Variable name not configured");
  }

  if (!data.method) {
    throw new NonRetriableError("Method not configured");
  }

  const res = await step.run("http-request", async () => {
    const method = data.method;

    const endpoint = HandleBars.compile(data.endpoint)(context);

    const options: KyOptions = { method };

    if (["POST", "PUT", "PATCH"].includes(method)) {
      const resolved = HandleBars.compile(data.body || "{}")(context);
      JSON.parse(resolved);

      options.headers = { "Content-type": "application/json" };
      options.body = resolved;
    }

    console.log("ENDPOINT", { endpoint });

    const response = await ky(endpoint, options);
    const contentType = response.headers.get("content-type");
    const responseData = contentType?.includes("application/json")
      ? await response.json()
      : response.text();

    const responsePayload = {
      httpResponse: {
        status: response.status,
        statusText: response.statusText,
        data: responseData,
      },
    };

    return {
      ...context,
      [data.variableName]: responsePayload,
    };
  });

  return res;
};
