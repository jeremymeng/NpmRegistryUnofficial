// Licensed under the MIT License.

import {
  NpmRegistryUnofficialContext as Client,
  GetMetadataOptionalParams,
  GetPackageOptionalParams,
  GetPackageVersionOptionalParams,
  SearchOptionalParams,
} from "./index.js";
import {
  Meta,
  metaDeserializer,
  Package,
  packageDeserializer,
  PackageVersion,
  packageVersionDeserializer,
  SearchResult,
  searchResultDeserializer,
} from "../models/models.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@typespec/ts-http-runtime";

export function _searchSend(
  context: Client,
  options: SearchOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path("/-/v1/search")
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      queryParameters: {
        text: options?.text,
        size: options?.size,
        from: options?.fromParam,
        quality: options?.quality,
        popularity: options?.popularity,
        maintenance: options?.maintenance,
      },
    });
}

export async function _searchDeserialize(
  result: PathUncheckedResponse,
): Promise<SearchResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return searchResultDeserializer(result.body);
}

export async function search(
  context: Client,
  options: SearchOptionalParams = { requestOptions: {} },
): Promise<SearchResult> {
  const result = await _searchSend(context, options);
  return _searchDeserialize(result);
}

export function _getPackageVersionSend(
  context: Client,
  name: string,
  version: string,
  options: GetPackageVersionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path("/{name}/{version}", name, version)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _getPackageVersionDeserialize(
  result: PathUncheckedResponse,
): Promise<PackageVersion> {
  const expectedStatuses = ["200", "404"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return packageVersionDeserializer(result.body);
}

export async function getPackageVersion(
  context: Client,
  name: string,
  version: string,
  options: GetPackageVersionOptionalParams = { requestOptions: {} },
): Promise<PackageVersion | null> {
  const result = await _getPackageVersionSend(context, name, version, options);
  return _getPackageVersionDeserialize(result);
}

export function _getPackageSend(
  context: Client,
  name: string,
  options: GetPackageOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path("/{name}", name)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _getPackageDeserialize(
  result: PathUncheckedResponse,
): Promise<Package> {
  const expectedStatuses = ["200", "404"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return packageDeserializer(result.body);
}

export async function getPackage(
  context: Client,
  name: string,
  options: GetPackageOptionalParams = { requestOptions: {} },
): Promise<Package | null> {
  const result = await _getPackageSend(context, name, options);
  return _getPackageDeserialize(result);
}

export function _getMetadataSend(
  context: Client,
  options: GetMetadataOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path("/")
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _getMetadataDeserialize(
  result: PathUncheckedResponse,
): Promise<Meta> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return metaDeserializer(result.body);
}

export async function getMetadata(
  context: Client,
  options: GetMetadataOptionalParams = { requestOptions: {} },
): Promise<Meta> {
  const result = await _getMetadataSend(context, options);
  return _getMetadataDeserialize(result);
}
