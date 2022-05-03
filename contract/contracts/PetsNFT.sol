pragma solidity ^0.8.1;


import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "hardhat/console.sol";


contract PetsNFT is ERC721 {
    // Magic given to us by OpenZeppelin to help us keep track of tokenIds.
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    string private BASE_URI;
    uint private MAX_SUPPLY;
    uint[] private availableTokens;
    uint private tokenMinted;

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
        for (uint i = 0; i < MAX_SUPPLY; i++) {
            availableTokens.push(i + 1);
        }
    }
    function _baseURI() internal view override returns (string memory) {
        return string(abi.encodePacked(BASE_URI, "/"));
    }

    function _removeUsedToken(uint index) internal {
        availableTokens[index] = availableTokens[availableTokens.length -1];
        availableTokens.pop();
    }

    function _getRandomToken(string memory input) private view returns(uint){
        uint randomNumber = uint(keccak256(abi.encodePacked(input)));
        return randomNumber % availableTokens.length;
  }

    // We need to pass the name of our NFTs token and its symbol.
    // constructor() ERC721("PetsNFT", "PETS") {
    //     console.log("This is my NFT contract. Woah!");
    // }

    // A function our user will hit to get their NFT.
    // function makeAnEpicNFT() public {
    //     // Get the current tokenId, this starts at 0.
    //     uint256 newItemId = _tokenIds.current();

    //     // Actually mint the NFT to the sender using msg.sender.
    //     _safeMint(msg.sender, newItemId);

    //     // Set the NFTs data.
    //     _setTokenURI(newItemId, "blah");

    //     // Increment the counter for when the next NFT is minted.
    //     _tokenIds.increment();
    // }

    function mintNFT() public {

        require(tokenMinted <= MAX_SUPPLY, "Would exceed max supply");
        string memory input = string(
            abi.encodePacked(block.difficulty, msg.sender, block.timestamp)
        );
        uint256 randomNumber = _getRandomToken(input);
        uint256 tokenId = availableTokens[randomNumber];
        _safeMint(msg.sender, tokenId);
        _removeUsedToken(randomNumber);
        tokenMinted = tokenMinted + 1;
        ownerToTokens[msg.sender].push(tokenId);
        emit NewTokenMinted(msg.sender, tokenId);
    }


  function getAvailableTokens() public view returns(uint[] memory){
        return availableTokens;
    }

  function getNumberOfAvailableTokens() public view returns(uint){
    return availableTokens.length;
  }

  function getOwnersTokens(address owner) public view returns(uint[] memory){
    return ownerToTokens[owner];
  }
}
