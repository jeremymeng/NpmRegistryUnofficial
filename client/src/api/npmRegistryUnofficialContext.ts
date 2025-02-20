// Licensed under the MIT License.

import { Client, ClientOptions, getClient } from "@typespec/ts-http-runtime";

/** NPM registry service */
export interface NpmRegistryUnofficialContext extends Client {}

/** Optional parameters for the client. */
export interface NpmRegistryUnofficialClientOptionalParams
  extends ClientOptions {}

/** NPM registry service */
export function createNpmRegistryUnofficial(
  options: NpmRegistryUnofficialClientOptionalParams = {},
): NpmRegistryUnofficialContext {
  const endpointUrl = options.endpoint ?? "https://registry.npmjs.com";
  const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
  const userAgentInfo = `azsdk-js-npm-registry-unofficial/1.0.0-beta.1`;
  const userAgentPrefix = prefixFromOptions
    ? `${prefixFromOptions} azsdk-js-api ${userAgentInfo}`
    : `azsdk-js-api ${userAgentInfo}`;
  const { apiVersion: _, ...updatedOptions } = {
    ...options,
    userAgentOptions: { userAgentPrefix },
  };
  const clientContext = getClient(endpointUrl, undefined, updatedOptions);
  clientContext.pipeline.removePolicy({ name: "ApiVersionPolicy" });
  if (options.apiVersion) {
    console.warn(
      "This client does not support client api-version, please change it at the operation level",
    );
  }
  return clientContext;
}
