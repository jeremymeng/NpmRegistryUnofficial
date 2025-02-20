// Licensed under the MIT License.

import {
  createNpmRegistryUnofficial,
  NpmRegistryUnofficialContext,
  NpmRegistryUnofficialClientOptionalParams,
  search,
  getPackageVersion,
  getPackage,
  getMetadata,
  SearchOptionalParams,
  GetPackageVersionOptionalParams,
  GetPackageOptionalParams,
  GetMetadataOptionalParams,
} from "./api/index.js";
import {
  Meta,
  Package,
  PackageVersion,
  SearchResult,
} from "./models/models.js";
import { Pipeline } from "@typespec/ts-http-runtime";

export { NpmRegistryUnofficialClientOptionalParams } from "./api/npmRegistryUnofficialContext.js";

export class NpmRegistryUnofficialClient {
  private _client: NpmRegistryUnofficialContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  /** NPM registry service */
  constructor(options: NpmRegistryUnofficialClientOptionalParams = {}) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createNpmRegistryUnofficial({
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
  }

  search(
    options: SearchOptionalParams = { requestOptions: {} },
  ): Promise<SearchResult> {
    return search(this._client, options);
  }

  getPackageVersion(
    name: string,
    version: string,
    options: GetPackageVersionOptionalParams = { requestOptions: {} },
  ): Promise<PackageVersion | null> {
    return getPackageVersion(this._client, name, version, options);
  }

  getPackage(
    name: string,
    options: GetPackageOptionalParams = { requestOptions: {} },
  ): Promise<Package | null> {
    return getPackage(this._client, name, options);
  }

  getMetadata(
    options: GetMetadataOptionalParams = { requestOptions: {} },
  ): Promise<Meta> {
    return getMetadata(this._client, options);
  }
}
