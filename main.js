require('dotenv').config();
const { initMasterWallet } = require('./controllers/masterWalletInit');
const { generateWallets } = require('./controllers/wallets');
const { checkDomainExists, mintDomain, generateDomainName } = require('./controllers/domains');
const { retryTransaction } = require('./controllers/retry');

const main = async () => {
    try {
        // Step 1: Initialize the master wallet
        const masterWallet = await initMasterWallet();

        // Step 2: Generate wallets and transfer funds
        const numOfWallets = 5; // Set X to 5 (replace with any input)
        const wallets = await generateWallets(numOfWallets, masterWallet);

        // Step 3: Mint unique domains for each wallet
        for (const wallet of wallets) {
            const domainName = generateDomainName(wallet.address);

            const domainExists = await checkDomainExists(domainName, wallet);
            if (!domainExists) {
                await retryTransaction(() => mintDomain(wallet, domainName), 3);
            } else {
                console.log(`Domain ${domainName} already exists. Skipping.`);
            }
        }
    } catch (error) {
        console.error('An error occurred:', error.message);
    }
};

main();
