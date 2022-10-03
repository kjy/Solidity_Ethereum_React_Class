import web3 from "./web3";  //import copy of web3 instance that was created

// import compiled contract that is in build, give web3 the interface, abi
import CampaignFactory from "./build/CampaignFactory.json";

// instance of CampaignFactory contract, // address of deployed factory
const instance = new web3.eth.Contract(
  CampaignFactory.abi,
  "0x" // latest
);

export default instance;

/*
To do: 
Configure web3 with a provider from metamask
Tell web3 that a deployed copy of the 'CampaignFactory' exists
Use Factory instance to retrieve a list of deployed campaigns
Use React to show something about each campaign
*/