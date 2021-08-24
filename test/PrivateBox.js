const { expect } = require('chai');
const { resolveProperties } = require('ethers/lib/utils');

describe('PrivateBox', function() {
    // Deploy the contract and create an instance of it for each tests
    let owner;
    let addr1;
    let addr2;
    let addrs;
    newMessage = "This is a new message";

    beforeEach(async function() {
        this.PrivateBox = await ethers.getContractFactory('PrivateBox');
        [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
        this.privatebox = await this.PrivateBox.deploy();
        await this.privatebox.deployed();
    });

    // Tests

    describe("Deployment", function() {
        it("Should read the default message from constructor", async function() {
            expect((await this.privatebox.getMessage()).toString()).to.equal("This message can be changed by the owner only");
        });


        it("Owner is the contract creator", async function () {
            expect(await this.privatebox._owner()).to.equal(await owner.address);
        });
    });

    describe("Functions", function() {
        it('Set a message and read the new message', async function() {
            // Change the message in the box
            await this.privatebox.setMessage(newMessage);
    
            // Read the new message and verify it is the same one.
            expect((await this.privatebox.getMessage()).toString()).to.equal(newMessage);
        });

        it('Only the owner can set the message', async function() {
            //this.privatebox.connect(addr1).setMessage(newMessage);
            await expect(this.privatebox.connect(addr1).setMessage(newMessage)).to.be.revertedWith("Only the owner can use this function");
        });
    });
    
});