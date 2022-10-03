// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

// adds some security and you can keep track of all Campaigns deployed inside of application
contract CampaignFactory {
    address payable[] public deployedCampaigns;

     // this will create contracts for us
    function createCampaign(uint minimum) public {
        address newCampaign = address(new Campaign(minimum, msg.sender));
        deployedCampaigns.push(payable(newCampaign));
    }

    function getDeployedCampaigns() public view returns (address payable[] memory) {
        return deployedCampaigns;
    }
}

// contract (like a class)
contract Campaign {
    //struct definition (a new type), you need to create an instance of Request
    struct Request {
        string description; // value type
        uint value;         // value type
        address recipient; // value type
        bool complete;      // value type
        uint approvalCount;  // value type, only keeps track of "yes" votes
        mapping(address => bool) approvals;
// for mappings, all values exist and keys are not stored, can't do iteration or summation
 //mapping is a reference type so does not need to be initialized later
    }

    // properties are all storage variables
    Request[] public requests;  // will be used for a look up (not iterating, no for loop), will be constant time, 
    // gas fees won't be high
    address public manager;
    uint public minimumContribution;
    mapping(address => bool) public approvers;  // for mappings, all values exist and keys are not stored
    uint public approversCount;

    // can add modifier to other functions to restrict access to manager
    modifier restricted() {
        require(msg.sender == manager);
        _;
    }

    // constructor function Campaign(uint minimum, address creator) public {
    constructor (uint minimum, address creator) {
        manager = creator;
        minimumContribution = minimum;
    }


    // method
    function contribute() public payable {
        require(msg.value > minimumContribution);
        // adds new key and gives it a value of true, only true is stored in the mapping, not the key
        approvers[msg.sender] = true;
        approversCount++;
    }
    // pass in order description, value (wei), recipient  
    function createRequest(string memory description, uint value, address recipient) public restricted {
        // struct Request, Request({}) 
        Request storage newRequest = requests.push(); 
        newRequest.description = description;  // property field: argument is value (from argument list)
        newRequest.value= value;
        newRequest.recipient= recipient;
        newRequest.complete= false;
        newRequest.approvalCount= 0; // number of approvers count
    }

    function approveRequest(uint index) public {
        Request storage request = requests[index];

        require(approvers[msg.sender]);  // check to see if address is part of organization
        require(!request.approvals[msg.sender]);  // has an address voted on contract yet? If yes, then put ! to make false, so require exits function.

        request.approvals[msg.sender] = true;
        request.approvalCount++;
    }
    // manager will finalize request so that vendor will get paid
    function finalizeRequest(uint index) public restricted {
        Request storage request = requests[index];

        require(request.approvalCount > (approversCount / 2));
        require(!request.complete);

        payable(request.recipient).transfer(request.value);
        request.complete = true;
    }
    
    function getSummary() public view returns (
      uint, uint, uint, uint, address
      ) {
        return (
          minimumContribution,
          address(this).balance,
          requests.length,
          approversCount,
          manager
        );
    }
    
    function getRequestsCount() public view returns (uint) {
        return requests.length;
    }
}

// Storage and memory in terms of where our contract stores data 
// Data Holding Places
// Storage -- holds data between function calls (pretty much like a hard drive), long term preserving data, like property variables at contract level
// Memory -- Temporary place to store data (pretty much like a computer's RAM), arguments to functions are memory data


// Storage and memory in terms of how our solidity variables reference values
/*
contract Numbers {
    int[] public numbers;

    function Numbers() public {
        numbers.push(20);
        numbers.push(32);  // numbers array will have [20,32], it points to storage

        int[] storage myArray = numbers; // myArray points to the exact same location in storage as numbers
        int[] memory myArray = numbers; // myArray points to a copy of numbers array and is put into memory, memory is dumped when function exits.

        myArray[0] = 1; // for storage, first element of numbers will be 1, [1,32], only 2 slots for numbers array, 20 replaced by 1, points to exact same location
        myArray[0] = 1; // for memory, first element of numbers array will be [20], [20,32], myArray points to a new copy that sits in memory. Modified array MyArray only.
    }
}
*/

/*
example 0: 
contract Numbers {
    int[] public numbers;

    function Numbers() public {
        numbers.push(20);
        numbers.push(32);

        changeArray(numbers);

    }

    function changeArray(int[] myArray) private {
        myArray[0] = 1;
    });
}

// first element of numbers array is 20. myArray is a copy inside of memory. Function arguments is a memory variable.


example 1: memory
contract Numbers {
    int[] public numbers;

    function Numbers() public {
        numbers.push(20);
        numbers.push(32);

        changeArray(numbers);

    }
    //function arguments are memory variables, a copy
    function changeArray(int[] memory myArray) private {
        myArray[0] = 1;
    });
}

// first element of numbers array is 20. You can be explicit with the keyword memory


example 2: storage
contract Numbers {
    int[] public numbers;

    function Numbers() public {
        numbers.push(20);
        numbers.push(32);

        changeArray(numbers);

    }
    //function arguments are memory variables, a copy
    function changeArray(int[] storage myArray) private {
        myArray[0] = 1;
    });
}
// first element of numbers array is 1;  References/points to the exact same array.  myArray is the same as numbers. 
*/

/*
array -- If array grows tremendously, gas costs go up.  Linear Time Search.
mapping -- collection of key value pairs.  Think of python dictionary.  All keys must be of the same type. Constant Time Search.
Lookup Process - provide key, hashing function, index position, retrieve value
spanishColors["red"] lookup will give back 'rojo'
spanishColors['xxx'] lookup will give back undefined

Gotchas
1. Keys are NOT stored in solidity. Cannot get a list of keys (Oject.keys(spanishColors))
2. Values are NOT iterable in solidity. No For loop.  Cannot get a list of values (Onject.values(spanishColors))
3. We do not get back undefined. Instead, we get back an empty string for string data type. If integer, then 0. 

*/


/*
requests
0:
string: description Buy batteries
1:
uint256: value 99999999
2:
address: recipient 0x14723A09ACff6D2A60DcdF7aA4AFf308FDDC160C
3:
bool: complete false
4:
uint256: approvalCount 0
*/

/*

Thinking about Deployment

Deploy an instance of the contract to the network
We get back 1 unique address
Each address has no linkage or connection to one another

CreateCampaign button

Solution #1
User clicks 'Create Campaign'
we send user the contract source code via browser
USER MODIFIES CONTRACT TO REMOVE SECURITY RESTRICTIONS
User deploys contract, gets address back
User sends us address of newly deployed campaign 
User sends us address, we publish new address on our site

Problem: Malicious behavior possible during deployment process. Maybe the user modifies the contract source. 
Don't trust user in having source code

Solution # 2 -- we get more security but it costs money
User clicks 'Create Campaign'
We deploy a new campaign, get address back
We publish new campaign on the site
Problem: Deployment of an instance of a contract costs money. What if user clicks 500 times? 


Solution #3 -- 
We create a "factory" contract.  It has a function to deploy a new instance of 'Campaign'
We can have 1 contract deploy another contract within it--deploy instances of the campaign
Cost of deployment is given to the user
Time passes
User clicks 'Create Campaign'
We instruct web3/metamask to show user a transaction that invokes 'Campaign Factory'
User pays deployment costs.  Factory deploys a new copy of 'Campaign'
We tell 'Campaign Factory' to give us a list of all deployed campaigns.
Some point in the future, we can issue a query to the Factory and return a list of addresses.
*/