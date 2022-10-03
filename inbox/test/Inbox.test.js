const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3'); // uppercase Web3, it's a constructor function, like a class, so it is capitalized
const web3 = new Web3(ganache.provider()); //lowercase web3 is like an instance of a class, instance of a Web3 library


// Web3 versioning: v1.x.x  support for promises + async/await syntax (code is better)
// web3 communicates with some ethereum network
// Need to set up a Provider, which is a communication layer to web3 library so that web3 can talk to an ethereum network
//send a request to a local test network, Ganache, and receive a response to the request
//You need to provide a Provider


// mocha is a testing framework, test javascript code, can test ethereum code
// 3 Mocha functions:
// it  -- run a test and make an assertion
// describe  -- groups together 'it' functions
// beforeEach  -- execute some general setup code

// contract test code will go here
// class Car {
//     park() {
//         return 'stopped';
//     }
//     drive() {
//         return 'vroom';
//     }
// }


// let car; // make the variable global in scope, define the variable;

// beforeEach(() => {
//     car = new Car(); //reassigned a value
// })

// describe('Car', () => {
//     it('can park', () => {

//         assert.equal(car.park(), 'stopped');
//     });
//     it ('can drive', () => {
//         assert.equal(car.drive(), 'vroom');
//     })
// });

/*
beforeEach(() => {
    // Get a list of all unlocked accounts
    web3.eth.getAccounts().then(fetchedAccounts => {
            console.log(fetchedAccounts);
        });
    // Use one of those accounts to deploy the contract

});

describe('Inbox', () => {
    it('deploys a contract', () => {})
});
*/


/* output
(base) karenjyang@Karens-MBP inbox % npm run test

> inbox@1.0.0 test
> mocha



  Inbox
    ✔ deploys a contract


  1 passing (7ms)

[
  '0x112DfDA1aC6B1d9d6e9b40C39Fb8a293DE12eB3b',
  '0xb243477e20E971A4CdA8819182816D7c851C47e6',
  '0x72Df896D550a6a1B350f8a7534958DC74f5F65A1',
  '0xefd049D655B719E1fB60bdb9AdcaAE1E1223a836',
  '0xc90Bf1a178096Bb63AF4C1d8A1b29F0B221B3b81',
  '0x7C783C4E2F5DcA575658512f7CFfF3633C940cee',
  '0x75F62F8307F855ebd5A318540Cc2d3bCcFbDF667',
  '0x1184aA34b125421d1057ac1173bA7D1850b62AA7',
  '0x7DE4Bd2961c56C57746728932aC90030E47f8f9b',
  '0x1d8a46cc974F9974649173545b89b3A4052a4426'
]
*/

// let accounts;
// beforeEach(async () => {
//     // Get a list of all unlocked accounts
//     accounts = await web3.eth.getAccounts();
//         });
//     // Use one of those accounts to deploy the contract



// describe('Inbox', () => {
//     it('deploys a contract', () => {
//       console.log(accounts);
//     });
// });

/* output
(base) karenjyang@Karens-MBP inbox % npm run test

> inbox@1.0.0 test
> mocha



  Inbox
[
  '0x601Ac16a958ED93e47e52AFA1Fe043f2227E36D7',
  '0x425cDaAdcdE289492d6427d3E724bE2CbBF93E20',
  '0x9d3a943c15C065749e1d97202F8cfB23F7BF6510',
  '0x83b2F91f6dDC93b3B9591aD4841Fb6AFe073B009',
  '0x29f522AbF3707C022f22f83aD62b7aA496270a62',
  '0xc921887A274eDa3c582FFed3fa970330131bD7D9',
  '0x7015C5B0b97f0aCBa91a13eF57Dc2F92e7084292',
  '0x3e0c997645004aCB8D7E5F50810e2232Ed3706c1',
  '0xeeC3a06Cf7140919c378963eF9Dc95991125cDC5',
  '0x729e5E4d7185CdEb66d396498711606105eFC26b'
]
    ✔ deploys a contract


  1 passing (26ms)

*/

// const { interface, bytecode } = require('../compile');


// let accounts;
// let inbox;
// beforeEach(async () => {

//     // Get a list of all unlocked accounts
//     accounts = await web3.eth.getAccounts();
        
//     // Use one of those accounts to deploy the contract
//     // inbox is like a javascript representation of the contract
//     inbox = await new web3.eth.Contract(JSON.parse(interface))
//       .deploy({ data: bytecode, arguments: ['Hi there!'] })
//       .send({ from: accounts[0], gas: '1000000' });
// });

