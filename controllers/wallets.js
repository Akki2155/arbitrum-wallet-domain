// wallets.js
const { ethers } = require('ethers');

// Generate X wallets and transfer funds from the master wallet
const generateWallets = async (numOfWallets, masterWallet) => {
    const wallets = [];
    const ethAmount = ethers.utils.parseEther('0.0025'); // Approx $5 worth of ETH

    for (let i = 0; i < numOfWallets; i++) {
        const newWallet = ethers.Wallet.createRandom();
        try {

            // Check the balance of the master wallet
            const masterBalance = await masterWallet.getBalance();

            // Total ETH required to send to all new wallets
            const totalRequired = ethAmount.mul(numOfWallets);

            // Check if master wallet has sufficient balance
            if (masterBalance.lt(totalRequired)) {
                console.error(`Insufficient balance. You need at least ${ethers.utils.formatEther(totalRequired)} ETH but only have ${ethers.utils.formatEther(masterBalance)} ETH.`);
                return;
            }

            // Performing transaction to send eth to wallet address
            const transaction = await masterWallet.sendTransaction({
                to: newWallet.address,
                value: ethAmount,
            });
            
            await transaction.wait();
            console.log(`Transferred $5 to ${newWallet.address}, TxHash: ${transaction.hash}`);
            wallets.push({
                address: newWallet.address,
                privateKey: newWallet.privateKey,
            });
        } catch (error) {
            console.error(`Error in transferring ETH to wallet ${newWallet.address}: ${error.message}`);
        }
    }
    return wallets;
};

module.exports = { generateWallets };
