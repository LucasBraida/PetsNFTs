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
    uint256[] private availableTokens;
    string[] private availableNFTs;
    mapping(address => uint256[]) ownerToTokens;
    mapping(uint256 => address) requestToSender;
    mapping(uint256 => uint256) requestToTokenId;

    event NewTokenMinted(address owner, uint256 tokenId);
    event NewRandomNumberRequest(address owner, uint256 requestId);
    VRFCoordinatorV2Interface COORDINATOR;
    uint64 s_subscriptionId;

    // Rinkeby coordinator. For other networks,
    // see https://docs.chain.link/docs/vrf-contracts/#configurations
    address vrfCoordinator = 0x6168499c0cFfCaCD319c818142124B7A15E857ab;

    // The gas lane to use, which specifies the maximum gas price to bump to.
    // For a list of available gas lanes on each network,
    // see https://docs.chain.link/docs/vrf-contracts/#configurations
    bytes32 keyHash =
        0xd89b2bf150e3b9e13446986e571fb9cab24b13cea0a43ea20a6049a85cc807cc;

    // Depends on the number of requested values that you want sent to the
    // fulfillRandomWords() function. Storing each word costs about 20,000 gas,
    // so 100,000 is a safe default for this example contract. Test and adjust
    // this limit based on the network that you select, the size of the request,
    // and the processing of the callback request in the fulfillRandomWords()
    // function.
    uint32 callbackGasLimit = 200000;

    // The default is 3, but you can set this higher.
    uint16 requestConfirmations = 3;

    // For this example, retrieve 2 random values in one request.
    // Cannot exceed VRFCoordinatorV2.MAX_NUM_WORDS.
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
        // for (uint i = 0; i < MAX_SUPPLY; i++) {
        //     availableTokens.push(i + 1);
        // }
    }

    function _baseURI() internal view override returns (string memory) {
        return string(abi.encodePacked(BASE_URI, "/"));
    }

    function _removeUsedToken(uint256 index) internal {
        availableNFTs[index] = availableNFTs[availableNFTs.length - 1];
        availableNFTs.pop();
    }

    function _getRandomToken(string memory input)
        private
        view
        returns (uint256)
    {
        uint256 randomNumber = uint256(keccak256(abi.encodePacked(input)));
        return randomNumber % availableNFTs.length;
    }

    function mintNFT() public {
        // uint256 newItemId = _tokenIds.current();
        // require(newItemId < MAX_SUPPLY, "Would exceed max supply");
        // string memory input = string(
        //     abi.encodePacked(block.difficulty, msg.sender, block.timestamp)
        // );

        // uint256 randomNumber = _getRandomToken(input);
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
        requestToTokenId[s_requestId] = newItemId;

        // string memory tokenURI = string(
        //     abi.encodePacked(availableNFTs[randomNumber])
        // );

        //_removeUsedToken(randomNumber);
        // _setTokenURI(newItemId, tokenURI);
        _tokenIds.increment();
        ownerToTokens[msg.sender].push(newItemId);
        //emit NewTokenMinted(requestToSender[requestId], newItemId);
        // string memory tokenURI = string(
        //     abi.encodePacked(availableNFTs[randomNumber])
        // );
        // _safeMint(msg.sender, newItemId);
        // _removeUsedToken(randomNumber);
        // _setTokenURI(newItemId, tokenURI);
        // _tokenIds.increment();
        // ownerToTokens[msg.sender].push(newItemId);
        // emit NewTokenMinted(msg.sender, newItemId);
        emit NewRandomNumberRequest(msg.sender, s_requestId);
    }

    function fulfillRandomWords(
        uint256 requestId,
        uint256[] memory randomWords
    ) internal override {
        uint256 randomNumber = randomWords[0] % availableNFTs.length;
        string memory tokenURI = string(
            abi.encodePacked(availableNFTs[randomNumber])
        );
        _safeMint(requestToSender[requestId], requestToTokenId[requestId]);
        _setTokenURI(requestToTokenId[requestId], tokenURI);
        _removeUsedToken(randomNumber);
        emit NewTokenMinted(requestToSender[requestId], requestToTokenId[requestId]);
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
