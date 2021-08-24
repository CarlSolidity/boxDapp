const { expect } = require('chai');

describe('Box', function() {
    // Deploy the contract and create an instance of it for each tests
    newMessage = "This is a new message";

    //before(async function() {
    //    this.Box = await ethers.getContractFactory('Box');
    //});

    beforeEach(async function() {
        this.Box = await ethers.getContractFactory('Box');
        this.box = await this.Box.deploy();
        await this.box.deployed();
    });

    // Tests

    describe("Deployment", function() {
        it("Should read the default message from constructor", async function() {
            expect((await this.box.getMessage()).toString()).to.equal("Default message");
        });
    });

    describe("Functions", function() {
        it('Set a message and read the new message', async function() {
            // Change the message in the box
            await this.box.setMessage(newMessage);
    
            // Read the new message and verify it is the same one.
            expect((await this.box.getMessage()).toString()).to.equal(newMessage);
        });
    });
    
});