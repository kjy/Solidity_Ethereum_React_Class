// contract code will go here

pragma solidity ^0.4.17;
// linter warnings (red underline) about pragma version can igonored!



//contract is like a class, deploy to ethereum network
contract Inbox {
    string public message; // instance variable
    
    //function is a constructor function, same name as contract
    function Inbox(string initialMessage) public {
        message = initialMessage;
    }

    function setMessage(string newMessage) public { // changes the blockchain, updates data
        message = newMessage;
    }
    //function name, function type, return type
    // function getMessage() public view returns (string) {
    //     return message;
    // }
    // function doMath(int a, int b) {
    //     a + b;
    //     b-a;
    //     a * b;
    //     a == 0;
    // }
}

// common function types
//public -- anyone can call this function
//private -- only this contract can call this function
//view (same as constant) -- this function returns data and does not modify the contract's data
//constant -- this function returns data and does not modify the contract's data
//pure -- function will not modify or even read the contract's data
//payable -- when someone call this function they might send either along

// running contract functions
// "calling a function"                 ||  sending a transaction to a function
// cannot modify the contract's data    ||  can modify a contract's data
// can return data                      ||  takes time to execute! 15 to 30 seconds to run proof of work algorithm
// runs instantly                       ||  returns the transaction hash
// free to do!                          ||  costs money!