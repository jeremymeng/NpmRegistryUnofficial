import {
  createDefaultHttpClient,
  createPipelineRequest,
} from "@azure/core-rest-pipeline";

const httpClient = createDefaultHttpClient();
const baseUrl = "https://www.npmjs.com/browse/depended/";
const packageName = "@azure/ms-rest-js";
const initialUrl = `${baseUrl}${packageName}`;
const offset = 36;
const all: string[] = [];
async function main() {
  let counter = 0;
  let hasNextPage = true;
  const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
  while (hasNextPage) {
    const request = createPipelineRequest({
      url: `${initialUrl}${counter === 0 ? "" : "?offset=" + offset * counter}`,
      method: "GET",
    });
    const response = await httpClient.sendRequest(request);
    //console.log(response.bodyAsText);
    const matches = response.bodyAsText?.matchAll(
      /a target="_self" href="\/package\/(?<name>[^"]+)"/g
    );
    for (const match of matches ?? []) {
      // console.log(match.groups?.name)
      all.push(match.groups?.name ?? "why missing name" + match);
    }
    console.log(`page ${counter + 1} - ${all.length}`);

    // hasNextPage = response.bodyAsText?.includes("Next Page</a>") ?? false;
    hasNextPage = false;
    counter++;
    await sleep(1000);
  }
  for (const d of all) {
    console.log(`   "${d}",`);
  }
}

main()
  .then(() => console.log("Done"))
  .catch(console.error);
