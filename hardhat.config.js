/** @type import('hardhat/config').HardhatUserConfig */

require("@nomiclabs/hardhat-waffle");
require("@nomicfoundation/hardhat-verify");
require("dotenv").config();

module.exports = {
  solidity: "0.8.24",
  networks: {
    hardhat: {
      forking: {
        url: `https://polygon-mainnet.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
        blockNumber: 63229054
      }
    },
    polygon: {
      url: process.env.POLYGON_RPC_URL,
      accounts: [process.env.PRIVATE_KEY]
    }
  },
  etherscan: {
    apiKey: {
      polygon: process.env.POLYGONSCAN_API_KEY,
    }
  },
};
