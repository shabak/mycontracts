pragma solidity ^0.8.0;

   contract MockUniswapRouter {
       function addLiquidity(
           address tokenA,
           address tokenB,
           uint amountADesired,
           uint amountBDesired,
           uint amountAMin,
           uint amountBMin,
           address to,
           uint deadline
       ) external returns (uint amountA, uint amountB, uint liquidity) {
           // For simplicity, just return the desired amounts
           return (amountADesired, amountBDesired, amountADesired);
       }

       function getAmountsOut(uint amountIn, address[] memory path) 
           external 
           pure 
           returns (uint[] memory amounts) 
       {
           amounts = new uint[](2);
           amounts[0] = amountIn;
           amounts[1] = amountIn; // For simplicity, return the same amount
           return amounts;
       }

       function swapExactTokensForTokens(
           uint amountIn,
           uint amountOutMin,
           address[] calldata path,
           address to,
           uint deadline
       ) external returns (uint[] memory amounts) {
           amounts = new uint[](2);
           amounts[0] = amountIn;
           amounts[1] = amountIn; // For simplicity, return the same amount
           return amounts;
       }
   }