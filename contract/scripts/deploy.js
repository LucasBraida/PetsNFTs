const main = async () => {
    const BASE_URI = "ipfs://QmVzmemPWrjoJNjvpLndtuVCHKKocrKk9uZCLxd29Sa2yH"
    const TOKEN_NAME = "LBPetsNFTVRF";
    const TOKEN_SYMBOL = "LBPETSVRF";
    //const aNFT = ["Emma-GGIzi","Emma-JJ","Emma-MamaMeuGlubGlub","Emma-VidaIrada","Nick-GGIzi","Nick-JJ","Nick-MamaMeuGlubGlub","Nick-VidaIrada","Zeus-GGIzi","Zeus-JJ","Zeus-MamaMeuGlubGlub","Zeus-VidaIrada"];
    const aNFT = [
        'Emma-Dibs',
        'Emma-MoveItOrLoseIt',
        'Emma-NoSunshine',
        'Emma-NotSuperstitious',
        'Emma-Rise&Shine',
        'Emma-TakeAChillPill',
        'Emma-WaitLonger',
        'Emma-WokeUpItWasTerrible',
        'Nick-Dibs',
        'Nick-MoveItOrLoseIt',
        'Nick-NoSunshine',
        'Nick-NotSuperstitious',
        'Nick-Rise&Shine',
        'Nick-TakeAChillPill',
        'Nick-WaitLonger',
        'Nick-WokeUpItWasTerrible',
        'Zeus-Dibs',
        'Zeus-MoveItOrLoseIt',
        'Zeus-NoSunshine',
        'Zeus-NotSuperstitious',
        'Zeus-Rise&Shine',
        'Zeus-TakeAChillPill',
        'Zeus-WaitLonger',
        'Zeus-WokeUpItWasTerrible'
      ]
    const nftContractFactory = await hre.ethers.getContractFactory('PetsNFTVRF');
    const nftContract = await nftContractFactory.deploy(BASE_URI, TOKEN_NAME, TOKEN_SYMBOL, aNFT, 4545);
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
