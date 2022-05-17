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
    uint private tokenMinted;
    string[] private availableNFTs = ["Emma-GGIzi","Emma-JJ","Emma-MamaMeuGlubGlub","Emma-VidaIrada","Nick-GGIzi","Nick-JJ","Nick-MamaMeuGlubGlub","Nick-VidaIrada","Zeus-GGIzi","Zeus-JJ","Zeus-MamaMeuGlubGlub","Zeus-VidaIrada"];

    mapping(address => uint[]) ownerToTokens;
    event NewTokenMinted(address owner, uint tokenId);

    constructor(
        string memory baseURI,
        string memory name,
        string memory symbol,
        uint maxSupply
    ) ERC721(name, symbol) {
        BASE_URI = baseURI;
        MAX_SUPPLY = maxSupply;
        tokenMinted = 0;
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

        require(tokenMinted <= MAX_SUPPLY, "Would exceed max supply");
        string memory input = string(
            abi.encodePacked(block.difficulty, msg.sender, block.timestamp)
        );
        uint256 newItemId = _tokenIds.current();
        uint256 randomNumber = _getRandomToken(input);
        string memory tokenURI = string(abi.encodePacked(availableNFTs[randomNumber]));
        _safeMint(msg.sender, newItemId);
        _removeUsedToken(randomNumber);
        _setTokenURI(newItemId, tokenURI);
        _tokenIds.increment();
        tokenMinted = tokenMinted + 1;
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
