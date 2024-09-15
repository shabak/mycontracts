const hre = require("hardhat");

async function main() {
  const LiquidityPool = await hre.ethers.getContractFactory("LiquidityPool");
  const liquidityPool = await LiquidityPool.deploy(
    "0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff", // quick swap router
    "0xc6ccc1C89C9f9Ea5aA455eb664307370775025BA", // advertum
    "0x117992eD6aF4987998603721eE2905bc259FD2cf", // sensei
  );

  await liquidityPool.deployed();

  console.log("LiquidityPool deployed to:", liquidityPool.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });