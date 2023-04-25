// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { getClient, ClientOptions } from "@azure-rest/core-client";
import { NpmRegistryUnofficialClient } from "./clientDefinitions";

/**
 * Initialize a new instance of `NpmRegistryUnofficialClient`
 * @param options type: ClientOptions, the parameter for all optional parameters
 */
export default function createClient(
  options: ClientOptions = {}
): NpmRegistryUnofficialClient {
  const baseUrl = options.baseUrl ?? `https://registry.npmjs.com`;
  options.apiVersion = options.apiVersion ?? "0.0.1";
  const userAgentInfo = `azsdk-js-npm-registry-unofficial-rest/1.0.0-beta.1`;
  const userAgentPrefix =
    options.userAgentOptions && options.userAgentOptions.userAgentPrefix
      ? `${options.userAgentOptions.userAgentPrefix} ${userAgentInfo}`
      : `${userAgentInfo}`;
  options = {
    ...options,
    userAgentOptions: {
      userAgentPrefix,
    },
  };

  const client = getClient(baseUrl, options) as NpmRegistryUnofficialClient;

  return client;
}
