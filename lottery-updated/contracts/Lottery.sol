// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

contract Lottery {
    address public manager;
    address payable[] public players; //create a dynamic array of type address
    
    constructor() {
        manager = msg.sender;
    }
    
    function enter() public payable {
        // used for validation, msg.value is in wei, .01 converted to wei
        require(msg.value > .01 ether);
        players.push(payable(msg.sender));
    }
    // helper function
    function random() private view returns (uint) {
        return uint(keccak256(abi.encodePacked(block.difficulty, block.timestamp, players)));
    }
    
    function pickWinner() public restricted { // manager can pick winner
        uint index = random() % players.length;
        players[index].transfer(address(this).balance);
        // resets contract state, creates a new dynamic array with initial size of 0.
        players = new address payable[](0);
    }
    // function modifier to reduce code, DRY, see function above for use
    modifier restricted() {
        require(msg.sender == manager);
        _; // underscore and semicolon represent running rest of code inside of function after above code is run
    }
    
    function getPlayers() public view returns (address payable[] memory) {
        return players;
    }
}   

// common function types
//public -- anyone can call this function
//private -- only this contract can call this function
//view (same as constant) -- this function returns data and does not modify the contract's data
//constant -- this function returns data and does not modify the contract's data
//pure -- function will not modify or even read the contract's data
//payable -- when someone call this function they might send ether along

// running contract functions
// "calling a function"                 ||  sending a transaction to a function
// cannot modify the contract's data    ||  can modify a contract's data
// can return data                      ||  takes time to execute! 15 to 30 seconds to run proof of work algorithm
// runs instantly                       ||  returns the transaction hash
// free to do!                          ||  costs money!

// Basic types
// string -- sequence of characters
// bool -- boolean value
// int -- integer, positive or negative
//uint -- uunsigned integer, positive number
//fixed/ufixed -- Fixed point number.  Number with a decimal after it
// address -- has methods tied to it for sending money 0x18bae . . .. 

// The 'msg' Global Variable
// msg.data --  data field from the call or transaction that invoked the current function
// msg.gas --  amount of gas the current function invocation has available
// msg.sender -- address of the account that started the current function invocation
// msg.value --  amount of ether (in wei) that was sent along with the function invocation

// Reference Types
// fixed array -- array that contains a single type of element.  Has an unchanging length.
// dynamic array -- array that contains a single type of element. Can change in size over time.
// mapping -- collection of key value pairs.  Think of Javascript objects, Ruby hashes, or Python dictionary.
// All keys must be of the same type, and all values must be of the same type
// struct -- collection of key value pairs that can have different types
//   struct Car {
//         string make;
//         string mode;
//         uint value;
//         }

/*
contract Test {
    uint[] public myArray;

    function Test() public {
        myArray.push(1);  // push in new elements to cause the array to grow in length, first element is 1
        myArray.push(10);
        myArray.push(30);
    }
    function getMyArray() public view returns (uint[]){
        return myArray;
    }
    function getArrayLength() public view returns (uint) {
        return myArray.length;
    }
    function getFirstElement() public view returns (uint) {
        return myArray[0]; // return 30
    }
}
*/

// Gotcha--Nested dynamic array is not allowed in JavaScript world-- ABI/JS/Web3, it works for solidity world only.
