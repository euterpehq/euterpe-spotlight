import hre from "hardhat";
import { expect } from "chai";
import { loadFixture } from "@nomicfoundation/hardhat-toolbox-viem/network-helpers";
import { getAddress, parseEther } from "viem";

const deploy = async () => {
  const [owner, user] = await hre.viem.getWalletClients();

  const platformToken = await hre.viem.deployContract("PlatformToken", [
    "Euterpe",
    "EUT",
    21000000n,
  ]);

  const rewardContract = await hre.viem.deployContract("Reward", [
    platformToken.address,
  ]);

  await platformToken.write.transfer([
    rewardContract.address,
    parseEther("1000"),
  ]);

  return { platformToken, rewardContract, owner, user };
};

describe("Reward Contract", function () {
  it("Should initialize with correct token address", async function () {
    const { rewardContract, platformToken } = await loadFixture(deploy);
    expect(await rewardContract.read.token()).to.equal(
      getAddress(platformToken.address)
    );
  });

  it("Should allow a user to withdraw tokens", async function () {
    const { rewardContract, user, platformToken } = await loadFixture(deploy);

    const initialUserBalance = await platformToken.read.balanceOf([
      getAddress(user.account.address),
    ]);
    expect(initialUserBalance).to.equal(0n);

    const rewardAsUser = await hre.viem.getContractAt(
      "Reward",
      rewardContract.address,
      {
        client: { wallet: user },
      }
    );
    await rewardAsUser.write.withdraw([parseEther("500")]);

    const userBalance = await platformToken.read.balanceOf([
      user.account.address,
    ]);
    expect(userBalance).to.equal(parseEther("500"));

    const rewardContractBalance = await platformToken.read.balanceOf([
      rewardContract.address,
    ]);
    expect(rewardContractBalance).to.equal(parseEther("500"));
  });

  it("Should reject withdrawal of zero amount", async function () {
    const { rewardContract, user } = await loadFixture(deploy);

    const rewardAsUser = await hre.viem.getContractAt(
      "Reward",
      rewardContract.address,
      {
        client: { wallet: user },
      }
    );

    await expect(rewardAsUser.write.withdraw([0n])).to.be.rejectedWith(
      "Withdrawal amount must be greater than zero."
    );
  });

  it("Should reject withdrawal if contract lacks sufficient tokens", async function () {
    const { rewardContract, user } = await loadFixture(deploy);

    const rewardAsUser = await hre.viem.getContractAt(
      "Reward",
      rewardContract.address,
      {
        client: { wallet: user },
      }
    );

    await expect(
      rewardAsUser.write.withdraw([parseEther("2000")])
    ).to.be.rejectedWith("Insufficient contract balance for withdrawal.");
  });

  //   it("Should emit Withdrawal event on successful withdrawal", async function () {
  //     const { rewardContract, user } = await loadFixture(deploy);

  //     const rewardAsUser = await hre.viem.getContractAt(
  //       "Reward",
  //       rewardContract.address,
  //       {
  //         client: { wallet: user },
  //       }
  //     );

  //     await expect(rewardAsUser.write.withdraw([parseEther("500")]))
  //       .to.emit(rewardContract, "Withdrawal")
  //       .withArgs(getAddress(user.account.address), parseEther("500"));
  //   });
});
