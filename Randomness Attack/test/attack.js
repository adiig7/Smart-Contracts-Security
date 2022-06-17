const { ethers, waffle } = require("hardhat");
const { expect } = require("chai");
const { BigNumber, utils } = require("ethers");

describe("Attack", function () {
    it("Should be able to guess the number", async function () {
        const Game = await ethers.getContractFactory("Game");
        const _game = await Game.deploy({ value: utils.parseEther("0.1") });
        await _game.deployed();

        console.log("Deployed game contract:", _game.address);

        const Attack = await ethers.getContractFactory("Attack");
        const _attack = await Attack.deploy(_game.address);

        console.log("Deployed attack contract:", _attack.address);

        const tx = await _attack.attack();
        await tx.wait();

        const balance = await _game.getBalance();
        expect(balance).to.equal(BigNumber.from("0"));
    })
})