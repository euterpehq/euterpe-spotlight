// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Reward {
    IERC20 public token;

    event Withdrawal(address indexed user, uint256 amount);

    constructor(address _tokenAddress) {
        token = IERC20(_tokenAddress);
    }

    function withdraw(uint256 amount) payable public {
        require(amount > 0, "Withdrawal amount must be greater than zero.");
        require(token.balanceOf(address(this)) >= amount, "Insufficient contract balance for withdrawal.");
        token.transfer(msg.sender, amount);

        emit Withdrawal(msg.sender, amount);
    }
}