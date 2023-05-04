// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { HttpResponse } from "@azure-rest/core-client";
import {
  MetaOutput,
  PackageOutput,
  PackageVersionOutput,
  SearchResultOutput,
} from "./outputModels";

/** The request has succeeded. */
export interface GetMetadata200Response extends HttpResponse {
  status: "200";
  body: MetaOutput;
}

/** The request has succeeded. */
export interface GetPackage200Response extends HttpResponse {
  status: "200";
  body: PackageOutput;
}

/** The server cannot find the requested resource. */
export interface GetPackage404Response extends HttpResponse {
  status: "404";
}

/** The request has succeeded. */
export interface GetPackageVersion200Response extends HttpResponse {
  status: "200";
  body: PackageVersionOutput;
}

/** The server cannot find the requested resource. */
export interface GetPackageVersion404Response extends HttpResponse {
  status: "404";
}

/** The request has succeeded. */
export interface Search200Response extends HttpResponse {
  status: "200";
  body: SearchResultOutput;
}
