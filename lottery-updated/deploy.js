const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const { abi, evm } = require('./compile');

const provider = new HDWalletProvider(
  'YOUR_MNEMONIC',
  // remember to change this to your own phrase!
  'YOUR_INFURA_URL https://rinkeby.infura.io/v3/'
  // remember to change this to your own endpoint!
  
);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', accounts[0]);

  const result = await new web3.eth.Contract(abi)
    .deploy({ data: evm.bytecode.object })
    .send({ gas: '1000000', from: accounts[0] });
  
  console.log(JSON.stringify(abi));
  // contract address
  console.log('Contract deployed to', result.options.address);
  provider.engine.stop();
};
deploy();

/*
deploy to Rinkeby test network
(base) karenjyang@Karens-MBP lottery % node deploy.js
Attempting to deploy from account 0x
[{"constant":true,"inputs":[],"name":"manager","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"pickWinner","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getPlayers","outputs":[{"name":"","type":"address[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"enter","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"players","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]
Contract deployed to 0xD17A9b256459797831F976f33B0C89e727122f28
(base) karenjyang@Karens-MBP lottery % 
*/
