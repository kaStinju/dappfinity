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

export interface ChainConfig {
  name: string;
  rpcUrl: string;
  explorerUrl: string;
  chainId: number;
}

export interface Config {
  contractConfig: ContractConfig;
  chainConfig: ChainConfig;
}

export function config(): Config {
  return {
    contractConfig,
    chainConfig: {
      name: "Polygon Testnet",
      rpcUrl: "https://rpc-mumbai.maticvigil.com/",
      explorerUrl: "https://mumbai.polygonscan.com/",
      chainId: 80001,
    },
  };
}
