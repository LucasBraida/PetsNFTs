// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.1;

import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "hardhat/console.sol";
import { Base64 } from "./libraries/Base64.sol";

contract MyEpicNFT is ERC721URIStorage {
  // Magic given to us by OpenZeppelin to help us keep track of tokenIds.
  using Counters for Counters.Counter;
  Counters.Counter private _tokenIds;
  event NewEpicNFTMinted(address sender, uint256 tokenId);
  string baseSvg = "<svg xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='xMinYMin meet' viewBox='0 0 350 350'><style>.base { fill: white; font-family: serif; font-size: 24px; }</style><rect width='100%' height='100%' fill='black' /><text x='50%' y='50%' class='base' dominant-baseline='middle' text-anchor='middle'>";

  string[] firstWords = ["Doctor", "Driver", "Actor", "Teacher", "Dancer", "YogaInstructor", "Coach", "Chef", "Painter", "Musician", "Barber", "Farmer", "Guard", "Astronaut", "DJ"];
  string[] secondWords = ["Pikachu", "Bulbasaur", "Charmander", "Squirtle", "Caterpie", "Snorlax", "Pidgey", "Nidoran", "Vulpix", "Jigglypuff", "Meowth", "Psyduck", "Growlithe", "Abra", "Machop"];
  string[] thirdWords = ["Bananao", "Maneirissimo", "Bombado", "Sapeca", "Fedido", "Trouxa", "Pintoso", "ShowDeBola", "Bobalhao", "Mane", "Pitico", "Fofuxo", "Cheiroso"];
  constructor() ERC721 ("SquareNFT", "SQUARE") {
    console.log("This is my NFT contract. Another great project from Buildspace :)");
  }

  function _random(string memory input) private pure returns(uint){
    return uint(keccak256(abi.encodePacked(input)));
  }

  function _randomWord(string[] memory words, uint tokenId) private view returns(string memory){

    string memory randString = string(abi.encodePacked(words[0], Strings.toString(tokenId), msg.sender, block.timestamp));
    uint rand = _random(randString);
    rand = rand % words.length;
    return words[rand];
  }
  // A function our user will hit to get their NFT.
  function makeAnEpicNFT() public {
     // Get the current tokenId, this starts at 0.
    uint256 newItemId = _tokenIds.current();

    string memory firstWord = _randomWord(firstWords, newItemId);
    string memory secondWord = _randomWord(secondWords, newItemId);
    string memory thirdWord = _randomWord(thirdWords, newItemId);
    string memory combinedWord = string(abi.encodePacked(firstWord, secondWord, thirdWord));


    string memory finalSvg = string(abi.encodePacked(baseSvg, combinedWord, "</text></svg>"));

    string memory json = Base64.encode(
        bytes(
            string(
                abi.encodePacked(
                    '{"name": "',
                    // We set the title of our NFT as the generated word.
                    combinedWord,
                    '", "description": "A highly acclaimed and super fun collection of squares and the most brilliant silly words.", "image": "data:image/svg+xml;base64,',
                    // We add data:image/svg+xml;base64 and then append our base64 encode our svg.
                    Base64.encode(bytes(finalSvg)),
                    '"}'
                )
            )
        )
    );

    string memory finalTokenURI = string(abi.encodePacked("data:application/json;base64,", json));
    console.log("\n--------------------");
    console.log(string(
        abi.encodePacked(
            "https://nftpreview.0xdev.codes/?code=",
            finalTokenURI
        )
    ));
    console.log("--------------------\n");
     // Actually mint the NFT to the sender using msg.sender.
    _safeMint(msg.sender, newItemId);

    // Set the NFTs data.
    _setTokenURI(newItemId, finalTokenURI);
    console.log("An NFT w/ ID %s has been minted to %s", newItemId, msg.sender);
    // Increment the counter for when the next NFT is minted.
    _tokenIds.increment();
    emit NewEpicNFTMinted(msg.sender, newItemId);
  }
}

