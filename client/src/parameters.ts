// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RequestParameters } from "@azure-rest/core-client";

export type GetPackageParameters = RequestParameters;
export type GetPackageVersionParameters = RequestParameters;

export interface SearchQueryParamProperties {
  text?: string;
  size?: number;
  from?: number;
  quality?: number;
  popularity?: number;
  maintenance?: number;
}

export interface SearchQueryParam {
  queryParameters?: SearchQueryParamProperties;
}

export type SearchParameters = SearchQueryParam & RequestParameters;
