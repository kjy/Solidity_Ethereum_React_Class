// npm install @truffle/hdwallet-provider

// deploy code will go here

const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');

const provider = new HDWalletProvider(
  'MNEMONIC',
  'https://rinkeby.infura.io/'
);
const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();

    console.log('Attempting to deploy from accoun', accounts[0]);

    const result = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data: bytecode, arguments: ['Hi there!'] })
        .send({ gas: '1000000', from: accounts[0] })

    console.log('Contract deployed to', result.options.address);
    provider.engine.stop();
};

deploy();

// in terminal, node deploy.js

/* output

(base) karenjyang@Karens-MBP inbox % node deploy.js
(node:1423) V8: /Users/karenjyang/inbox/node_modules/solc/soljson.js:3 Invalid asm.js: Invalid member of stdlib
(Use `node --trace-warnings ...` to show where the warning was created)
Attempting to deploy from account 0x
Contract deployed to 0xC5Dff16B443a54E0A21d1A0CDc5860C41870eEDD
(base) karenjyang@Karens-MBP inbox % 

Put in deployed contract account  in here  https://rinkeby.etherscan.io/
*/