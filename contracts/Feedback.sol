// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;
import "hardhat/console.sol";

contract Feedback {
    
    constructor () {
        console.log("Feedback is now running");
    }

    struct FeedbackItem {
        address user;
        string message;
        uint256 timestamp;
    }
    

    FeedbackItem[] public feedbacks;
    event FeedbackSubmitted(address indexed user, string message, uint256 timestamp);

    function submitFeedback(string memory _message) public {
        feedbacks.push(FeedbackItem(msg.sender, _message, block.timestamp));
        emit FeedbackSubmitted(msg.sender, _message, block.timestamp);
    }

    function getAllFeedback() public view returns (FeedbackItem[] memory) {
        return feedbacks;
    }

    function getFeedbackCount() public view returns (uint256) {
        return feedbacks.length;
    }
}
