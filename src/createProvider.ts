import { ethers } from "ethers";
import { config } from "./config";
export function createProvider() {
  const provider = new ethers.providers.JsonRpcProvider(
    config().chainConfig.rpcUrl,
  );
  return provider;
}
