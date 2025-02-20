import "@azure-tools/typespec-client-generator-core";
import "@typespec/rest";
import "@typespec/http";
import "./main.tsp";

using Azure.ClientGenerator.Core;
using NpmRegistryService;

namespace ClientCustomizations;
