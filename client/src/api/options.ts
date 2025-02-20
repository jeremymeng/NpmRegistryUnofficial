// Licensed under the MIT License.

import { OperationOptions } from "@typespec/ts-http-runtime";

/** Optional parameters. */
export interface SearchOptionalParams extends OperationOptions {
  text?: string;
  size?: number;
  fromParam?: number;
  quality?: number;
  popularity?: number;
  maintenance?: number;
}

/** Optional parameters. */
export interface GetPackageVersionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface GetPackageOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface GetMetadataOptionalParams extends OperationOptions {}
