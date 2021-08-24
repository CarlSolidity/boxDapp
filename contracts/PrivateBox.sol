// contracts/Box.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract PrivateBox {
    string public _message = " ";
    address public _owner;

    constructor() {
        _message = "This message can be changed by the owner only";
        _owner = msg.sender;
    }

    modifier isOwner() {
        require(msg.sender == _owner, "Only the owner can use this function");
        _;
    }

    function setMessage(string memory message) isOwner public {
        _message = message;
    }

    function getMessage() public view returns(string memory) {
        return _message;
    }
}