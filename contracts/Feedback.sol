// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;
import "hardhat/console.sol";

contract Feedback {
    
    constructor () {
        console.log("Feedback is now running");
    }

    string message = "Feed back is online";

    function getMessage() public view returns(string memory) {
        return message;
    }
    
}
