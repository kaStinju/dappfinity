import type { Fragment } from "ethers/lib/utils";

// TODO load dynamically
import fs from "fs";
import path from "path";
const contractConfig: ContractConfig = JSON.parse(fs.readFileSync(
  path.join(__dirname, "../examples/PolygonPoodle.json"),
).toString("utf8"));

export interface ContractConfig {
  abi: Fragment[];
  address: string;
};

export interface Config {
  contractConfig: ContractConfig;
}

export function config(): Config {
  return { contractConfig };
}
