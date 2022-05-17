const BASE_URI = "ipfs://QmP3r55rUGYFhuVHCaChBZsZpcJdGuDFadYBfQw18JqM3W"
const TOKEN_NAME = "PetsNFT";
const TOKEN_SYMBOL = "PETS";
const aNFT = ["Emma-GGIzi","Emma-JJ","Emma-MamaMeuGlubGlub","Emma-VidaIrada","Nick-GGIzi","Nick-JJ","Nick-MamaMeuGlubGlub","Nick-VidaIrada","Zeus-GGIzi","Zeus-JJ","Zeus-MamaMeuGlubGlub","Zeus-VidaIrada"];


async function main() {
 try {
  const [owner, randomPerson, randomPerson2] = await hre.ethers.getSigners();

  const factory = await hre.ethers.getContractFactory("PetsNFT");
  const petsNFTContract = await factory.deploy(BASE_URI, TOKEN_NAME, TOKEN_SYMBOL, aNFT)
  await petsNFTContract.deployed();

  petsNFTContract.on('NewTokenMinted', (addr, tokenId) =>{
    console.log('Event - ', addr, ' :', tokenId)
  })
  console.log("RandomPerson1: ", randomPerson.address)
  console.log("RandomPerson2: ", randomPerson2.address)
  let avt = await petsNFTContract.getAvailableNFTs()

  console.log(avt)
  let mintTxn = await petsNFTContract.connect(randomPerson2).mintNFT()
  let mintId = await mintTxn.wait();

  //console.log("Minted: ", mintId);

  // const txnURI = await petsNFTContract.tokenURI(1)

  // console.log("TokenURI: ", txnURI)
  // const ownerOf = await petsNFTContract.ownerOf(1)

  //console.log("Token Owner", ownerOf)

  avt = await petsNFTContract.getAvailableNFTs()


  console.log(avt)

  mintTxn = await petsNFTContract.connect(randomPerson).mintNFT()
  mintTxn.wait()
  mintTxn = await petsNFTContract.connect(randomPerson).mintNFT()
  mintTxn.wait()
  mintTxn = await petsNFTContract.connect(randomPerson).mintNFT()
  mintTxn.wait()
  mintTxn = await petsNFTContract.connect(randomPerson).mintNFT()
  mintTxn.wait()
  mintTxn = await petsNFTContract.connect(randomPerson).mintNFT()
  mintTxn.wait()
  mintTxn = await petsNFTContract.connect(randomPerson).mintNFT()
  mintTxn.wait()
  mintTxn = await petsNFTContract.connect(randomPerson).mintNFT()
  mintTxn.wait()
  mintTxn = await petsNFTContract.connect(randomPerson).mintNFT()
  mintTxn.wait()
  mintTxn = await petsNFTContract.connect(randomPerson).mintNFT()
  mintTxn.wait()
  mintTxn = await petsNFTContract.connect(randomPerson).mintNFT()
  mintTxn.wait()
  mintTxn = await petsNFTContract.connect(randomPerson).mintNFT()
  mintTxn.wait()
  mintTxn = await petsNFTContract.connect(randomPerson).mintNFT()
  mintTxn.wait()
  avt = await petsNFTContract.getAvailableNFTs()


  console.log(avt)

  let numToken  = await petsNFTContract.get

  let ownerTKN = await petsNFTContract.getOwnersTokens(randomPerson.address)
  console.log('RandomPerson tokens: ', ownerTKN)
  ownerTKN = await petsNFTContract.getOwnersTokens(randomPerson2.address)
  console.log('RandomPerson2 tokens: ', ownerTKN)
  ownerTKN = await petsNFTContract.getOwnersTokens(owner.address)
  console.log('Owner tokens: ', ownerTKN)
  let tkURI = await petsNFTContract.tokenURI(0)
  console.log(tkURI)
  tkURI = await petsNFTContract.tokenURI(1)
  console.log(tkURI)
  await new Promise(res => setTimeout(() => res(null), 5000));

 }catch(error){
   console.log(error)
 }

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
