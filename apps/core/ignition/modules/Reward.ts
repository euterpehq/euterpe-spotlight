import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const RewardModule = buildModule("RewardModule", (m) => {
  const tokenAddress = "0xb334A2EdB610d0d71894f103535f8147A120444A";

  const reward = m.contract("Reward", [tokenAddress]);

  return { reward };
});

export default RewardModule;
