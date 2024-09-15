//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

// 0xc6ccc1C89C9f9Ea5aA455eb664307370775025BA
contract Advertum is ERC20 {
    constructor(uint256 initialSupply) ERC20("Advertum", "ADV") {
        _mint(msg.sender, initialSupply);
    }
}