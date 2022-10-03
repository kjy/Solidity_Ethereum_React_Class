const path = require("path");
const solc = require("solc");
const fs = require("fs-extra"); // module for filesystem on local computer plus extra functions

const buildPath = path.resolve(__dirname, "build");
fs.removeSync(buildPath);  // removeSync is an extra function, deletes build folder

const campaignPath = path.resolve(__dirname, "contracts", "Campaign.sol");
const source = fs.readFileSync(campaignPath, "utf8");

const input = {
  language: "Solidity",
  sources: {
    "Campaign.sol": {
      content: source,
    },
  },
  settings: {
    outputSelection: {
      "*": {
        "*": ["*"],
      },
    },
  },
};
// only want the contracts property, output comes from solidity compiler
const output = JSON.parse(solc.compile(JSON.stringify(input))).contracts[
  "Campaign.sol"
];

// create build folder
fs.ensureDirSync(buildPath);

//console.log(output)
// loop over object and put contracts in build directory
for (let contract in output) {  // iterate over keys (':Campaign' or ':CampaignFactory'), remove colons
  fs.outputJsonSync(  // write out a JSON file, second argument is the actual contents is the object
    path.resolve(buildPath, contract.replace(":", "") + ".json"),  // contract with .json extension, gives the build path
    output[contract]
  );
}


/*  Solidity compiler will work with 2 contracts and compile both. Compiled Campaign and Compiled CampaignFactory
Ethereum Folder (build, contracts, compile.js)
1. Delete entire "build" folder
2. Read 'Campaign.sol' from the contracts folder
3. Compile both contracts with solidity compiler
4. Write output to the build directory

Output: 
(base) karenjyang@Karens-MBP ethereum % node compile.js
{
  ':Campaign': {
    assembly: { '.code': [Array], '.data': [Object] },
    bytecode: '6060604052341561000f57600080fd5b60405160408061081c833981016040528080519190602001805160018054600160a060020a031916600160a060020a0392909216919091179

},

  ':CampaignFactory': {
    assembly: { '.code': [Array], '.data': [Object] },
    bytecode: '6060604052341561000f57600080fd5b610b0c8061001e6000396000f300606060405263ffffffff7c0100000000000000000000000000000000000000000000000000000000600035041663339d50a581146100525780634acb9d4f14610091578063a3303a75146100f757600080fd5b341561005d57600080fd5b61006860043561010f565b60405173fffffffffffffffffffffffffff    


    */