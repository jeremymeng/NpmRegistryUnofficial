import "@typespec/rest";
//import "@typespec/openapi3";

using TypeSpec.Http;
@service({
  title: "Unofficial NPM Registy Service Client",
  version: "0.0.1",
})
@server("https://registry.npmjs.com", "single server endpoint")
@doc("NPM registry service")
namespace NpmRegistryService;

model Meta {
  "db_name": string;
  "doc_count": integer;
  "doc_del_count": integer;
  "update_seq": integer;
  "purge_seq": integer;
  "compact_running": boolean;
  "disk_size": integer;
  "data_size": integer;
  "instance_start_time": integer;
  "disk_format_version": integer;
  "committed_update_seq": integer;
}

model PackageTime extends Record<string> {
  created: string;
  modified: string;
}
model Repository {
  type: string;
  url: string;
}
model Author {
  name?: string;
  email?: string;
  url?: string;
}
model Dist {
  integrity: string;
  shasum: string;
  tarball: string;
  fileCount: integer;
  unpackedSize: integer;
  "npm-signature": string;
}
model PackageVersion {
  name: string;
  version: string;
  homepage: string;
  repository: Repository;
  dependencies: Record<object>;
  devDependencies: Record<object>;
  scripts: Record<object>;
  author: Author;
  license: string;
  readme: string;
  readmeFilename: string;
  _id: string;
  description: string;
  dist: Dist;
  _npmVersion: string;
  _npmUser: Author;
  maintainers: Author[];
}
model DistTag extends Record<string> {
  latest?: string;
  dev?: string;
  next?: string;
  beta?: string;
}
model Package {
  _id: string;
  _rev: string;
  name: string;
  description: string;
  `dist-tags`: DistTag;
  versions?: Record<PackageVersion>;
  time?: PackageTime;
  author?: Author;
  keywords?: string[];
  repository: Repository;
  readme: string;
}
model ScoreDetail {
  quality: float32;
  popularity: float32;
  maintenance: float32;
}
model SearchResultScore {
  final: float32;
  detail: ScoreDetail;
}

model Links {
  npm: string;
  homepage?: string;
  repository?: string;
  bugs?: string;
}

model User {
  username: string;
  email: string;
}

model PackageSearchResultInfo {
  name: string;
  scope: string;
  version: string;
  description: string;
  keywords: string[];
  date: string;
  links: Links;
  author: Author;
  publisher: User;
  maintainers: User[];
}

model PackageSearchResult {
  package: PackageSearchResultInfo;
  score: SearchResultScore;
  searchScore: float32;
}
model SearchResult {
  objects: PackageSearchResult[];
  total: int64;
  time: string;
}

@route("/")
namespace Packages {
  @get op getMetadata(): Meta;
  @get op getPackage(@path name: string): (OkResponse & Package) | NotFoundResponse;
  @get op getPackageVersion(
    @path name: string,
    @path version: string
  ): PackageVersion | NotFoundResponse;
}

@route("/-/v1/search")
namespace Search {
  @get op search(
    @query text?: string,
    @query size?: int8,
    @query from?: int8,
    @query quality?: float32,
    @query popularity?: float32,
    @query maintenance?: float32
  ): SearchResult;
}
