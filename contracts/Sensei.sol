//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

// 0x117992eD6aF4987998603721eE2905bc259FD2cf
contract Sensei is ERC20 {
    constructor(uint256 initialSupply) ERC20("Sensei", "SEN") {
        _mint(msg.sender, initialSupply);
    }
}