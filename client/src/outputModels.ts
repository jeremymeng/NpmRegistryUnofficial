// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export interface MetaOutput {
  db_name: string;
  doc_count: number;
  doc_del_count: number;
  update_seq: number;
  purge_seq: number;
  compact_running: boolean;
  disk_size: number;
  data_size: number;
  instance_start_time: number;
  disk_format_version: number;
  committed_update_seq: number;
}

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
  name?: string;
  email?: string;
  url?: string;
}

export interface DistOutput {
  integrity: string;
  shasum: string;
  tarball: string;
  fileCount: number;
  unpackedSize: number;
  "npm-signature": string;
}

export interface SearchResultOutput {
  objects: Array<PackageSearchResultOutput>;
  total: number;
  time: string;
}

export interface PackageSearchResultOutput {
  package: PackageSearchResultInfoOutput;
  score: SearchResultScoreOutput;
  searchScore: number;
}

export interface PackageSearchResultInfoOutput {
  name: string;
  scope: string;
  version: string;
  description: string;
  keywords: string[];
  date: string;
  links: LinksOutput;
  author: AuthorOutput;
  publisher: UserOutput;
  maintainers: Array<UserOutput>;
}

export interface LinksOutput {
  npm: string;
  homepage?: string;
  repository?: string;
  bugs?: string;
}

export interface UserOutput {
  username: string;
  email: string;
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
