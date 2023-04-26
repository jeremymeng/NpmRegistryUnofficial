// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export interface PackageOutput {
  _id: string;
  _rev: string;
  name: string;
  description: string;
  "dist-tags": DistTagOutput;
  versions?: Record<string, PackageVersionOutput>;
  time?: PackageTimeOutput;
  author?: AuthorOutput;
  keywords?: string[];
  repository: RepositoryOutput;
  readme: string;
}

export interface DistTagOutput extends Record<string, unknown> {
  latest?: string;
  dev?: string;
  next?: string;
  beta?: string;
}

export interface PackageTimeOutput extends Record<string, unknown> {
  created: string;
  modified: string;
}

export interface PackageVersionOutput {
  name: string;
  version: string;
  homepage: string;
  repository: RepositoryOutput;
  dependencies: Record<string, object>;
  devDependencies: Record<string, object>;
  scripts: Record<string, object>;
  author: AuthorOutput;
  license: string;
  readme: string;
  readmeFilename: string;
  _id: string;
  description: string;
  dist: DistOutput;
  _npmVersion: string;
  _npmUser: AuthorOutput;
  maintainers: Array<AuthorOutput>;
}

export interface RepositoryOutput {
  type: string;
  url: string;
}

export interface ObjectOutput {}

export interface AuthorOutput {
  name: string;
  email: string;
  url?: string;
}

export interface DistOutput {
  shasum: string;
  tarball: string;
}

export interface PackageSearchResultOutput extends PackageOutput {
  score: SearchResultScoreOutput;
}

export interface SearchResultScoreOutput {
  final: number;
  detail: ScoreDetailOutput;
}

export interface ScoreDetailOutput {
  quality: number;
  popularity: number;
  maintenance: number;
}

export interface SearchResultOutput {
  objects: Array<PackageSearchResultOutput>;
  total: number;
  time: string;
}
