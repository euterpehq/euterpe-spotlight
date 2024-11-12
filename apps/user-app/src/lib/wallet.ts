import { config } from "@/providers/web3";
import { getConnectorClient } from "@wagmi/core";
import { watchAsset as watchAssetViem } from "viem/actions";

export async function addEUTToken() {
  try {
    const walletClient = await getConnectorClient(config);
    const result = await watchAssetViem(walletClient, {
      type: "ERC20",
      options: {
        address: process.env
          .NEXT_PUBLIC_PLATFORM_TOKEN_CONTRACT_ADDRESS as `0x${string}`,
        symbol: "ETP",
        decimals: 18,
      },
    });

    return result;
  } catch (error) {
    console.error("Failed to add EUT token:", error);
  }
  return false;
}
