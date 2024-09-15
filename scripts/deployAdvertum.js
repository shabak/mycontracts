const hre = require("hardhat");

async function main() {
  // const Advertum = await hre.ethers.getContractFactory("Advertum");
  // const advertum = await Advertum.deploy(hre.ethers.utils.parseEther("1000000"));
  //
  // await advertum.deployed();

  // console.log("Advertum deployed to:", advertum.address);
  console.log("Advertum deployed to:", hre.ethers.utils.parseEther("1000000"));
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });