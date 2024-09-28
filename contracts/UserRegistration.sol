pragma solidity ^0.8.0;

contract UserRegistration {
    struct User {
        string name;
        address userAddress;
        bool isRegistered;
    }

    mapping(address => User) private users;
    address[] private userAddresses;

    event UserRegistered(address indexed userAddress, string name);
    event UserUpdated(address indexed userAddress, string name);

    modifier onlyRegistered() {
        require(users[msg.sender].isRegistered, "User not registered.");
        _;
    }

    function registerUser(string memory _name) public {
        require(!users[msg.sender].isRegistered, "User already registered.");

        users[msg.sender] = User({
            name: _name,
            userAddress: msg.sender,
            isRegistered: true
        });
        userAddresses.push(msg.sender);

        emit UserRegistered(msg.sender, _name);
    }

    function updateUser(string memory _name) public onlyRegistered {
        users[msg.sender].name = _name;
        emit UserUpdated(msg.sender, _name);
    }

    function getUser(address _userAddress) public view returns (string memory name, address userAddress, bool isRegistered) {
        User memory user = users[_userAddress];
        return (user.name, user.userAddress, user.isRegistered);
    }
    
    function getAllUsers() public view returns (address[] memory) {
        return userAddresses;
    }
}