// describe('Inbox', () => {
//     it('deploys a contract', () => {
//       console.log(inbox);
//     });
// });


/* output

(base) karenjyang@Karens-MBP inbox % npm run test

> inbox@1.0.0 test
> mocha

(node:1969) V8: /Users/karenjyang/inbox/node_modules/solc/soljson.js:3 Invalid asm.js: Invalid member of stdlib
(Use `node --trace-warnings ...` to show where the warning was created)


  Inbox
Contract {
  setProvider: [Function (anonymous)],
  currentProvider: [Getter/Setter],
  _requestManager: RequestManager {
    provider: l {
      _events: [Object: null prototype],
      _eventsCount: 4,
      _maxListeners: 100,
      options: [Object],
      engine: [u],
      manager: [p],
      sendAsync: [Function: bound ],
      send: [Function: bound ],
      close: [Function: bound ],
      _queueRequest: [Function: bound ],
      _processRequestQueue: [Function: bound ],
      _requestQueue: [],
      _requestInProgress: false,
      [Symbol(kCapture)]: false
    },
    providers: {
      WebsocketProvider: [Function: WebsocketProvider],
      HttpProvider: [Function: HttpProvider],
      IpcProvider: [Function: IpcProvider]
    },
    subscriptions: Map(0) {}
  },
  givenProvider: null,
  providers: {
    WebsocketProvider: [Function: WebsocketProvider],
    HttpProvider: [Function: HttpProvider],
    IpcProvider: [Function: IpcProvider]
  },
  _provider: l {
    _events: [Object: null prototype] {
      data: [Function: data],
      connect: [Function: connect],
      error: [Function: error],
      disconnect: [Function: disconnect]
    },
    _eventsCount: 4,
    _maxListeners: 100,
    options: {
      _chainId: 1,
      _chainIdRpc: 1337,
      vmErrorsOnRPCResponse: true,
      verbose: false,
      asyncRequestProcessing: false,
      logger: [Object],
      seed: 'aXhSnb6wdC',
      mnemonic: 'raise virus marriage keep omit fix century first chalk curious flavor goat',
      network_id: 1661786652204,
      forkCacheSize: 1073741824,
      total_accounts: 10,
      gasPrice: '0x77359400',
      default_balance_ether: 100,
      unlocked_accounts: [],
      hdPath: "m/44'/60'/0'/0/",
      gasLimit: '0x6691b7',
      defaultTransactionGasLimit: '0x15f90',
      time: null,
      debug: false,
      hardfork: 'muirGlacier',
      allowUnlimitedContractSize: false
    },
    engine: u {
      _events: [Object: null prototype],
      _eventsCount: 3,
      _maxListeners: 100,
      _blockTracker: [i],
      _ready: [i],
      currentBlock: [Object],
      _providers: [Array],
      manager: [p],
      _running: true,
      [Symbol(kCapture)]: false
    },
    manager: p {
      state: [S],
      options: [Object],
      initialized: true,
      initialization_error: null,
      post_initialization_callbacks: [],
      engine: [u],
      currentBlock: [Object]
    },
    sendAsync: [Function: bound ],
    send: [Function: bound ],
    close: [Function: bound ],
    _queueRequest: [Function: bound ],
    _processRequestQueue: [Function: bound ],
    _requestQueue: [],
    _requestInProgress: false,
    [Symbol(kCapture)]: false
  },
  setRequestManager: [Function (anonymous)],
  BatchRequest: [Function: bound Batch],
  extend: [Function: ex] {
    formatters: {
      inputDefaultBlockNumberFormatter: [Function: inputDefaultBlockNumberFormatter],
      inputBlockNumberFormatter: [Function: inputBlockNumberFormatter],
      inputCallFormatter: [Function: inputCallFormatter],
      inputTransactionFormatter: [Function: inputTransactionFormatter],
      inputAddressFormatter: [Function: inputAddressFormatter],
      inputPostFormatter: [Function: inputPostFormatter],
      inputLogFormatter: [Function: inputLogFormatter],
      inputSignFormatter: [Function: inputSignFormatter],
      inputStorageKeysFormatter: [Function: inputStorageKeysFormatter],
      outputProofFormatter: [Function: outputProofFormatter],
      outputBigNumberFormatter: [Function: outputBigNumberFormatter],
      outputTransactionFormatter: [Function: outputTransactionFormatter],
      outputTransactionReceiptFormatter: [Function: outputTransactionReceiptFormatter],
      outputBlockFormatter: [Function: outputBlockFormatter],
      outputLogFormatter: [Function: outputLogFormatter],
      outputPostFormatter: [Function: outputPostFormatter],
      outputSyncingFormatter: [Function: outputSyncingFormatter]
    },
    utils: {
      _fireError: [Function: _fireError],
      _jsonInterfaceMethodToString: [Function: _jsonInterfaceMethodToString],
      _flattenTypes: [Function: _flattenTypes],
      randomHex: [Function: randomHex],
      BN: [Function: BNwrapped],
      isBN: [Function: isBN],
      isBigNumber: [Function: isBigNumber],
      isHex: [Function: isHex],
      isHexStrict: [Function: isHexStrict],
      sha3: [Function],
      sha3Raw: [Function: sha3Raw],
      keccak256: [Function],
      soliditySha3: [Function: soliditySha3],
      soliditySha3Raw: [Function: soliditySha3Raw],
      encodePacked: [Function: encodePacked],
      isAddress: [Function: isAddress],
      checkAddressChecksum: [Function: checkAddressChecksum],
      toChecksumAddress: [Function: toChecksumAddress],
      toHex: [Function: toHex],
      toBN: [Function: toBN],
      bytesToHex: [Function: bytesToHex],
      hexToBytes: [Function: hexToBytes],
      hexToNumberString: [Function: hexToNumberString],
      hexToNumber: [Function: hexToNumber],
      toDecimal: [Function: hexToNumber],
      numberToHex: [Function: numberToHex],
      fromDecimal: [Function: numberToHex],
      hexToUtf8: [Function: hexToUtf8],
      hexToString: [Function: hexToUtf8],
      toUtf8: [Function: hexToUtf8],
      stripHexPrefix: [Function: stripHexPrefix],
      utf8ToHex: [Function: utf8ToHex],
      stringToHex: [Function: utf8ToHex],
      fromUtf8: [Function: utf8ToHex],
      hexToAscii: [Function: hexToAscii],
      toAscii: [Function: hexToAscii],
      asciiToHex: [Function: asciiToHex],
      fromAscii: [Function: asciiToHex],
      unitMap: [Object],
      toWei: [Function: toWei],
      fromWei: [Function: fromWei],
      padLeft: [Function: leftPad],
      leftPad: [Function: leftPad],
      padRight: [Function: rightPad],
      rightPad: [Function: rightPad],
      toTwosComplement: [Function: toTwosComplement],
      isBloom: [Function: isBloom],
      isUserEthereumAddressInBloom: [Function: isUserEthereumAddressInBloom],
      isContractAddressInBloom: [Function: isContractAddressInBloom],
      isTopic: [Function: isTopic],
      isTopicInBloom: [Function: isTopicInBloom],
      isInBloom: [Function: isInBloom],
      compareBlockNumbers: [Function: compareBlockNumbers],
      toNumber: [Function: toNumber]
    },
    Method: [Function: Method]
  },
  clearSubscriptions: [Function (anonymous)],
  options: {
    address: [Getter/Setter],
    jsonInterface: [Getter/Setter],
    data: undefined,
    from: undefined,
    gasPrice: undefined,
    gas: undefined
  },
  handleRevert: [Getter/Setter],
  defaultCommon: [Getter/Setter],
  defaultHardfork: [Getter/Setter],
  defaultChain: [Getter/Setter],
  transactionPollingTimeout: [Getter/Setter],
  transactionPollingInterval: [Getter/Setter],
  transactionConfirmationBlocks: [Getter/Setter],
  transactionBlockTimeout: [Getter/Setter],
  blockHeaderTimeout: [Getter/Setter],
  defaultAccount: [Getter/Setter],
  defaultBlock: [Getter/Setter],
  methods: {
    setMessage: [Function: bound _createTxObject],
    '0x368b8772': [Function: bound _createTxObject],
    'setMessage(string)': [Function: bound _createTxObject],
    message: [Function: bound _createTxObject],
    '0xe21f37ce': [Function: bound _createTxObject],
    'message()': [Function: bound _createTxObject]
  },
  events: { allEvents: [Function: bound ] },
  _address: '0xDe9FF9D5d78D3A7BBF56113A8bbB8e3e755A82AF',
  _jsonInterface: [
    {
      constant: false,
      inputs: [Array],
      name: 'setMessage',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function',
      signature: '0x368b8772'
    },
    {
      constant: true,
      inputs: [],
      name: 'message',
      outputs: [Array],
      payable: false,
      stateMutability: 'view',
      type: 'function',
      signature: '0xe21f37ce'
    },
    {
      inputs: [Array],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'constructor',
      constant: undefined,
      signature: 'constructor'
    }
  ]
}
    ✔ deploys a contract


  1 passing (71ms)

(base) karenjyang@Karens-MBP inbox % 
*/


