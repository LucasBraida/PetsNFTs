const main = async () => {
    const BASE_URI = "ipfs://QmUUy3VzjYpNJqkzsqYrmNBME3MoBfq7LGRyXhGYLUus2q"
    const TOKEN_NAME = "LBPetsNFT";
    const TOKEN_SYMBOL = "LBPETS";
    const aNFT = ["Emma-GGIzi","Emma-JJ","Emma-MamaMeuGlubGlub","Emma-VidaIrada","Nick-GGIzi","Nick-JJ","Nick-MamaMeuGlubGlub","Nick-VidaIrada","Zeus-GGIzi","Zeus-JJ","Zeus-MamaMeuGlubGlub","Zeus-VidaIrada"];
    const nftContractFactory = await hre.ethers.getContractFactory('PetsNFT');
    const nftContract = await nftContractFactory.deploy(BASE_URI, TOKEN_NAME, TOKEN_SYMBOL, aNFT);
    await nftContract.deployed();
    console.log("Contract deployed to:", nftContract.address);

    //txn = await nftContract.makeAnEpicNFT()
    //await txn.wait()

};

const runMain = async () => {
    try {
        await main();
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

runMain();
