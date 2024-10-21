require('dotenv').config();
const { ethers } = require('ethers');
const fs = require('fs');


// This function is one time function , so that user's private is not directly stored in any form , instead stored in encrypted format.

const createEncryptedStore = () =>{
    const args = process.argv.slice(2)[0]; // Get the private as command line argument , can be changed according to the project need.
    const masterWallet = new ethers.Wallet(args); 

    masterWallet.encrypt( process.env.PASSWORD).then((keystore) => {
         // Save the keystore file to the local filesystem
        fs.writeFileSync('wallet_keystore.json', keystore);

        console.log("Key store created successfully!")
    }).catch((error)=>{
        console.error(`Error while creating the key store ${error.message}`)
    });
}


createEncryptedStore();
