# Lazy Pets NFT Collection

A simple project involving a NFT contract, a website to mint new NFTs and see your gallery and a simple NFT generator.

First, all the images and metadata files are generated and sotred using IPFS. That process also creates an array of strings containing each of the unique NFTs names. The contract is then deployed with this and array and all the other standard ERC721 parameters.

When minting, a real random number is generated using Chainlink VRF2, one of the names is selected, the tokenURI is set to one of the already deployed metadata and the array of available NFTs is updated.

The contract stiil has a number of functions to facilitate viewing information. An important feature is a mapping used to keep the information of all the tokens owned by each address. This feature, although helpful to the frontend gallery, requested an overrride of the ***_transfer*** function making sure that any transfer in another plataform, such as OpenSea, is reflected in our gallery.

Finally, the frontend contains a clean design where users can mint NFTS, when they're not sold out, see their gallery with the help of ***ipfs.io*** as their IPFS Gateway and a button to refresh the current account NFTs.

The contract is deployed at Rinkeby at

The website is available at



#### Contract
- Solidity
- ERC721
- Random NFTs with the help of Chainlink.


#### Frontend
- React
- Framer motion

#### NFT Generator
- Node JS
- Jimp


### Images

![](https://github.com/LucasBraida/BuildSpaceTutorials/blob/main/WavePortal/LovePortalHomePage.PNG)

> Home page

![](https://github.com/LucasBraida/BuildSpaceTutorials/blob/main/WavePortal/LovePortalWaveList.PNG)

> WaveList

![](https://github.com/LucasBraida/BuildSpaceTutorials/blob/main/WavePortal/LovePortalSendLove.PNG)

> Send Love window