// const { interface, bytecode } = require('../compile');


// let accounts;
// let inbox;
// beforeEach(async () => {

//     // Get a list of all unlocked accounts
//     accounts = await web3.eth.getAccounts();
        
//     // Use one of those accounts to deploy the contract
//     // inbox is like a javascript representation of the contract
//     inbox = await new web3.eth.Contract(JSON.parse(interface))
//       .deploy({ data: bytecode, arguments: ['Hi there!'] })
//       .send({ from: accounts[0], gas: '1000000' });
// });

// describe('Inbox', () => {
//     it('deploys a contract', () => {
//       assert.ok(inbox.options.address);
//     });
// });

/*
(base) karenjyang@Karens-MBP inbox % npm run test

> inbox@1.0.0 test
> mocha

(node:2019) V8: /Users/karenjyang/inbox/node_modules/solc/soljson.js:3 Invalid asm.js: Invalid member of stdlib
(Use `node --trace-warnings ...` to show where the warning was created)


  Inbox
    ✔ deploys a contract


  1 passing (71ms)
  */



// const { interface, bytecode } = require('../compile');


// let accounts;
// let inbox;
// //const INITIAL_STRING = "Hi there!"
// beforeEach(async () => {

//     // Get a list of all unlocked accounts
//     accounts = await web3.eth.getAccounts();
        
