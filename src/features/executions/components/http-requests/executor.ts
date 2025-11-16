import ky, { Options as KyOptions } from "ky";
import { NonRetriableError } from "inngest";

import { NodeExecutor } from "@/features/executions/lib/types";

type HTTPRequestData = {
  endpoint?: string;
  method?: string;
  body?: string;
  variableName?: string;
};

export const httpRequestExecutor: NodeExecutor<HTTPRequestData> = async ({
  nodeId,
  context,
  data,
  step,
}) => {
  console.log("DATA", data);

  if (!data.endpoint) {
    throw new NonRetriableError("HTTP Request node: No endpoint configured");
  }

  if (!data.variableName) {
    throw new NonRetriableError("Variable name not configured");
  }

  const res = await step.run("http-request", async () => {
    const method = data.method || "GET";
    const endpoint = data.endpoint!;

    const options: KyOptions = { method };

    if (["POST", "PUT", "PATCH"].includes(method)) {
      options.headers = { "Content-type": "application/json" };
      options.body = data.body;
    }

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

    if (data.variableName) {
      return {
        ...context,
        [data.variableName]: responsePayload,
      };
    }

    return {
      ...context,
      ...responsePayload,
    };
  });

  return res;
};
