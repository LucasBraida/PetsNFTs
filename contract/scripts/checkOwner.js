async function main() {
  const contractAddress = "0x2a7859d36190ad6578a4dB4fa041603236E07f7d";
  const myContract = await hre.ethers.getContractAt("PetsNFTVRF", contractAddress);

  const tx = await myContract.ownerOf(2);

  console.log(tx)

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
      console.error(error);
      process.exit(1);
  });
