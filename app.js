const Web3 = require('web3');

// Initialize Web3
const providerUrl = "http://127.0.0.1:8545";  // Replace with your Ganache or provider URL
const web3 = new Web3(new Web3.providers.HttpProvider(providerUrl));

// ABI and contract address (replace these with your actual ABI and deployed address)
const contractABI = [
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "userAddress",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "name",
                "type": "string"
            }
        ],
        "name": "UserRegistered",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "userAddress",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "name",
                "type": "string"
            }
        ],
        "name": "UserUpdated",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_name",
                "type": "string"
            }
        ],
        "name": "registerUser",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_name",
                "type": "string"
            }
        ],
        "name": "updateUser",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_userAddress",
                "type": "address"
            }
        ],
        "name": "getUser",
        "outputs": [
            {
                "internalType": "string",
                "name": "name",
                "type": "string"
            },
            {
                "internalType": "address",
                "name": "userAddress",
                "type": "address"
            },
            {
                "internalType": "bool",
                "name": "isRegistered",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getAllUsers",
        "outputs": [
            {
                "internalType": "address[]",
                "name": "",
                "type": "address[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
  ];
const contractAddress = '0x3041Cf8de9551D7E9432b7C4d7E911BCaC891A0B';  // Replace with your deployed contract address

// Create a contract instance
const userContract = new web3.eth.Contract(contractABI, contractAddress);  // This should fix the 'contract not defined' issue

// Function to register a user
async function registerUser(name) {
    const accounts = await web3.eth.getAccounts();
    try {
        await userContract.methods.registerUser(name).send({ from: accounts[0] });
        console.log("User registered successfully!");
    } catch (error) {
        console.error("Error registering user:", error.message);  // Catch the error
    }
}

// Function to get user details
async function getUser(userAddress) {
    try {
        const user = await userContract.methods.getUser(userAddress).call();
        console.log("User info:", user);
    } catch (error) {
        console.error("Error fetching user info:", error.message);  // Handle any error in getUser
    }
}

// Main function to run the script
async function run() {
    await registerUser("Alice");  // Register the user
    await getUser("0x3041Cf8de9551D7E9432b7C4d7E911BCaC891A0B");  // Replace with a valid user address
}

run();  // Execute the script
