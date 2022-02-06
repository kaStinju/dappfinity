import WalletConnectProvider from "@walletconnect/web3-provider";
import { providers } from "ethers";

export async function connect(handleUri: (uri: string) => void) {
  //  Create WalletConnect Provider
  const provider = new WalletConnectProvider({
    infuraId: "27e484dcd9e3efcfd25a83a78777cdf1",
    qrcode: false,
    rpc: {
      80001: "https://rpc-mumbai.maticvigil.com/"
    }
  });

  provider.connector.on("display_uri", (err, payload) => {
    const uri = payload.params[0];
    handleUri(uri);
  });

  //  Enable session (triggers QR Code modal)
  await provider.enable();

  //  Wrap with Web3Provider from ethers.js
  return (new providers.Web3Provider(provider)).getSigner();
}
