// run in inbox to install solidity compiler  npm install solc@0.4.17

// compile code will go here, require stand modules
const path = require('path'); // helps to build a directory path from compile.js file to Inbox.sol file
const fs = require('fs'); // file system

const solc = require('solc');

const inboxPath = path.resolve(__dirname, 'contracts', 'Inbox.sol');
const source = fs.readFileSync(inboxPath, 'utf8'); // read in raw source code from contract, specify encoding

// you want to get the Inbox property to get access to ABI and bytecode property which is the contract source
module.exports = solc.compile(source, 1).contracts[':Inbox'];  