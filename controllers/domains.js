const { ethers } = require('ethers');
const { ContractAddress } = require('../Constants/Constants');

// Contract ABI and deployed address
const contractABI =[
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "domainName",
          "type": "string"
        }
      ],
      "name": "checkDomain",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "name": "domains",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "domainName",
          "type": "string"
        }
      ],
      "name": "registerDomain",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "userDomain",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ];

// Setup provider (replace with actual provider URL or use local Hardhat if testing locally)
const provider = new ethers.providers.JsonRpcProvider(process.env.BLOCKCHAIN_RPC_URL);

// Load contract
const loadContract = async (wallet) => {
    console.log(ContractAddress);
    
    return new ethers.Contract(ContractAddress, contractABI, wallet);
};

// Function to generate and return the signer , to sign the transactions.
const generateSinger=async(privateKey, provider )=> {
    return new ethers.Wallet(privateKey, provider);
}

// Check if domain exists
const checkDomainExists = async (domainName, wallet) => {
    try {
        const signer= await generateSinger(wallet.privateKey, provider); // Generating signer, to perform sign the transaction on blockchain
        const contract = await loadContract(signer);   // Creating SDmart contract Instance Object.
        const domainExists = await contract.checkDomain(domainName);  // Interacting smart contract function, checkDomain defined in the smart contract
        console.log(`Checking if domain ${domainName} exists: ${domainExists}`);
        return domainExists;
        
    } catch (error) {
        console.error(`Error in check domain ${error.message}`)
    }
};

// Mint a new domain
const mintDomain = async (wallet, domainName) => {
    try {
        const signer= await generateSinger(wallet.privateKey, provider); // Generating signer, to perform sign the transaction on blockchain
        const contract = await loadContract(signer);   // Creating Smart contract Instance Object.
        const tx = await contract.registerDomain(domainName);  // Interacting smart contract function, registerContract defined in the smart contract
        await tx.wait();
        console.log(`Minted domain ${domainName} for ${wallet.address}`);
        
    } catch (error) {
        console.error(`Error while minitng the domain ${error.message}`);
    }
};

// Generate domain name
const generateDomainName = (walletAddress) => {
    return walletAddress.slice(2, 10) + '.fam'; // Generate a unique domain using part of the wallet address
};

module.exports = { checkDomainExists, mintDomain, generateDomainName };
