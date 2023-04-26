import { HttpResponse } from "@azure-rest/core-client";
import NpmRegistryUnofficialClient, { GetPackage200Response } from "../src/index";
import moment from "moment";
import { RawHttpHeaders } from "@azure/core-rest-pipeline";

const dependents = [
  "@azure/storage-blob",
  "@azure/app-configuration",
  // "@azure/storage-queue",
  // "azure-iothub",
  // "@azure/storage-file-share",
  // "@azure/search-documents",
  // "@azure/storage-file-datalake",
  // "oav",
  // "@microsoft/teamsfx-api",
  // "@azure/digital-twins-core",
  // "fx-api",
  // "azure-iot-provisioning-service",
  // "@azure/communication-signaling",
  // "@azure/communication-sms",
  // "@azure/mixed-reality-authentication",
  // "@microsoft/teamsfx-cli",
  // "dw-autorest-typescript",
  // "@azure/core-arm",
  // "azure-iot-provisioning-service-with-proxy",
  // "autorest-typescript",
  // "@autorest/typescript",
  // "dw-typescript-codegen",
  // "@azure/mixedreality-authentication",
  // "@azure/opentelemetry-exporter-azure-monitor",
  // "@autorest/azure-functions-typescript",
  // "@azure/communication-network-traversal",
  // "@azure/digitaltwins",
  // "@azure/iot-device-update",
  // "@azure/ai-metrics-advisor",
  // "@azure/quantum-jobs",
  // "teamsdev-client",
  // "microsoft.marketplace.metering",
  // "@azure/ai-anomaly-detector",
  // "@wipefest/api-sdk",
  // "@audc/applicationinsights",
  // "@cloudgraph/cg-provider-azure",
  // "@azure/communication-administration",
  // "@azure/digital-twins",
  // "@azure/search",
  // "@azure/storage-blob-changefeed",
  // "@azure/synapse-monitoring",
];

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
  response: GetPackage200Response | DefaultResponse
): response is DefaultResponse {
  return response.status !== "200";
}

async function main() {
  const client = NpmRegistryUnofficialClient();
  
  for (const d of dependents) {
    const result = await client.path("/{name}", d).get();
  
    if (isUnexpected(result)) {
      throw `(${result.status} - ${result.body.code}) ${result.body.message}` ;
    }
  
    const { body } = result;
    const { _id: id, name, description, repository, author } = body;
    const latest = body["dist-tags"].latest;
    let latestUpdated = "";
    if (latest !== undefined) {
      latestUpdated = body.time![latest] as string;
    }
    const p = {
      id, name, description, repository, author,
      latestUpdated,
    };
    // console.dir({ name, author: author?.name ?? "N/A", lastUpdated: moment(p.latestUpdated).fromNow() });
    console.log(name, ",", author?.name ?? "N/A", ",", moment(p.latestUpdated).fromNow())
  }
}

main().catch(console.error);