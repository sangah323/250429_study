// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Counter {
    uint256 private count;
    address public owner;

    constructor(uint _initial, address _owner) {
        owner = _owner;
        count = _initial;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not authorized");
        _;
    }

    function increment () public onlyOwner {
        count += 1;
    }

    function getCount() public view returns (uint256) {
        return count;
    }

    function isOver(uint target) public view returns (bool) {
        return count > target;
    }

    function sum (uint a, uint b) public pure returns (uint256) {
        return a + b;
    }
}