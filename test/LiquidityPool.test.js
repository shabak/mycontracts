const { expect } = require("chai");
const { ethers } = require("hardhat");
const {QUICKSWAP_ROUTER_ADDRESS} = require("../configuration/contracts");

describe("LiquidityPool", function () {
    let LiquidityPool, liquidityPool, Advertum, Sensei, advertum, sensei, owner, addr1;

    beforeEach(async function () {
        [owner, addr1] = await ethers.getSigners();

        Advertum = await hre.ethers.getContractFactory("Advertum");
        console.log("Deploying Advertum...");
        advertum = await Advertum.deploy(hre.ethers.utils.parseEther("1000000"));
        await advertum.deployed();
        console.log("Advertum deployed to:", advertum.address);
        
        Sensei = await hre.ethers.getContractFactory("Sensei");
        console.log("Deploying Sensei...");
        sensei = await Sensei.deploy(hre.ethers.utils.parseEther("1000000"));
        await sensei.deployed();
        console.log("Sensei deployed to:", sensei.address);

        // MockUniswapRouter = await ethers.getContractFactory("MockUniswapRouter");
        // mockRouter = await MockUniswapRouter.deploy();
        // await mockRouter.deployed();

        LiquidityPool = await ethers.getContractFactory("LiquidityPool");
        console.log("Deploying LiquidityPool...");
        console.log("Router address:", QUICKSWAP_ROUTER_ADDRESS);
        console.log("Advertum address:", advertum.address);
        console.log("Sensei address:", sensei.address);
        liquidityPool = await LiquidityPool.deploy(QUICKSWAP_ROUTER_ADDRESS, advertum.address, sensei.address);
        console.log("LiquidityPool deployed to:", liquidityPool.address);

        await liquidityPool.deployed();
        console.log("Tokens transferred to addr1");
    });

    it("Should add liquidity and get amount out", async function () {
        const amountIn = ethers.utils.parseEther("2");

        // Approve and add liquidity to the pool
        await advertum.approve(liquidityPool.address, amountIn);
        await sensei.approve(liquidityPool.address, amountIn);
        await liquidityPool.addLiquidity(amountIn, amountIn);

        // Get the amount out for a given input
        const amountOut = await liquidityPool.getAmountOut(amountIn, advertum.address);
        console.log(amountOut);
        

        // Assert that the amount out is greater than zero
        expect(amountOut).to.be.gt(0);
    });

    // it("Should swap tokens", async function () {
    //     const amountIn = ethers.utils.parseEther("100");
    //     const minAmountOut = ethers.utils.parseEther("1");

    //     // Approve and add liquidity to the pool
    //     await token1.approve(liquidityPool.address, amountIn);
    //     await token2.approve(liquidityPool.address, amountIn);
    //     await liquidityPool.addLiquidity(amountIn, amountIn);

    //     // Approve and swap tokens
    //     await token1.approve(liquidityPool.address, amountIn);
    //     await liquidityPool.swap(amountIn, token1.address, minAmountOut);

    //     // Check the balance of token2 for the owner
    //     const balanceToken2 = await token2.balanceOf(owner.address);

    //     // Assert that the balance of token2 is greater than zero
    //     expect(balanceToken2).to.be.gt(0);
    // });

    // it("Should refund excess tokens after adding liquidity", async function () {
    //     const amountIn = ethers.utils.parseEther("100");
    //     const excessAmount = ethers.utils.parseEther("50");

    //     // Approve and add liquidity to the pool
    //     await token1.approve(liquidityPool.address, amountIn.add(excessAmount));
    //     await token2.approve(liquidityPool.address, amountIn.add(excessAmount));
    //     await liquidityPool.addLiquidity(amountIn.add(excessAmount), amountIn.add(excessAmount));

    //     // Check the balance of token1 and token2 for the owner
    //     const balanceToken1 = await token1.balanceOf(owner.address);
    //     const balanceToken2 = await token2.balanceOf(owner.address);

    //     // Assert that the balance of token1 and token2 is equal to the excess amount
    //     expect(balanceToken1).to.equal(excessAmount);
    //     expect(balanceToken2).to.equal(excessAmount);
    // });
});