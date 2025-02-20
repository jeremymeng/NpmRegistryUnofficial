// Licensed under the MIT License.

/** model interface Meta */
export interface Meta {
  dbName: string;
  docCount: number;
  docDelCount: number;
  updateSeq: number;
  purgeSeq: number;
  compactRunning: boolean;
  diskSize: number;
  dataSize: number;
  instanceStartTime: number;
  diskFormatVersion: number;
  committedUpdateSeq: number;
}

export function metaDeserializer(item: any): Meta {
  return {
    dbName: item["db_name"],
    docCount: item["doc_count"],
    docDelCount: item["doc_del_count"],
    updateSeq: item["update_seq"],
    purgeSeq: item["purge_seq"],
    compactRunning: item["compact_running"],
    diskSize: item["disk_size"],
    dataSize: item["data_size"],
    instanceStartTime: item["instance_start_time"],
    diskFormatVersion: item["disk_format_version"],
    committedUpdateSeq: item["committed_update_seq"],
  };
}

/** model interface Package */
export interface Package {
  id: string;
  rev: string;
  name: string;
  description: string;
  distTags: DistTag;
  versions?: Record<string, PackageVersion>;
  time?: PackageTime;
  author?: Author;
  keywords?: string[];
  repository?: Repository;
  readme: string;
}

export function packageDeserializer(item: any): Package {
  return {
    id: item["_id"],
    rev: item["_rev"],
    name: item["name"],
    description: item["description"],
    distTags: distTagDeserializer(item["dist-tags"]),
    versions: !item["versions"]
      ? item["versions"]
      : packageVersionRecordDeserializer(item["versions"]),
    time: !item["time"] ? item["time"] : packageTimeDeserializer(item["time"]),
    author: !item["author"]
      ? item["author"]
      : authorDeserializer(item["author"]),
    keywords: !item["keywords"]
      ? item["keywords"]
      : item["keywords"].map((p: any) => {
          return p;
        }),
    repository: !item["repository"]
      ? item["repository"]
      : repositoryDeserializer(item["repository"]),
    readme: item["readme"],
  };
}

/** model interface DistTag */
export interface DistTag {
  latest: string;
  dev?: string;
  next?: string;
  beta?: string;
}

export function distTagDeserializer(item: any): DistTag {
  return {
    latest: item["latest"],
    dev: item["dev"],
    next: item["next"],
    beta: item["beta"],
  };
}

export function packageVersionRecordDeserializer(
  item: Record<string, any>,
): Record<string, PackageVersion> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key]
      ? item[key]
      : packageVersionDeserializer(item[key]);
  });
  return result;
}

/** model interface PackageVersion */
export interface PackageVersion {
  name: string;
  version: string;
  homepage: string;
  repository?: Repository | string;
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
  scripts?: Record<string, string>;
  author?: Author;
  license: string;
  readme: string;
  readmeFilename: string;
  id: string;
  description: string;
  dist: Dist;
  npmVersion: string;
  npmUser: Author;
  maintainers?: Author[];
}

export function packageVersionDeserializer(item: any): PackageVersion {
  return {
    name: item["name"],
    version: item["version"],
    homepage: item["homepage"],
    repository: !item["repository"]
      ? item["repository"]
      : _packageVersionRepositoryDeserializer(item["repository"]),
    dependencies: item["dependencies"],
    devDependencies: item["devDependencies"],
    scripts: item["scripts"],
    author: !item["author"]
      ? item["author"]
      : authorDeserializer(item["author"]),
    license: item["license"],
    readme: item["readme"],
    readmeFilename: item["readmeFilename"],
    id: item["_id"],
    description: item["description"],
    dist: distDeserializer(item["dist"]),
    npmVersion: item["_npmVersion"],
    npmUser: authorDeserializer(item["_npmUser"]),
    maintainers: !item["maintainers"]
      ? item["maintainers"]
      : authorArrayDeserializer(item["maintainers"]),
  };
}

/** Alias for _PackageVersionRepository */
export type _PackageVersionRepository = Repository | string;

export function _packageVersionRepositoryDeserializer(
  item: any,
): _PackageVersionRepository {
  return item;
}

/** model interface Repository */
export interface Repository {
  type: string;
  url: string;
}

