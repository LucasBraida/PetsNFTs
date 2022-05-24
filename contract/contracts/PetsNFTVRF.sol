pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@chainlink/contracts/src/v0.8/interfaces/VRFCoordinatorV2Interface.sol";
import "@chainlink/contracts/src/v0.8/VRFConsumerBaseV2.sol";
import "hardhat/console.sol";

contract PetsNFTVRF is ERC721URIStorage, VRFConsumerBaseV2 {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    string private BASE_URI;
    uint256 private MAX_SUPPLY;
    string[] private availableNFTs;
    mapping(address => uint256[]) ownerToTokens;
    mapping(uint256 => uint256) tokenToIndexForOwner;
    mapping(uint256 => address) requestToSender;
    mapping(uint256 => uint256) requestToTokenId;

    event NewTokenMinted(address owner, uint256 tokenId);
    event NewRandomNumberRequest(address owner, uint256 requestId);
    VRFCoordinatorV2Interface COORDINATOR;
    uint64 s_subscriptionId;


    address vrfCoordinator = 0x6168499c0cFfCaCD319c818142124B7A15E857ab;

    bytes32 keyHash =
        0xd89b2bf150e3b9e13446986e571fb9cab24b13cea0a43ea20a6049a85cc807cc;


    uint32 callbackGasLimit = 300000;


    uint16 requestConfirmations = 3;


    uint32 numWords = 1;

    uint256[] public s_randomWords;
    uint256 public s_requestId;
    address s_owner;

    constructor(
        string memory baseURI,
        string memory name,
        string memory symbol,
        string[] memory NFTs,
        uint64 subscriptionId
    ) VRFConsumerBaseV2(vrfCoordinator) ERC721(name, symbol) {
        BASE_URI = baseURI;
        availableNFTs = NFTs;
        MAX_SUPPLY = NFTs.length;
        s_subscriptionId = subscriptionId;
        COORDINATOR = VRFCoordinatorV2Interface(vrfCoordinator);

    }

    function _baseURI() internal view override returns (string memory) {
        return string(abi.encodePacked(BASE_URI, "/"));
    }



    function _removeUsedToken(uint256 index) internal {
        availableNFTs[index] = availableNFTs[availableNFTs.length - 1];
        availableNFTs.pop();
    }

    function _removeUsedToken(uint index, uint256[] storage array) internal {
        array[index] = array[array.length -1];
        array.pop();
    }

    function _getRandomToken(string memory input)
        private
        view
        returns (uint256)
    {
        uint256 randomNumber = uint256(keccak256(abi.encodePacked(input)));
        return randomNumber % availableNFTs.length;
    }

    function _transfer(
        address from,
        address to,
        uint256 tokenId
    ) internal virtual override {
        ERC721._transfer(from, to, tokenId);
        uint256 tokenIndex = tokenToIndexForOwner[tokenId];
        _removeUsedToken(tokenIndex, ownerToTokens[from]);
        ownerToTokens[to].push(tokenId);
        tokenToIndexForOwner[tokenId] = ownerToTokens[to].length -1;
    }

    function mintNFT() public {
        uint256 newItemId = _tokenIds.current();
        require(newItemId < MAX_SUPPLY, "Would exceed max supply");
        s_requestId = COORDINATOR.requestRandomWords(
            keyHash,
            s_subscriptionId,
            requestConfirmations,
            callbackGasLimit,
            numWords
        );
        requestToSender[s_requestId] = msg.sender;
        emit NewRandomNumberRequest(msg.sender, s_requestId);
    }

    function fulfillRandomWords(
        uint256 requestId,
        uint256[] memory randomWords
    ) internal override {
        uint256 randomNumber = randomWords[0] % availableNFTs.length;
        uint256 newItemId = _tokenIds.current();

        string memory tokenURI = string(
            abi.encodePacked(availableNFTs[randomNumber])
        );

        _safeMint(requestToSender[requestId], newItemId);
        _setTokenURI(newItemId, tokenURI);
        _removeUsedToken(randomNumber);
        _tokenIds.increment();
        ownerToTokens[requestToSender[requestId]].push(newItemId);
        tokenToIndexForOwner[newItemId] = ownerToTokens[requestToSender[requestId]].length -1;
        emit NewTokenMinted(requestToSender[requestId], newItemId);
    }

    function getAvailableNFTs() public view returns (string[] memory) {
        return availableNFTs;
    }

    function getNumberOfAvailableNFTs() public view returns (uint256) {
        return availableNFTs.length;
    }

    function getOwnersTokens(address owner)
        public
        view
        returns (uint256[] memory)
    {
        return ownerToTokens[owner];
    }

    function getMaxSupply() public view returns (uint256) {
        return MAX_SUPPLY;
    }
}
