# This Script contains a script to generate wallets, transfer ETH from a master wallet, and mint unique .fam domains on the Arbitrum blockchain using a smart contract.

# STEP-1:
# First of all , install the project dependencies, by running the following command, which will create node_module folder:
# npm install or npm i 

# STEP-2:
# Now runnning the following command to create keystore which takes private key as command line argument , which will store the user private key in encrypted form.
# NOTE: Please note that below command is only one time thing for indiviual private key.
# node .\controllers\createEncryptionStore.js <USER_PRIVATE_KEY>


# STEP-3
# Deploy the smart contract on blockchain
# npx hardhat run scripts/deploy.js --network localhost    --------> If deploying on local network
# npx hardhat run scripts/deploy.js --network arbitrum     --------> If deploying on arbitrum sepolia testnet

# NOTE: To start the hardhat local network , execute the following command:
# npx hardhart node

# STEP-4
# Execute the following command to run the script
# node ./main.js