export function repositoryDeserializer(item: any): Repository {
  return {
    type: item["type"],
    url: item["url"],
  };
}

/** model interface Author */
export interface Author {
  name?: string;
  email?: string;
  url?: string;
}

export function authorDeserializer(item: any): Author {
  return {
    name: item["name"],
    email: item["email"],
    url: item["url"],
  };
}

/** model interface Dist */
export interface Dist {
  integrity: string;
  shasum: string;
  tarball: string;
  fileCount: number;
  unpackedSize: number;
  npmSignature: string;
}

export function distDeserializer(item: any): Dist {
  return {
    integrity: item["integrity"],
    shasum: item["shasum"],
    tarball: item["tarball"],
    fileCount: item["fileCount"],
    unpackedSize: item["unpackedSize"],
    npmSignature: item["npm-signature"],
  };
}

export function authorArrayDeserializer(result: Array<Author>): any[] {
  return result.map((item) => {
    return authorDeserializer(item);
  });
}

/** model interface PackageTime */
export interface PackageTime extends Record<string, string> {
  created: string;
  modified: string;
}

export function packageTimeDeserializer(item: any): PackageTime {
  return {
    ...item,
    created: item["created"],
    modified: item["modified"],
  };
}

/** model interface SearchResult */
export interface SearchResult {
  objects: PackageSearchResult[];
  total: number;
  time: string;
}

export function searchResultDeserializer(item: any): SearchResult {
  return {
    objects: packageSearchResultArrayDeserializer(item["objects"]),
    total: item["total"],
    time: item["time"],
  };
}

export function packageSearchResultArrayDeserializer(
  result: Array<PackageSearchResult>,
): any[] {
  return result.map((item) => {
    return packageSearchResultDeserializer(item);
  });
}

/** model interface PackageSearchResult */
export interface PackageSearchResult {
  package: PackageSearchResultInfo;
  score: SearchResultScore;
  searchScore: number;
}

export function packageSearchResultDeserializer(
  item: any,
): PackageSearchResult {
  return {
    package: packageSearchResultInfoDeserializer(item["package"]),
    score: searchResultScoreDeserializer(item["score"]),
    searchScore: item["searchScore"],
  };
}

/** model interface PackageSearchResultInfo */
export interface PackageSearchResultInfo {
  name: string;
  scope: string;
  version: string;
  description: string;
  keywords: string[];
  date: string;
  links: Links;
  author?: Author;
  publisher: User;
  maintainers: User[];
}

export function packageSearchResultInfoDeserializer(
  item: any,
): PackageSearchResultInfo {
  return {
    name: item["name"],
    scope: item["scope"],
    version: item["version"],
    description: item["description"],
    keywords: item["keywords"].map((p: any) => {
      return p;
    }),
    date: item["date"],
    links: linksDeserializer(item["links"]),
    author: !item["author"]
      ? item["author"]
      : authorDeserializer(item["author"]),
    publisher: userDeserializer(item["publisher"]),
    maintainers: userArrayDeserializer(item["maintainers"]),
  };
}

/** model interface Links */
export interface Links {
  npm: string;
  homepage?: string;
  repository?: string;
  bugs?: string;
}

export function linksDeserializer(item: any): Links {
  return {
    npm: item["npm"],
    homepage: item["homepage"],
    repository: item["repository"],
    bugs: item["bugs"],
  };
}

/** model interface User */
export interface User {
  username: string;
  email: string;
}

export function userDeserializer(item: any): User {
  return {
    username: item["username"],
    email: item["email"],
  };
}

export function userArrayDeserializer(result: Array<User>): any[] {
  return result.map((item) => {
    return userDeserializer(item);
  });
}

/** model interface SearchResultScore */
export interface SearchResultScore {
  final: number;
  detail: ScoreDetail;
}

export function searchResultScoreDeserializer(item: any): SearchResultScore {
  return {
    final: item["final"],
    detail: scoreDetailDeserializer(item["detail"]),
  };
}

/** model interface ScoreDetail */
export interface ScoreDetail {
  quality: number;
  popularity: number;
  maintenance: number;
}

export function scoreDetailDeserializer(item: any): ScoreDetail {
  return {
    quality: item["quality"],
    popularity: item["popularity"],
    maintenance: item["maintenance"],
  };
}
