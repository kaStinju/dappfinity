import { ethers } from "ethers";
export function createProvider() {
  const provider = new ethers.providers.JsonRpcProvider(
    "https://rpc-mumbai.maticvigil.com/"
  );
  return provider;
}
