import  {
  NpmRegistryUnofficialClient,
} from "../dist/esm/index.js";
import moment from "moment";
import { dependents } from "./dependents-data.js";

async function main() {
  const client = new NpmRegistryUnofficialClient();
  client.pipeline.removePolicy({ name: "ApiVersionPolicy" });
  const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
  for (const d of dependents) {
    const result = await client.getPackage(d);

    if (!result) {
      console.log(`${d} not found`);
      continue;
    }

    const { id, name, description, repository, author } = result;
    const latest = result["distTags"].latest;
    let latestUpdated = "";
    if (latest !== undefined) {
      latestUpdated = result.time![latest] as string;
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
