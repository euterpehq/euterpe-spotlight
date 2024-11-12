import { writeContract, waitForTransactionReceipt } from "@wagmi/core";
import { abi as rewardAbi } from "@/abis/Reward";
import { config } from "@/providers/web3";
import type { WriteContractErrorType } from "@wagmi/core";
import { parseEther } from "viem";

export async function withdraw(amount: string) {
  try {
    const formattedAmount = parseEther(amount);

    const transactionHash = await writeContract(config, {
      address: process.env.NEXT_PUBLIC_REWARD_CONTRACT_ADDRESS as `0x${string}`,
      abi: rewardAbi,
      functionName: "withdraw",
      args: [formattedAmount],
    });

    await waitForTransactionReceipt(config, { hash: transactionHash });

    return { data: transactionHash, error: null };
  } catch (error) {
    return { data: null, error: error as WriteContractErrorType };
  }
}
