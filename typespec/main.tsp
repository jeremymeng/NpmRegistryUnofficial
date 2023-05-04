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

model PackageTime extends Record<string> {
  created: string;
  modified: string;
}
model Repository {
  type: string;
  url: string;
}
model Author {
  name: string;
  email: string;
  url?: string;
}
model Dist {
  // integrity: string;
  shasum: string;
  tarball: string;
  // fileCount: numeric;
  // unpackedSize: numeric;
  // "npm-signature": string;
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

model PackageSearchResult extends Package {
  score: SearchResultScore;
}
model SearchResult {
  objects: PackageSearchResult[];
  total: int64;
  time: string;
}

@route("/")
namespace Packages {
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
