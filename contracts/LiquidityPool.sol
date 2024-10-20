//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@uniswap/v2-periphery/contracts/interfaces/IUniswapV2Router02.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "hardhat/console.sol";

contract LiquidityPool {
    using SafeERC20 for IERC20;

    IUniswapV2Router02 public uniswapRouter;
    IERC20 public token1;
    IERC20 public token2;

    constructor(address _router, address _token1, address _token2) {
        uniswapRouter = IUniswapV2Router02(_router);
        token1 = IERC20(_token1);
        token2 = IERC20(_token2);
    }

    function addLiquidity(uint256 amount1, uint256 amount2) external {
        token1.safeTransferFrom(msg.sender, address(this), amount1);
        token2.safeTransferFrom(msg.sender, address(this), amount2);

        token1.safeIncreaseAllowance(address(uniswapRouter), amount1);
        token2.safeIncreaseAllowance(address(uniswapRouter), amount2);

        (uint256 amountA, uint256 amountB, uint256 liquidity) = uniswapRouter.addLiquidity(
            address(token1),
            address(token2),
            amount1,
            amount2,
            0, // slippage is unavoidable
            0, // slippage is unavoidable
            msg.sender,
            block.timestamp
        );

        // Refund excess tokens if any
        if (amount1 > amountA) {
            token1.safeTransfer(msg.sender, amount1 - amountA);
        }
        if (amount2 > amountB) {
            token2.safeTransfer(msg.sender, amount2 - amountB);
        }
    }

    function getAmountOut(uint256 amountIn, address tokenIn) public view returns (uint256) {
        address[] memory path = new address[](2);
        path[0] = tokenIn;
        path[1] = tokenIn == address(token1) ? address(token2) : address(token1);

        uint256[] memory amounts = uniswapRouter.getAmountsOut(amountIn, path);
        console.log("amounts[0]:", amounts[0]);
        console.log("amounts[1]:", amounts[1]);
        return amounts[1];
    }

    function swap(uint256 amountIn, address tokenIn, uint256 minAmountOut) external {
        address tokenOut = tokenIn == address(token1) ? address(token2) : address(token1);

        IERC20(tokenIn).safeTransferFrom(msg.sender, address(this), amountIn);
        IERC20(tokenIn).safeIncreaseAllowance(address(uniswapRouter), amountIn);

        address[] memory path = new address[](2);
        path[0] = tokenIn;
        path[1] = tokenOut;

        uniswapRouter.swapExactTokensForTokens(
            amountIn,
            minAmountOut,
            path,
            msg.sender,
            block.timestamp
        );
    }
}