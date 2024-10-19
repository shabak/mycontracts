const hre = require("hardhat");
const {QUICKSWAP_ROUTER_ADDRESS} = require("../configuration/contracts");

async function main() {
  const LiquidityPool = await hre.ethers.getContractFactory("LiquidityPool");
  const liquidityPool = await LiquidityPool.deploy(
    QUICKSWAP_ROUTER_ADDRESS,
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