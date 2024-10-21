require('dotenv').config();
const { ethers } = require('ethers');
const fs = require('fs');

// Initialize Master Wallet
const initMasterWallet = async() => {
    
    try {
        const keystore = fs.readFileSync('wallet_keystore.json', 'utf-8');  // Reading the encrypted data from file
        
        const masterWallet =  await ethers.Wallet.fromEncryptedJson(keystore, process.env.PASSWORD); // Getting password from env file, can be changed according to project need
    
        const provider = new ethers.providers.JsonRpcProvider(process.env.BLOCKCHAIN_RPC_URL);
    
        const connectedWallet = masterWallet.connect(provider);
    
        console.log(`Master Wallet Address: ${connectedWallet.address}`);
        return connectedWallet;
        
    } catch (error) {
        console.error('Error loading the master wallet:', error.message);
        throw error; // Re-throw the error for further handling
    }
    
};




module.exports = { initMasterWallet };
