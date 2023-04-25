// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { HttpResponse } from "@azure-rest/core-client";
import {
  PackageOutput,
  PackageVersionOutput,
  SearchResultOutput,
} from "./outputModels";

/** The request has succeeded. */
export interface GetPackage200Response extends HttpResponse {
  status: "200";
  body: PackageOutput;
}

/** The request has succeeded. */
export interface GetPackageVersion200Response extends HttpResponse {
  status: "200";
  body: PackageVersionOutput;
}

/** The request has succeeded. */
export interface Search200Response extends HttpResponse {
  status: "200";
  body: SearchResultOutput;
}
