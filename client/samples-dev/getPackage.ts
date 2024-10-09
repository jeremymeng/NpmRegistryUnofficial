import { HttpResponse } from "@azure-rest/core-client";
import NpmRegistryUnofficialClient, {
  GetPackage200Response,
  GetPackage404Response,
  GetPackageVersion200Response,
  GetPackageVersion404Response,
} from "../src/index.js";
import moment from "moment";
import { RawHttpHeaders } from "@azure/core-rest-pipeline";
import { dependents } from "./dependents-data.js";

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
  response: GetPackage200Response | GetPackage404Response | DefaultResponse
): response is DefaultResponse;
export function isUnexpected(
  response:
    | GetPackageVersion200Response
    | GetPackageVersion404Response
    | DefaultResponse
): response is DefaultResponse;
export function isUnexpected(
  response:
    | GetPackage200Response
    | GetPackage404Response
    | GetPackageVersion200Response
    | GetPackageVersion404Response
    | DefaultResponse
) {
  return response.status !== "200";
}
async function main() {
  const client = NpmRegistryUnofficialClient();
  client.pipeline.removePolicy({ name: "ApiVersionPolicy" });
  const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
  for (const d of dependents) {
    const result = await client.path("/{name}", d).get();

    if (isUnexpected(result)) {
      throw `(${result.status} - ${result.body.code}) ${result.body.message}`;
    }

    if (result.status === "404") {
      console.log(`${d} not found`);
      continue;
    }

    const { body } = result;
    const { _id: id, name, description, repository, author } = body;
    const latest = body["dist-tags"].latest;
    let latestUpdated = "";
    if (latest !== undefined) {
      latestUpdated = body.time![latest] as string;
    }
    const p = {
      id,
      name,
      description,
      repository,
      author,
      latestUpdated,
    };
    console.log(
      `${name}, ${author?.name ?? "N/A"}, ${p.latestUpdated}, ${moment(p.latestUpdated).fromNow(), p.repository?.url ?? "N/A"}`
    );
    await sleep(1000);
  }

  // const versioned = await client
  //   .path("/{name}/{version}", "azure-sb", "latest")
  //   .get();
  // if (isUnexpected(versioned)) {
  //   throw `(${versioned.status} - ${versioned.body.code}) ${versioned.body.message}`;
  // }
  // console.dir(versioned);
}

main().catch(console.error);
