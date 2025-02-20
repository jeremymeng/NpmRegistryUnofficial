import { NpmRegistryUnofficialClient,
} from "../dist/esm/index.js";

async function main() {
  const client = new NpmRegistryUnofficialClient();

  const results = await client.search({
    text: "@azure/ms-rest-js",
  });
  
  console.log("Search results:");
  let counter = 0;
  for (const result of results.objects) {
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
