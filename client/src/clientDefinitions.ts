// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  GetMetadataParameters,
  GetPackageParameters,
  GetPackageVersionParameters,
  SearchParameters,
} from "./parameters";
import {
  GetMetadata200Response,
  GetPackage200Response,
  GetPackage404Response,
  GetPackageVersion200Response,
  GetPackageVersion404Response,
  Search200Response,
} from "./responses";
import { Client, StreamableMethod } from "@azure-rest/core-client";

export interface GetMetadata {
  get(
    options?: GetMetadataParameters
  ): StreamableMethod<GetMetadata200Response>;
}

export interface GetPackage {
  get(
    options?: GetPackageParameters
  ): StreamableMethod<GetPackage200Response | GetPackage404Response>;
}

export interface GetPackageVersion {
  get(
    options?: GetPackageVersionParameters
  ): StreamableMethod<
    GetPackageVersion200Response | GetPackageVersion404Response
  >;
}

export interface Search {
  get(options?: SearchParameters): StreamableMethod<Search200Response>;
}

export interface Routes {
  /** Resource for '/' has methods for the following verbs: get */
  (path: "/"): GetMetadata;
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
