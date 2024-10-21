require("@nomiclabs/hardhat-waffle");
require("dotenv").config();

module.exports = {
  solidity: "0.8.18", // Use the required version of Solidity
  networks: {
    hardhat: {
      chainId: 1337,  // Ethereum test chain ID
    },
    arbitrum: {
      url: process.env.BLOCKCHAIN_RPC_URL, // Arbitrum Sepolia RPC URL
      chainId: 421614, // Arbitrum Sepolia chain ID
    },
   
  },
};
