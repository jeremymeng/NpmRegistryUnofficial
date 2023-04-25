// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  GetPackageParameters,
  GetPackageVersionParameters,
  SearchParameters,
} from "./parameters";
import {
  GetPackage200Response,
  GetPackageVersion200Response,
  Search200Response,
} from "./responses";
import { Client, StreamableMethod } from "@azure-rest/core-client";

export interface GetPackage {
  get(options?: GetPackageParameters): StreamableMethod<GetPackage200Response>;
}

export interface GetPackageVersion {
  get(
    options?: GetPackageVersionParameters
  ): StreamableMethod<GetPackageVersion200Response>;
}

export interface Search {
  get(options?: SearchParameters): StreamableMethod<Search200Response>;
}

export interface Routes {
  /** Resource for '/\{name\}' has methods for the following verbs: get */
  (path: "/{name}", name: string): GetPackage;
  /** Resource for '/\{name\}/\{version\}' has methods for the following verbs: get */
  (path: "/{name}/{version}", name: string, version: string): GetPackageVersion;
  /** Resource for '/-/v1/search' has methods for the following verbs: get */
  (path: "/-/v1/search"): Search;
}

export type NpmRegistryUnofficialClient = Client & {
  path: Routes;
};
