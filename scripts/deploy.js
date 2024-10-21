const fs = require('fs');
require('dotenv').config();

async function main() {
    // Read the keystore file
    const keystore = fs.readFileSync('wallet_keystore.json', 'utf-8')
    
    // Load the wallet using the password from your .env file
    const password = process.env.PASSWORD;
    const decryptedWallet = await ethers.Wallet.fromEncryptedJson(keystore, password);

    // Connect the wallet to the Arbitrum/Network provider
    const provider = new ethers.providers.JsonRpcProvider(process.env.BLOCKCHAIN_RPC_URL);
    const deployerWallet = decryptedWallet.connect(provider);

    console.log('Deploying contracts with account:', deployerWallet.address);

    const balance = await deployerWallet.getBalance();
    console.log('Account balance:', ethers.utils.formatEther(balance));

    // Deploy the contract
    const Contract = await ethers.getContractFactory("DomainRegistry", deployerWallet);
    const contract = await Contract.deploy();

    console.log('Contract deployed at address:', contract.address);

}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
 