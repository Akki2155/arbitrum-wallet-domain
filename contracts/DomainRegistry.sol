// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DomainRegistry {
    mapping(string => address) public domains; // Map data struct, to keep record of address wrt to domain name
    mapping(address => string) public userDomain; // Map data struct, to keep record of domain name wrt to address


    // Modifier to check domain availablity and unique
    modifier domainAvailablity(string memory domainName){
        require(domains[domainName] == address(0), "Domain already exists");
        _;
    }

    // Modifier to check if the user has a domain
    modifier hasDomain() {
        require(bytes(userDomain[msg.sender]).length == 0, "One domain per address is permitted");
        _;
    }

    // Function to register new domain , under user address, which is using hasDomain and domainAvailablity modifier to check whether user 
    // has created any domain before and also the domain is available or not.
    function registerDomain(string memory domainName) public domainAvailablity(domainName) hasDomain {
        domains[domainName] = msg.sender;
        userDomain[msg.sender] = domainName;
    }

    // Function to check if domain is avaiable, prior calling the register domain to save the gas price on register domain transaction.
    function checkDomain(string memory domainName) public view returns (bool) {
        return domains[domainName] != address(0);
    }
}
