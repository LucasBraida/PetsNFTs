pragma solidity ^0.8.1;


import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "hardhat/console.sol";


contract PetsNFT is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    string private BASE_URI;
    uint private MAX_SUPPLY;
    uint[] private availableTokens;
    string[] private availableNFTs;
    mapping(address => uint[]) ownerToTokens;
    event NewTokenMinted(address owner, uint tokenId);

    constructor(
        string memory baseURI,
        string memory name,
        string memory symbol,
        string[] memory aNFT
    ) ERC721(name, symbol) {
        BASE_URI = baseURI;
        availableNFTs = aNFT;
        MAX_SUPPLY = aNFT.length;
        // for (uint i = 0; i < MAX_SUPPLY; i++) {
        //     availableTokens.push(i + 1);
        // }
    }
    function _baseURI() internal view override returns (string memory) {
        return string(abi.encodePacked(BASE_URI, "/"));
    }

    function _removeUsedToken(uint index) internal {
        availableNFTs[index] = availableNFTs[availableNFTs.length -1];
        availableNFTs.pop();
    }

    function _getRandomToken(string memory input) private view returns(uint){
        uint randomNumber = uint(keccak256(abi.encodePacked(input)));
        return randomNumber % availableNFTs.length;
  }


    function mintNFT() public {
        uint256 newItemId = _tokenIds.current();
        require(newItemId < MAX_SUPPLY, "Would exceed max supply");
        string memory input = string(
            abi.encodePacked(block.difficulty, msg.sender, block.timestamp)
        );

        uint256 randomNumber = _getRandomToken(input);
        string memory tokenURI = string(abi.encodePacked(availableNFTs[randomNumber]));
        _safeMint(msg.sender, newItemId);
        _removeUsedToken(randomNumber);
        _setTokenURI(newItemId, tokenURI);
        _tokenIds.increment();
        ownerToTokens[msg.sender].push(newItemId);
        emit NewTokenMinted(msg.sender, newItemId);
    }


  function getAvailableNFTs() public view returns(string[] memory){
        return availableNFTs;
    }

  function getNumberOfAvailableNFTs() public view returns(uint){
    return availableNFTs.length;
  }

  function getOwnersTokens(address owner) public view returns(uint[] memory){
    return ownerToTokens[owner];
  }
}
