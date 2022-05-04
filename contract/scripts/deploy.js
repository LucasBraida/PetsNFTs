const main = async () => {
    const BASE_URI = "ipfs://QmP3r55rUGYFhuVHCaChBZsZpcJdGuDFadYBfQw18JqM3W"
    const TOKEN_NAME = "PetsNFT";
    const TOKEN_SYMBOL = "PETS";
    const nftContractFactory = await hre.ethers.getContractFactory('PetsNFT');
    const nftContract = await nftContractFactory.deploy(BASE_URI, TOKEN_NAME, TOKEN_SYMBOL, 10);
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
