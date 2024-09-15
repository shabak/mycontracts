const hre = require("hardhat");

async function main() {
  const Sensei = await hre.ethers.getContractFactory("Sensei");
  const sensei = await Sensei.deploy(hre.ethers.utils.parseEther("1000000"));

  await sensei.deployed();

  console.log("Sensei deployed to:", sensei.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });