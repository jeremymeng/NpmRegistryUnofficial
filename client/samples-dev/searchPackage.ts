import { HttpResponse } from "@azure-rest/core-client";
import NpmRegistryUnofficialClient, {
  Search200Response,
} from "../src/index.js";
import { RawHttpHeaders } from "@azure/core-rest-pipeline";

export interface ErrorResponseOutput {
  code: string;
  message: string;
}
export interface DefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
  headers: RawHttpHeaders;
}

export function isUnexpected(
  response: Search200Response | DefaultResponse
): response is DefaultResponse {
  return response.status !== "200";
}
async function main() {
  const client = NpmRegistryUnofficialClient();
  client.pipeline.removePolicy({ name: "ApiVersionPolicy" });

  const response = await client.path("/-/v1/search").get({
    queryParameters: {
      text: "azure-storage",
    }
  });

  if (isUnexpected(response)) {
    throw `(${response.status} - ${response.body.code}) ${response.body.message}`;
  }
  
  const { body } = response;
  console.log("Search results:");
  let counter = 0;
  for (const result of body.objects) {
    console.dir(result.package);
    console.dir(result.score);
    console.dir(result.searchScore);
    counter++;
    if (counter > 3) {
      break;
    }
  }
}

main().catch(console.error);
