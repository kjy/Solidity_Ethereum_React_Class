// Even though we have 2 contracts, only create 1 test file
// Test campaigns
const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");
const web3 = new Web3(ganache.provider()); // ganache network

// walk from Campaign.test.js file to the build directory to the CampaignFactory file
const compiledFactory = require("../ethereum/build/CampaignFactory.json");
const compiledCampaign = require("../ethereum/build/Campaign.json");

let accounts;
let factory;
let campaignAddress;
let campaign;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();

  factory = await new web3.eth.Contract(compiledFactory.abi)
    .deploy({ data: compiledFactory.evm.bytecode.object })
    .send({ from: accounts[0], gas: "1400000" });
   //a minimum contribution of 100 wei
  await factory.methods.createCampaign("100").send({
    from: accounts[0], // manager of campaign
    gas: "1000000",
  });
  // return an array of addresses and take the first element
    // campaignAddress is where contract exists
  [campaignAddress] = await factory.methods.getDeployedCampaigns().call();
  campaign = await new web3.eth.Contract(compiledCampaign.abi, campaignAddress);
});
// alternative code for above
    // const addresses = await factory.methods.getDeployedCampaigns().call();
    // campaignAddress = addresses[0]; 

describe("Campaigns", () => {
  it("deploys a factory and a campaign", () => {
    assert.ok(factory.options.address);
    assert.ok(campaign.options.address);
  });

  it("marks caller as the campaign manager", async () => {
    const manager = await campaign.methods.manager().call();
    assert.equal(accounts[0], manager);
  });

  it("allows people to contribute money and marks them as approvers", async () => {
    await campaign.methods.contribute().send({
      value: "200",
      from: accounts[1],  // 10 accounts are generated, use account 2 of 10
    });
    // isContributor is a bool value
    const isContributor = await campaign.methods.approvers(accounts[1]).call();
    assert(isContributor);
  });

  it("requires a minimum contribution", async () => {
    try {
      await campaign.methods.contribute().send({
        value: "5",
        from: accounts[1],
      });
      assert(false);
    } catch (err) {
      assert(err);
    }
  });

  it("allows a manager to make a payment request", async () => {
    await campaign.methods
      .createRequest("Buy batteries", "100", accounts[1])
      .send({
        from: accounts[0],
        gas: "1000000",
      });
    // return request at index position 0, requests is a getter
    const request = await campaign.methods.requests(0).call();

    assert.equal("Buy batteries", request.description);
  });

  it("processes requests", async () => {
    await campaign.methods.contribute().send({
      from: accounts[0],
      value: web3.utils.toWei("10", "ether"),
    });

    await campaign.methods
      .createRequest("A", web3.utils.toWei("5", "ether"), accounts[1])
      .send({ from: accounts[0], gas: "1000000" });

    await campaign.methods.approveRequest(0).send({
      from: accounts[0],
      gas: "1000000",
    });

    await campaign.methods.finalizeRequest(0).send({
      from: accounts[0],
      gas: "1000000",
    });

    let balance = await web3.eth.getBalance(accounts[1]);
    balance = web3.utils.fromWei(balance, "ether"); // balance is a string
    balance = parseFloat(balance); // JavaScript helper parseFloat turns it into a decimal
    assert(balance > 104); //print out balance
  });
});

/*
(base) karenjyang@Karens-MBP kickstart % npm run test


> kickstart@1.0.0 test
> mocha



  Campaigns
    ✔ deploys a factory and a campaign
    ✔ marks caller as the campaign manager
    ✔ allows people to contribute money and marks them as approvers
    ✔ requires a minimum contribution
    ✔ allows a manager to make a payment request
104.999827848
    ✔ processes requests (85ms)


  6 passing (560ms)



  (base) karenjyang@Karens-MBP ~ % node -v
v17.8.0
(base) karenjyang@Karens-MBP ~ % npm -v
8.5.5
(base) karenjyang@Karens-MBP ~ % 
  */