//     // Use one of those accounts to deploy the contract
//     // inbox is like a javascript representation of the contract
//     inbox = await new web3.eth.Contract(JSON.parse(interface))
//       .deploy({ data: bytecode, arguments: ['Hi there!'] })
//       .send({ from: accounts[0], gas: '1000000' });
// });

// describe('Inbox', () => {
//     it('deploys a contract', () => {
//       assert.ok(inbox.options.address);
//     });

//     it('has a default message', async () => {
//         const message = await inbox.methods.message().call();
//         assert.equal(message, 'Hi there!');
//     });
// });

/*
(base) karenjyang@Karens-MBP inbox % npm run test

> inbox@1.0.0 test
> mocha

(node:2314) V8: /Users/karenjyang/inbox/node_modules/solc/soljson.js:3 Invalid asm.js: Invalid member of stdlib
(Use `node --trace-warnings ...` to show where the warning was created)


  Inbox
    ✔ deploys a contract
    ✔ has a default message


  2 passing (114ms)

(base) karenjyang@Karens-MBP inbox % 
*/
const { interface, bytecode } = require('../compile');

let accounts;
let inbox;
//const INITIAL_STRING = "Hi there!"
beforeEach(async () => {

    // Get a list of all unlocked accounts
    accounts = await web3.eth.getAccounts();
        
    // Use one of those accounts to deploy the contract
    // inbox is like a javascript representation of the contract
    inbox = await new web3.eth.Contract(JSON.parse(interface))
      .deploy({ data: bytecode, arguments: ['Hi there!'] 
    })
      .send({ from: accounts[0], gas: '1000000' });
});

describe('Inbox', () => {
    it('deploys a contract', () => {
      assert.ok(inbox.options.address);
    });

    it('has a default message', async () => {
        const message = await inbox.methods.message().call();
        assert.equal(message, 'Hi there!');
    });
    it('can change the message', async () => {
        await inbox.methods.setMessage('bye').send({ from: accounts[0] })
        const message = await inbox.methods.message().call();
        assert.equal(message, 'bye');
    });
});

/* output
(base) karenjyang@Karens-MBP inbox % npm run test

> inbox@1.0.0 test
> mocha

(node:2822) V8: /Users/karenjyang/inbox/node_modules/solc/soljson.js:3 Invalid asm.js: Invalid member of stdlib
(Use `node --trace-warnings ...` to show where the warning was created)


  Inbox
    ✔ deploys a contract
    ✔ has a default message
    ✔ can change the message


  3 passing (166ms)

(base) karenjyang@Karens-MBP inbox % 
*/


