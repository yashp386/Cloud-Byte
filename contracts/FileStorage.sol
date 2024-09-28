pragma solidity ^0.8.0;

contract FileStorage {
    struct File {
        string hash;  
        string name;   
        uint timestamp; 
    }

    mapping(uint => File) public files;
    uint public fileCount;

    event FileUploaded(
        uint fileId,
        string hash,
        string name,
        uint timestamp
    );

    function uploadFile(string memory _hash, string memory _name) public {
        fileCount++;
        files[fileCount] = File(_hash, _name, block.timestamp);
        emit FileUploaded(fileCount, _hash, _name, block.timestamp);
    }

    function getFile(uint _fileId) public view returns (string memory, string memory, uint) {
        File memory file = files[_fileId];
        return (file.hash, file.name, file.timestamp);
    }
}
